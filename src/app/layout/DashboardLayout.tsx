import { Outlet } from "react-router";
import { MobileBottomNav, Navbar } from "../components/common/navbar";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navbar />
      <Outlet />
      <MobileBottomNav />
    </div>
  );
};
