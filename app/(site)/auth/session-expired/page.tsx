import type { Metadata } from "next";
import SessionExpiredClient from "./SessionExpiredClient";
import { dictionaries } from "@/i18n/dictionaries";
import { safeNextPath } from "@/lib/auth/safe-next";
import { getRequestLang } from "@/lib/i18n/request-lang";

type Props = {
  searchParams: Promise<{ next?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  return {
    title: dictionaries[lang].errors.pages.sessionExpired.title,
    robots: { index: false, follow: false },
  };
}

export default async function SessionExpiredPage({ searchParams }: Props) {
  const { next } = await searchParams;
  return (
    <main>
      <SessionExpiredClient nextPath={safeNextPath(next)} />
    </main>
  );
}
