import type { DataItem } from '~types/types';

import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { ItemImg } from '~components/item-img/item-img';
import { Loader } from '~components/loader/loader';
import { EmptyList } from '~pages/main/components/empty-list/empty-list';
import { Link, useFetcher, useLoaderData, useLocation } from 'react-router';

type LoaderDataType = {
  data: DataItem;
  error: string | null;
};

const DetailedPage = () => {
  const { data, error } = useLoaderData<LoaderDataType>();
  const fetcher = useFetcher<LoaderDataType>();
  const location = useLocation();

  if (error) {
    return <ErrorFallback error={error} />;
  }
  if (fetcher.state === 'loading') {
    return <Loader />;
  }

  if (!data) {
    return <EmptyList />;
  }

  const title = data.title;
  const type = data.type;
  const genres = data.genres;
  const status = data.airing ? 'Ongoing' : 'Released';
  const score = data.score;
  const synopsis = data.synopsis;

  return (
    <section className="w-full max-w-[350px]">
      <div className="space-y-6 rounded-2xl border p-6 shadow-md">
        <div className="flex items-center justify-between gap-2">
          <Link to={`..${location.search}`} relative="path">
            ❌
          </Link>
          <h2 className="text-xl leading-tight font-bold">{title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-base leading-relaxed sm:grid-cols-2">
          <div>
            <div className="mb-1 font-semibold">Type</div>
            <div className="rounded-lg border px-3 py-2">
              {type.toUpperCase()}
            </div>
          </div>

          <div>
            <div className="mb-1 font-semibold">Status</div>
            <div className="rounded-lg border px-3 py-2">{status}</div>
          </div>

          <div>
            <div className="mb-1 font-semibold">Score</div>
            <div className="rounded-lg border px-3 py-2">{score}</div>
          </div>

          <div className="sm:col-span-2">
            <div className="mb-1 font-semibold">Genres</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {genres.map((genre, i) => (
                <span
                  key={`${genre.mal_id}-${i}`}
                  className="rounded-full border px-3 py-1 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <ItemImg data={data} />
        </div>
        <p>{synopsis}</p>
      </div>
    </section>
  );
};

export default DetailedPage;