export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  startsAt: Date;
  endsAt: Date;
  status: "ACTIVE" | "CANCELLED" | "ENDED";
  // ticketTypes?: Array<TicketTypes>
}

export type AuthActions = {
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
};

export type EventActions = {
  createEvent: (event: Omit<Event, "id" | "status">) => void;
  cancelEvent: (eventId: string) => void;
  getEventById: (id: string) => Event | undefined;
};
