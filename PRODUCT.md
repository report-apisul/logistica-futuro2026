# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no framework or build step. Shared styles in `assets/site.css`, a shared scroll-behavior script in `assets/nav-scroll.js`. The 13 interview pages and their hub are generated from a Node script (`Conteudo/gerar_entrevistas.js`) that outputs static `.html` files — there is no server-side rendering or client routing. Hosted on GitHub Pages at `report-apisul/logistica-futuro2026`, served from `index.html` at the repo root.

## Users

Business partners, clients, and prospects of Grupo Apisul — the primary use case is Everton sending a specific page link (an interview, the palestra, a video) directly to a contact in the transport/logistics/risk-management industry. Recipients are professionals already familiar with the sector (transportadoras, embarcadores, seguradoras, gerenciadoras de risco) rather than a general consumer audience.

## Product Purpose

A digital report/magazine covering **Logística do Futuro**, an industry event Grupo Apisul participated in and partly covered: a keynote panel (Apisul & Atvos, on accident prevention and AI-driven risk management) and 13 interviews with companies in the transport-tech and risk-management space. The site exists to give each piece of coverage — the panel, each interview, each video — its own shareable, permanent URL, so Everton can send a precise link instead of a single long page. Success is strengthening Grupo Apisul's brand and relationships with industry contacts, not conversion or lead capture.

## Positioning

Not a generic event recap: each interview follows a consistent "Raio-X" format (what it is, what problem it solves, what's the innovation, where it's headed) built from real quotes, and the flagship panel piece is treated as a full editorial feature (data blocks, a system diagram, a "point of friction" callout, a human-factor section) rather than a wrap-up post. The editorial voice and visual system are deliberately modeled on Grupo Apisul's own prior event report, **Precarga 2026** (`report-apisul.github.io/precarga2026`), establishing a recognizable "Apisul report" format across events.

## Operating Context

- Content originates as Portuguese-language Markdown source files in `Conteudo/` (interview transcripts/copy, the palestra content brief) that Everton supplies; pages are built or regenerated from that source.
- Photos for the interviews live in `Assents/Intrevistas_Fotos/` (gitignored, kept out of the repo) and are copied into `entrevistas/fotos/` at their final web-ready names.
- Three of the 13 interviews (Jomed, T4S Tecnologia, Netfleet/Driver Série A) currently have no photo and fall back to an initial-letter placeholder.
- The `/videos.html` page is a placeholder hub awaiting real motion-graphics and palestra-clip video files.
- Everton runs a local static server via the project's preview tooling to review changes before they're pushed live to GitHub Pages.

## Capabilities and Constraints

- Pure static site: no backend, no CMS, no build pipeline beyond the one Node generator script for interview pages.
- The Hero section (`index.html`'s top viewport — video background, animated telemetry widgets, parallax) is a previously-built Design Canvas (`x-dc`) component with its own runtime (`support.js`) and must never be visually redesigned; only the shared floating nav within it may be adjusted in sync with the rest of the site.
- All other pages/sections use the shared editorial system in `assets/site.css` (navy `#101826` + cream `#F2EEE6`, Sora/Spectral/IBM Plex Mono), consciously matching Precarga 2026's visual language.
- Adding or reordering an interview means editing the `COMPANIES` array (and, for a reorder, the `ORDER` array) in `Conteudo/gerar_entrevistas.js` and rerunning it — not hand-editing the generated HTML files.

## Brand Commitments

- Product/site name: **Logística do Futuro**. Publisher: **Grupo Apisul**.
- The Hero (video, copy, telemetry widgets, purple/dark sci-fi aesthetic, and its floating pill nav's glass styling) is locked and must not be redesigned by future work.
- Quotes attributed to named speakers (e.g., Daniel Nobre, Daniel Cunha, Marco Aurélio Badim) and to the 13 interviewed companies are factual/sourced and must not be reworded or reattributed.
- Visual language for every non-Hero page follows the Precarga 2026 report as reference (navy/cream palette, Sora/Spectral/IBM Plex Mono, floating glass nav consistent with the Hero's own).

## Evidence on Hand

- `Conteudo/logistica-do-futuro-materias_intrevistas.md` — full copy for all 13 company interviews, each with pull quotes and a "Raio-X" fact box.
- `Conteudo/Palestra-apisul-atvos-conteudo-pagina.md` — full editorial brief for the Apisul & Atvos panel page, including stats, a system diagram spec, and a closing quote.
- `Assents/Intrevistas_Fotos/` — real event photos for 10 of the 13 interviewed companies (gitignored locally, copied into the repo per-company).
- No video assets yet for `/videos.html` — that page is intentionally a placeholder until Everton supplies motion-graphics and palestra-clip files.

## Product Principles

- Every distinct piece of coverage (the panel, each interview, each future video) gets its own permanent, shareable URL — never buried inside one long page.
- The Hero is sacred: strong, singular, previously approved, and out of scope for redesign.
- Every other page reads as the same "Apisul report" system as Precarga 2026 — consistent typography, palette, and floating nav — so the two event reports feel like one continuing publication, not one-off pages.
- Content fidelity over embellishment: quotes, numbers, and company claims come from the supplied source Markdown and are not paraphrased or invented.
