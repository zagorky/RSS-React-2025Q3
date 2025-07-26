import type { PaginationType } from '~types/types';

import { NavLink, useLocation } from 'react-router';

type PaginationProps = {
  pagination: PaginationType;
};

export const Pagination = ({ pagination }: PaginationProps) => {
  const location = useLocation();

  const {
    current_page: currentPage,
    last_visible_page: lastPage,
    has_next_page: hasNextPage,
  } = pagination;

  const getPageLink = (page: number) => {
    const searchParameter = new URLSearchParams(location.search);
    searchParameter.set('page', page.toString());
    return `${location.pathname}?${searchParameter.toString()}`;
  };

  return (
    <div className="text-md flex justify-center gap-2">
      {currentPage > 1 ? (
        <NavLink
          className="btn transition-all duration-200"
          to={getPageLink(currentPage - 1)}
        >
          Prev
        </NavLink>
      ) : (
        <span className="btn cursor-not-allowed opacity-50">Prev</span>
      )}
      <span className="btn">
        {currentPage} of {lastPage}
      </span>
      {hasNextPage ? (
        <NavLink
          className="btn transition-all duration-200"
          to={getPageLink(currentPage + 1)}
        >
          Next
        </NavLink>
      ) : (
        <span className="btn cursor-not-allowed opacity-50">Next</span>
      )}
    </div>
  );
};
