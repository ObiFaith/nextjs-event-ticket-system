import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useApp } from "../../../context/AppContext";
import { Button } from "../../../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";

const DeleteTicketType = ({ ticketTypeId }: { ticketTypeId: string }) => {
  const { deleteTicketType } = useApp();

  const handleDeleteTicket = () => {
    deleteTicketType(ticketTypeId);
    toast.success("Ticket type deleted successfully");
  };

  return (
    <div className="flex gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="cursor-pointer" variant="ghost" size="icon">
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete ticket type?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this ticket type. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="*:cursor-pointer">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTicket}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteTicketType;
