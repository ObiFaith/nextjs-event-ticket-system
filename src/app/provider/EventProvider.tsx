import { useState } from "react";
import { Event } from "../context/type";
import { mockEvents } from "./constant";
import { EventContext } from "../context";

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const createEvent = (event: Omit<Event, "id" | "status">) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      status: "ACTIVE",
    };
    setEvents([...events, newEvent]);
  };

  const cancelEvent = (eventId: string) => {
    setEvents(
      events.map(e => (e.id === eventId ? { ...e, status: "CANCELLED" } : e)),
    );
  };

  const getEventById = (id: string) => {
    return events.find(e => e.id === id);
  };

  return (
    <EventContext.Provider
      value={{ events, createEvent, cancelEvent, getEventById }}
    >
      {children}
    </EventContext.Provider>
  );
};
