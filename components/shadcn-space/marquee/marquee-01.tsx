import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/shadcn-space/animations/marquee";
import { cn } from "@/lib/utils";

export type ReviewItem = {
  name: string;
  username: string;
  body: string;
  profile: string;
};

export const DEMO_REVIEWS: ReviewItem[] = [
  {
    name: "Ken Masters",
    username: "@kmasters",
    body: "“Our productivity has nearly doubled since onboarding. Automation features removed repetitive tasks, allowing our team to focus on building instead of managing operations.”",
    profile: "https://images.shadcnspace.com/assets/profiles/rough.webp",
  },
  {
    name: "Kira Athrun",
    username: "@kathrun",
    body: "“What surprised us most was how quickly our team adapted. Minimal learning curve, excellent documentation, and powerful features make it a must-have for modern SaaS companies.”",
    profile: "https://images.shadcnspace.com/assets/profiles/albert.webp",
  },
  {
    name: "Lirael Nassun",
    username: "@lnassun",
    body: "“This is easily one of the most reliable SaaS tools we’ve adopted. The UI is intuitive, integrations are seamless, and it saves us countless hours every week.”",
    profile: "https://images.shadcnspace.com/assets/profiles/linda.webp",
  },
  {
    name: "Jessica",
    username: "@jessica",
    body: "Switching to this platform streamlined our entire workflow. Setup was effortless, performance improved instantly, and our team now ships features faster without worrying about infrastructure.",
    profile: "https://images.shadcnspace.com/assets/profiles/jessica.webp",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "“We evaluated multiple solutions, but this stood out immediately. It’s fast, scalable, and thoughtfully designed for growing teams that need stability without added complexity.”",
    profile: "https://images.shadcnspace.com/assets/profiles/jenny.webp",
  },
  {
    name: "Kira Athrun",
    username: "@kathrun",
    body: "“What surprised us most was how quickly our team adapted. Minimal learning curve, excellent documentation, and powerful features make it a must-have for modern SaaS companies.”",
    profile: "https://images.shadcnspace.com/assets/profiles/albert.webp",
  },
  {
    name: "Ken Masters",
    username: "@kmasters",
    body: "“Our productivity has nearly doubled since onboarding. Automation features removed repetitive tasks, allowing our team to focus on building instead of managing operations.”",
    profile: "https://images.shadcnspace.com/assets/profiles/rough.webp",
  },
];

/** Fallback avatars when i18n testimonials have no image. */
export const REVIEW_PROFILE_FALLBACKS = [
  "https://images.shadcnspace.com/assets/profiles/rough.webp",
  "https://images.shadcnspace.com/assets/profiles/albert.webp",
  "https://images.shadcnspace.com/assets/profiles/linda.webp",
  "https://images.shadcnspace.com/assets/profiles/jessica.webp",
  "https://images.shadcnspace.com/assets/profiles/jenny.webp",
] as const;

export function ReviewCard({
  profile,
  name,
  username,
  body,
  className,
}: ReviewItem & { className?: string }) {
  return (
    <Card
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden border-border bg-card p-4 shadow-none",
        className,
      )}
    >
      <CardContent className="flex flex-col gap-2 p-0">
        <div className="flex flex-row items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- remote demo/profile URLs */}
          <img
            className="rounded-full"
            width={32}
            height={32}
            alt=""
            src={profile}
          />
          <div className="flex flex-col">
            <p className="text-sm font-medium text-foreground">{name}</p>
            <p className="text-xs font-medium text-muted-foreground">{username}</p>
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-foreground">{body}</p>
      </CardContent>
    </Card>
  );
}

type TestimonialMarqueeProps = {
  reviews?: ReviewItem[];
  className?: string;
  duration?: string;
};

/** Dual-row testimonial marquee — pass `reviews` for live i18n content. */
export function TestimonialMarquee({
  reviews = DEMO_REVIEWS,
  className,
  duration = "20s",
}: TestimonialMarqueeProps) {
  const mid = Math.max(1, Math.floor(reviews.length / 2));
  const firstRow = reviews.slice(0, mid);
  const secondRow = reviews.slice(mid);

  const durationStyle = { ["--duration" as string]: duration };

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden",
        className,
      )}
    >
      <Marquee pauseOnHover className="[--duration:20s]" style={durationStyle}>
        {firstRow.map((review, i) => (
          <ReviewCard key={`a-${review.name}-${i}`} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]" style={durationStyle}>
        {secondRow.map((review, i) => (
          <ReviewCard key={`b-${review.name}-${i}`} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
    </div>
  );
}

/** Block demo — English sample reviews (unchanged for shadcn-space gallery). */
export default function TestimonialMarqueeDemo() {
  return <TestimonialMarquee />;
}
