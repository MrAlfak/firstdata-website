import type { Metadata } from "next";
import ForgotPasswordClient from "./ForgotPasswordClient";
import { dictionaries } from "@/i18n/dictionaries";
import { getRequestLang } from "@/lib/i18n/request-lang";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  return {
    title: dictionaries[lang].auth.forgotPassword.title,
    robots: { index: false, follow: false },
  };
}

export default function ForgotPasswordPage() {
  return (
    <main>
      <ForgotPasswordClient />
    </main>
  );
}
