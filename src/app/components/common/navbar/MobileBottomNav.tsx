import { Badge } from "../../ui/badge";
import { Link, useLocation } from "react-router";
import { useApp } from "../../../context/AppContext";
import { Home, ShoppingCart, User } from "lucide-react";

export const MobileBottomNav = () => {
  const location = useLocation();
  const { cart } = useApp();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 shadow-lg">
      <div className="flex items-center justify-around h-16 px-4">
        <Link
          to="/dashboard"
          className={`flex flex-col items-center gap-1 flex-1 ${
            isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          to="/cart"
          className={`flex flex-col items-center gap-1 flex-1 relative ${
            isActive("/cart") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
              >
                {cart.length}
              </Badge>
            )}
          </div>
          <span className="text-xs">Cart</span>
        </Link>

        <Link
          to="/dashboard"
          className={`flex flex-col items-center gap-1 flex-1 ${
            isActive("/profile") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
};
