import type { PaginationType } from '~types/types';

import { NavLink, useLocation } from 'react-router';

type PaginationProps = {
  pagination: Pick<
    PaginationType,
    'current_page' | 'has_next_page' | 'last_visible_page'
  >;
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
          className="result-item-title rounded-xl px-4 py-2 transition-all duration-200"
          to={getPageLink(currentPage - 1)}
        >
          Prev
        </NavLink>
      ) : (
        <span className="cursor-not-allowed rounded-xl px-4 py-2 text-lg opacity-50">
          Prev
        </span>
      )}
      <span className="rounded-xl px-4 py-2 text-lg font-semibold">
        {currentPage} of {lastPage}
      </span>
      {hasNextPage ? (
        <NavLink
          className="result-item-title rounded-xl px-4 py-2 transition-all duration-200"
          to={getPageLink(currentPage + 1)}
        >
          Next
        </NavLink>
      ) : (
        <span className="cursor-not-allowed rounded-xl px-4 py-2 text-lg opacity-50">
          Next
        </span>
      )}
    </div>
  );
};
