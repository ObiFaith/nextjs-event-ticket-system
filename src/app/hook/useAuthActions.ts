import { useContext } from "react";
import { AuthActionsContext } from "../context";

export const useAuthActions = () => {
  const actions = useContext(AuthActionsContext);
  if (actions === undefined) {
    throw new Error("useAuthActions must be used within AuthProvider");
  }
  return actions;
};
