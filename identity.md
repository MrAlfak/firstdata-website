# identity.md — Brand Identity & Copy Slot Map

> Purpose: replace the demo brand ("Monochrome ASCII Hub") with OUR company identity, in the right places, **without** breaking the terminal/ASCII aesthetic or touching the technical module bodies.
> How to load: import from CLAUDE.md via `@identity.md`, or paste into the prompt.
> Rule of thumb: change identity & copy. Do NOT change layout, motion (see animate.md), or the interactive widgets.

---

## 1. Brand truth — FILL THIS IN

```
Company name:        First Data
Wordmark (display):  ">First Data"   # how the name renders in the nav, e.g. ">ACME_LABS"
Slogan / tagline:    Unlock The Impossible   # the hero H1 line. short, punchy, max ~4 words ideal
One-liner:           We help businesses build what they once thought was impossible to build.   # 1 sentence: what we do + for whom
What we do:          We help businesses build what they once thought was impossible to build.
Audience:            Large Businesses
Value props (3):     You can write it better than me, you write it
Primary CTA:         Contact Us   # e.g. "Start a project", "View work"
Primary CTA link:    /contact
Secondary CTA:       Request a Consult
Secondary CTA link:  /contact
Social links:        None  (remove unused)
Our tech stack:      We Do Every Language and Framework  # for the marquee, e.g. "Next.js / Rust / Postgres / ..."
Copyright year:      2026
Contact / email:     info@firstdata.ir / +989331274039
```

---

## 2. Voice & tone (CRITICAL — keeps copy in character)

This site speaks like a **terminal / system log**, not a marketing brochure. All new copy must be *translated into this register*, never pasted raw.

DO:
- Plain, declarative, lowercase-friendly. System/CLI vocabulary where natural (`init`, `status`, `OK`, `v1.0.0`).
- Short. The hero slogan is two beats, like "Raw Logic. Refined Form."
- Specific over clever. Say what we do, not how innovative we are.
- Keep the `>`, `_`, `~`, `///`, `[OK]` typographic tics — they're part of the brand.

DON'T:
- No buzzwords: "innovative solutions", "synergy", "cutting-edge", "empower", "seamless".
- No exclamation marks, no emoji, no sentence-case marketing fluff.
- Don't lengthen anything. If our real tagline is a paragraph, compress it to a system-line.

> When our brand copy doesn't fit the register, rewrite it to fit — then note the change so we can approve.

---

## 3. Slot map (current → replace with)

Replace each LEFT value with our identity. Leave anything not listed here alone.

| # | Location | Current value | Replace with |
|---|---|---|---|
| 1 | `<title>` | `Monochrome ASCII Hub \| Raw Logic. Refined Form.` | `{Company} \| {Slogan}` |
| 2 | meta description | "A minimalist, front-end only technical showcase…" | our one-liner, rewritten in voice |
| 3 | meta keywords / OG / theme-color | ascii art, monochrome, … / `#000000` | our keywords; keep `#000000` if we stay monochrome |
| 4 | Nav wordmark | `>MONO_HUB` | `>{WORDMARK}` |
| 5 | Hero eyebrow | `FRONTEND ENGINEERING SHOWCASE` | our category line |
| 6 | Hero H1 | `Raw Logic.  Refined Form.` | our **slogan** (keep the two-beat rhythm) |
| 7 | Hero subcopy | "An exclusive showcase of high-performance…" | our one-liner expanded to 1–2 system-lines |
| 8 | Primary CTA | `Explore the Modules->` | our primary CTA + link |
| 9 | Secondary CTA | `Clone the Repo` → github.com | our secondary CTA + link |
| 10 | Version chip | `monochrome-hub ~ v1.0.0` | `{slug} ~ v1.0.0` |
| 11 | Boot log lines | `> initializing ascii_renderer...` etc. | rewrite to OUR system booting (keep the `>` log style, same number of lines) |
| 12 | Keyword marquee | `Next.js///React///TypeScript///…` | OUR stack, same `///` separators, repeated to fill |
| 13 | ASCII logo (footer) | `MH` block-letter ASCII art | **REGENERATE** for our initials — see §5 |
| 14 | Footer tagline | "A minimalist technical showcase built with precision. Pure monochrome. Pure code." | our tagline in voice |
| 15 | Footer "Connect" links | GitHub / Twitter / LinkedIn | our real socials (remove unused) |
| 16 | Footer tech-stack chips | Next.js React Tailwind Framer Motion Vercel | our stack |
| 17 | Copyright line | `// Monochrome ASCII Hub — 2026 …` | `// {Company} — {year} …` in voice |
| 18 | Terminal welcome | `Welcome to Monochrome Hub Terminal v1.0.0` | `Welcome to {Company} Terminal v1.0.0` |
| 19 | Terminal prompt host | `monochrome-hub ~ interactive` | `{slug} ~ interactive` |

---

## 4. The 8 modules — DECIDE before editing

The sections 01–08 (Kernel & Systems, Network Topologies, Distributed Ledger, Compiler Design, Graphics Pipelines, Logic Synthesis, Concurrency Models, Hardware Abstraction) are currently a **technical demo**. Choose one:

- [ ] **Keep as demo** — leave all 8 module titles, bodies, code samples, and interactive widgets untouched. (Default. Identity swap only.)
- [ ] **Repurpose as our offerings** — rename modules to our services/products and rewrite bodies. ⚠️ This is a much bigger job: the interactive widgets (logic gate, thread profiler, block inspector) are tied to the current topics and would need new concepts, not just text. Do this only if explicitly requested, one module at a time.

Until this box is ticked, **do not modify module content** — identity changes only.

---

## 5. Special cases (don't string-replace these)

- **ASCII logo (slot 13):** the `MH` block letters are art, not text. Regenerate for our initials, e.g. `figlet -f banner "{INITIALS}"` or `toilet -f mono9`, then hand-tune to the existing height/width so layout holds. Confirm it fits the footer box before committing.
- **Favicon / OG image:** if they carry the old name/logo, flag them for regeneration — they're outside the HTML and won't be caught by text edits.
- **Don't touch:** layout, spacing, the motion system (`animate.md`), any code samples inside modules, register/hash/profiler demo values (they're set dressing for the technical theme).

---

## 6. After the swap — checklist

- [ ] No occurrence of "Monochrome", "MONO_HUB", "ascii hub", or "ascii_renderer" left anywhere (grep the repo, including meta tags and the terminal section).
- [ ] Slogan reads in two beats and fits the hero on mobile without wrapping awkwardly.
- [ ] Boot log + marquee + terminal still feel like one coherent system voice.
- [ ] All CTA/social links point to real URLs (no leftover `github.com` placeholders).
- [ ] ASCII logo regenerated, favicon/OG flagged.
- [ ] Any copy that was rewritten to fit voice is listed back to us for approval.