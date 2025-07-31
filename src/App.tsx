import { ThemeProvider } from '~components/theme-switcher/components/theme-provider';
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
