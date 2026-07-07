"use client";

type Props = {
  message: string;
  dir?: "ltr" | "rtl";
  fa?: boolean;
};

export default function InlineError({ message, dir = "ltr", fa = false }: Props) {
  if (!message) return null;
  return (
    <p
      dir={dir}
      role="alert"
      className={`mb-4 border border-terr/30 bg-terr/5 px-3 py-2 text-xs text-terr ${fa ? "font-fa" : "font-mono"}`}
    >
      {message}
    </p>
  );
}
