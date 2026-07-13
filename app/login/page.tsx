"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-semibold ${className}`}>
      <span className="[font-variant-caps:small-caps] tracking-[0.04em]">
        Feiz
      </span>{" "}
      <span className="italic opacity-70">e</span>{" "}
      <span className="[font-variant-caps:small-caps] tracking-[0.04em]">
        Breizh
      </span>
    </span>
  );
}

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function GoogleG() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.4 29.3 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.4 19 12.5 24 12.5c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.4 29.3 4.5 24 4.5c-7.4 0-13.8 4.2-17.1 10.4z" />
      <path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.2-7.2 2.2-5.3 0-9.7-3.4-11.3-8L6.2 32c3.2 6.6 9.9 11.5 17.8 11.5z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6h.1l6.2 5.2c-.4.4 6.7-4.9 6.7-14.8 0-1.2-.1-2.4-.4-3.5z" />
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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[560px_1fr] bg-parchment">
      {/* Panneau cinématique (masqué sous lg) */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-ink text-parchment px-14 py-12">
        <div className="hermine-layer-dark absolute inset-0" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(164,123,58,0.12) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        {/* Oriflamme (fond sombre → banner-noir inversée) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="relative h-[clamp(360px,58vh,600px)] w-[280px]">
            <Image
              src="/brand/feb-banner-noir.png"
              alt="Oriflamme Feiz e Breizh"
              fill
              priority
              sizes="280px"
              className="object-contain [filter:invert(1)_brightness(1.08)]"
            />
          </div>
          <Wordmark className="mt-6 text-lg tracking-[0.32em] text-parchment-light/85" />
        </div>

        {/* Tagline haut */}
        <div className="relative flex items-center gap-2.5">
          <span className="h-px w-7 bg-parchment/40" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-parchment/60">
            Pèlerinage breton · Sainte-Anne-d&apos;Auray
          </span>
        </div>

        {/* Devise bas */}
        <div className="relative">
          <p className="font-display italic text-[22px] leading-[1.35] text-parchment-light/85 max-w-[380px]">
            «&nbsp;Itron Varia Wened, pedit evidomp&nbsp;»
          </p>
          <p className="mt-2.5 text-xs tracking-[0.06em] text-parchment/50">
            Notre-Dame d&apos;Auray, priez pour nous.
          </p>
          <p className="mt-8 font-mono text-[10px] tracking-[0.10em] uppercase text-parchment/40">
            Inventaire · MMXXVI
          </p>
        </div>
      </div>

      {/* Panneau formulaire */}
      <div className="relative flex items-center justify-center px-6 py-12 sm:px-16">
        <div className="hermine-layer absolute inset-0" style={{ opacity: 0.025 }} />

        <div className="relative w-full max-w-[380px]">
          {/* Mini bloc marque */}
          <div className="mb-10 flex items-center gap-3.5">
            <div className="relative h-[52px] w-[38px]">
              <Image
                src="/brand/feb-banner.png"
                alt="Feiz e Breizh"
                fill
                sizes="38px"
                className="object-contain"
              />
            </div>
            <div>
              <div className="font-display font-semibold text-[19px] leading-none">
                Inventaire
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ink-mid">
                Feiz e Breizh
              </div>
            </div>
          </div>

          <div className="t-eyebrow text-[13px]">Connexion</div>
          <h1 className="font-display font-medium text-4xl leading-[1.05] tracking-[-0.01em] mt-1">
            Bienvenue au
            <br />
            chapitre.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-mid">
            Accès réservé aux bénévoles inscrits. Les comptes sont créés par un
            administrateur — pas d&apos;inscription libre.
          </p>

          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="btn btn-secondary btn-lg mt-7 w-full"
          >
            <GoogleG />
            Continuer avec Google
          </button>

          <div className="my-6 flex items-center gap-3 text-ink-faint">
            <span className="h-px flex-1 bg-ink/10" />
            <span className="font-display italic text-[13px] text-bordeaux">
              ou
            </span>
            <span className="h-px flex-1 bg-ink/10" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="email">
                Adresse e-mail
              </label>
              <input
                id="email"
                type="email"
                required
                className="input input-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div>
              <label className="label" htmlFor="password">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                required
                className="input input-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            {error && <div className="text-sm text-bordeaux">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg w-full"
            >
              {loading ? "Connexion..." : "Entrer dans l'application"}
              {!loading && <ArrowRight />}
            </button>
          </form>

          <div className="mt-7 flex gap-2.5 rounded-md border border-ink/10 bg-parchment-light px-4 py-3.5 text-xs text-ink-mid">
            <span className="mt-0.5 shrink-0 text-bordeaux">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3 4 6v6c0 5 3.6 8.5 8 9 4.4-.5 8-4 8-9V6l-8-3Z" />
              </svg>
            </span>
            <div>
              Votre adresse doit déjà figurer dans la feuille{" "}
              <span className="font-mono">Utilisateurs</span>. Si ce n&apos;est
              pas le cas, contactez un responsable de pôle.
            </div>
          </div>
        </div>
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
