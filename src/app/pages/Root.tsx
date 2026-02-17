import { Outlet } from 'react-router';
import { AppProvider } from '../context/AppContext';
import { Toaster } from '../components/ui/sonner';

export const Root = () => {
  return (
    <AppProvider>
      <Outlet />
      <Toaster />
    </AppProvider>
  );
};
