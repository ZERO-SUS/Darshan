# 🛠️ Portfolio Redesign — Working Log

> **Purpose of this file:** This is the persistent memory for the redesign of Darshan's
> portfolio. If you (Claude) are opening this project fresh in a new session, **read this
> whole file first.** It tells you what's decided, what's done, and what to do next so you
> can continue cleanly without re-asking questions or redoing work.
>
> **How to use it:** After finishing a chunk of work, update the "Task Board" statuses and
> add an entry to the "Session Log" at the bottom. Keep it honest — if something is half
> done or untested, say so.

Last updated: **2026-08-15** (Session 2 — UI effects from Prompt Resources added, build green)

---

## 1. What we're building

A full redesign of Darshan's existing React + Vite + Tailwind portfolio, in place, in
`E:\Z-new website`. Goal: a **clean, professional, designer-grade** portfolio that looks
like the work of a serious front-end developer. Not a template — real polish, real spacing,
real motion, accessible in both light and dark.

The old site was a generic dark "developer terminal" template (Fira Code mono, `#262626`
background, `#0015FF` blue, `#home` hashtags, `~~~>` arrows). We are moving away from that.

## 2. Decisions locked with the user (do NOT re-litigate)

| Decision | Choice |
|---|---|
| **Theme** | **Light + dark toggle.** Warm-light is the default; dark-slate is the alternate. Both fully tuned. |
| **Aesthetic** | **Clean modern.** Drop the terminal gimmicks (`#tags`, `~~~>`, all-mono). Space Grotesk for display/body, JetBrains Mono only for small labels/eyebrows/tags. Generous spacing, real hierarchy. |
| **Palette** | **"Peach Skyline"** (from Figma color library, combination 82). |
| **Scope** | Redesign in place. Keep all real content + all working features (Firebase blog, admin dashboard, SEO/OG meta, resume). |

### Peach Skyline palette (source hexes)
- `#496580` — deep slate-blue ("skyline") → text/anchor in light, base bg in dark
- `#FFD3AC` — light peach
- `#FFB5AB` — soft coral
- `#E39A7B` — warm terracotta → primary accent
- `#DBB06B` — golden tan

Full token mapping lives in `src/index.css` (`:root` = light, `[data-theme="dark"]` = dark).
Tailwind semantic names (`bg`, `surface`, `surface-alt`, `ink`, `muted`, `line`, `accent`,
`accent-strong`, `coral`, `peach`, `gold`) map to those CSS vars — same class works in both
themes.

## 3. Real content — the source of truth (preserve this)

