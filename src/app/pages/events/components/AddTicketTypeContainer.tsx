import { toast } from "sonner";
import { useParams } from "react-router";
import { parseDateTime } from "../../../../utils";
import { useApp } from "../../../context/AppContext";
import { AddTicketTypePresenter } from "./AddTicketTypePresenter";
import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";

const initialTicketTypeValue = {
  ticketName: "",
  quantity: "",
  saleStartDate: "",
  saleEndDate: "",
  saleStartTime: "",
  saleEndTime: "",
};

const AddTicketTypeContainer = ({
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

  const handleAddTicket = useCallback(() => {
    const emptyField = Object.values(ticketType).some(value => !value);
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
      name: ticketType.ticketName,
      totalQuantity: Number(ticketType.quantity),
      saleStartsAt,
      saleEndsAt,
    });

    toast.success("Ticket type added successfully!");
    setIsAddTicketOpen(false);
    setTicketType(initialTicketTypeValue);
  }, [addTicketType, eventId, ticketType, setIsAddTicketOpen]);

  return (
    <AddTicketTypePresenter
      onChange={handleForm}
      ticketType={ticketType}
      onSaveTicket={handleAddTicket}
      isAddTicketOpen={isAddTicketOpen}
      setIsAddTicketOpen={setIsAddTicketOpen}
    />
  );
};

export default memo(AddTicketTypeContainer);
