import {Link} from '~i18n/navigation';
import {withDataTestId} from '~lib/utilities';
import {useTranslations} from 'next-intl';

export default function Page() {
  const t = useTranslations('AboutPage');

  return (
    <section
      {...withDataTestId('about-page-section')}
      className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20"
    >
      <div className="p-8 sm:p-10">
        <h1 className="text-primary-700 hover:text-secondary-600 mb-6 text-3xl font-bold">
          {t('title')}
        </h1>

        <div className="space-y-5 text-lg text-gray-700">
          <p className="leading-relaxed">{t('content.introduction')}</p>

          <p>
            {t('content.projectDescription')}{' '}
            <Link
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium underline-offset-4 transition-colors hover:underline"
            >
              {t('content.projectDescriptionLink')}
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="https://github.com/zagorky"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            {t('content.githubButton')}
          </Link>
        </div>
      </div>
    </section>
  );
}