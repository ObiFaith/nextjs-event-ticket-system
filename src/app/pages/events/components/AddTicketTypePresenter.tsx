import { TicketType } from "../type";
import { TicketTypeForm } from "../../../form";
import { Button } from "../../../components/ui/button";
import { FormInput } from "../../../components/common/FormInput";
import { ChangeEvent, Dispatch, memo, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

export const AddTicketTypePresenter = memo(
  ({
    onChange,
    ticketType,
    onSaveTicket,
    isAddTicketOpen,
    setIsAddTicketOpen,
  }: {
    ticketType: TicketType;
    isAddTicketOpen: boolean;
    onSaveTicket: () => void;
    setIsAddTicketOpen: Dispatch<SetStateAction<boolean>>;
    onChange: (
      field: string,
    ) => (e: ChangeEvent<HTMLInputElement, Element>) => void;
  }) => {
    return (
      <Dialog open={isAddTicketOpen} onOpenChange={setIsAddTicketOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Add Ticket Type</Button>
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
                onChange={onChange(item.id)}
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
          <DialogFooter className="*:cursor-pointer">
            <Button variant="outline" onClick={() => setIsAddTicketOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onSaveTicket}>Save Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);
