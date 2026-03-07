import { useContext } from "react";
import { AuthStateContext } from "../context";

export const useAuthState = () => {
  const state = useContext(AuthStateContext);
  if (state === undefined) {
    throw new Error("useAuthState must be used within AuthProvider");
  }
  return state;
};
