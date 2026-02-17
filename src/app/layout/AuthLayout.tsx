import { Outlet } from "react-router";
import AuthProvider from "../provider/AuthProvider";

export const AuthLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);
