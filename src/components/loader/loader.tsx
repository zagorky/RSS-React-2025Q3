import { withDataTestId } from '~utils/utilities';
import { useNavigation } from 'react-router';

export const Loader = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div {...withDataTestId('loader')} className="loader-container">
        <div className="loader-spinner"></div>
        <span className="loader-text">Loading...</span>
      </div>
    </div>
  );
};
