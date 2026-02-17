import { useState } from "react";
import { User } from "../context/type";
import { AuthContext } from "../context";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
