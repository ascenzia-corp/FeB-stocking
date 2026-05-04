"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

function CelticCross() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-12 h-12 text-burgundy"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="16" y1="3" x2="16" y2="29" />
      <line x1="6" y1="13" x2="26" y2="13" />
      <circle cx="16" cy="13" r="5" />
    </svg>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });
    setLoading(false);
    if (res?.error) {
      setError("Identifiants invalides ou compte inactif");
      return;
    }
    if (res?.ok) {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card max-w-md w-full p-8">
        <div className="flex flex-col items-center mb-6">
          <CelticCross />
          <h1 className="font-serif text-2xl mt-3 text-ink">Feiz e Breizh</h1>
          <p className="text-sm text-ink/60 uppercase tracking-wider">
            Inventaire Matériel
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="label" htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              required
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error && (
            <div className="text-sm text-burgundy">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-ink/40 uppercase tracking-wider">
          <div className="flex-1 h-px bg-ink/10" />
          ou
          <div className="flex-1 h-px bg-ink/10" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="btn-secondary w-full"
        >
          <svg className="w-4 h-4" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.4 29.3 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.4 19 12.5 24 12.5c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.4 29.3 4.5 24 4.5c-7.4 0-13.8 4.2-17.1 10.4z" />
            <path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.2-7.2 2.2-5.3 0-9.7-3.4-11.3-8L6.2 32c3.2 6.6 9.9 11.5 17.8 11.5z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6h.1l6.2 5.2c-.4.4 6.7-4.9 6.7-14.8 0-1.2-.1-2.4-.4-3.5z" />
          </svg>
          Se connecter avec Google
        </button>

        <p className="mt-6 text-xs text-ink/40 text-center">
          Les comptes sont créés par les administrateurs.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
