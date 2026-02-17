import { User } from "../context/type";
import { AuthContext } from "../context";
import { useMemo, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Mock login
    setUser({
      id: "1",
      name: "John Doe",
      email: email,
    });
  };

  const signup = (name: string, email: string, password: string) => {
    // Mock signup
    setUser({
      id: "1",
      name: name,
      email: email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, signup, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
