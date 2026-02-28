import axios from "axios";
import { User } from "../context/type";
import { useCallback, useMemo, useState } from "react";
import { AuthActionsContext, AuthStateContext } from "../context";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await axios.post(`${apiUrl}/auth/login`, {
      email,
      password,
    });
    setUser(data.user);
    return data.message;
  }, []);

  const signup = useCallback(
    async (
      lastName: string,
      firstName: string,
      email: string,
      password: string,
    ) => {
      const { data } = await axios.post(`${apiUrl}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      });
      setUser(data.user);
      return data.message;
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
