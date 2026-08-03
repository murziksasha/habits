"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { isFriendInviteId, sendFriendInvite } from "@/lib/friend-invite";

function LoginForm() {
  const { login, completeMfaLogin } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const friendId = params.get("friend");
  const nextPath = params.get("next");
  const hasFriendInvite = isFriendInviteId(friendId);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaToken, setMfaToken] = useState<string | null>(null);
  const [mfaCode, setMfaCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function postLoginRedirect() {
    if (hasFriendInvite && friendId) {
      await sendFriendInvite(friendId);
      router.push("/friends");
      return;
    }
    if (nextPath && nextPath.startsWith("/") && !nextPath.startsWith("//")) {
      router.push(nextPath);
      return;
    }
    router.push("/dashboard");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mfaToken) {
        await completeMfaLogin(mfaToken, mfaCode);
        await postLoginRedirect();
        return;
      }
      const result = await login(email, password);
      if (result?.mfaRequired && result.mfaToken) {
        setMfaToken(result.mfaToken);
        return;
      }
      await postLoginRedirect();
    } catch {
      setError(mfaToken ? "Невірний код 2FA" : "Невірний email або пароль");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md card">
      <h1 className="text-2xl font-black">{UI.auth.loginTitle}</h1>
      {hasFriendInvite && (
        <p className="mt-2 rounded-xl bg-brand-soft/40 px-3 py-2 text-sm font-bold text-ink">
          👥 Friend invite — we will send a request after you sign in.
        </p>
      )}
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {!mfaToken ? (
          <>
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
                required
              />
            </div>
          </>
        ) : (
          <div>
            <label className="label">2FA (TOTP or backup code)</label>
            <input
              className="input font-mono tracking-widest"
              autoComplete="one-time-code"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
              placeholder="123456"
              required
            />
            <p className="mt-1 text-xs text-ink-muted">
              6-digit authenticator code or one-time backup (XXXX-XXXX)
            </p>
          </div>
        )}
        {error && <p className="text-sm font-bold text-red-500">{error}</p>}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {mfaToken ? "Підтвердити 2FA" : UI.auth.submitLogin}
        </button>
      </form>
      <p className="mt-3 text-center text-sm">
        <Link href="/forgot-password" className="font-bold text-sky">
          {UI.password.forgot}
        </Link>
      </p>
      <p className="mt-2 text-center text-sm text-ink-muted">
        {UI.auth.noAccount}{" "}
        <Link
          href={hasFriendInvite && friendId ? `/register?friend=${friendId}` : "/register"}
          className="font-bold text-sky"
        >
          {UI.nav.register}
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<p>{UI.common.loading}</p>}>
      <LoginForm />
    </Suspense>
  );
}
