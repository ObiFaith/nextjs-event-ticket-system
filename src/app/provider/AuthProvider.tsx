import { User } from "../context/type";
import { useCallback, useMemo, useState } from "react";
import { AuthActionsContext, AuthStateContext } from "../context";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, password: string) => {
    // Mock login
    setUser({
      id: "1",
      name: "John Doe",
      email: email,
    });
  }, []);

  const signup = useCallback(
    (name: string, email: string, password: string) => {
      // Mock signup
      setUser({
        id: "1",
        name: name,
        email: email,
      });
    },
    [],
  );

  const logout = useCallback(() => setUser(null), []);

  const actions = useMemo(
    () => ({ login, signup, logout }),
    [login, signup, logout],
  );

  return (
    <AuthStateContext.Provider value={user}>
      <AuthActionsContext.Provider value={actions}>
        {children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
};
