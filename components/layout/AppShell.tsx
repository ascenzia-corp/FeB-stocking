"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const NAV_ITEMS = [
  { href: "/", label: "Inventaire" },
];

const ADMIN_ITEMS = [
  { href: "/admin/poles", label: "Pôles" },
  { href: "/admin/lieux", label: "Lieux" },
  { href: "/admin/categories", label: "Catégories" },
  { href: "/admin/utilisateurs", label: "Utilisateurs" },
];

function CelticCross({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="16" y1="3" x2="16" y2="29" />
      <line x1="6" y1="13" x2="26" y2="13" />
      <circle cx="16" cy="13" r="5" />
    </svg>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = session?.user?.role === "admin";

  const navItems = [...NAV_ITEMS];
  const renderNav = (onClick?: () => void) => (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              active
                ? "bg-ink text-cream"
                : "text-ink/80 hover:bg-ink/5"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      {isAdmin && (
        <div className="mt-4">
          <div className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-wider text-ink/40">
            Administration
          </div>
          {ADMIN_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClick}
                className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-gold/10 text-gold-dark font-medium"
                    : "text-ink/80 hover:bg-ink/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-ink/10 sticky top-0 z-30">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 -ml-2 rounded hover:bg-ink/5"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M4 6h16" strokeLinecap="round" />
                  <path d="M4 12h16" strokeLinecap="round" />
                  <path d="M4 18h16" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
          <Link href="/" className="flex items-center gap-2">
            <CelticCross className="w-7 h-7 text-burgundy" />
            <div className="leading-tight">
              <div className="font-serif text-lg text-ink">Feiz e Breizh</div>
              <div className="text-[11px] uppercase tracking-wider text-ink/50 -mt-0.5">
                Inventaire Matériel
              </div>
            </div>
          </Link>
          <div className="flex-1" />
          {session?.user && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-ink leading-tight">
                  {session.user.name}
                </div>
                <div className="text-[11px] text-ink/50 uppercase tracking-wider">
                  {session.user.role === "admin"
                    ? "Administrateur"
                    : session.user.role === "responsable_pole"
                      ? "Responsable de pôle"
                      : "Lecteur"}
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="btn-ghost text-sm"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 flex">
        <aside className="hidden md:block w-56 shrink-0 border-r border-ink/10 bg-white/40 p-4">
          {renderNav()}
        </aside>

        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-20 pt-14">
            <div
              className="absolute inset-0 bg-ink/40"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative bg-white w-72 max-w-[80%] h-full p-4 shadow-xl">
              {renderNav(() => setMobileOpen(false))}
            </div>
          </div>
        )}

        <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
