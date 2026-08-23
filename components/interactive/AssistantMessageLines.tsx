"use client";

import type { ReactNode } from "react";
import Link from "next/link";

/** Parse markdown links [label](url) and trailing "→ /path" / "→ https://..." */
function tokenize(line: string): ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const md = /\[([^\]]+)\]\((\/[^)\s]+|https?:\/\/[^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;

  while ((m = md.exec(line)) !== null) {
    if (m.index > last) {
      nodes.push(...linkifyPlain(line.slice(last, m.index), key));
      key += 10;
    }
    const href = m[2];
    const label = m[1];
    nodes.push(
      <Link
        key={`md-${key++}`}
        href={href}
        className="underline decoration-term/50 underline-offset-2 text-term hover:decoration-term"
      >
        {label}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < line.length) {
    nodes.push(...linkifyPlain(line.slice(last), key));
  }
  return nodes.length ? nodes : [line];
}

function linkifyPlain(text: string, keyBase: number): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /(→\s*)(\/[\w\-./?=&%#+]+|https?:\/\/[^\s]+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = keyBase;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const prefix = m[1];
    const href = m[2];
    parts.push(
      <span key={`p-${k++}`}>
        {prefix}
        <Link
          href={href}
          className="underline decoration-term/50 underline-offset-2 text-term hover:decoration-term"
        >
          {href}
        </Link>
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : [text];
}

export default function AssistantMessageLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <p key={i} className={line ? undefined : "h-3"}>
          {line ? tokenize(line) : "\u00a0"}
        </p>
      ))}
    </>
  );
}
