import { routing } from '~i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

import LocaleSwitcherSelect from './locale-switcher-select';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {routing.locales.map((current) => (
        <option key={current} value={current}>
          {t('locale', { locale: current })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
