import sanitizeHtml from "sanitize-html";

/**
 * Allow a small safe HTML subset for ticket bodies from the panel editor.
 * Uses sanitize-html (a real HTML parser + whitelist) instead of regex, so
 * script/style/event-handler/iframe injection cannot slip through via
 * malformed or obfuscated markup.
 */
const ALLOWED_TAGS = [
  "p",
  "br",
  "b",
  "strong",
  "i",
  "em",
  "u",
  "ul",
  "ol",
  "li",
  "a",
  "div",
  "span",
  "blockquote",
  "code",
  "pre",
];

const ALLOWED_ATTRS = {
  a: ["href", "rel", "target"],
};

export function sanitizeTicketHtml(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  const html = sanitizeHtml(trimmed, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRS,
    allowedSchemes: ["http", "https"],
    // Only allow http(s) links; strip any javascript:/data:/etc. hrefs.
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
    // Force external links to open safely in a new tab.
    transformTags: {
      a: (_tagName, attribs) => ({
        tagName: "a",
        attribs: {
          href: attribs.href,
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
    },
  });

  const plain = ticketHtmlToPlain(html);
  return plain.length > 0 ? html : "";
}

export function ticketHtmlToPlain(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
