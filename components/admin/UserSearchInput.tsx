"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";

type UserHit = { id: number; name: string; email: string | null; phone: string | null };

export default function UserSearchInput({
  value,
  onSelect,
  placeholder,
}: {
  value: number | null;
  onSelect: (user: UserHit | null) => void;
  placeholder?: string;
}) {
  const { a } = useT();
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<UserHit[]>([]);
  const [selected, setSelected] = useState<UserHit | null>(null);
  const [open, setOpen] = useState(false);

  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    if (!value) {
      setSelected(null);
    }
  }

  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    if (query.trim().length < 2) {
      setHits([]);
    }
  }

  useEffect(() => {
    if (!value) return;
    if (selected?.id === value) return;
    fetch(`/api/admin/users?q=${value}`)
      .then((r) => r.json())
      .then((j) => {
        const hit = j.users?.find((u: UserHit) => u.id === value);
        if (hit) setSelected(hit);
      });
  }, [value, selected?.id]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const t = setTimeout(() => {
      fetch(`/api/admin/users?q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then((j) => setHits(j.users ?? []));
    }, 250);
    return () => clearTimeout(t);
  }, [query]);

  function pick(user: UserHit) {
    setSelected(user);
    setQuery("");
    setHits([]);
    setOpen(false);
    onSelect(user);
  }

  function clear() {
    setSelected(null);
    setQuery("");
    onSelect(null);
  }

  if (selected) {
    return (
      <div className="flex items-center gap-2 border border-paper/20 px-3 py-2 text-sm text-paper">
        <span className="min-w-0 flex-1 truncate">
          {selected.name}
          {selected.email ? ` (${selected.email})` : ""}
        </span>
        <span className="text-xs text-paper/40" dir="ltr">
          #{selected.id}
        </span>
        <button type="button" onClick={clear} className="text-xs text-paper/45 hover:text-paper">
          ×
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder ?? a.common.searchUser}
        className="w-full border border-paper/20 bg-transparent px-3 py-2 text-sm text-paper"
        dir="ltr"
        autoComplete="off"
      />
      {open && hits.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto border border-paper/20 bg-ink">
          {hits.map((u) => (
            <li key={u.id}>
              <button
                type="button"
                onClick={() => pick(u)}
                className="block w-full px-3 py-2 text-start text-xs text-paper/80 hover:bg-paper/5"
              >
                {u.name}
                {u.email ? ` — ${u.email}` : ""}
                <span className="ms-2 text-paper/35">#{u.id}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
