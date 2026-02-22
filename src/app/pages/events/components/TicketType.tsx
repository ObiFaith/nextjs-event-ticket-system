import { toast } from "sonner";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { getTicketStatus, getTicketStatusColor } from "../../../../utils";
import {
  TicketType as TicketTypeInterface,
  useApp,
} from "../../../context/AppContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
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

export const TicketType = ({
  ticketType,
}: {
  ticketType: TicketTypeInterface;
}) => {
  const { deleteTicketType } = useApp();

  const handleDeleteTicket = (ticketId: string) => {
    deleteTicketType(ticketId);
    toast.success("Ticket type deleted successfully");
  };

  const status = getTicketStatus(ticketType);
  const available = ticketType.totalQuantity - ticketType.reservedQuantity;

  return (
    <Card key={ticketType.id} className="shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <CardTitle>{ticketType.name}</CardTitle>
              <Badge
                className={getTicketStatusColor(status)}
                variant="secondary"
              >
                {status}
              </Badge>
            </div>
            <CardDescription>
              {available} of {ticketType.totalQuantity} tickets available
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete ticket type?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this ticket type. This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteTicket(ticketType.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Sale Start:</span>
            <p className="font-medium">
              {format(ticketType.saleStartsAt, "MMM d, yyyy h:mm a")}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Sale End:</span>
            <p className="font-medium">
              {format(ticketType.saleEndsAt, "MMM d, yyyy h:mm a")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
