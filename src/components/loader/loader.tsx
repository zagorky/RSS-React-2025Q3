import { withDataTestId } from '~utils/utilities';
import { useNavigation } from 'react-router';

export const Loader = () => {
  return (
    useNavigation().state === 'loading' && (
      <div className="loader-overlay">
        <div {...withDataTestId('loader')} className="loader-container">
          <div className="loader-spinner"></div>
          <span className="loader-text">Loading...</span>
        </div>
      </div>
    )
  );
};
