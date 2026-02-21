import { useContext } from "react";
import { AuthStateContext } from "../context";

export const useAuthState = () => {
  const user = useContext(AuthStateContext);
  if (!user) {
    throw new Error("useAuthState must be used within AuthProvider");
  }
  return user;
};
