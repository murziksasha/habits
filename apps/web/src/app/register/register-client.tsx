"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { postRegisterPath, safeNextPath, UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { API_URL } from "@/lib/api";
import { isFriendInviteId, sendFriendInvite } from "@/lib/friend-invite";

function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const friendId = params.get("friend");
  const intent = params.get("intent");
  const nextPath = params.get("next");
  const hasFriendInvite = isFriendInviteId(friendId);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [referralCode, setReferralCode] = useState(params.get("ref") ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleOn, setGoogleOn] = useState(false);

  useEffect(() => {
    void fetch(`${API_URL}/auth/oauth/providers`)
      .then((r) => r.json())
      .then((d: { google?: boolean }) => setGoogleOn(Boolean(d.google)))
      .catch(() => setGoogleOn(false));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(email, password, displayName, referralCode || undefined);
      if (hasFriendInvite && friendId) {
        await sendFriendInvite(friendId);
      }
      // Explicit ?next= wins; else intent / learn
      if (nextPath) {
        router.push(safeNextPath(nextPath, postRegisterPath({ intent })));
      } else {
        router.push(
          postRegisterPath({
            hasFriendInvite,
            intent,
          }),
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "error";
      setError(msg === "email_taken" ? "Цей email вже зайнятий" : "Помилка реєстрації");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md card">
      <h1 className="text-2xl font-black">{UI.auth.registerTitle}</h1>
      {hasFriendInvite && (
        <p className="mt-2 rounded-xl bg-brand-soft/40 px-3 py-2 text-sm font-bold text-ink">
          👥 Friend invite — after sign-up we will send a friend request.
        </p>
      )}
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="label">{UI.auth.displayName}</label>
          <input
            className="input"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            minLength={2}
            required
          />
        </div>
        <div>
          <label className="label">{UI.auth.email}</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">{UI.auth.password}</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            autoComplete="new-password"
            pattern="(?=.*[A-Za-zА-Яа-яІіЇїЄє])(?=.*\d).{8,}"
            title="Min 8 chars, at least one letter and one digit"
          />
          <p className="mt-1 text-xs font-bold text-ink-muted">
            Min 8 · letter + digit · мін. 8 · літера + цифра
          </p>
        </div>
        <div>
          <label className="label">Referral code (optional)</label>
          <input
            className="input font-mono uppercase"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-sm font-bold text-red-500" role="alert" aria-live="assertive">
            {error}
          </p>
        )}
        <button type="submit" className="btn-primary w-full min-h-11" disabled={loading}>
          {UI.auth.submitRegister}
        </button>
      </form>
      {googleOn && (
        <a
          href={`${API_URL}/auth/oauth/google/start?next=${encodeURIComponent(
            postRegisterPath({ intent }),
          )}`}
          className="btn-secondary mt-3 flex w-full items-center justify-center gap-2"
        >
          <span aria-hidden>G</span> Continue with Google
        </a>
      )}
      <p className="mt-4 text-center text-sm text-ink-muted">
        {UI.auth.hasAccount}{" "}
        <Link
          href={hasFriendInvite && friendId ? `/login?friend=${friendId}` : "/login"}
          className="font-bold text-sky"
        >
          {UI.nav.login}
        </Link>
      </p>
    </div>
  );
}

export function RegisterClient() {
  return (
    <Suspense fallback={<p>{UI.common.loading}</p>}>
      <RegisterForm />
    </Suspense>
  );
}
