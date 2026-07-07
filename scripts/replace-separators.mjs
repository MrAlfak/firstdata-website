/**
 * Replace UI text separators (em dash, middle dot, pipe, underscore) with commas
 * in user-facing copy files. Skips box-drawing characters (─, │, etc.).
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const FILES = [
  "i18n/dictionaries.ts",
  "config/changelog.ts",
  "components/service-ascii.ts",
  "components/ServiceSection.tsx",
  "components/sales/Process.tsx",
  "components/Hero.tsx",
  "components/Header.tsx",
  "components/Preloader.tsx",
  "components/interactive/TerminalSection.tsx",
  "components/interactive/NetworkTopologySection.tsx",
  "components/interactive/ConcurrencyModelsSection.tsx",
  "components/interactive/LogicSynthesisSection.tsx",
  "components/interactive/GraphicsPipelinesSection.tsx",
  "components/interactive/HardwareAbstractionSection.tsx",
  "components/interactive/DistributedLedgerSection.tsx",
  "components/interactive/CompilerDesignSection.tsx",
  "components/errors/ErrorTerminalLayout.tsx",
  "components/contact/ContactClient.tsx",
  "components/panel/DashboardClient.tsx",
  "components/panel/TicketsClient.tsx",
  "components/navigation/RouteLoadingFallback.tsx",
  "components/games/strings.ts",
  "components/games/DinoGame.tsx",
  "components/games/CatchGame.tsx",
  "components/games/FlappyGame.tsx",
  "components/games/SimonGame.tsx",
  "components/games/WhackGame.tsx",
  "components/games/MinesweeperGame.tsx",
  "components/games/SnakeGame.tsx",
  "components/games/WordleGame.tsx",
  "components/modules-data.ts",
  "components/hero/iran-grid-data.ts",
  "app/global-error.tsx",
  "app/layout.tsx",
  "app/manifest.ts",
  "app/opengraph-image.tsx",
  "app/(site)/offline/page.tsx",
  "app/(site)/terms/page.tsx",
  "lib/seo/document-title.ts",
  "lib/seo/blog-jsonld.ts",
  "lib/siteVersion.ts",
  "config/social.ts",
  "i18n/panel.ts",
  "i18n/admin.ts",
  "i18n/localized.ts",
  "lib/contact/confirm.ts",
  "lib/auth/mail.ts",
  "lib/auth/sms.ts",
  "lib/panel/notify.ts",
  "lib/panel/contracts-pdf.ts",
  "lib/panel/admin-repository.ts",
  "lib/seo/og-image.tsx",
  "app/(site)/services/page.tsx",
  "app/(site)/services/[slug]/page.tsx",
  "app/(site)/aboutus/page.tsx",
  "app/(site)/aboutus/[slug]/page.tsx",
  "app/(site)/portfolio/page.tsx",
  "app/(site)/portfolio/[slug]/page.tsx",
  "app/(site)/product/[slug]/page.tsx",
  "app/(site)/contactus/[slug]/page.tsx",
  "app/(site)/contactus/opengraph-image.tsx",
  "app/(site)/services/[slug]/opengraph-image.tsx",
  "app/(site)/panel/page.tsx",
  "app/(site)/admin/leads/page.tsx",
  "app/(site)/admin/team/page.tsx",
  "app/(site)/admin/tickets/page.tsx",
  "app/(site)/admin/tickets/[id]/page.tsx",
  "app/(site)/admin/projects/page.tsx",
  "app/api/panel/invoices/[id]/pay/route.ts",
  "app/api/admin/seed-demo/route.ts",
  "config/navigation.ts",
];

function transform(text) {
  let s = text;

  // Em dash (U+2014) and en dash (U+2013) used as clause separators
  s = s.replace(/\u2014/g, ",");
  s = s.replace(/\u2013/g, ",");

  // Middle dot separator (UI copy only — not TS unions)
  s = s.replace(/ · /g, ", ");

  // Pipe used as visible text separator in strings — avoid breaking TS unions
  s = s.replace(/(["'`][^"'`]*?) \| ([^"'`]*?["'`])/g, "$1, $2");

  // Underscore as word separator in display copy (keep icmp_seq-style technical tokens minimal)
  s = s.replace(/first_data/g, "first,data");
  s = s.replace(/FIRST_DATA/g, "FIRST,DATA");
  s = s.replace(/service_stack/g, "service,stack");
  s = s.replace(/delivery_engine/g, "delivery,engine");
  s = s.replace(/quality_layer/g, "quality,layer");
  s = s.replace(/SYS_INIT/g, "SYS,INIT");
  s = s.replace(/ERR_OFFLINE/g, "ERR,OFFLINE");

  // Normalize spacing around commas introduced above
  s = s.replace(/ , +/g, ", ");
  s = s.replace(/, +,/g, ",");
  s = s.replace(/,\s{2,}/g, ", ");

  return s;
}

let changed = 0;
for (const rel of FILES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    console.warn("skip (missing):", rel);
    continue;
  }
  const before = fs.readFileSync(file, "utf8");
  const after = transform(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log("updated:", rel);
  }
}

console.log(`Done. ${changed} file(s) updated.`);
