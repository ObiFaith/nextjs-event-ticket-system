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

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
};

export type EventContextType = {
  events: Array<Event>;
  createEvent: (event: Omit<Event, "id" | "status">) => void;
  cancelEvent: (eventId: string) => void;
  getEventById: (id: string) => Event | undefined;
};
