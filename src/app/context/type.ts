export interface User {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
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
  login: (email: string, password: string) => Promise<string>;
  signup: (lastName: string, firstName: string, email: string, password: string) => Promise<string>;
  logout: () => void;
};

export type EventActions = {
  createEvent: (event: Omit<Event, "id" | "status">) => void;
  cancelEvent: (eventId: string) => void;
  getEventById: (id: string) => Event | undefined;
};
