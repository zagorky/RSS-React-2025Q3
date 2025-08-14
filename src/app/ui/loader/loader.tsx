import { withDataTestId } from '~lib/utilities';

export const Loader = () => {
  return (
    <div className="loader-overlay">
      <div {...withDataTestId('loader')} className="loader-container">
        <div className="loader-spinner"></div>
        <span className="loader-text">Loading...</span>
      </div>
    </div>
  );
};