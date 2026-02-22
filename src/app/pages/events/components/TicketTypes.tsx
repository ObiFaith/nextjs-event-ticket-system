import { TicketType } from "./TicketType";
import { TicketType as TicketTypeInterface } from "../../../context/AppContext";

export const TicketTypes = ({
  ticketTypes,
}: {
  ticketTypes: Array<TicketTypeInterface>;
}) => {
  return (
    <div className="space-y-4">
      {ticketTypes.map(ticketType => (
        <TicketType key={ticketType.id} ticketType={ticketType} />
      ))}
    </div>
  );
};
