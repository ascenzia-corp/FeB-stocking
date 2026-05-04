"use client";

import { useEffect } from "react";

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center p-0 md:p-4">
      <div
        className="absolute inset-0 bg-ink/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-cream w-full md:max-w-2xl rounded-t-xl md:rounded-xl shadow-2xl flex flex-col max-h-[95vh]">
        <header className="px-5 py-4 border-b border-ink/10 flex items-center gap-3">
          <h2 className="font-serif text-xl text-ink">{title}</h2>
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded hover:bg-ink/5"
            aria-label="Fermer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </header>
        <div className="overflow-y-auto p-5">{children}</div>
        {footer && (
          <footer className="px-5 py-4 border-t border-ink/10 bg-white/50 flex flex-wrap gap-2 justify-end">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
