import axios from "axios";
import { toast } from "sonner";
import { SignupData, User } from "../context/type";
import { apiUrl, getErrorMessage } from "../../utils";
import { AuthActionsContext, AuthStateContext } from "../context";
import { useCallback, useEffect, useMemo, useState } from "react";

const TOKEN_KEY = "auth_token";

const handleAuth = async (endpoint: string, body: any) => {
  try {
    const { data } = await axios.post(`${apiUrl}/auth/${endpoint}`, body);
    localStorage.setItem(TOKEN_KEY, data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    return data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    toast.error(errorMessage || `${endpoint} failed`);
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .get<{ user: User }>(`${apiUrl}/auth/me`)
      .then(({ data }) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        delete axios.defaults.headers.common["Authorization"];
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user, message } = await handleAuth("login", { email, password });
    setUser(user);
    return message;
  }, []);

  const signup = useCallback(async (signupData: SignupData) => {
    const { user, message } = await handleAuth("signup", signupData);
    setUser(user);
    return message;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  }, []);

  const state = useMemo(() => ({ user, loading }), [user, loading]);

  const actions = useMemo(
    () => ({ login, signup, logout }),
    [login, signup, logout],
  );

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionsContext.Provider value={actions}>
        {children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
};
