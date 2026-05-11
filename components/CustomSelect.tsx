"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/Icons";

export type CustomSelectOption = { value: string; label: string };

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder: string;
  disabled?: boolean;
  id?: string;
};

export default function CustomSelect({ value, onChange, options, placeholder, disabled, id }: Props) {
  const autoId = useId();
  const base = id ?? `cs-${autoId}`;
  const triggerId = `${base}-trigger`;
  const listboxId = `${base}-listbox`;

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const label = selected?.label ?? "";

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        id={triggerId}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => !disabled && setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 py-3 text-left text-sm outline-none disabled:opacity-60 [&:focus-visible]:ring-0"
      >
        <span className={value ? "truncate text-bright" : "truncate text-muted"}>{value ? label : placeholder}</span>
        <ChevronDownIcon size={16} className={`shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={triggerId}
          className="absolute left-0 right-0 top-full z-[100] mt-1 max-h-52 overflow-y-auto overscroll-contain rounded-xl border border-line bg-panel py-1 shadow-[0_12px_40px_rgba(0,0,0,0.55)] ring-1 ring-primary/15"
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`flex w-full px-3 py-2.5 text-left text-sm transition-colors hover:bg-primary/15 ${
                    active ? "bg-primary/10 font-semibold text-leaf" : "text-soft"
                  }`}
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
