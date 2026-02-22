import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useEventActions } from "../../../hook";
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

const CancelEventModal = ({ eventId }: { eventId: string }) => {
  const navigate = useNavigate();
  const { cancelEvent } = useEventActions();

  const handleCancelEvent = () => {
    cancelEvent(eventId);
    toast.success("Event cancelled successfully");
    navigate("/dashboard");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Cancel Event</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will cancel the event and all ticket sales. This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, keep event</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancelEvent}>
            Yes, cancel event
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelEventModal;
