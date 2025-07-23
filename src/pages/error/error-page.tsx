import { Button } from '~components/button/button';
import { withDataTestId } from '~utils/utilities';
import { Link, useRouteError } from 'react-router';

const ErrorPage = () => {
  const error = useRouteError();
  const errorName = error instanceof Error ? error.name : '404: Page Not Found';
  const errorMessage =
    error instanceof Error ? error.message : 'Something went wrong';

  return (
    <div
      {...withDataTestId('error-fallback')}
      className="m-auto flex h-[calc(100vh-200px)] max-w-xl flex-col items-center justify-center gap-10"
    >
      <h1 className="text-6xl text-[var(--color-error)]">{errorName}</h1>
      <h2>{errorMessage}</h2>
      <div>
        <Button classNames="m-4" dataTestId={'error-fallback-button'}>
          <Link className="p-4" to=".." relative="path">
            Go back
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;