import { useContext } from "react";
import { EventContext } from "../context";

export const useEvent = () => {
  const ctx = useContext(EventContext);
  if (!ctx) {
    throw new Error("useEvent must be used within EventProvider");
  }
  return ctx;
};
