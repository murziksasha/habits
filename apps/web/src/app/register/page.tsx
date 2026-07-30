"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { REGISTER_NOTICE_KEY } from "@/components/email-verify-banner";
import { isFriendInviteId, sendFriendInvite } from "@/lib/friend-invite";

function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const friendId = params.get("friend");
  const hasFriendInvite = isFriendInviteId(friendId);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [referralCode, setReferralCode] = useState(params.get("ref") ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(email, password, displayName, referralCode || undefined);
      try {
        sessionStorage.setItem(REGISTER_NOTICE_KEY, "1");
      } catch {
        /* ignore */
      }
      if (hasFriendInvite && friendId) {
        await sendFriendInvite(friendId);
      }
      router.push(hasFriendInvite ? "/friends" : "/dashboard");
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
          />
        </div>
        <div>
          <label className="label">Referral code (optional)</label>
          <input
            className="input font-mono uppercase"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
        </div>
        {error && <p className="text-sm font-bold text-red-500">{error}</p>}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {UI.auth.submitRegister}
        </button>
      </form>
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

export default function RegisterPage() {
  return (
    <Suspense fallback={<p>{UI.common.loading}</p>}>
      <RegisterForm />
    </Suspense>
  );
}
