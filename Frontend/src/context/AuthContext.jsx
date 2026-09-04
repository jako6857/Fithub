import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import * as authApi from "../services/auth";
import * as usersApi from "../services/users";

const AuthContext = createContext(null);
const TOKEN_KEY = "fa_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setInitializing(false);
      return;
    }
    authApi
      .verify()
      .then((data) => {
        setUser(data?.user ?? data ?? null);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      })
      .finally(() => setInitializing(false));
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const authData = await authApi.login({ username: email, password });
      localStorage.setItem(TOKEN_KEY, authData.accessToken);
      const verifyData = await authApi.verify();
      const currentUser = verifyData?.user ?? verifyData ?? null;
      setUser(currentUser);
      return currentUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(
    async ({ firstname, lastname, email, password }) => {
      setLoading(true);
      setError(null);
      try {
        await usersApi.createUser({
          name: `${firstname} ${lastname}`.trim(),
          email,
          password,
        });
        const authData = await authApi.login({ username: email, password });
        localStorage.setItem(TOKEN_KEY, authData.accessToken);
        const verifyData = await authApi.verify();
        const currentUser = verifyData?.user ?? verifyData ?? null;
        setUser(currentUser);
        return currentUser;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initializing,
        error,
        login,
        signup,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
