import CTA from "@/components/shadcn-space/blocks/cta-01/cta";
import { demoPageMetadata } from "@/lib/seo/demo-routes";

export const metadata = demoPageMetadata;

export default function Page() {
  return (
    <main>
      <CTA />
    </main>
  );
}
