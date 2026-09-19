"use client";

import { useEffect, useId, useRef, useState } from "react";

export type SkinSelectOption = {
  value: string;
  label: string;
};

type Props = {
  id?: string;
  value: string;
  options: SkinSelectOption[];
  placeholder: string;
  onChange: (value: string) => void;
  className?: string;
  /** AI / modern skin */
  ai?: boolean;
  fa?: boolean;
  invalid?: boolean;
  disabled?: boolean;
};

/**
 * Custom select — native `<option>` popups ignore theme on Windows.
 * Terminal + AI skins both get a matching dropdown panel.
 */
export default function SkinSelect({
  id,
  value,
  options,
  placeholder,
  onChange,
  className = "",
  ai = false,
  fa = false,
  invalid = false,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value);
  const face = ai || fa ? "font-iran" : "font-mono";

  useEffect(() => {
    if (!open) return;
    const onDoc = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const triggerClass = ai
    ? `flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-sm outline-none transition-colors ${
        invalid
          ? "border-terr/40 focus:border-terr/50 focus:ring-2 focus:ring-terr/15"
          : "border-paper/15 focus:border-term/40 focus:ring-2 focus:ring-term/15"
      } bg-paper/[0.04] text-paper ${face} ${className}`
    : `flex w-full items-center justify-between gap-3 border px-4 py-3 text-xs outline-none transition-colors duration-200 ${
        invalid ? "border-terr/40" : "border-paper/20 focus:border-paper/50"
      } bg-paper/[0.03] text-paper ${fa ? "font-fa text-right" : "font-mono"} ${className}`;

  const panelClass = ai
    ? "absolute inset-x-0 top-[calc(100%+0.35rem)] z-[60] max-h-60 overflow-y-auto rounded-xl border border-paper/15 bg-[var(--ai-card,#0f1211)] py-1 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
    : "absolute inset-x-0 top-[calc(100%+0.35rem)] z-[60] max-h-60 overflow-y-auto border border-term/35 bg-[#080c08] py-0 shadow-[0_12px_36px_rgba(0,0,0,0.65)]";

  const optionClass = (active: boolean) =>
    ai
      ? `block w-full px-4 py-2.5 text-start text-sm transition-colors ${face} ${
          active ? "bg-term/15 text-term" : "text-paper/80 hover:bg-paper/8 hover:text-paper"
        }`
      : `block w-full px-4 py-2.5 text-start text-xs transition-colors ${fa ? "font-fa" : "font-mono"} ${
          active ? "bg-term/20 text-term" : "text-term/75 hover:bg-term/10 hover:text-term"
        }`;

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        role="combobox"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={invalid || undefined}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={`${triggerClass} disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <span className={`min-w-0 truncate ${selected ? "" : "text-paper/35"}`}>
          {selected?.label ?? placeholder}
        </span>
        <span
          aria-hidden
          className={`shrink-0 text-paper/40 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open ? (
        <ul id={listId} role="listbox" className={panelClass}>
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  className={optionClass(active)}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
