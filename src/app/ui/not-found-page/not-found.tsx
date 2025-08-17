import { Link } from '~i18n/navigation';
import { withDataTestId } from '~lib/utilities';
import { getTranslations } from 'next-intl/server';

const NotFoundPage = async () => {
  const t = await getTranslations('ErrorPages.notFound');

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div
        {...withDataTestId('error-fallback')}
        className="m-auto flex h-[calc(100vh-200px)] max-w-xl flex-col items-center justify-center gap-10"
      >
        <div className="mb-6 flex justify-center">
          <div className="bg-error/10 text-error flex h-16 w-16 items-center justify-center rounded-full text-4xl font-bold">
            !
          </div>
        </div>
        <h1 className="text-error text-center text-6xl">{t('title')}</h1>

        <div className="mb-6 rounded-lg p-4">
          <p className="text-text-secondary text-lg">{t('message')}</p>
        </div>
        <div>
          <Link href={'/'} className="btn m-4">
            {t('goHome')}
          </Link>
        </div>
      </div>
    </main>
  );
};
export default NotFoundPage;