"use client";

import { parseBodyBlocks } from "@/lib/blog";

type Props = {
  body: string[];
  fa: boolean;
};

export default function BlogArticleBody({ body, fa }: Props) {
  const blocks = parseBodyBlocks(body);

  return (
    <div className={`space-y-5 sm:space-y-6 ${fa ? "font-fa" : ""}`}>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={`h-${block.id}-${i}`}
              id={block.id}
              className={`scroll-mt-24 pt-2 text-lg font-normal tracking-tight text-paper sm:text-xl ${fa ? "font-fa" : "font-pixel"}`}
            >
              <span className="me-2 font-mono text-term/50">##</span>
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul
              key={`ul-${i}`}
              className="space-y-2 border-s-2 border-term/20 ps-4 text-sm leading-relaxed text-paper/70 sm:text-base"
            >
              {block.items.map((item, j) => (
                <li key={j} className="relative">
                  <span className="absolute -start-4 font-mono text-term/40">,</span>
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={`p-${i}`} className="text-sm leading-relaxed text-paper/70 sm:text-base">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
