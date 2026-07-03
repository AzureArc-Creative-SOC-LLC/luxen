"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  apiLogin,
  apiRegister,
  apiVerify,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
  type AuthUser,
} from "@/lib/api";

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  isAuthed: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (input: {
    name: string;
    email: string;
    password: string;
    date_of_birth: string;
    nationality: string;
    country_of_residence: string;
  }) => Promise<AuthUser>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  // Hydrate from storage on mount, then refresh from /verify in the background
  // so a stale token gets cleared. Errors are swallowed — 401 means "log out."
  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setUser(stored);
    setReady(true);

    if (!getToken()) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await apiVerify();
        if (!cancelled) {
          setUser(res.user);
          setStoredUser(res.user);
        }
      } catch {
        if (!cancelled) {
          setToken(null);
          setStoredUser(null);
          setUser(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiLogin(email, password);
    setToken(res.token);
    setStoredUser(res.user);
    setUser(res.user);
    return res.user;
  }, []);

  const register = useCallback(
    async (input: {
      name: string;
      email: string;
      password: string;
      date_of_birth: string;
      nationality: string;
      country_of_residence: string;
    }) => {
      const res = await apiRegister(input);
      setToken(res.token);
      setStoredUser(res.user);
      setUser(res.user);
      return res.user;
    },
    [],
  );

  const logout = useCallback(() => {
    setToken(null);
    setStoredUser(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, ready, isAuthed: !!user, login, register, logout }),
    [user, ready, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
