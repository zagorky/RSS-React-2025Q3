import { withDataTestId } from '~lib/utilities';
import { getTranslations } from 'next-intl/server';

export const Loader = async () => {
  const t = await getTranslations('Loader');
  return (
    <div className="loader-overlay">
      <div {...withDataTestId('loader')} className="loader-container">
        <div className="loader-spinner"></div>
        <span className="loader-text">{t('loading')}</span>
      </div>
    </div>
  );
};
