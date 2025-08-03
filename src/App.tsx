import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '~components/theme-switcher/theme-provider';
import { router } from '~pages/app-router';
import { RouterProvider } from 'react-router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;