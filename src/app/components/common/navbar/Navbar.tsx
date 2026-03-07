import { Suspense } from "react";
import { Logo } from "../../Logo";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { ShoppingCart } from "lucide-react";
import { User } from "../../../context/type";
import { getInitials } from "../../../../utils";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { DropdownMenuContent } from "./DropdownMenuContent";
import { useAuthActions, useCartState } from "../../../hook";
import { DropdownMenu, DropdownMenuTrigger } from "../../ui/dropdown-menu";

export const Navbar = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const { cart } = useCartState();
  const { logout } = useAuthActions();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <div className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user
                        ? getInitials(user.firstName + " " + user.lastName)
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <Suspense fallback={<div>Loading...</div>}>
                <DropdownMenuContent
                  user={user}
                  navigate={navigate}
                  onLogout={handleLogout}
                />
              </Suspense>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
