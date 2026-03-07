import { useAuthState } from "../hook";
import { CartProvider } from "../provider";
import { Navigate, Outlet } from "react-router";
import { Navbar } from "../components/common/navbar";
import { Spinner } from "../components/common/loading";

export const DashboardLayout = () => {
  const { user, loading } = useAuthState();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <CartProvider>
        <Navbar user={user} />
      </CartProvider>
      <Outlet />
    </div>
  );
};
