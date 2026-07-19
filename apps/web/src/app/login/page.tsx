"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch {
      setError("Невірний email або пароль");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md card">
      <h1 className="text-2xl font-black">{UI.auth.loginTitle}</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
        {error && <p className="text-sm font-bold text-red-500">{error}</p>}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {UI.auth.submitLogin}
        </button>
      </form>
      <p className="mt-3 text-center text-sm">
        <Link href="/forgot-password" className="font-bold text-sky">
          {UI.password.forgot}
        </Link>
      </p>
      <p className="mt-2 text-center text-sm text-ink-muted">
        {UI.auth.noAccount}{" "}
        <Link href="/register" className="font-bold text-sky">
          {UI.nav.register}
        </Link>
      </p>
    </div>
  );
}
