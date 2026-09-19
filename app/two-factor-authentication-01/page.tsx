import TwoFactorAuthForm from "@/components/shadcn-space/blocks/two-factor-authentication-01/two-factor-auth";
import { demoPageMetadata } from "@/lib/seo/demo-routes";

export const metadata = demoPageMetadata;

const Page = () => {
  return <TwoFactorAuthForm />;
};

export default Page;
