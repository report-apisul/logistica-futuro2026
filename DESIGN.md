---
name: Logística do Futuro
description: Editorial event report for Grupo Apisul — the Hero stays its own locked sci-fi world; every other page is a navy-and-cream field report.
colors:
  navy-ground: "#101826"
  navy-ground-2: "#16202f"
  navy-line: "#22344C"
  paper-cream: "#F2EEE6"
  ink: "#14161A"
  body-text: "#4A4842"
  label-text: "#6B6559"
  hairline: "#DCD6C9"
  signal-cyan: "#4FD1E8"
  teal-link: "#1F6F7D"
  steel: "#93A3B8"
  steel-2: "#6E8299"
  hero-purple: "#7c5cff"
typography:
  display:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(30px, 5.2vw, 58px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-.03em"
  headline:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(21px, 2.5vw, 27px)"
    fontWeight: 600
    lineHeight: 1.24
    letterSpacing: "-.02em"
  title:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(18px, 2vw, 23px)"
    fontWeight: 600
    lineHeight: 1.22
    letterSpacing: "-.02em"
  body:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "clamp(16px, 1.45vw, 18.5px)"
    fontWeight: 300
    lineHeight: 1.82
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "10.5px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: ".18em"
rounded:
  pill: "999px"
  md: "12px"
  sm: "2px"
spacing:
  pad: "clamp(20px, 5vw, 72px)"
  max-width: "1180px"
components:
  nav-pill:
    backgroundColor: "rgba(16,24,38,.92)"
    textColor: "{colors.paper-cream}"
    rounded: "{rounded.pill}"
    padding: "9px 10px 9px 22px"
  nav-pill-compact:
    backgroundColor: "rgba(16,24,38,.92)"
    textColor: "{colors.paper-cream}"
    rounded: "{rounded.pill}"
  item-row:
    backgroundColor: "{colors.paper-cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "clamp(22px, 4vh, 34px) 0"
  raiox-box:
    backgroundColor: "{colors.paper-cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
  cta-pill:
    backgroundColor: "transparent"
    textColor: "#e9e4ff"
    rounded: "{rounded.pill}"
    padding: "8px 6px 8px 16px"
---

# Design System: Logística do Futuro

## Overview

**Creative North Star: "The Field Report"**

The Hero is its own world — a cinematic, purple-lit sci-fi command console (video backdrop, live telemetry, glassmorphism) — and it is locked; this document does not govern it and no future work should redesign it. Everything a visitor reaches *from* the Hero — the panel feature, the 13 interview pages, the video hub — belongs to a second, deliberately different world: a sober navy-and-cream editorial report, modeled on Grupo Apisul's own prior event publication, Precarga 2026. The two worlds meet only at the shared floating nav, which borrows the Hero's glass treatment (blur, gradient, translucency) so the transition between them reads as one continuing site, not a jarring hand-off.

Within the report world, restraint carries the authority. Pages read like a printed trade-sector dossier: navy section breaks, cream reading columns, hairline rules instead of shadows or gradients, and a mono label style for every piece of metadata (dates, categories, "ler entrevista →"). Nothing competes with the reporting — quotes, numbers, and company facts are the content, and the system's job is to present them with unhurried confidence.

**Key Characteristics:**
- Two coexisting worlds: the Hero (locked, out of scope) and the Field Report (this document's actual subject).
- Navy (`#101826`) for section breaks and the shared nav; warm cream (`#F2EEE6`) for reading surfaces.
- Sora for structure (headlines, UI labels-as-headings), Spectral for reading (serif body text, light weight, generous line-height), IBM Plex Mono for metadata (dates, categories, kickers, "more" links) — always uppercase, always letter-spaced.
- Flat by design: hairline borders and 1px-gap grid dividers do the separating; there is no drop-shadow vocabulary in the report world.
- Cyan (`#4FD1E8`) is the one live accent — link hovers, active nav state, blockquote rule — used sparingly against the otherwise achromatic navy/cream/ink palette.

## Colors

Two palettes: the Hero's purple/near-black world (referenced only, never re-specified here) and the Field Report's navy/cream/cyan system, which this file governs.

### Primary
- **Signal Cyan** (`#4FD1E8`): the system's one live-wire color. Active nav link, hover states on links and list rows, the blockquote's left rule, "real-time" status dots. Used narrowly — see the One Signal Rule below.

### Secondary
- **Teal Link** (`#1F6F7D`): the resting color for inline text links and "read more" affordances inside cream sections — quieter than cyan, reserved for default (non-hover, non-active) link state.
- **Hero Purple** (`#7c5cff`): carried over only as a tertiary accent inside stat blocks that reference Atvos-scale figures, and inside the CTA pill's border in the nav (`rgba(140,120,255,.65)`) — the one deliberate visual thread tying the report back to the Hero it extends from.

### Neutral
- **Navy Ground** (`#101826`): the section-break color — page-head heroes on interior pages, the footer, alternating home-page sections, the nav pill's base tone.
- **Navy Ground 2** (`#16202f`): a slightly lighter navy for cards/callouts that sit on top of a navy section (e.g. the palestra's "feature card").
- **Navy Line** (`#22344C`): hairline borders and dividers on navy surfaces.
- **Paper Cream** (`#F2EEE6`): the default reading-surface background — body copy, interview list, raiox boxes.
- **Ink** (`#14161A`): primary text color on cream, and headline color throughout.
- **Body Text** (`#4A4842`): the serif reading-body color — softer than pure ink, sized for long-form comfort.
- **Label Text** (`#6B6559`): mono metadata color (kickers, "Raio-X" field labels, item numbers).
- **Hairline** (`#DCD6C9`): dividers and borders on cream surfaces — the cream-world equivalent of Navy Line.
- **Steel** (`#93A3B8`) / **Steel 2** (`#6E8299`): secondary text on navy surfaces (nav links at rest, speaker roles, lede copy).

### Named Rules
**The One Signal Rule.** Signal Cyan appears only as *evidence of interaction or life*: an active nav state, a hover, a blockquote's rule, a "real-time" dot. It never fills a background or colors static body text. Its rarity is what makes it read as alive.

**The Two-World Rule.** The Hero's palette (near-black `#04060f`, purple `#7c5cff`, cyan `#5ee7ff`) and the Field Report's palette (`#101826` navy / `#F2EEE6` cream) are never merged into one token set. A page is either Hero or Field Report; nothing blends the two beyond the shared nav pill and the intentional Hero Purple thread noted above.

## Typography

**Display/Headline Font:** Sora (with system sans-serif fallback)
**Body Font:** Spectral (with Georgia, serif fallback)
**Label/Mono Font:** IBM Plex Mono (with monospace fallback)
**Nav Exception:** the shared nav pill's brand mark and links use `'Switzer', 'Sora', sans-serif` — Switzer is the Hero's own typeface, kept only inside the shared nav component so it visually matches the Hero exactly; it is not part of the report world's type system anywhere else.

**Character:** Sora is the structural voice — confident, geometric, slightly condensed at display sizes, used wherever the page asserts hierarchy. Spectral is the reading voice — a light-weight serif built for long paragraphs, giving the report an unhurried, printed-dossier feel against the sans-serif structure around it. IBM Plex Mono is the system's "instrument panel" voice: every metadata label, date, category, and micro-CTA is mono, uppercase, and wide-tracked, so the reader always knows at a glance which text is *content* (Spectral) versus *system* (Mono).

### Hierarchy
- **Display** (700, `clamp(30px, 5.2vw, 58px)`, 1.05): page-head `h1` on interior pages — the palestra title, "Entrevistas," "Vídeos."
- **Headline** (600, `clamp(21px, 2.5vw, 27px)`, 1.24): in-article `h2` section breaks inside long-form pieces (the palestra's "Uma linha caindo, outra parada," etc.).
- **Title** (600, `clamp(18px, 2vw, 23px)`, 1.22): interview-list item titles (company names) and card headlines.
- **Body** (300, `clamp(16px, 1.45vw, 18.5px)`, 1.82, max ~72ch): the serif reading column — interview bodies, palestra prose.
- **Label** (500, 10–11px, letter-spacing `.14em`–`.2em`, uppercase): nav links, item numbers, kickers/eyebrows, Raio-X field labels, "ler entrevista →" links.

### Named Rules
**The System-Voice Rule.** If it's metadata, navigation, or a call-to-action fragment, it's IBM Plex Mono, uppercase, wide-tracked. If it's something the reader is meant to actually *read*, it's Spectral. Sora is reserved for hierarchy markers (headings, titles) — it never carries body copy and Spectral never carries a heading.

## Layout

Content sits in a `1180px` max-width column (`--max`), with fluid outer padding `clamp(20px, 5vw, 72px)` (`--pad`) that scales from ~20px on phones to 72px on wide desktop. Article body copy narrows further to `~720px` inside that column for reading comfort.

The report world alternates full-bleed navy and cream sections down the page (home page: cream "O evento" → navy "Painel" → cream "Entrevistas" → navy "Vídeos" → navy footer), each edge-to-edge with no card container — the section *is* the surface. Interior pages open with a navy `page-head` (kicker, `h1`, lede, optionally speaker chips) and hand off to a cream `main` for the actual content.

The interview hub and any other listing use a single-column row list (`.item`/`.prog`), not a card grid: number, thumbnail, and text sit in one clickable row separated by hairline dividers, so 13 entries read as a table of contents, not a wall of tiles. Below 640px the thumbnail drops and the row collapses to number + text only.

## Elevation & Depth

Flat by design — there is no shadow vocabulary of blurred, colored drop-shadows anywhere in the report world. Depth is conveyed by three flat devices instead: navy-vs-cream section contrast, 1px hairline borders/dividers, and 1px-gap background grids (stat blocks and the mini-card grid use a `background: hairline-color` container with `gap: 1px` so each cell reads as a bordered tile without a single extra shadow rule). The nav pill is the sole exception — it carries a soft ambient shadow (`0 12px 32px rgba(2,5,20,.35)`) plus a backdrop blur, because it is the one element deliberately inheriting the Hero's glass language rather than the report's flat one.

### Named Rules
**The Flat-Report Rule.** Nothing in the report world casts a colored or diffuse shadow. If two things need to feel separated, give them a hairline border or a navy/cream contrast — never a shadow.

## Shapes

Two corner languages coexist on purpose. The shared nav and anything explicitly inheriting the Hero's glass treatment use full pill radius (`999px`) — round caps, circular icon badges. Everything native to the report world uses a small, restrained radius (`12px` on photography and video frames; effectively square, hairline-bordered edges everywhere else — raiox boxes, stat tiles, list dividers). There is no in-between radius; a surface is either a pill or is square-cornered.

### Named Rules
**The Pill-or-Square Rule.** Radius is binary: `999px` (nav, avatar badges, the CTA's arrow chip) or a small `12px`/square (photos, videos, content boxes). No medium radius anywhere.

## Components

Character in one phrase: **restrained and confident** — thin hairline borders, weighty Sora headings, and almost no ornament; the type and the whitespace carry the authority, not decoration.

### Navigation
The one component shared verbatim between the Hero and the report world: a floating glass pill (`position: fixed`, `top: 14px`, `border-radius: 999px`, `background: rgba(16,24,38,.92)` — the same flat navy tone as Precarga 2026's own nav, not a gradient — `backdrop-filter: blur(18px) saturate(1.4)`, 1px `rgba(170,196,255,.16)` border). Brand mark left (Sora 600, uppercase, `.2em` tracking), center links (Mono, uppercase, `rgba(214,226,255,.78)` at rest → white on hover → cyan when active, sliding underline), and a bordered CTA pill on the right with a circular arrow badge. On scroll past 40px it animates its own `top` from 14px down to 4px (see `assets/nav-scroll.js`) and grows a slightly heavier shadow — physically "docking" closer to the viewport edge to give reading more room — then eases back to 14px when the page returns to the top. Below 760px the center links hide entirely; only brand + CTA remain, at reduced padding so the pill never overflows small viewports.

### Cards / List Rows
- **Corner Style:** effectively square; only the embedded photo/video thumbnail carries `12px` radius.
- **Background:** cream, no container box — the divider *is* the boundary.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px hairline (`#DCD6C9`) bottom divider between rows; 1px `#14161A` rule above the first row of a list.
- **Interaction:** the entire row is one link (number, photo, and text together) — never just the title. Hover lifts the title color to teal and the "more" label to cyan; the thumbnail image scales `1.08×` inside its clipped frame.

### Raio-X / Fact Boxes
- **Style:** no fill, no border-box — a single `1px solid var(--ink)` top rule introduces the block, then each field is a `dt`/`dd` pair separated by hairline dividers.
- **Field labels:** Mono, uppercase, `10px`, label-gray.
- **Field values:** Spectral, `16px`, ink.

### Stat Tiles
- **Style:** a CSS grid of cells with `1px` visible gap against a hairline-colored background, so the gap itself renders as the border between tiles — no per-tile border rule needed.
- **Value:** Sora 700, `26–30px`, ink (or teal/purple for a result/scale variant).
- **Label:** Spectral 300, `12–13px`, body-gray.

### Buttons / CTAs
- **Shape:** pill (`999px`), matching the nav.
- **Primary (nav CTA):** transparent fill, `1px solid rgba(140,120,255,.65)` border, cream text, trailing circular arrow badge; hover adds a soft purple glow shadow and a faint purple-tinted fill.
- **Inline text CTA ("Ler entrevista →", "Ver todas as 13 entrevistas →"):** no button chrome at all — Mono label color that shifts teal→cyan on hover, arrow baked into the copy.

## Do's and Don'ts

### Do:
- **Do** keep the Hero exactly as built — video, telemetry, purple glassmorphism, copy — and treat it as read-only evidence, never as a pattern to extend into the report world.
- **Do** make an entire list row (number + photo + text) a single link; never wrap only the title.
- **Do** use IBM Plex Mono, uppercase, wide-tracked, for every piece of metadata (dates, kickers, item numbers, "more" links) — never Sora or Spectral for that role.
- **Do** separate content with hairline borders or navy/cream contrast, never with a drop shadow, inside the report world.
- **Do** keep photo and video frames at `12px` radius and every other report-world surface square-cornered or pill (`999px`) — no medium radius.
- **Do** let the shared nav pill dock closer to the top edge on scroll and return to its resting position at the top of the page, on every page including the Hero.

### Don't:
- **Don't** redesign, restyle, or re-theme the Hero section under any circumstance.
- **Don't** introduce drop shadows, colored glows, or card containers with fill+shadow inside the report world (the nav pill's glass shadow is the sole, deliberate exception).
- **Don't** blend the Hero's palette (`#04060f`/`#7c5cff`/`#5ee7ff`) with the report's palette (`#101826`/`#F2EEE6`) into a single token set — Hero Purple's narrow reuse in the nav CTA border is the only sanctioned crossover.
- **Don't** reword, reattribute, or invent quotes and company facts; all interview and palestra copy is sourced and fixed.
- **Don't** add a hover/active state to Signal Cyan anywhere it would stop being rare — it signals "live/active," not decoration.
