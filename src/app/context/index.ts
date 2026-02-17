import { createContext } from "react";
import { AuthContextType, EventContextType } from "./type";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const EventContext = createContext<EventContextType | undefined>(undefined);

export { AuthContext, EventContext };
