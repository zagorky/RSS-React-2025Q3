import type { DataItem } from '~types/types';

import { cn } from '~lib/cn';
import { withDataTestId } from '~lib/utilities';
import { CloseButton } from '~ui/close-button/close-button';
import { InfoBadge } from '~ui/info-badge/info-badge';
import { ItemImg } from '~ui/item-img/item-img';
import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const DetailedPage = ({ data }: { data: DataItem }) => {
  const {
    title,
    type,
    airing,
    synopsis,
    score,
    genres,
    images: {
      webp: { image_url: url },
    },
  } = data;
  const t = useTranslations('DetailPage');

  return (
    <>
      <CloseButton
        variant="custom"
        classNames="loader-overlay cursor-pointer"
      />
      <div className="detailed-page-container">
        <div className="flex items-center justify-between gap-2">
          <CloseButton variant="outline">
            <XIcon className="text-error h-4.5" />
          </CloseButton>
          {/*<RefreshQueryButton />*/}
        </div>
        <h2 className={cn('result-item-title', 'line-clamp-3')}>{title}</h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 leading-relaxed sm:grid-cols-2">
          <InfoBadge
            name={t('type')}
            data={type}
            color={'bg-gray-400/80'}
            testId={'detailed-type'}
          />
          <InfoBadge
            data={airing ? t('statusOngoing') : t('statusReleased')}
            name={t('status')}
            testId={'detailed-status'}
            color={'bg-info/80'}
          />

          <InfoBadge
            data={score ?? <span>{t('notAvailable')}</span>}
            name={t('score')}
            testId={'detailed-score'}
            color={'bg-warning/80'}
          />

          <div className="sm:col-span-2">
            <div className="mb-1 font-semibold">{t('genres')}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {genres.map((genre, i) => (
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
          <ItemImg url={url} alt={title} />
        </div>

        <p {...withDataTestId('detailed-synopsis')}>{synopsis}</p>
      </div>
    </>
  );
};
