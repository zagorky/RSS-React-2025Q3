import { withDataTestId } from '~lib/utilities';

export const Loader = ({ isLoading }: { isLoading?: boolean }) => {
  return (
    isLoading && (
      <div className="loader-overlay">
        <div {...withDataTestId('loader')} className="loader-container">
          <div className="loader-spinner"></div>
          <span className="loader-text">Loading...</span>
        </div>
      </div>
    )
  );
};
