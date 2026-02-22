import { toast } from "sonner";
import { useParams } from "react-router";
import { TicketTypeForm } from "../../../form";
import { parseDateTime } from "../../../../utils";
import { initialTicketTypeValue } from "../constant";
import { useApp } from "../../../context/AppContext";
import { Button } from "../../../components/ui/button";
import { FormInput } from "../../../components/common/FormInput";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

const AddTicketType = ({
  isAddTicketOpen,
  setIsAddTicketOpen,
}: {
  isAddTicketOpen: boolean;
  setIsAddTicketOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { addTicketType } = useApp();
  const { eventId } = useParams<{ eventId: string }>();
  const [ticketType, setTicketType] = useState(initialTicketTypeValue);

  const handleForm = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setTicketType(prev => ({ ...prev, [field]: e.target.value }));
    },
    [],
  );

  const handleAddTicket = () => {
    const emptyField = Object.entries(ticketType).find(([_, value]) => !value);
    if (emptyField) {
      toast.error("Please fill in all fields");
      return;
    }

    const { saleStartDate, saleStartTime, saleEndDate, saleEndTime } =
      ticketType;

    const saleStartsAt = parseDateTime(saleStartDate, saleStartTime);
    const saleEndsAt = parseDateTime(saleEndDate, saleEndTime);

    if (saleEndsAt <= saleStartsAt) {
      toast.error("End sale date must be after start sale date");
      return;
    }

    addTicketType({
      eventId: eventId!,
      name: ticketType.name,
      totalQuantity: parseInt(ticketType.quantity),
      saleStartsAt,
      saleEndsAt,
    });

    toast.success("Ticket type added successfully!");
    setIsAddTicketOpen(false);
    setTicketType(initialTicketTypeValue);
  };

  return (
    <Dialog open={isAddTicketOpen} onOpenChange={setIsAddTicketOpen}>
      <DialogTrigger asChild>
        <Button>Add Ticket Type</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Ticket Type</DialogTitle>
          <DialogDescription>
            Create a new ticket type for this event
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 grid md:grid-cols-2 gap-x-2 md:gap-x-4">
          {TicketTypeForm.map(item => (
            <FormInput
              id={item.id}
              key={item.id}
              type={item.type}
              label={item.label}
              onChange={handleForm(item.id)}
              placeholder={item.placeholder}
              className={
                item.id === "ticketName" || item.id === "quantity"
                  ? "col-span-2"
                  : ""
              }
              value={ticketType[item.id as keyof typeof ticketType]}
            />
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddTicketOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddTicket}>Save Ticket</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTicketType;
