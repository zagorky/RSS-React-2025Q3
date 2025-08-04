import { withDataTestId } from '~utils/utilities';
import { useNavigation } from 'react-router';

export const Loader = ({ isLoading }: { isLoading?: boolean }) => {
  const isVisible = useNavigation().state === 'loading' || isLoading;

  return (
    isVisible && (
      <div className="loader-overlay">
        <div {...withDataTestId('loader')} className="loader-container">
          <div className="loader-spinner"></div>
          <span className="loader-text">Loading...</span>
        </div>
      </div>
    )
  );
};