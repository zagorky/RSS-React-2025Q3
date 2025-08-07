import { useIsFetching } from '@tanstack/react-query';
import { withDataTestId } from '~utils/utilities';
import { useNavigation } from 'react-router';

export const Loader = ({ isLoading }: { isLoading?: boolean }) => {
  const isFetching = useIsFetching() > 0;

  const isVisible =
    useNavigation().state === 'loading' || isFetching || isLoading;

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
