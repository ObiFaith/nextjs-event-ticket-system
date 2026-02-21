import { EventCard } from "..";
import { Event } from "../../../context/type";

export const EventList = ({ events }: { events: Array<Event> }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
