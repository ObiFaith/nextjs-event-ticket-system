import { Ticket } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary p-2 rounded-lg">
        <Ticket className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="text-2xl font-semibold text-foreground">EventTix</span>
    </div>
  );
};
