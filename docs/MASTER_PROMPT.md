# MASTER PROMPT — Build a Premium Hebrew (RTL) Website for "Solid Yetzikot" (סוליד יציקות בע"מ)

## 0. ROLE & MISSION

You are a senior full-stack engineer, UX/UI designer, and conversion-focused copywriter working as one team. Build a **complete, production-ready, fully working B2B website** for an Israeli industrial company. The result must look like a premium agency-built site that can be sold to the client as-is.

- **Site language:** Hebrew only (`lang="he"`, `dir="rtl"`). All visible copy, labels, buttons, error messages, placeholders, alt texts, meta tags and structured data must be in natural, professional, native-sounding Hebrew. No English text leaks into the UI.
- **This prompt language:** English (instructions only).
- **Do not ask me questions. Make sensible decisions, document assumptions in the README, and deliver the finished site.** Where real data is unknown, use clearly marked placeholders (see Section 14), never invent facts, certificate numbers, statistics, client names or testimonials.

---

## 1. THE BUSINESS (real data — use exactly)

**Company:** סוליד יציקות בע"מ (Solid Yetzikot Ltd.)
**Current site (reference only, to be replaced/improved):** https://www.solid-yb.com/ (WordPress/Elementor, outdated, weak UX)
**Tagline:** "בונים את התשתית לעתיד ישראל."
**What they do:** Manufacture and supply infrastructure products for roads, drainage, sewage, electricity and telecom networks across Israel: **cast-iron products, concrete products, and combined cast-iron + concrete products.**
**Customers:** municipalities, contractors, construction companies, infrastructure/engineering firms.
**Value proposition (from existing site):** products meet strict standards; careful, controlled production at every stage; professional consulting and support throughout the project; wide experience in cast iron and concrete.

**Contact details (use exactly):**
- Office phone: 03-6031151 — answered 08:00–14:00 (Sun–Thu; confirm days as a placeholder note in README)
- Sales manager (mobile + WhatsApp): 054-6532588 → WhatsApp link: `https://wa.me/972546532588?text=שלום+הגעתי+מהאתר+ורציתי+לשאול+` (URL-encode properly)
- Email: solidyb@solid-yb.com
- Address: אזור תעשייה עמנואל (Emmanuel Industrial Zone)
- Waze: `https://ul.waze.com/ul?ll=32.17012733%2C35.15189409&navigate=yes`
- Coordinates: 32.17012733, 35.15189409

**Existing site structure to preserve and improve:** Home, Cast Products (מוצרי יצקת), Concrete Products (מוצרי בטון), Combined Products (מוצרים משולבים), Certificates & Standards (תעודות ותקנים), Price List (מחירון), About (אודות), Contact (צור קשר), Privacy Policy, Accessibility Statement.

---

## 2. PRODUCT CATALOG (seed data)

Create a typed data file (`/data/products.ts` or `products.json`) with these categories and products. Each product needs: `slug`, Hebrew `name`, `category`, `shortDescription`, `longDescription`, `applications[]`, `loadClass` (where relevant), `material`, `dimensions[]` (placeholder rows), `images[]`, `catalogNumber`, `relatedSlugs[]`, `pdfDatasheet` (optional).

**Category A — מוצרי יצקת (Cast iron products):**
1. רשתות מיצקת מסגרת מלבנית
2. פקקים ומסגרות רשת – עגולים
3. מכסים מרובעים לריצוף אבנים משתלבות
4. מכסי יצקת לתאי בקרה – מסגרת עגולה
5. מכסי יצקת לתאי בקרה – מסגרת מרובעת
6. מכסי יצקת לתאי בזק ולחשמל

**Category B — מוצרים משולבים (Combined cast iron + concrete):**
1. מכסים רשת 2 חלקים (לתאי בטון)
2. מכסים 2 חלקים לתאי בקרה בטון
3. מכסי כובע 2 חלקים (לתאי פלסטיק)
4. מכסה משולב יצקת-בטון

