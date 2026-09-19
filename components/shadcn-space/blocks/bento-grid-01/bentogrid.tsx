import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import ReminderAnimation, {
  type ReminderItem,
} from "@/components/shadcn-space/blocks/bento-grid-01/ReminderAnimation";
import AnimatedUiBlock from "@/components/shadcn-space/blocks/bento-grid-01/AnimatedUiBlock";
import { cn } from "@/lib/utils";

export type BentoCell = {
  title: string;
  description: string;
  href?: string;
  imageLight?: string;
  imageDark?: string;
  imageAlt?: string;
};

export type BentogridProps = {
  badge?: string;
  title?: string;
  titleId?: string;
  lead?: string;
  /** First cell (span 4) — carousel titles */
  reminderItems?: ReminderItem[];
  featurePrimary?: BentoCell;
  featureWide?: BentoCell;
  featureCards?: [BentoCell, BentoCell, BentoCell];
  className?: string;
  faceClassName?: string;
  dir?: "rtl" | "ltr";
};

const DEFAULT_CARDS: [BentoCell, BentoCell, BentoCell] = [
  {
    title: "Multiple layout options",
    description: "We have LTR and RTL options along with different layout options as well.",
    imageLight: "https://images.shadcnspace.com/assets/bento-grid/bento-grid-img-1.png",
    imageDark: "https://images.shadcnspace.com/assets/bento-grid/bento-grid-darkimg-1.png",
    imageAlt: "layout options",
  },
  {
    title: "Well documented",
    description: "A well-structured and easy-to-follow documentation for your project.",
    imageLight: "https://images.shadcnspace.com/assets/bento-grid/bento-grid-img-2.png",
    imageDark: "https://images.shadcnspace.com/assets/bento-grid/bento-grid-darkimg-2.png",
    imageAlt: "documentation",
  },
  {
    title: "Multiple color options",
    description: "Unlimited color options to match with your brand instantly and easily.",
    imageLight: "https://images.shadcnspace.com/assets/bento-grid/bento-grid-img-3.png",
    imageAlt: "color options",
  },
];

function CellBody({
  cell,
  faceClassName,
}: {
  cell: BentoCell;
  faceClassName?: string;
}) {
  const inner = (
    <>
      <h3 className={cn("text-xl font-medium text-foreground", faceClassName)}>{cell.title}</h3>
      <p className={cn("text-base font-normal text-muted-foreground", faceClassName)}>
        {cell.description}
      </p>
    </>
  );

  if (cell.href) {
    return (
      <a
        href={cell.href}
        className="flex flex-col gap-0.5 border-t border-border p-8 transition-colors hover:bg-muted/40"
      >
        {inner}
      </a>
    );
  }

  return <div className="flex flex-col gap-0.5 border-t border-border p-8">{inner}</div>;
}

const Bentogrid = ({
  badge = "Bento Grid Features",
  title = "Beautifully and well balanced bento grid design section",
  titleId,
  lead,
  reminderItems,
  featurePrimary = {
    title: "Awesome Shadcn components",
    description: "A collection of custom-built, highly flexible Shadcn components",
  },
  featureWide = {
    title: "Beautifully crafted ui blocks",
    description:
      "Build powerful dashboards in no time with per-built Shadcn components and layouts. Whether you're creating admin panels, analytics dashboards, or SaaS back-ends.",
  },
  featureCards = DEFAULT_CARDS,
  className,
  faceClassName,
  dir,
}: BentogridProps) => {
  return (
    <section className={className} dir={dir}>
      <div className="py-11 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 lg:px-8 xl:px-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4">
            <Badge variant="outline" className={cn("h-auto px-3 py-1 text-sm font-normal", faceClassName)}>
              {badge}
            </Badge>
            <h2
              id={titleId}
              className={cn(
                "mx-auto text-center text-3xl font-medium md:text-5xl",
                faceClassName,
              )}
            >
              {title}
            </h2>
            {lead ? (
              <p
                className={cn(
                  "max-w-2xl text-center text-base text-muted-foreground md:text-lg",
                  faceClassName,
                )}
              >
                {lead}
              </p>
            ) : null}
          </div>
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 overflow-hidden lg:col-span-4">
              <div className="rounded-xl border border-border">
                <div className="relative rounded-t-xl bg-muted px-9 py-8">
                  <ReminderAnimation items={reminderItems} />
                </div>
                <CellBody cell={featurePrimary} faceClassName={faceClassName} />
              </div>
            </div>
            <div className="col-span-12 overflow-hidden lg:col-span-8">
              <div className="rounded-xl border border-border">
                <div className="relative rounded-t-xl bg-muted px-6 py-7 lg:px-30">
                  <AnimatedUiBlock />
                </div>
                <CellBody cell={featureWide} faceClassName={faceClassName} />
              </div>
            </div>

            {featureCards.map((cell) => (
              <div key={cell.title} className="col-span-12 overflow-hidden lg:col-span-4">
                <div className="flex h-full flex-col rounded-xl border border-border">
                  <div className="relative flex flex-1 items-center justify-center rounded-t-xl bg-muted p-8">
                    {cell.imageLight ? (
                      <Image
                        src={cell.imageLight}
                        alt={cell.imageAlt ?? cell.title}
                        width={400}
                        height={250}
                        unoptimized
                        className={cell.imageDark ? "dark:hidden" : undefined}
                      />
                    ) : null}
                    {cell.imageDark ? (
                      <Image
                        src={cell.imageDark}
                        alt={cell.imageAlt ?? cell.title}
                        width={400}
                        height={250}
                        unoptimized
                        className="hidden dark:block"
                      />
                    ) : null}
                  </div>
                  <CellBody cell={cell} faceClassName={faceClassName} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bentogrid;
