import { ThemeProvider } from '~components/theme-switcher/theme-provider';
import { router } from '~pages/app-router';
import { RouterProvider } from 'react-router';

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
