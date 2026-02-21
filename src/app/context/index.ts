import { createContext } from "react";
import { AuthActions, Event, EventActions, User } from "./type";

export const AuthStateContext = createContext<User | null | undefined>(
  undefined,
);

export const AuthActionsContext = createContext<AuthActions | undefined>(
  undefined,
);

export const EventStateContext = createContext<Array<Event> | null | undefined>(
  undefined,
);

export const EventActionsContext = createContext<EventActions | undefined>(
  undefined,
);
