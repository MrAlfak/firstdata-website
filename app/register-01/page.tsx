import RegisterForm from "@/components/shadcn-space/blocks/register-01/register";
import { demoPageMetadata } from "@/lib/seo/demo-routes";

export const metadata = demoPageMetadata;

const Page = () => {
  return <RegisterForm />;
};

export default Page;
