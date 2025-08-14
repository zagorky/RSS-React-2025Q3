'use client';
import { useCSV } from '~hooks/useCSV';
import { withDataTestId } from '~lib/utilities';
import { Button } from '~ui/button/button';
import { useTranslations } from 'next-intl';

import {
  useSelectedCards,
  useStoreActions,
} from '../../../store/selected-cards-store';

export const Flyout = () => {
  const selectedCards = useSelectedCards();
  const { cleanSelectedCards } = useStoreActions();
  const { linkReference, downloadCSV } = useCSV(selectedCards);
  const t = useTranslations('Flyout');

  return (
    selectedCards.length > 0 && (
      <div
        {...withDataTestId('flyout')}
        className="bg-bg border-border-primary text-text-primary mt-2rounded-xl fixed bottom-6 left-6 rounded-xl border-3 p-2"
      >
        <h3 className="result-item-title text-center">
          {t('selectedCards', { count: selectedCards.length })}
        </h3>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={downloadCSV}
            classNames="cursor-pointer"
          >
            <a ref={linkReference} className="hidden">
              {t('download')}
            </a>
            {t('download')}
          </Button>
          <Button
            onClick={cleanSelectedCards}
            variant="outline"
            classNames="cursor-pointer"
          >
            {t('unselectAll')}
          </Button>
        </div>
      </div>
    )
  );
};