- **Name:** Darshan
- **Role:** Web designer & front-end / full-stack developer
- **Location:** Bangalore, India · self-taught · ~1+ yr
- **Email:** darshan99806@gmail.com
- **GitHub:** https://github.com/Its-darshu
- **Discord:** darshan_66 (https://discord.com/users/darshan_66)
- **X / Twitter:** @cookmithick (https://x.com/cookmithick)
- **Resume:** `/Darshan-Resume.pdf` (in `public/`)
- **Projects (complete):** Phish Guard, DarkSphere, Sullia auto, SmartQ, AI tutor, Visora
  (data + links live in `src/pages/Projects.jsx` and the featured one in `src/pages/Home.jsx`)
- **Small projects:** Discord quest
- **Project images:** SVGs in `public/` (11.svg, darksphere.svg, sullia-auto.svg, smartq.svg,
  aitutor.svg, visora.svg)
- **Skills / Fun facts:** currently inline in `Home.jsx` / `About.jsx` — keep the data, restyle.

⚠️ Some old social links are placeholders (`dribbble.com/yourusername`,
`figma.com/@yourusername`, footer discord `yourusername`). **Ask the user** for real handles
or drop those icons — don't ship dead links. (Tracked as an open question below.)

## 4. Tech stack (unchanged)

React 18 · Vite 5 · Tailwind 3 · React Router 6 · Firebase (Firestore) · react-helmet-async ·
react-markdown + remark-gfm · @prerenderer/rollup-plugin. Deploy: Vercel. `api/og.js` is a
serverless OG endpoint.

## 5. Architecture of the redesign

```
src/
  index.css            ← design tokens (CSS vars, both themes) + base + prose
  theme/
    useTheme.js        ← theme state (localStorage + system pref), toggles data-theme on <html>
  components/
    ThemeToggle.jsx    ← sun/moon switch (in header)
    Button.jsx         ← reusable button (variants: solid / outline / ghost)
    Logo.jsx           ← refined mark
    Header.jsx         ← clean nav + theme toggle + mobile menu
    Footer.jsx
    MediaSidebar.jsx   ← fixed social rail (desktop)
    SectionTitle.jsx   ← eyebrow + heading + rule
    SkillBlock.jsx
    ProjectCard.jsx    ← peach card, tags, live/code links
    Tag.jsx            ← small mono pill
  pages/  Home, Projects, About, Contact, Blog, BlogPostDetail, AdminDashboard
```

No-flash theme: a tiny inline script in `index.html` sets `data-theme` before first paint.

### Effects layer (`src/components/effects/`) — from `Prompt Resorces/`
All are self-contained (no external libs), GPU-friendly, `prefers-reduced-motion` aware, and
disabled on coarse/touch pointers where relevant. CSS engine for them lives at the bottom of
`src/index.css` (neon/liquid buttons, `.spotlight*`, `.glass`, `.spotlight-text`, `.lift-*`,
`@property --angle`).

| Resource (originkit/reactbits) | Component | Wired into |
|---|---|---|
| neon-border | `Button variant="neon"` (`.btn-neon`) | Home hero résumé CTA |
| liquid-carve-button | `Button variant="liquid"` (`.btn-liquid`) | Home hero "View my work" |
| magic-bento | `effects/SpotlightCard.jsx` | ProjectCard + SkillBlock |
| spotlight-text | `effects/SpotlightText.jsx` | Home hero "web experiences" |
| textlift | `effects/TextLift.jsx` | Home hero name "Darshan" |
| liquid-distortion | `effects/LiquidImage.jsx` + `LiquidFilterDefs` (in App) | ProjectCard images |
| juiceeffect | `effects/Magnetic.jsx` | Home hero buttons |
| ripple-distortion | `effects/RippleCursor.jsx` (mounted in App) | global cursor |
| glass-surface | `effects/GlassDock.jsx` (bottom dock) | replaced `MediaSidebar` in App |

Notes / knobs:
- `MediaSidebar.jsx` is now UNUSED (GlassDock replaced it). Left in repo; delete if you like.
- SpotlightCard sets `--mx/--my` via ref on mousemove (no React re-render). Card content is
  `relative z-10` so the glow sits behind text.
- RippleCursor reads `--accent` from the theme, so it recolors with light/dark.
- If any effect feels like too much, they're isolated — remove one import to drop it.

## 6. Task Board  (update these as you go)

Legend: ⬜ todo · 🟨 in progress · ✅ done · ⏸️ blocked/waiting

- ✅ Recon: read all pages/components, captured real content, found palette + refs
- ✅ Locked direction with user (light+dark toggle, clean modern)
- ✅ **Foundation** — fonts (Space Grotesk + JetBrains Mono), tokens, tailwind config, index.css, useTheme, ThemeToggle, no-flash script
- ✅ **Components** — Logo, Button, Header, Footer, MediaSidebar, SectionTitle, SkillBlock, ProjectCard, Tag, Reveal, icons.jsx (shared SOCIALS)
- ✅ **Pages** — Home (hero/stats/featured/skills/about-teaser/CTA), Projects, About, Contact (mailto form)
- ✅ **Blog/Admin restyle** — Blog, BlogPost, BlogPostDetail rewritten to tokens; AdminDashboard color classes migrated (logic untouched); prose tokenised
- ✅ **Build verify** — `npm run build` green, no warnings; vendor chunks split (react/firebase/markdown)
- ⬜ **Visual QA** — NOT yet seen rendered in a browser. Run `npm run dev` and eyeball both themes + mobile. (See "next" below.)
- ⬜ **Polish pass** — fine-tune spacing/motion after visual QA; refresh `<title>`/OG copy to "Front-End Developer"
- ⬜ **Content** — replace/remove placeholder social links (needs user input); add real profile photo; favicon `/logo.svg` is missing in `public/` (pre-existing 404)

## 7. Open questions for the user

1. Real **Dribbble / Figma / LinkedIn** handles? (old ones are `yourusername` placeholders)
2. Want a working **contact form** (e.g. Formspree/EmailJS) or keep it as direct links?
3. Any new **profile photo** to drop in `public/`? (hero currently uses `prosvg.svg`)

## 8. How to run / verify

```bash
npm install       # node_modules is gitignored / was missing — install first
npm run dev       # local dev at http://localhost:5173
npm run build     # production build → dist/  (use this to verify no errors)
```

---

## 9. Session Log

### Session 1 — 2026-08-15
- Explored the whole project; documented real content + tech.
- Pulled the exact **Peach Skyline** hexes and confirmed direction with the user via a
  2-question prompt → **light+dark toggle + clean-modern (drop terminal)**.
- Wrote this log.
- Started `npm install` (was missing).
- Built the **entire redesign end-to-end** in this session:
  - Design system: CSS-var tokens for light+dark, Tailwind semantic colors, Space Grotesk +
    JetBrains Mono, no-flash theme script, `useTheme` hook, animated `ThemeToggle`.
  - New/rewritten components: Button, Tag, SectionTitle, SkillBlock, ProjectCard, Header
    (sticky/blur/mobile menu + toggle), Footer, MediaSidebar, Logo, Reveal (scroll-in),
    shared `icons.jsx` with a single `SOCIALS` source of truth.
  - Pages: Home, Projects, About, Contact fully redesigned; Blog/BlogPost/BlogPostDetail
    rewritten; AdminDashboard migrated to tokens (logic preserved).
  - Vite: split react/firebase/markdown vendor chunks (was one 881 kB blob → now ~74 kB
    initial + lazy vendor chunks).
- **Build:** `npm run build` passes clean.
- **NOT done:** I have not visually inspected the rendered site in a browser this session.
  Everything is code-correct and compiles, but spacing/contrast/motion should be eyeballed.

### Session 9 — 2026-08-15  (Warp headings, text-clip fix, image fit, image sound — verified)
- **Descender clipping FIXED**: the culprit was `TextRoll` — `.text-roll__col{overflow:hidden}`
  clipped "g/p/y/Q" tails (and my first padding fix left an orange sliver of the 2nd layer).
  Final fix in index.css: `.text-roll` + `.text-roll__col` `line-height: 1.3` (no padding) — tall
  enough clip box for descenders AND the two roll layers stay exactly one box apart (no peek).
  Also relaxed SectionTitle h2 to `leading-[1.08]`.
- **WarpText** (reactbits warp-text, WebGL/`ogl`) downloaded to `src/components/reactbits/WarpText/`.
  New wrapper `effects/WarpHeading.jsx` mounts WarpText ONLY while the heading is in view
  (IntersectionObserver) and renders plain styled text otherwise → keeps FPS high (≤1–2 GL
  contexts at once) + SEO. `fontFamily/fontSize="inherit"` so it keeps the Syne size/style.
  Applied via `SectionTitle warp` to: "Projects I'm proud of", "What I do", "Skills & tech",
  "Who I am"; and directly (orange) to the CTA "Let's build together".
- **Ripple image fits the screen**: panel changed from cropping `h-[34vw]` to
  `aspect-[1584/396] w-full` → the whole wide banner shows, edge-to-edge, no crop.
- **Image sound**: ripple panel tagged `data-sound="move"` + `data-cursor="hover"`. SoundFx now
  (a) treats `[data-sound]` as interactive (hover tick + click), and (b) plays a soft throttled
  "swish" on mousemove over `[data-sound="move"]`.
- **VERIFIED** headless Chrome: warp heading renders (kept Syne), no descender clipping / no
  sliver, ripple fits at 4:1, no console errors, build green.

### Session 8 — 2026-08-15  (Sound, image swap, layout fixes — verified)
- **Hover sound**: `effects/SoundFx.jsx` (mounted in App) — synthesised Web Audio tick when the
  cursor moves onto a new interactive element + a lower click on press. AudioContext unlocks on
  first gesture (autoplay policy). Fine-pointer only. No audio asset files.
- **Ripple image swapped**: user gave `F:\ALL\TRASH\Downlodes\LinkedIn cover - 1.svg` (1584×396,
  embedded raster). Copied to `public/cover.svg` and RASTERISED to `public/cover.png` via headless
  Chrome (WebGL needs a raster). Ripple band now uses `/cover.png`, is **full-bleed wide + big**
  (`h-[34vw]`, edge-to-edge, no text). Deleted old `public/ripple.jpg`.
  To re-rasterise if the SVG changes: load an HTML wrapper with `<img src=cover.svg>` in puppeteer
  at 1584×396 and screenshot to cover.png.
- **FPS**: RippleDistortion `quality="medium"` (was high) — the main GPU cost.
- **About panel**: made compact (`py-16 md:py-24`, smaller headline/gaps) and the portrait is now
  **square** (`aspect-square`, max 340px) instead of a tall rectangle.
- **Footer marquee glitch FIXED**: `Marquee.jsx` rebuilt to one track holding TWO identical copies
  animating exactly `-50%` (keyframe updated) → seamless, no jump.
- **VERIFIED** via headless Chrome: no console errors, square about image, wide cover band, seamless
  footer marquee, build green. (Sound can't be screenshot-verified — test live by hovering buttons.)
- Note: the cover art is dark/mostly-black on the left half; it reads as a moody full-width band.
  Swap `public/cover.png` (+ cover.svg) for a different image anytime.

### Session 7 — 2026-08-15  (Panels reworked + scan button + footer — verified)
- **Ripple band**: removed the "Move your cursor" text, made it BIG (`70vh`), and pointed it
  at a real local image `public/ripple.jpg` (downloaded placeholder — user should swap for their
  own). grayscale off, orange tint, dispersion on.
- **About panel**: rebuilt BIG — two-column, tall (`min-h-560px`), portrait in a `SpotlightCard`
  with `LiquidImage` hover distortion + floating name badge; giant gradient headline, big copy,
  a 3-stat row, and a scan-grid button. Its own `SectionTitle` ("Who I am").
- **CTA**: scrapped the ParticleText panel (user disliked it). Now a big editorial statement —
  huge "Let's build together" (gradient), a large mesh-hover email link, and scan + neon buttons.
  ParticleText no longer imported on Home.
- **Scan-grid button** (originkit scan-grid-button logic): new `.btn-scan` variant (grid overlay
  fades in + a light bar scans across on hover). Added `variant="scan"` to Button; used in About
  + CTA.
- **Footer**: fully reworked with interactions — "LET'S CONNECT" + huge mesh-hover email, hover-
  grow social buttons, a **Marquee** band, TextRoll nav links, a **live IST clock** (updates every
  second), and an animated back-to-top button. Aura backdrop.
- **VERIFIED** via headless Chrome (about/cta/footer/ripple): no console errors, footer email
  fits, ripple image loads, build green.
- Reminder: `public/ripple.jpg` is a stock placeholder — swap it for a real image.

### Session 6 — 2026-08-15  (Single light theme + custom cursor + effects — verified)
- **Removed dark/light toggle** entirely → ONE theme: **orange on white**. Tokens rewritten in
  `src/index.css` (:root now the only theme; `[data-theme]` selectors all alias it). Accent =
  `#FF5C14` orange, bg warm white, near-black ink. Deleted the no-flash script from index.html.
  `ThemeToggle.jsx` + `theme/useTheme.js` are now UNUSED (left in repo, safe to delete).
- Fixed all dark-only utility classes for light: `.card`/`.glass-nav` borders now use
  `rgb(var(--ink)/0.08)`; Home `border-white/*` → `border-line`, `bg-white/*` → ink/surface-alt.
- **MagicBento** re-themed to light (white cards `#ffffff`, dark text via `--white:#18120f`,
  orange glow `255,92,20`); Home passes `glowColor="255, 92, 20"`.
- **Custom cursor** (`effects/CustomCursor.jsx`, mounted in App): dot + ring using
  `mix-blend-mode: difference` → inverts to black over white / white over dark ("black or white
  when overlaid" logic). Ring lags with easing, grows over interactive elements. Native cursor
  hidden on fine pointers via `html.has-custom-cursor { cursor:none }`. Touch devices unaffected.
- **Page zoom**: `html { font-size: 110% }` — everything a bit bigger/bolder.
- **originkit text effect logic** (reimplemented from the effect behavior, since originkit blocks
  automated download): `effects/TextRoll.jsx` = "textmorph" per-letter roll-on-hover (used on nav
  links + work-list titles). SpotlightText (spotlight-follows-cursor gradient) and TextLift
  (letters lift on hover) already existed and remain in the hero.
- **VERIFIED** via headless Chrome: single orange/white theme renders, cursor inverts correctly
  (black disc over white row, grows on hover), no console errors, build green.
- Note: cursor ring is a filled 40→72px disc (classic difference-blend look). If it feels like it
  covers text too much, switch `.cursor-ring` to a transparent bg + `border` in index.css.

### Session 5 — 2026-08-15  (Editorial "big" pass — verified)
Refs given: haoqi.design & noth.in (big type, huge whitespace, editorial, scroll reveals).
- Removed the word "sexy" from the hero.
- Hero is now **type-forward & huge** (Syne, `text-[9.5vw]`→`6.6vw`): eyebrow row
  (Available · Darshan — Front-end Developer & Designer · Bangalore, IND), 3-line statement
  headline ("Designing & building / digital experiences / with craft & taste.") with gradient
  + mesh-hover lines, TextMorph role, CTAs, "Scroll to explore" cue. Portrait moved OUT of
  hero into the About teaser.
- Selected Work is now a big **editorial list** (index · huge title · tags · description ·
  arrow, hover highlight) instead of cards.
- Every hero line + section is `Reveal`-wrapped (scroll-in, staggered).
- Bigger spacing site-wide (`py-24 md:py-36`), bigger SectionTitle (`text-4xl md:text-6xl`).
- **Bugs fixed**: (1) mobile menu was `-z-10` (rendered behind page) → now `z-40` with the nav
  pill at `z-50`. (2) GlassDock floated bottom-center and OVERLAPPED content → now a **vertical
  glass rail** on the left margin (`xl:` only, in the gutter, never overlaps); socials stay in
  footer on smaller screens.
- **VERIFIED** again via headless Chrome screenshots (desktop hero, work list, mobile): no
  console errors, headline fits with no clipping/mid-word breaks, dock no longer overlaps.
- Still TODO: give Projects/About/Contact/Blog the same big editorial treatment; swap the
  RippleDistortion placeholder image.

### Session 4 — 2026-08-15  (MAJOR overhaul — verified with screenshots)
User wanted a totally different, sexy modern-designer vibe: new colors, new fonts, glass/
transparent, effects everywhere, less "template" layout. Locked via 2-question prompt:
- **Theme → "Sunset noir"** (warm dark, coral→amber, glassy). Dark is now the DEFAULT
  (index.html no-flash script defaults to 'dark'; light is the toggle variant).
- **Fonts → Syne** (display/headings) + **Sora** (body) + JetBrains Mono. Loaded in index.html;
  Tailwind `font-display` = Syne. Base rule applies Syne to h1/h2/h3.
- Rewrote all color tokens in `src/index.css` (Sunset noir + warm-light variant).
- `.card` is now glassmorphism (translucent + backdrop-blur + white/10 border). Added
  `.glass-nav`, `.text-glow`, `.mesh-text`, `.marquee`, gradient-pan animation.
- Header → floating glass **pill** nav (centered, top-4).
- Home **relaid out**: full-height hero (giant Syne headline w/ TextLift name +
  MeshTextHover + SpotlightText glow + gradient), TextMorph rotating role, glass portrait,
  marquee strip, work grid, MagicBento, ripple band, glass skills, about teaser, ParticleText
  CTA. New effect components: `MeshTextHover`, `TextMorph`, `Marquee`.
- **VERIFIED**: ran `vite preview` + headless Chrome (system Chrome via puppeteer) and
  screenshotted every section in dark mode. Zero console errors. All real reactbits components
  render (MagicBento, GlassSurface dock, ParticleText, RippleDistortion). Screenshots saved in
  the session scratchpad (home-dark-top/full, scroll-0..4).
- **Open**: RippleDistortion still uses the external Unsplash default image (grayscale nature
  photo). Swap `src` in Home.jsx to a local raster for something personal/on-brand.
- Other pages (Projects/About/Contact/Blog) inherit the new tokens+fonts automatically but
  were NOT re-laid-out this session — they still use the previous section structure. Next pass
  could give them the same bold treatment.

### Session 3 — 2026-08-15
User wanted the ACTUAL components from `Prompt Resorces/`, downloaded, not reimplementations.
- **reactbits.dev** items → downloaded REAL source via their shadcn registry
  (`https://reactbits.dev/r/<Name>-JS-CSS`, MIT-licensed) into `src/components/reactbits/`:
  - **MagicBento** (magic-bento) — needs `gsap`; recolored purple→peach, cardData replaced
    with portfolio capabilities. Used in Home "What I do".
  - **GlassSurface** (glass-surface) — real Apple-glass distortion; now powers `GlassDock`.
  - **ParticleText** (particle-text) — canvas particle heading; used as Home CTA "Let's talk"
    (color/highlight themed via `useTheme`).
  - **RippleDistortion** (ripple-distortion) — WebGL (`ogl`); interactive band on Home,
    peach tint. NOTE: default image is an external Unsplash URL (see follow-up).
  - Installed deps: `gsap@^3.13.0`, `ogl@^1.0.11`. Vite `fx` chunk splits them out.
  - Removed my custom `RippleCursor` from App (the resource's ripple = the WebGL image one).
- **originkit.dev** items → COULD NOT auto-download. The site is a Cloudflare-protected Next.js
  SPA; `/r/*.json` returns HTML and the component pages 403 to bots. So these have no exact
  source pulled: liquid-carve-button, neon-border, meshtexthover, textmorph, pixeldrift,
  spotlighttext, textlift, pixel-led-display, text-vaporize, liquid-distortion, juiceeffect.
  - Faithful in-house equivalents already exist for the main ones (liquid/neon buttons,
    SpotlightText, TextLift, LiquidImage, Magnetic/juice) in `src/components/effects/`.
  - Still missing (no equivalent yet): meshtexthover, textmorph, pixeldrift, pixel-led-display,
    text-vaporize. **To get exact originkit versions:** user copies the code from each
    originkit page's "copy" button and pastes it, OR we build custom versions.
- `npm run build` green. Chunks: firebase 486k, fx 124k, index 106k, react 163k, markdown 157k.

### Session 2 — 2026-08-15
- User asked to add the UI effects listed in `Prompt Resorces/new portfilo resorces.txt`.
- Built a self-contained **effects layer** (see table above) instead of pulling originkit/
  reactbits packages — lighter, on-brand, and theme-aware. Total cost: ~4 kB JS, ~6 kB CSS.
- Wired the best-fit effects into hero + cards + global cursor + a bottom **glass dock**
  (which replaced the left MediaSidebar rail).
- `npm run build` green (337 modules; main JS 77 kB, CSS 40 kB pre-gzip).
- **Still NOT visually inspected in a browser.** Same as before — run `npm run dev` and check.
- Possible follow-ups if effects feel heavy: tune `SpotlightCard` glow radius/alpha in
  `index.css` (`.spotlight::after`), or ripple throttle in `RippleCursor.jsx`.

### ▶ NEXT SESSION — start here
1. `npm run dev`, open http://localhost:5173. Check **both** themes (toggle top-right) and
   **mobile** width. Look at: hero balance, card contrast in dark mode, focus rings, the
   mobile menu, the mailto contact form.
2. Note anything off → quick polish pass (spacing, color contrast on peach/coral in dark).
3. Get real social handles from user (Dribbble/Figma/LinkedIn) → edit `SOCIALS` in
   `src/components/icons.jsx` once. Drop any the user doesn't use.
4. Optional: add a real profile photo to `public/` and point the hero `<img src>` at it
   (currently `/prosvg.svg`). Add `public/logo.svg` for the favicon.
5. Refresh `index.html` `<title>`/meta + `README.md` to the new positioning if desired.
