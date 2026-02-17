import { User } from "../../../context/type";
import { NavigateFunction } from "react-router";
import { LogOut, User as UserIcon } from "lucide-react";
import {
  DropdownMenuContent as DropdownContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu";

export const DropdownMenuContent = ({
  user,
  onLogout,
  navigate,
}: {
  user: User | null;
  onLogout: () => void;
  navigate: NavigateFunction;
}) => {
  return (
    <DropdownContent align="end" className="w-56 z-50">
      <DropdownMenuLabel>
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{user?.name}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user?.email}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => navigate("/dashboard")}>
        <UserIcon className="mr-2 h-4 w-4" />
        <span>My Events</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownContent>
  );
};
