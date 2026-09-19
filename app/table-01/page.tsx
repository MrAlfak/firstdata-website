import Table from "@/components/shadcn-space/blocks/table-01/table"
import { demoPageMetadata } from "@/lib/seo/demo-routes";

export const metadata = demoPageMetadata;

export default function Page() {
    return (
        <div>
            <Table />
        </div>
    )
}
