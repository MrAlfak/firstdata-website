/** Per-service terminal art rendered inside the TerminalWindow panel. */

type ServiceTerminal = {
  /** Tab title shown in the chrome bar */
  title: string;
  /** Multi-line ASCII art / status panel (keep lines ≤ 40 chars) */
  art: string;
  /** Short status lines, always LTR, appended below the art */
  statusLines: string[];
};

const serviceAscii: Record<string, ServiceTerminal> = {
  "01": {
    title: "web-renderer, firstdata.ir", art: `┌─────────────────────────────────┐
│ ○ ○ ○   firstdata.ir            │
├─────────────────────────────────┤
│  ██████████████████████████████ │
│  HERO, ABOVE THE FOLD          │
│  ─────────────────────────────  │
│  ┌──────────┐  ┌──────────────┐ │
│  │ sidebar  │  │ main content │ │
│  │ ──────── │  │ ──────────── │ │
│  │ item 1   │  │ paragraph .. │ │
│  │ item 2   │  │ paragraph .. │ │
│  └──────────┘  └──────────────┘ │
│  ─── SERVICES ────────────────  │
│  ─── FOOTER ──────────────────  │
└─────────────────────────────────┘`, statusLines: [
      "LCP:  0.8s      [OK]", "SEO:  100/100   [OK]", "PWA:  ready     [OK]", "HTTPS: A+       [OK]", ], }, "02": {
    title: "android-emulator, API 34", art: `      ╔═══════════════╗
      ║  ─────────────  ║
      ║  ┌───────────┐  ║
      ║  │  APP  UI  │  ║
      ║  │ █████████ │  ║
      ║  │ ─────     │  ║
      ║  │ ─────     │  ║
      ║  │ [  BTN  ] │  ║
      ║  └───────────┘  ║
      ║  ○    ─    □    ║
      ╚═══════════════╝`, statusLines: [
      "targetSDK: 34   [OK]", "minSDK:    24   [OK]", "ABI:       arm64[OK]", "SIGNED:    yes  [OK]", ], }, "03": {
    title: "ios-simulator, iOS 17", art: `      ╔═══════════════╗
      ║   ───────────   ║
      ║ ╔─────────────╗ ║
      ║ ║   APP  UI   ║ ║
      ║ ║  █████████  ║ ║
      ║ ║  ─────────  ║ ║
      ║ ║  ─────────  ║ ║
      ║ ║  [ ACTION ] ║ ║
      ║ ╚─────────────╝ ║
      ║       ○         ║
      ╚═════════════════╝`, statusLines: [
      "iOS:   17.0     [OK]", "Swift: 5.9      [OK]", "AppStore: pass  [OK]", "SIGNED: yes     [OK]", ], }, "04": {
    title: "win-process.exe, x64", art: `┌─ App.exe ──────────────── □ ─ × ┐
│  File   Edit   View   Help       │
├──────────────────────────────────┤
│ ┌─────────┐  ┌─────────────────┐ │
│ │  MENU   │  │  MAIN  CONTENT  │ │
│ │ ──────> │  │                 │ │
│ │ ──────> │  │  ┌───────────┐  │ │
│ │ ──────> │  │  │  DATA     │  │ │
│ │ ──────> │  │  └───────────┘  │ │
│ └─────────┘  └─────────────────┘ │
└──────────────────────────────────┘`, statusLines: [
      "OS:    Win 10/11[OK]", "ARCH:  x64/arm64[OK]", "SIGNED: yes     [OK]", "INSTALL: NSIS   [OK]", ], }, "05": {
    title: "seo-audit, firstdata.ir", art: `  performance audit ─────────────
  Performance  ████████████  98
  SEO          █████████████ 100
  Best Prac.   █████████████ 100
  Accessibility████████████  99
  ─────────────────────────────
  LCP:  0.8s    FID:  12ms
  CLS:  0.01    TTFB: 180ms
  ─────────────────────────────
  backlinks: ↑   indexed: yes`, statusLines: [
      "CoreWebVitals:  [PASS]", "RANK: top-3     [OK]", "SCHEMA: valid   [OK]", "SITEMAP: yes    [OK]", ], }, "06": {
    title: "figma-handoff, wireframe", art: `  wireframe ──────────────────────
  ┌────────────────────────────┐
  │[LOGO]  [NAV ─────────] [>]│
  ├────────────────────────────┤
  │  ████████  HEADLINE        │
  │  subcopy . . . . . .       │
  │  [■ PRIMARY] [○ SECONDARY] │
  ├────────────────────────────┤
  │ ┌──────┐┌──────┐┌──────┐  │
  │ │ CARD ││ CARD ││ CARD │  │
  │ └──────┘└──────┘└──────┘  │
  └────────────────────────────┘`, statusLines: [
      "FIGMA:  exported[OK]", "PROTO:  yes     [OK]", "A11Y:   WCAG AA [OK]", "HANDOFF: done   [OK]", ], }, "07": {
    title: "store-engine, zarinpal", art: `┌─ shop.firstdata.ir ──────────────┐
│  [SEARCH ────────────] [🛒 CART] │
├──────────────────────────────────┤
│  ┌────────┐  ┌────────┐          │
│  │  IMG   │  │  IMG   │          │
│  │────────│  │────────│          │
│  │  $49   │  │  $129  │          │
│  │ [BUY]  │  │ [BUY]  │          │
│  └────────┘  └────────┘          │
├──────────────────────────────────┤
│  CHECKOUT ──> PAYMENT ──> DONE   │
└──────────────────────────────────┘`, statusLines: [
      "GATEWAY: Zarinpal[OK]", "SSL:     A+      [OK]", "PCI:     pass    [OK]", "ORDERS:  managed [OK]", ], }, "08": {
    title: "monitor-daemon, 24/7", art: `  uptime monitor, last 24h ──────
  API      ████████████████  99.9%
  Database ████████████████ 100.0%
  CDN      ████████████████ 100.0%
  Worker   ██████████████░░  97.2%
  ─────────────────────────────
  incidents:  0    alerts:  0
  avg response:  < 200ms
  MTTR: < 15min   SLA: 99.9%`, statusLines: [
      "SLA:   99.9%    [OK]", "RESP:  <200ms   [OK]", "MON:   24/7     [OK]", "BACKUP: daily   [OK]", ], }, };

export default serviceAscii;