**Category C — מוצרי בטון (Concrete products):**
1. גומחה לחשמל (פיילר)
2. תאי בקרה – חוליות בטון
3. קולטנים – תאי תפיסה
4. תקרה מרובעת לתא

Write original Hebrew descriptions for each (2–4 sentences + a bullet list of typical applications). Keep technical claims general and safe (e.g., "מתאים לשימוש בכבישים, מדרכות ושטחים תעשייתיים בהתאם לדרגת העומס") — **do not state specific certification numbers or load-class compliance per product unless marked `// TODO: verify with client`**. Use load classes A15, B125, C250, D400, E600, F900 (EN 124 classification) as a filterable attribute, flagged as editable data.

Use tasteful placeholder product images (neutral industrial SVG illustrations or generated gradient placeholders with product icon) that are trivially replaceable via the data file. Optionally reference the existing images at `https://www.solid-yb.com/wp-content/uploads/...` ONLY as a documented swap-in option, not as hotlinks in production.

---

## 3. TECH STACK & ARCHITECTURE

**Preferred:** Next.js (App Router) + TypeScript + Tailwind CSS, statically generated (SSG) for speed and SEO. Content-driven from local typed data/JSON (no database required) so the client site is cheap to host (Vercel / Netlify / any static host).

**Fallback (if the environment can't run Next.js):** a clean multi-page static site — semantic HTML5, modern CSS (custom properties, grid/flex, logical properties), and vanilla JS modules. Same features, same design.

Requirements:
- RTL-first: use CSS **logical properties** (`margin-inline-start`, `padding-inline`, `inset-inline-end`, etc.), `dir="rtl"` on `<html>`, mirrored icons/arrows (e.g., "back" arrows point right).
- Hebrew web fonts: **Heebo** (body/UI) + **Assistant** or **Rubik** (headings), loaded via `next/font` or self-hosted with `font-display: swap` and Hebrew + Latin subsets. Numerals (phone numbers, dimensions) must render LTR using `<bdi>` / `dir="ltr"` spans so "03-6031151" never flips.
- Clean folder structure, reusable components, no dead code, ESLint + Prettier configured, strict TypeScript.
- Environment variables in `.env.example` (form endpoint, analytics ID, site URL).
- Everything must run with `npm install && npm run dev` and build with `npm run build` with zero errors/warnings. **Actually run the build and fix issues before finishing.**

---

## 4. DESIGN SYSTEM

**Brand feel:** heavy industry, strength, precision, trust, Israeli infrastructure. Modern B2B — not a template look.

**Palette (CSS variables / Tailwind theme):**
- `--ink` deep charcoal `#14171A` (primary dark)
- `--iron` cast-iron graphite `#2B3036`
- `--steel` `#5B6670`
- `--concrete` light concrete gray `#E7E9EB` / surface `#F4F5F6`
- `--accent` safety/molten orange `#F26B1D` (CTAs, highlights — reference to molten iron)
- `--accent-dark` `#C9540F`
- `--white` `#FFFFFF`
- Ensure all text/background pairs pass **WCAG AA contrast**.
- Dark hero sections with subtle texture (SVG noise / diamond-plate or manhole-grating pattern) to evoke cast iron. Light sections for catalog readability.

**Typography:** large confident Hebrew headings (clamp-based fluid sizes), generous line-height for Hebrew (1.6–1.75 body), max line length ~70 characters, weights 400/500/700/800.

**Components:** sticky header that shrinks on scroll, mega-menu for products (desktop) and slide-in drawer (mobile), cards with soft shadow + hover lift, rounded 12–16px corners, outlined/filled button variants, badges (load class, material), breadcrumbs, accordions (FAQ), tabs (product spec/downloads), tables (dimension charts), toasts, skeleton loaders, sticky mobile CTA bar.

**Motion:** subtle, purposeful (fade-up on scroll, counter animations, hover transitions). Respect `prefers-reduced-motion`. No heavy libraries unless justified (Framer Motion or CSS/IntersectionObserver is fine).

**Logo:** use a clean wordmark placeholder "סוליד יציקות" with an icon (stylized manhole cover) as SVG in `/public/logo.svg`; make it swappable. Favicon + apple-touch + OG image generated.

---

## 5. PAGES & SECTIONS (all required)

### 5.1 Home (`/`)
1. **Hero:** headline "בונים את התשתית לעתיד ישראל." + sub-headline about iron & concrete infrastructure products for municipalities and contractors. Two CTAs: "בקשת הצעת מחיר" (primary) and "לקטלוג המוצרים" (secondary). Background: dark with animated grate/manhole pattern. Trust chips under CTAs: "עומדים בתקנים", "ייצור מבוקר", "אספקה לכל הארץ".
2. **Quick contact strip:** phone, WhatsApp, email, Waze buttons.
3. **Three product pillars:** יצקת / משולבים / בטון — cards with icon, short text, link.
4. **Featured products grid** (6–8 items) from the catalog.
5. **Why Solid (למה סוליד):** 4–6 value props (standards compliance, controlled production, professional consulting, nationwide supply, experience with municipalities & contractors, one-stop iron + concrete).
6. **Who we serve:** municipalities, contractors, construction & infrastructure companies, engineers/planners — each with tailored micro-copy.
7. **Process (how it works):** 4 steps — פנייה ← התאמת מוצר ← הצעת מחיר ← אספקה.
8. **Numbers/Counters:** use placeholder values flagged `TODO` (years of experience, products, projects) — hide the section if data is empty.
9. **Standards & certificates teaser** with link to the full page.
10. **Clients/logos strip** (placeholder-ready, hidden if empty).
11. **FAQ** (6–8 Q&As in Hebrew about load classes, choosing a cover, lead times, delivery, custom orders, price list, standards) with FAQPage schema.
12. **Final CTA band + inline quick-quote form.**
13. **Footer:** logo, short blurb, quick links, products, contact details, hours, map link, privacy, accessibility statement, copyright with auto-year.

### 5.2 Product Catalog (`/products`, plus `/products/[category]`)
- Category landing pages: יצקת, משולבים, בטון.
- **Filters** (client-side, instant, URL-synced query params): category, product type, load class, material, application (כביש / מדרכה / חשמל / בזק / ניקוז / ביוב). Mobile: filter drawer. Show result count and "clear filters".
- **Search** with Hebrew-aware, diacritic-insensitive matching (e.g., Fuse.js or simple normalized search) and instant suggestions.
- Sort: relevance / name.
- Grid/list toggle.
- Empty state with CTA to contact.

### 5.3 Product Page (`/products/[slug]`)
- Gallery (zoomable, thumbnails, keyboard accessible).
- Title, catalog number, badges (load class, material).
- Short description, bullet applications, **spec/dimension table** (scrollable on mobile), downloads tab (datasheet PDF placeholder).
- **"הוסף לבקשת הצעת מחיר"** button (see 6.1) + WhatsApp-with-product-prefilled button ("שלום, אני מתעניין במוצר: {name}").
- Related products, breadcrumbs, JSON-LD `Product` (without fake prices/ratings).
- Print-friendly stylesheet for the product sheet.

### 5.4 Price List (`/price-list`)
- The original site has a price list. Build a gated-light experience: a clean page explaining pricing is per project/quantity, with a form "לקבלת מחירון עדכני" (name, company, phone, email) that, on submit, reveals/downloads the PDF placeholder and notifies the sales team. Make the gating toggleable via a config flag.

### 5.5 Certificates & Standards (`/standards`)
- Section explaining the importance of standards in infrastructure (EN 124 load classes explained in plain Hebrew with a visual table A15–F900 and typical placements), Israeli standard references as editable data (`// TODO: verify exact standard numbers and certificates with client`), downloadable certificate PDFs (placeholders), and a "Quality in production" timeline.

### 5.6 About (`/about`)
- Company story (write professional placeholder copy based on the known facts only), values, production approach, consulting/support, who we serve, location, CTA. Add an "Our factory" gallery placeholder section.

### 5.7 Contact (`/contact`)
- Full form (see 6.2), contact cards (phone with hours, sales manager, email, address), **map** (privacy-friendly: static map image or OpenStreetMap embed with click-to-load; plus Waze + Google Maps buttons), opening hours, FAQ snippet.

### 5.8 Legal pages
- `/privacy` — privacy policy in Hebrew (Israeli Privacy Protection Law compliant template, flagged for legal review).
- `/accessibility` — accessibility statement per Israeli regulations (see Section 9), including accessibility coordinator contact placeholder and date of last review.
- `/terms` (optional, short).
- Custom **404** page in Hebrew with search and links.

---

## 6. FUNCTIONAL FEATURES (must actually work)

### 6.1 Request-for-Quote Basket (RFQ)
- "Add to quote" on cards and product pages; persistent via `localStorage` (guard for SSR); header badge with item count; slide-over mini-cart; quantity input per item; remove; clear.
- `/quote` page: list of selected items with quantities + customer details form + project notes + optional file upload (drawings/BOQ, max 10MB, pdf/jpg/png/dwg) → submits all in one request.
- Success screen with reference number and "what happens next".

### 6.2 Forms (contact, quote, price list, quick CTA)
- Fields: full name*, company, phone* (Israeli format validation: mobile `05X-XXXXXXX`, landlines `0X-XXXXXXX`, accept +972), email*, customer type (עירייה / קבלן / חברת בנייה / אחר), subject, message, consent checkbox* linked to privacy policy ("אני מאשר/ת כי קראתי והבנתי את מדיניות הפרטיות…").
- Client + server validation (Zod), Hebrew error messages, accessible error summary with `aria-live`, focus management.
- Anti-spam: honeypot field + time-trap + optional Cloudflare Turnstile/hCaptcha hook (env-driven).
- **Delivery:** implement a server action / API route that sends email to `solidyb@solid-yb.com` via a pluggable provider (Resend/SMTP/Formspree – env-driven, with a working dev fallback that logs to console and writes to `/data/submissions.dev.json`). Also optionally POST to a webhook (Zapier/Make/Google Sheets) via env var. Provide a clean HTML email template in Hebrew (RTL) for the sales team and an auto-reply to the customer.
- Rate limiting on the endpoint.

### 6.3 Floating action cluster
- Persistent (RTL-aware, bottom-start) WhatsApp, phone, Waze, email buttons (replicating the original site's utility icons but better). On mobile: a sticky bottom bar with "התקשר" / "וואטסאפ" / "הצעת מחיר". Hide the phone button outside office hours? No — instead show "מענה טלפוני: 08:00–14:00" tooltip and an "open now / closed" indicator computed in `Asia/Jerusalem` timezone.

### 6.4 Load-class selector tool ("איזה מכסה מתאים לי?")
- A small interactive wizard (3 questions: where will it be installed — pedestrian / parking / road / heavy industrial / airport; type of network — ביוב / ניקוז / חשמל / בזק; shape/size preference) → recommends the suitable EN 124 load class + links to matching products + CTA to request a quote. Show a disclaimer that final selection must be confirmed by the project engineer. Rules should live in an editable data file.

### 6.5 Other
- Click-to-call/WhatsApp/mailto tracking events.
- Cookie consent banner (Hebrew, granular: necessary / analytics), analytics loads only after consent (GA4 or Plausible, env-driven).
- Language/direction is fixed (Hebrew), but structure code so adding English later is feasible (i18n-ready content layer).
- Scroll-to-top, skip link, reading progress on long pages.
- Simple **JSON-based content config** (`/config/site.ts`) holding company name, contacts, hours, social links, feature flags — one place to rebrand/resell for another client.

---

## 7. COPYWRITING GUIDELINES (Hebrew)

- Tone: professional, confident, concise, engineering-credible; no empty marketing fluff, no exaggerated claims.
- Use industry-correct Hebrew terms: מכסה לתא בקרה, רשת ניקוז, מסגרת, דרגת עומס, יציקת ברזל (nodular/ductile iron only if confirmed — otherwise "ברזל יצוק"), תא ביוב, קולטן, חוליית בטון, גומחה/פיילר, תשתיות, קבלן, רשות מקומית.
- Headlines ≤ 8 words; CTAs are verbs ("קבלו הצעת מחיר", "צרו קשר", "לצפייה במוצרים").
- Gender-inclusive phrasing where natural ("קבלו", "צרו קשר").
- Proofread punctuation, geresh/gershayim in acronyms (ת"י, בע"מ), and Hebrew quotes. No machine-translated feel.
- Provide all copy in a central `/content/he.ts` (or JSON) so the client can edit text without touching components.

---

## 8. SEO (Hebrew, local & B2B)

- Unique `<title>` and meta description per page in Hebrew; canonical URLs; `og:` and Twitter cards with generated OG images; `og:locale=he_IL`.
- Semantic URLs: use clean ASCII slugs (e.g., `/products/manhole-covers-round`) while displaying Hebrew titles. Add `redirects` mapping from the old WordPress URLs (e.g., `/about-us/`, `/5828-2/`, price list, certificates) to the new routes to preserve SEO — include a `redirects` config and a documented table in README.
- `sitemap.xml`, `robots.txt`, breadcrumb schema, `Organization` + `LocalBusiness` (`Manufacturer`) schema with address, geo, phone, openingHours, `FAQPage`, `Product` schemas.
- Target keyword themes (naturally integrated, never stuffed): מכסי ביוב, מכסי יציקה, מכסי ברזל לתאי בקרה, רשתות ניקוז, מכסים לריצוף אבנים משתלבות, תאי בקרה מבטון, קולטנים, חוליות בטון, גומחת חשמל, יצרן מוצרי תשתית בישראל, מכסים D400.
- One H1 per page, logical heading order, descriptive internal links, image `alt` text in Hebrew.
- Optional: lightweight blog/knowledge-base (`/knowledge`) with 3 seeded Hebrew articles (e.g., "איך בוחרים דרגת עומס למכסה תא בקרה", "ההבדל בין מכסה יצקת למכסה משולב", "מדריך לבחירת מכסה לריצוף אבנים משתלבות") — MDX-driven, with Article schema.

---

## 9. ACCESSIBILITY (Israel — legal requirement)

- Comply with **Israeli Standard 5568 (aligned to WCAG 2.0/2.1 AA)** and the Israeli Equal Rights for Persons with Disabilities (Service Accessibility Adjustments) Regulations.
- Semantic landmarks, keyboard-only navigation, visible focus rings, skip-to-content link, ARIA only where needed, proper form labels/errors, alt text, sufficient contrast, resizable text up to 200%, no keyboard traps, reduced-motion support, accessible modals/drawers with focus trapping, accessible tables.
- Include an **accessibility toolbar widget** (built in-house, no third-party overlay): font size +/-, high-contrast mode, grayscale, underline links, readable font, pause animations, reset — persisted in `localStorage`, with link to the accessibility statement.
- Generate the `/accessibility` statement page (coordinator name/phone/email placeholders, last-updated date).
- Run automated checks (axe-core / Lighthouse a11y) and fix all issues; target Lighthouse Accessibility ≥ 95.

---

## 10. PERFORMANCE, SECURITY, QUALITY

- Lighthouse targets (mobile): Performance ≥ 90, SEO 100, Best Practices ≥ 95.
- `next/image` (or `<picture>` with AVIF/WebP, width/height set, lazy loading, LCP image prioritized), font preloading, minimal JS, code-splitting, no layout shift (CLS < 0.05).
- Security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS note), sanitized inputs, server-side validation, no secrets in client bundle, file-upload validation (type/size, no execution).
- Mobile-first responsive design tested at 360, 390, 768, 1024, 1280, 1536 px. Touch targets ≥ 44px. Most traffic is expected from mobile contractors on-site — optimize for one-handed use and fast "call / WhatsApp / quote".
- Cross-browser: latest Chrome, Safari (iOS), Firefox, Edge.
- Add unit tests for validators/filters/quote-basket logic and one Playwright e2e test for "browse → add to quote → submit".
- **Self-QA checklist before finishing:** run build, lint, type-check, tests, Lighthouse/axe; click through every page and link; verify RTL on all components (no mirrored/misaligned icons, no overflow, phone numbers LTR); verify forms in success/error states; fix everything found.

---

## 11. IMPROVEMENTS OVER THE EXISTING SITE (explicitly implement)

1. Modern, trustworthy industrial design vs. dated Elementor look.
2. Real catalog with filters, search, load-class logic and spec tables (the old site is a plain list).
3. Quote basket + structured RFQ flow (the old site only has a generic contact form).
4. "Which cover do I need?" selection wizard.
5. Standards education page that builds trust with municipalities and engineers.
6. Mobile sticky action bar and WhatsApp prefilled messages per product.
7. Open/closed indicator for phone hours (08:00–14:00).
8. Legal compliance: accessibility toolbar + statement, privacy policy, consent-based cookies, consent checkbox on every form.
9. SEO foundations + redirect map from old URLs + structured data.
10. Fast, static, cheap-to-host architecture and a single config file for rebranding.

---

## 12. DELIVERABLES

1. Complete source code, runnable and building cleanly.
2. `README.md` (in English) with: setup, scripts, folder map, how to edit content/products/config, how to connect email/webhook/analytics, deployment steps (Vercel/Netlify), redirect table, assumptions, and a **client handover checklist**.
3. `CONTENT_TODO.md` listing every placeholder that needs real data from the client (certificate files, standard numbers, real product photos, dimension tables, company history, client logos, accessibility coordinator, legal review of privacy/accessibility texts).
4. `.env.example`.
5. A short **"Sales kit"** markdown (`SALES_KIT.md`, English) with: feature list for pitching, suggested pricing tiers/maintenance package outline, and a 10-point demo script.
6. At the end, output a concise summary: what was built, how to run it, known limitations, and next steps.

---

## 13. EXECUTION ORDER (follow strictly)

1. Scaffold project, tooling, RTL base, fonts, design tokens.
2. Build data layer (site config, content, products, load classes, wizard rules).
3. Build layout (header, mega-menu, footer, floating actions, cookie banner, accessibility toolbar).
4. Build pages in order: Home → Catalog → Product → Quote → Contact → Standards → About → Price list → Legal → 404 → (Knowledge base).
5. Implement forms, API/email layer, RFQ basket, selector wizard.
6. SEO, schema, sitemap, redirects, OG images.
7. Accessibility, performance, security pass.
8. Tests, QA checklist, fix everything.
9. Write README, CONTENT_TODO, SALES_KIT. Final summary.

---

## 14. PLACEHOLDER & TRUTHFULNESS RULES

- Never fabricate: certificate numbers, ISO claims, client names, testimonials, years in business, number of projects, prices, delivery times, or legal text presented as final.
- Mark every unknown as `TODO(client)` in code and list it in `CONTENT_TODO.md`; render placeholder sections only if the data exists (otherwise hide gracefully).
- Use only the verified business facts in Section 1.
- Any technical statement about standards must be framed generally and flagged for verification by the client's engineer.

**Begin now. Deliver the complete working site.**
