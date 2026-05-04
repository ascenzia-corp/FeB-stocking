"use client";

import { useEffect, useRef, useState } from "react";

export interface MultiOption {
  value: string;
  label: string;
}

export function MultiSelect({
  label,
  options,
  selected,
  onChange,
  placeholder = "Tous",
}: {
  label: string;
  options: MultiOption[];
  selected: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const summary =
    selected.length === 0
      ? placeholder
      : selected.length === 1
        ? options.find((o) => o.value === selected[0])?.label || "1 sélectionné"
        : `${selected.length} sélectionnés`;

  return (
    <div ref={ref} className="relative">
      <label className="label">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="input flex items-center justify-between text-left"
      >
        <span className={selected.length === 0 ? "text-ink/40" : ""}>
          {summary}
        </span>
        <svg
          className="w-4 h-4 text-ink/40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-ink/10 rounded-md shadow-lg max-h-64 overflow-y-auto">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-ink/50">Aucune option</div>
          ) : (
            options.map((opt) => {
              const checked = selected.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-ink/5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(opt.value)}
                    className="accent-gold"
                  />
                  <span>{opt.label}</span>
                </label>
              );
            })
          )}
          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="w-full px-3 py-2 text-xs text-ink/60 border-t border-ink/10 hover:bg-ink/5 text-left"
            >
              Effacer la sélection
            </button>
          )}
        </div>
      )}
    </div>
  );
}
