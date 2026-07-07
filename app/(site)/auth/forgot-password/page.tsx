import type { Metadata } from "next";
import { Suspense } from "react";
import ForgotPasswordClient from "./ForgotPasswordClient";

export const metadata: Metadata = {
  title: "Forgot Password",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <main>
      <Suspense>
        <ForgotPasswordClient />
      </Suspense>
    </main>
  );
}
