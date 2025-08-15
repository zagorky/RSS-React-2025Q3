'use client';
import type { PaginationType } from '~types/types';

import { usePathname, useRouter } from '~i18n/navigation';
import { Button } from '~ui/button/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

type PaginationProps = {
  pagination: PaginationType;
};

export const Pagination = ({ pagination }: PaginationProps) => {
  const {
    current_page: currentPage,
    last_visible_page: lastPage,
    has_next_page: hasNextPage,
  } = pagination;

  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('Pagination');

  function handleChangePage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    const queryParams = Object.fromEntries(params.entries());
    startTransition(() => {
      replace({ pathname, query: queryParams }, { scroll: true });
    });
  }

  return (
    <div className="text-md flex justify-center gap-2 pb-4">
      <Button
        className="btn transition-all duration-200"
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={isPending || currentPage === 1}
      >
        <ChevronLeft />
      </Button>

      <span className="btn">
        {t('pageIndicator', { currentPage, lastPage })}
      </span>

      <Button
        className="btn transition-all duration-200"
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={isPending || !hasNextPage}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};