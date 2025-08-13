'use client';
import type { PaginationType } from '~types/types';

import { assertIsNonNullable } from '~lib/utilities';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type PaginationProps = {
  pagination: PaginationType;
};

export const Pagination = ({ pagination }: PaginationProps) => {
  const {
    current_page: currentPage,
    last_visible_page: lastPage,
    has_next_page: hasNextPage,
  } = pagination;

  const searchParams = useSearchParams();
  assertIsNonNullable(searchParams);
  const pathname = usePathname();

  const getPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="text-md flex justify-center gap-2 pb-4">
      {currentPage > 1 ? (
        <Link
          className="btn transition-all duration-200"
          href={getPageLink(currentPage - 1)}
        >
          Prev
        </Link>
      ) : (
        <span className="btn cursor-not-allowed opacity-50">Prev</span>
      )}
      <span className="btn">
        {currentPage} of {lastPage}
      </span>
      {hasNextPage ? (
        <Link
          className="btn transition-all duration-200"
          href={getPageLink(currentPage + 1)}
        >
          Next
        </Link>
      ) : (
        <span className="btn cursor-not-allowed opacity-50">Next</span>
      )}
    </div>
  );
};