import LoginForm from "@/components/shadcn-space/blocks/login-01/login";
import { demoPageMetadata } from "@/lib/seo/demo-routes";

export const metadata = demoPageMetadata;

export default function Page() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}
