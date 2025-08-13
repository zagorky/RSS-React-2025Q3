import {fetchAnimeData} from '~lib/api/api';
import {cn} from '~lib/cn';
import {withDataTestId} from '~lib/utilities';
import {EmptyList} from '~ui/empty-list/empty-list';
import {Loader} from '~ui/loader/loader';
import {Pagination} from '~ui/results-section/pagination';

import {ResultItem} from './result-item';

type ResultsSectionProps = {
  query: string;
  page: number;
};

export const ResultsSection = async ({ query, page }: ResultsSectionProps) => {
  const { data: results, pagination } = await fetchAnimeData({ query, page });

  // const { toggleSelectedCard } = useStoreActions();
  // const selectedCards = useSelectedCards();

  // const isItemChecked = (id: number) =>
  //   selectedCards.some((card) => card.mal_id === id);

  if (results.length === 0) {
    return <EmptyList />;
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <Loader />
      <div className="flex justify-center gap-4 p-4">
        <ul
          {...withDataTestId('result-list')}
          className={cn(
            'grid w-full justify-items-center gap-6 transition-all duration-300 ease-in-out'
            // outlet
            //   ? 'hidden grid-cols-1 sm:grid lg:grid-cols-2'
            //   : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {results.map((result, i) => (
            <ResultItem
              // isChecked={isItemChecked(result.mal_id)}
              // onCheck={toggleSelectedCard}
              key={result.mal_id + 'and' + i}
              data={result}
            />
          ))}
        </ul>
        {/*<div*/}
        {/*  className={cn(*/}
        {/*    'justify-items-center overflow-hidden transition-all duration-300',*/}
        {/*    outlet ? 'w-[500px] opacity-100' : 'w-0 opacity-0'*/}
        {/*  )}*/}
        {/*>*/}
        {/*  <Outlet />*/}
        {/*</div>*/}
      </div>
      <Pagination pagination={pagination} />
    </section>
  );
};