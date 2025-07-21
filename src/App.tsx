import { router } from '~pages/app-router';
import { RouterProvider } from 'react-router';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
