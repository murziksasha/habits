"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api, COOKIE_SESSION, LEGACY_TOKEN_KEY } from "./api";

export type User = {
  id: string;
  email: string;
  plan: "free" | "premium";
  role?: "user" | "admin";
  planExpiresAt?: string | null;
  /** false = needs verification; true / undefined = ok */
  emailVerified?: boolean;
  totpEnabled?: boolean;
  mfaVerified?: boolean;
  mfaEnrollRequired?: boolean;
  mfaRequired?: boolean;
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
  progression?: {
    lastLevelAwarded?: number;
    skillPoints?: number;
    talents?: Record<string, number>;
    unlockedTitles?: string[];
    equippedTitle?: string | null;
    unlockedFrames?: string[];
    equippedFrame?: string | null;
    pathBadges?: string[];
    weekly?: {
      weekKey: string;
      talents: number;
      lessons: number;
      claimed: string[];
    };
  };
};

type AuthState = {
  user: User | null;
  character: Character | null;
  /**
   * Session marker for page `if (!token)` guards.
   * - COOKIE_SESSION when httpOnly cookie is active
   * - legacy Bearer string only during one-shot migration
   * Prefer cookie; do not put secrets in localStorage.
   */
  token: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
  login: (
    email: string,
    password: string,
  ) => Promise<{ mfaRequired?: boolean; mfaToken?: string } | void>;
  completeMfaLogin: (mfaToken: string, code: string) => Promise<void>;
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

function clearLegacyToken() {
  try {
    localStorage.removeItem(LEGACY_TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    // 1) Cookie-first (credentials: include)
    try {
      const data = await api<{ user: User; character: Character }>("/auth/me");
      setUser(data.user);
      setCharacter(data.character);
      setToken(COOKIE_SESSION);
      clearLegacyToken();
      return;
    } catch {
      /* fall through to legacy Bearer */
    }

    // 2) Dual-support: migrate localStorage Bearer → cookie via promote-on-auth
    let legacy: string | null = null;
    try {
      legacy = typeof window !== "undefined" ? localStorage.getItem(LEGACY_TOKEN_KEY) : null;
    } catch {
      legacy = null;
    }
    if (legacy) {
      try {
        const data = await api<{ user: User; character: Character }>("/auth/me", {
          token: legacy,
        });
        setUser(data.user);
        setCharacter(data.character);
        // Server re-issues httpOnly cookie on Bearer success
        setToken(COOKIE_SESSION);
        clearLegacyToken();
        return;
      } catch {
        clearLegacyToken();
      }
    }

    setUser(null);
    setCharacter(null);
    setToken(null);
  }, []);

  useEffect(() => {
    void refresh().finally(() => setLoading(false));
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const data = await api<{
      user: User;
      character?: Character;
      token?: string;
      mfaRequired?: boolean;
      mfaToken?: string;
      mfaEnrollRequired?: boolean;
    }>("/auth/login", { method: "POST", body: { email, password } });
    if (data.mfaRequired && data.mfaToken) {
      return { mfaRequired: true, mfaToken: data.mfaToken };
    }
    // Set-Cookie from API is primary; do not persist Bearer in localStorage
    clearLegacyToken();
    setToken(COOKIE_SESSION);
    setUser(data.user);
    setCharacter(data.character ?? null);
  }, []);

  const completeMfaLogin = useCallback(async (mfaToken: string, code: string) => {
    const data = await api<{ user: User; character: Character; token: string }>(
      "/auth/mfa/totp/verify",
      { method: "POST", body: { mfaToken, code } },
    );
    // Set-Cookie from API is primary; do not persist Bearer in localStorage
    clearLegacyToken();
    setToken(COOKIE_SESSION);
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
      clearLegacyToken();
      setToken(COOKIE_SESSION);
      setUser(data.user);
      setCharacter(data.character);
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      // Cookie session: no Bearer needed
      await api("/auth/logout", { method: "POST", token });
    } catch {
      /* ignore */
    }
    clearLegacyToken();
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
      completeMfaLogin,
      register,
      logout,
      setCharacter,
    }),
    [user, character, token, loading, refresh, login, completeMfaLogin, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth outside provider");
  return ctx;
}
