import { Event } from "../context/type";
import { mockEvents } from "./constant";
import { useCallback, useMemo, useState } from "react";
import { EventActionsContext, EventStateContext } from "../context";

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Array<Event>>(mockEvents);

  const createEvent = useCallback((event: Omit<Event, "id" | "status">) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      status: "ACTIVE",
    };
    setEvents([...events, newEvent]);
  }, []);

  const cancelEvent = useCallback((eventId: string) => {
    setEvents(
      events.map(e => (e.id === eventId ? { ...e, status: "CANCELLED" } : e)),
    );
  }, []);

  const getEventById = useCallback(
    (id: string) => {
      return events.find(e => e.id === id);
    },
    [events],
  );

  const actions = useMemo(
    () => ({ createEvent, cancelEvent, getEventById }),
    [createEvent, cancelEvent, getEventById],
  );

  return (
    <EventStateContext.Provider value={events}>
      <EventActionsContext.Provider value={actions}>
        {children}
      </EventActionsContext.Provider>
    </EventStateContext.Provider>
  );
};
