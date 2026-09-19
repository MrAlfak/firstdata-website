import type { Metadata } from "next";
import ResetPasswordClient from "./ResetPasswordClient";
import { dictionaries } from "@/i18n/dictionaries";
import { getRequestLang } from "@/lib/i18n/request-lang";

type Props = {
  searchParams: Promise<{ channel?: string; email?: string; phone?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  return {
    title: dictionaries[lang].auth.resetPassword.title,
    robots: { index: false, follow: false },
  };
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { channel, email, phone } = await searchParams;
  return (
    <main>
      <ResetPasswordClient
        initialChannel={channel === "sms" ? "sms" : "email"}
        initialEmail={email?.trim() ?? ""}
        initialPhone={phone?.trim() ?? ""}
      />
    </main>
  );
}
