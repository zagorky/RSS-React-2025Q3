import { InfoBadge } from '~components/info-badge/info-badge';
import { ItemImg } from '~components/item-img/item-img';
import { RefreshQueryButton } from '~components/refresh-query-button/refresh-query-button';
import { useDetailedPageQuery } from '~hooks/useDetailedPageQuery';
import { cn } from '~utils/cn';
import { withDataTestId } from '~utils/utilities';
import { XIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router';

const DetailedPage = () => {
  const location = useLocation();
  const data = useDetailedPageQuery();

  return (
    <section className="relative z-20 w-full max-w-[350px]">
      <Link
        to={`..${location.search}`}
        type="button"
        className="loader-overlay cursor-pointer"
      />
      <button
        data-name="detailed-page"
        type="button"
        className="detailed-page-container"
      >
        <div className="flex items-center justify-between gap-2">
          <Link
            to={`..${location.search}`}
            type="button"
            className="btn-outline cursor-pointer"
          >
            <XIcon className="text-error h-4.5" />
            <span className="sr-only">close</span>
          </Link>
          <RefreshQueryButton />
        </div>
        <h2 className={cn('result-item-title', 'line-clamp-3')}>
          {data.title}
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 leading-relaxed sm:grid-cols-2">
          <InfoBadge
            name={'Type'}
            data={data.type}
            color={'bg-gray-400/80'}
            testId={'detailed-type'}
          />
          <InfoBadge
            data={data.airing ? 'Ongoing' : 'Released'}
            name={'Status'}
            testId={'detailed-status'}
            color={'bg-info/80'}
          />

          <InfoBadge
            data={data.score ?? <span>No info</span>}
            name={'Score'}
            testId={'detailed-score'}
            color={'bg-warning/80'}
          />

          <div className="sm:col-span-2">
            <div className="mb-1 font-semibold">Genres</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.genres.map((genre, i) => (
                <InfoBadge
                  key={`${genre.mal_id}-${i}`}
                  data={genre.name}
                  testId={'detailed-genres'}
                  color={'bg-primary-500'}
                />
              ))}
            </div>
          </div>
        </div>

        <div {...withDataTestId('detailed-img')} className="pt-4">
          <ItemImg url={data.images.webp.image_url} alt={data.title} />
        </div>

        <p {...withDataTestId('detailed-synopsis')}>{data.synopsis}</p>
      </button>
    </section>
  );
};

export default DetailedPage;
