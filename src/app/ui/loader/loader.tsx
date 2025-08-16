import { withDataTestId } from '~lib/utilities';
import { useTranslations } from 'next-intl';

export const Loader = () => {
  const t = useTranslations('Loader');
  return (
    <div className="loader-overlay">
      <div {...withDataTestId('loader')} className="loader-container">
        <div className="loader-spinner"></div>
        <span className="loader-text">{t('loading')}</span>
      </div>
    </div>
  );
};