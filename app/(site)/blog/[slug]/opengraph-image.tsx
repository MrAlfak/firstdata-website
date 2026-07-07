import { getPostBySlug } from "@/config/blog";
import { renderOgImage } from "@/lib/seo/og-image";

export const dynamic = "force-dynamic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function BlogPostOgImage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.en.title ?? "First Data Blog";
  const subtitle = post?.en.excerpt?.slice(0, 120) ?? "Engineering insights";

  return renderOgImage({
    title: title.length > 72 ? `${title.slice(0, 69)}...` : title,
    subtitle,
    eyebrow: "// blog.firstdata.ir",
  });
}
