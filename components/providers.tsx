"use client";

import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const err = new Error("Erreur de chargement");
    (err as Error & { status: number }).status = res.status;
    throw err;
  }
  return res.json();
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: false,
          dedupingInterval: 15_000,
        }}
      >
        {children}
      </SWRConfig>
    </SessionProvider>
  );
}
