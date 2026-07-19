"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "./api";

export type User = {
  id: string;
  email: string;
  plan: "free" | "premium";
  role?: "user" | "admin";
  planExpiresAt?: string | null;
};

export type Character = {
  id: string;
  displayName: string;
  avatarKey: string;
  globalXp: number;
  globalLevel: number;
  streakDays: number;
  dailyXp?: number;
  dailyXpDate?: string | null;
  dailyGoalXp?: number;
  streakFreezes?: number;
  unlockedAvatars?: string[];
  onboarding?: Record<string, boolean>;
};

type AuthState = {
  user: User | null;
  character: Character | null;
  token: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName: string,
    referralCode?: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  setCharacter: (c: Character | null) => void;
};

const AuthContext = createContext<AuthState | null>(null);
const TOKEN_KEY = "eduforge_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const t = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    setToken(t);
    try {
      const data = await api<{ user: User; character: Character }>("/auth/me", {
        token: t,
      });
      setUser(data.user);
      setCharacter(data.character);
    } catch {
      setUser(null);
      setCharacter(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const data = await api<{ user: User; character: Character; token: string }>(
      "/auth/login",
      { method: "POST", body: { email, password } },
    );
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    setCharacter(data.character);
  }, []);

  const register = useCallback(
    async (email: string, password: string, displayName: string, referralCode?: string) => {
      const data = await api<{ user: User; character: Character; token: string }>(
        "/auth/register",
        {
          method: "POST",
          body: {
            email,
            password,
            displayName,
            ...(referralCode ? { referralCode } : {}),
          },
        },
      );
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
      setCharacter(data.character);
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await api("/auth/logout", { method: "POST", token });
    } catch {
      /* ignore */
    }
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    setCharacter(null);
  }, [token]);

  const value = useMemo(
    () => ({
      user,
      character,
      token,
      loading,
      refresh,
      login,
      register,
      logout,
      setCharacter,
    }),
    [user, character, token, loading, refresh, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth outside provider");
  return ctx;
}
