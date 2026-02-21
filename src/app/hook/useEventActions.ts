import { useContext } from "react";
import { EventActionsContext } from "../context";

export const useEventActions = () => {
  const actions = useContext(EventActionsContext);
  if (!actions) {
    throw new Error("useEventActions must be used within EventProvider");
  }
  return actions;
};
