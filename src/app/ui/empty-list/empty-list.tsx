import { withDataTestId } from '~lib/utilities';
import { useTranslations } from 'next-intl';

export const EmptyList = () => {
  const t = useTranslations('ResultsSection.emptyList');

  return (
    <div {...withDataTestId('empty-list')} className="basic-content-wrapper">
      <h2 className="h2">{t('title')}</h2>
      <p>{t('description')}</p>
    </div>
  );
};
