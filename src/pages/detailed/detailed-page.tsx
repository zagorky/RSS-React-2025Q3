import type { DataItem } from '~types/types';

import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { ItemImg } from '~components/item-img/item-img';
import { withDataTestId } from '~utils/utilities';
import { Link, useLoaderData, useLocation } from 'react-router';

type LoaderDataType = {
  data: DataItem;
  error: string | null;
};

const DetailedPage = () => {
  const { data, error } = useLoaderData<LoaderDataType>();
  const location = useLocation();

  if (error) {
    return <ErrorFallback error={error} />;
  }

  const { title, score, type, genres, synopsis } = data;

  const status = data.airing ? 'Ongoing' : 'Released';

  return (
    <section className="relative z-20 w-full max-w-[350px]">
      <Link
        to={`..${location.search}`}
        type="button"
        className="fixed inset-0 z-10 cursor-pointer bg-gray-900/50 backdrop-blur-xs backdrop-filter"
      />
      <button
        type="button"
        className="border-border-dark hover:border-primary-700 relative z-20 w-full max-w-[350px] space-y-6 rounded-2xl border-4 bg-white p-6 shadow-md"
      >
        <div className="flex items-center justify-between gap-2">
          <Link
            to={`..${location.search}`}
            type="button"
            className="cursor-pointer"
          >
            ❌
          </Link>
          <h2 className="result-item-title">{title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-4 leading-relaxed sm:grid-cols-2">
          <div>
            <div className="mb-1 font-semibold">Type</div>
            <div
              {...withDataTestId('detailed-type')}
              className="text-text-on-primary rounded-md bg-gray-400/80 px-2 py-1"
            >
              {type.toUpperCase()}
            </div>
          </div>

          <div>
            <div className="mb-1 font-semibold">Status</div>
            <div
              {...withDataTestId('detailed-status')}
              className="bg-accent-500/80 text-text-on-primary rounded-md px-2 py-1"
            >
              {status}
            </div>
          </div>

          <div>
            <div className="mb-1 font-semibold">Score</div>
            <div
              {...withDataTestId('detailed-score')}
              className="bg-warning/80 text-text-on-primary rounded-md px-2 py-1"
            >
              {score ?? <span>No info</span>}
            </div>
          </div>

          <div className="sm:col-span-2">
            <div className="mb-1 font-semibold">Genres</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {genres.map((genre, i) => (
                <span
                  {...withDataTestId('detailed-genres')}
                  key={`${genre.mal_id}-${i}`}
                  className="bg-primary-500 text-text-on-primary rounded-md px-2 py-1 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div {...withDataTestId('detailed-img')} className="pt-4">
          <ItemImg data={data} />
        </div>
        <p {...withDataTestId('detailed-synopsis')}>{synopsis}</p>
      </button>
    </section>
  );
};

export default DetailedPage;
