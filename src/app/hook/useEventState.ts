import { useContext } from "react";
import { EventStateContext } from "../context";

export const useEventState = () => {
  const events = useContext(EventStateContext);
  if (!events) {
    throw new Error("useEventState must be used within EventProvider");
  }
  return events;
};
