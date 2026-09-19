"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  BookOpenIcon,
  BriefcaseIcon,
  ClockIcon,
  FileTextIcon,
  LayoutGridIcon,
  PackageIcon,
  SearchIcon,
  SparklesIcon,
  type LucideIcon,
} from "lucide-react";
import {
  CommandSearchDialog,
  type CommandSearchGroup,
} from "@/components/shadcn-space/command/command-06";
import {
  getFeaturedSearchItems,
  POPULAR_SEARCHES,
  searchSite,
  type SearchItem,
  type SearchItemType,
} from "@/config/site-search";
import { useT } from "@/i18n/LangProvider";
import { searchDictionaries } from "@/i18n/search";
import {
  formatRecentTimestamp,
  getRecentSearchEntries,
  pushRecentSearch,
  type RecentSearchEntry,
} from "@/lib/search/history";

type Props = {
  open: boolean;
  onClose: () => void;
};

const TYPE_ICON: Record<SearchItemType, LucideIcon> = {
  product: PackageIcon,
  service: BriefcaseIcon,
  page: FileTextIcon,
  blog: BookOpenIcon,
  portfolio: LayoutGridIcon,
};

/** Keep idle list ≈ command-06 density so Suggestions / Recent / Quick Links all fit. */
const FEATURED_IDLE = 5;
const RECENT_IDLE = 4;
const POPULAR_IDLE = 5;

export default function ModernSearchCommand({ open, onClose }: Props) {
  const { lang, dir, fa, fd } = useT();
  const ui = searchDictionaries[lang];
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [recent, setRecent] = React.useState<RecentSearchEntry[]>([]);

  const recentStamp = React.useCallback(
    (at: number) => {
      const raw = formatRecentTimestamp(at, lang);
      if (!fa) return raw;
      return raw.replace(/\d+/g, (digits) => fd(digits));
    },
    [fa, fd, lang],
  );

  const featured = React.useMemo(
    () => getFeaturedSearchItems(FEATURED_IDLE),
    [],
  );
  const results = React.useMemo(() => searchSite(query, lang), [query, lang]);
  const showResults = query.trim().length > 0;

  const [prevOpen, setPrevOpen] = React.useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) {
      setQuery("");
    }
  }

  React.useEffect(() => {
    if (!open) return;
    const frameId = requestAnimationFrame(() => {
      setRecent(getRecentSearchEntries());
    });
    return () => cancelAnimationFrame(frameId);
  }, [open]);

  const navigate = React.useCallback(
    (href: string, recentQuery?: string) => {
      if (recentQuery?.trim()) pushRecentSearch(recentQuery);
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  const runFullSearch = React.useCallback(
    (raw: string) => {
      const q = raw.trim();
      if (!q) return;
      pushRecentSearch(q);
      onClose();
      router.push(`/search?q=${encodeURIComponent(q)}`);
    },
    [onClose, router],
  );

  const groups = React.useMemo((): CommandSearchGroup[] => {
    if (showResults) {
      // No "View all" CommandItem when empty — otherwise CommandEmpty never shows.
      if (results.length === 0) return [];

      return [
        {
          heading: ui.results,
          items: results.map((item) => ({
            label: item.title[lang],
            value: `${item.type}:${item.id}`,
            icon: TYPE_ICON[item.type],
            onSelect: () => navigate(item.href, query),
          })),
        },
        {
          heading: ui.viewAll,
          items: [
            {
              label: `${ui.viewAll}: “${query.trim()}”`,
              value: `view-all:${query.trim()}`,
              icon: SearchIcon,
              onSelect: () => runFullSearch(query),
            },
          ],
        },
      ];
    }

    // Idle order mirrors command-06: Suggestions → Recent → Quick Links
    const next: CommandSearchGroup[] = [
      {
        heading: ui.featuredTitle,
        items: featured.map((item: SearchItem) => ({
          label: item.title[lang],
          value: `featured:${item.id}`,
          icon: TYPE_ICON[item.type] ?? SparklesIcon,
          onSelect: () => navigate(item.href),
        })),
      },
    ];

    if (recent.length > 0) {
      next.push({
        heading: ui.recentTitle,
        items: recent.slice(0, RECENT_IDLE).map((entry) => ({
          label: entry.q,
          value: `recent:${entry.q}`,
          icon: ClockIcon,
          timestamp: recentStamp(entry.at),
          onSelect: () => runFullSearch(entry.q),
        })),
      });
    }

    next.push({
      heading: ui.popularTitle,
      items: POPULAR_SEARCHES.slice(0, POPULAR_IDLE).map((tag) => ({
        label: tag.label[lang],
        value: `popular:${tag.id}`,
        icon: SearchIcon,
        onSelect: () => navigate(tag.href, tag.label[lang]),
      })),
    });

    return next;
  }, [
    showResults,
    results,
    recent,
    featured,
    lang,
    ui,
    query,
    navigate,
    runFullSearch,
    recentStamp,
  ]);

  return (
    <CommandSearchDialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      placeholder={ui.placeholder}
      emptyMessage={ui.empty}
      groups={groups}
      showSeparators
      title={ui.title}
      description={ui.pageLead}
      tipClose={ui.tipClose}
      tipSelect={ui.tipSelect}
      tipNavigate={ui.tipNavigate}
      tipEscLabel={ui.tipEsc}
      dir={dir}
      shouldFilter={false}
      inputValue={query}
      onInputValueChange={setQuery}
      onInputKeyDown={(event) => {
        if (event.key === "Enter" && query.trim() && results.length === 0) {
          event.preventDefault();
          runFullSearch(query);
        }
      }}
      commandClassName={fa ? "font-iran" : undefined}
    />
  );
}
