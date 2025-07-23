import { withDataTestId } from '~utils/utilities';

const AboutPage = () => {
  return (
    <section
      {...withDataTestId('about-page-section')}
      className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20"
    >
      <div className="p-8 sm:p-10">
        <h1 className="text-primary-700 hover:text-secondary-600 mb-6 text-3xl font-bold">
          About Me
        </h1>

        <div className="space-y-5 text-lg text-gray-700">
          <p className="leading-relaxed">
            Hi! My name is{' '}
            <span className="text-primary-600 font-semibold">Daria</span> and I
            went crazy at{' '}
            <span className="text-primary-600 font-medium">
              Rolling Scopes School
            </span>
          </p>

          <p>
            This project is part of the{' '}
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium underline-offset-4 transition-colors hover:underline"
            >
              RS School React course
            </a>
          </p>
        </div>

        <div className="mt-8">
          <a
            href="https://github.com/zagorky"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            My GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
