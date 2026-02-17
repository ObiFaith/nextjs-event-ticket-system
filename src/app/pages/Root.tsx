import { Outlet } from "react-router";
import { AuthProvider } from "../provider";
import { Toaster } from "../components/ui/sonner";
import { AppProvider } from "../context/AppContext";

export const Root = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <Outlet />
        <Toaster />
      </AuthProvider>
    </AppProvider>
  );
};
