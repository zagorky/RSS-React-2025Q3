'use client';
import { withDataTestId } from '~lib/utilities';
import { Button } from '~ui/button/button';
import { useTranslations } from 'next-intl';

export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  const t = useTranslations('ErrorPages.error');

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
        <h1 className="text-error text-6xl">
          {t('heading', { errorName: error.name })}
        </h1>

        <div className="mb-6 rounded-lg p-4">
          <p className="text-text-secondary text-lg">
            {t('message', { errorMessage: error.message })}
          </p>
        </div>
        <div>
          <Button
            onClick={() => reset()}
            classNames="m-4"
            dataTestId={'error-fallback-button'}
          >
            {t('tryAgain')}
          </Button>
        </div>
      </div>
    </main>
  );
}
