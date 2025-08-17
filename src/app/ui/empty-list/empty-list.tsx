import { withDataTestId } from '~lib/utilities';
import { getTranslations } from 'next-intl/server';

export const EmptyList = async () => {
  const t = await getTranslations('ResultsSection.emptyList');

  return (
    <div {...withDataTestId('empty-list')} className="basic-content-wrapper">
      <h2 className="h2">{t('title')}</h2>
      <p>{t('description')}</p>
    </div>
  );
};
