import { Outlet } from "react-router";
import { AppProvider } from "../context/AppContext";

export const Root = () => {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
};
