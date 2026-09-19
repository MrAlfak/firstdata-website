import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";
import { dictionaries } from "@/i18n/dictionaries";
import { getRequestLang } from "@/lib/i18n/request-lang";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  return {
    title: dictionaries[lang].auth.register.title,
    robots: { index: false, follow: false },
  };
}

export default function RegisterPage() {
  return (
    <main>
      <RegisterClient />
    </main>
  );
}
