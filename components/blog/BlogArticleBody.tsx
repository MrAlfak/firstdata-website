"use client";

import { parseBodyBlocks } from "@/lib/blog";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

type Props = {
  body: string[];
  fa: boolean;
};

export default function BlogArticleBody({ body, fa }: Props) {
  const blocks = parseBodyBlocks(body);
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const face = ai ? "font-iran" : fa ? "font-fa" : "";

  return (
    <div className={`space-y-5 sm:space-y-6 ${face}`}>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={`h-${block.id}-${i}`}
              id={block.id}
              className={`scroll-mt-24 pt-2 text-lg font-normal tracking-tight text-paper sm:text-xl ${
                ai ? "font-medium font-iran" : fa ? "font-fa" : "font-pixel"
              }`}
            >
              {!ai ? <span className="me-2 font-mono text-term/50">##</span> : null}
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul
              key={`ul-${i}`}
              className={`space-y-2 ps-4 text-sm leading-relaxed text-paper/70 sm:text-base ${
                ai ? "list-disc border-s-0 ps-5" : "border-s-2 border-term/20"
              }`}
            >
              {block.items.map((item, j) => (
                <li key={j} className={ai ? "" : "relative"}>
                  {!ai ? <span className="absolute -start-4 font-mono text-term/40">,</span> : null}
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
