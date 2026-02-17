import { Event } from "../context/type";

export const mockEvents: Array<Event> = [
  {
    id: "1",
    title: "Tech Conference 2026",
    description:
      "Annual technology conference featuring industry leaders and innovative talks.",
    startsAt: new Date("2026-03-15T09:00:00"),
    endsAt: new Date("2026-03-17T18:00:00"),
    status: "ACTIVE",
  },
  {
    id: "2",
    title: "Summer Music Festival",
    description:
      "Three days of live music performances from top artists around the world.",
    startsAt: new Date("2026-07-20T14:00:00"),
    endsAt: new Date("2026-07-22T23:00:00"),
    status: "ACTIVE",
  },
];
