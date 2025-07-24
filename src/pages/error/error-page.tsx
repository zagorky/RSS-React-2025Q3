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
      <div className="mb-6 flex justify-center">
        <div className="bg-error/10 text-error flex h-16 w-16 items-center justify-center rounded-full text-4xl font-bold">
          !
        </div>
      </div>
      <h1 className="text-error text-6xl">{errorName}</h1>

      <div className="mb-6 rounded-lg p-4">
        <p className="text-text-secondary text-lg">{errorMessage}</p>
      </div>
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
