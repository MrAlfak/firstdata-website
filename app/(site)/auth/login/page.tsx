import type { Metadata } from "next";
import LoginClient from "./LoginClient";
import { dictionaries } from "@/i18n/dictionaries";
import { safeNextPath } from "@/lib/auth/safe-next";
import { getRequestLang } from "@/lib/i18n/request-lang";

type Props = {
  searchParams: Promise<{ next?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  return {
    title: dictionaries[lang].auth.login.title,
    robots: { index: false, follow: false },
  };
}

export default async function LoginPage({ searchParams }: Props) {
  const { next } = await searchParams;
  return (
    <main>
      <LoginClient nextPath={safeNextPath(next)} />
    </main>
  );
}
