# ADDENDUM — Firebase Backend, Always-On Hosting & Payments
(Append to the MASTER PROMPT. Where this addendum conflicts with the master prompt, THIS ADDENDUM WINS.)

## A0. ENVIRONMENT

You are running inside **Google Antigravity**. Use the **Firebase MCP server** and agent skills available in the workspace to create/link the Firebase project, fetch web-app config, and deploy. Before writing Firebase code, consult the Firebase MCP / official docs for current best practices instead of relying on memory. Work in a plan → implement → verify loop: produce an implementation plan first, then execute, then verify in the browser (preview) and report with a walkthrough. Never print or commit secrets.

## A1. STACK OVERRIDE

- **Next.js (App Router) + TypeScript + Tailwind**, deployed to **Firebase App Hosting** (server-rendered, supports API routes/server actions). Static pages use SSG/ISR where possible for speed.
- Firebase services to use:
  - **Firestore** — products (editable catalog), orders, quote requests, form submissions, price-list leads, site settings.
  - **Firebase Authentication** — (1) admin login (email/password + optional Google sign-in, restricted to an allow-list of admin emails via custom claims); (2) optional customer accounts (email link / Google) so contractors can see order & quote history.
  - **Cloud Storage for Firebase** — product images, datasheet PDFs, certificates, customer file uploads (drawings/BOQ), with strict Storage Security Rules (type/size limits, no public write).
  - **Cloud Functions (2nd gen)** or Next.js server routes — payment webhooks, email sending, invoice triggers, scheduled jobs. Use **Secret Manager** (via App Hosting `apphosting.yaml` secrets) for all keys.
  - **Firebase App Check** (reCAPTCHA Enterprise or Turnstile where applicable) to protect Firestore/Storage/Functions from abuse.
  - **Firebase Analytics / Google Analytics 4** — only after cookie consent (Consent Mode v2).
  - Optional: **Firebase Extensions** "Trigger Email" for transactional email, if no external provider is chosen.
- Keep the master prompt's design, RTL, SEO, accessibility and performance requirements unchanged.

## A2. SECURITY RULES & DATA MODEL (must be written and tested)

Write `firestore.rules`, `storage.rules`, and `firestore.indexes.json`, and test them with the **Firebase Emulator Suite** (unit tests for rules).

Collections (suggested):
- `products/{id}` — public read, admin write.
- `categories/{id}` — public read, admin write.
- `siteSettings/main` — public read of safe fields, admin write.
- `quotes/{id}` — create: anyone (validated, rate-limited via Function/App Check); read/update: admin only (and owner if authenticated).
- `orders/{id}` — created ONLY by server code after payment intent creation; status updated ONLY by the verified payment webhook; read: admin + owner. **Clients must never be able to set price, status or payment fields.**
- `leads/{id}` — contact/price-list submissions; create-only for public, read admin.
- `users/{uid}` — own profile only; role via custom claims (`admin`, `sales`).
- `auditLog/{id}` — server-written, admin read.

Rules: deny by default; validate field types/lengths; no client-side price trust (**prices are always recomputed on the server from Firestore**); admin checks via custom claims, not hard-coded UI flags.

## A3. ADMIN DASHBOARD (`/admin`, Hebrew RTL, behind auth)

A simple but polished back-office so the client needs no developer for day-to-day work:
- Login (Firebase Auth), role-based access.
- **Products manager:** add/edit/delete/reorder products, categories, load classes, dimension tables, images (drag-and-drop upload to Storage), publish/unpublish, SEO fields, price (optional) and "show price / request quote" toggle per product.
- **Quotes & leads inbox:** list, filter by status (חדש / בטיפול / נשלחה הצעה / נסגר), search, notes, assign to sales rep, export CSV, one-click "reply by email / WhatsApp".
- **Orders:** list, status, payment status, receipt/invoice link, refund action (via payment provider API, admin only), export CSV.
- **Content:** edit price-list PDF, certificates, FAQ, homepage featured products, contact details, opening hours, announcement banner.
- **Dashboard:** counts of new quotes/orders, revenue (paid orders), top viewed products.
- Everything validated, with audit log entries for sensitive actions.

## A4. ALWAYS-ON HOSTING & PRODUCTION READINESS ("the site must stay online")

- Deploy to **Firebase App Hosting** (connected to a GitHub repo for CI/CD: push to `main` → automatic rollout; PRs → preview where available). Provide `apphosting.yaml` with sensible `minInstances` (set to 1 for production to avoid cold starts, and document the cost implication), memory/concurrency, and secret bindings. Document that the production project requires the **Blaze (pay-as-you-go) plan**, and add **budget alerts** in the README.
- **Custom domain** setup instructions for `solid-yb.com` (and `www` redirect), automatic SSL, HTTP→HTTPS, canonical host redirect. Include a **safe migration plan** from the old WordPress site: lower DNS TTL beforehand, keep the 301 redirect map, verify, then switch; keep old site as backup until verified.
- Environments: `dev` (emulators), `staging`, `production` as separate Firebase projects (or at minimum staging + production) with separate secrets and **payment sandbox vs live** keys.
- **Uptime & monitoring:** Firebase Performance Monitoring, Cloud Logging error alerts, Crashlytics-style error reporting (e.g., Sentry optional), and an external uptime check (Google Cloud Monitoring uptime check or UptimeRobot) on the homepage and the health endpoint `/api/health` (checks Firestore reachability). Email/WhatsApp alert to the owner on downtime.
- **Backups:** scheduled Firestore export to a Cloud Storage bucket (daily, retention 30 days) via scheduled Function; document restore steps.
- Graceful degradation: if payment or email provider is down, the site still renders, the quote flow still saves to Firestore, and the user sees a friendly Hebrew message with phone/WhatsApp fallback.
- Maintenance mode flag in `siteSettings`.
- Add a **GO-LIVE CHECKLIST** to the README.

## A5. PAYMENTS

Business reality: this is a B2B manufacturer. Most customers (municipalities, contractors) buy via quotes, purchase orders and invoices, but smaller customers and deposits benefit from online payment. Implement **three payment paths**, controlled by feature flags in `siteSettings`:

1. **Pay online (card / Bit / Apple Pay / Google Pay where supported)** for products flagged `purchasableOnline: true` (typically small items with fixed prices) and for **"pay deposit"** on an approved quote.
2. **Payment link / invoice payment:** admin can generate a secure payment link for any approved quote or order amount and send it to the customer by email/WhatsApp; customer pays on a hosted page.
3. **Offline / PO / bank transfer:** customer submits order → status "ממתין לתשלום" → bank details shown + email → admin marks as paid manually.

### Provider (abstracted)
Implement a **payment-provider interface** (`PaymentProvider` with `createCheckout`, `verifyWebhook`, `refund`, `getStatus`) and ship one concrete adapter **plus a mock adapter for dev/tests**. Choose the primary adapter from this priority (read the provider's current official docs via web/MCP first and confirm availability for an Israeli merchant account):
- **Israeli gateways (preferred for Israeli businesses):** PayPlus, Cardcom, Tranzila, or Grow (Meshulam) — hosted payment page / iframe / payment-link API with Hebrew UI, ILS, installments (תשלומים), Bit and digital wallets, and automatic Israeli tax invoice/receipt generation where supported.
- **Alternative:** Stripe (only if the client's account supports it) using Stripe Checkout (hosted) + webhooks.
Default adapter to implement: **PayPlus** (hosted payment page + IPN/webhook), with the code structured so Cardcom/Tranzila/Stripe adapters can be added by implementing the same interface. Provider choice is set via `PAYMENT_PROVIDER` env var. Add a README table comparing the providers and what the client must do to open a merchant account.

### Mandatory payment rules
- **Never handle or store raw card data.** Use hosted checkout / hosted fields only (keep the site out of PCI scope; document SAQ-A level). No card numbers in logs, Firestore or analytics.
- **Server-authoritative pricing:** the checkout endpoint receives only product IDs + quantities; the server reads prices from Firestore, computes subtotal, **VAT (מע"מ, configurable rate, currently 18% — read from config, not hard-coded)**, shipping, discounts, and total in agorot/integers; creates the `orders` document with status `pending`, then creates the provider checkout session.
- **Webhooks:** verify signature/secret, enforce **idempotency** (store provider transaction ID; ignore duplicates), and update the order to `paid` / `failed` / `refunded` only from the verified webhook (plus a reconciliation job that polls pending orders older than X minutes).
- Success and failure return pages in Hebrew (`/checkout/success`, `/checkout/failed`) that read order status from the server, never from URL params alone.
- **Invoices (Israel):** after successful payment, generate/attach a **חשבונית מס / קבלה** through the payment provider's invoicing or a pluggable invoicing adapter (e.g., Green Invoice/Morning, iCount, Invoice4U — choose one adapter + interface). Support the Israeli Tax Authority **allocation number (מספר הקצאה)** requirements where applicable, and flag `TODO(client): confirm with accountant` for thresholds, VAT treatment and invoice wording. Email the invoice PDF to the customer and store the link on the order.
- **Cart & checkout UX (Hebrew RTL):** extend the RFQ basket into a dual-mode cart: "בקשת הצעת מחיר" (default) and "לתשלום" (only for purchasable items). Checkout form: contact + company (optional ח.פ / עוסק מורשה number with validation), delivery address / pickup from factory (אזור תעשייה עמנואל), delivery notes, terms acceptance, invoice details. Shipping: configurable (flat / by region / quote-based / pickup), because heavy cast-iron items are usually delivered by truck — support "shipping quoted separately".
- **Terms of sale pages** (`/terms`, `/returns`, `/shipping`) in Hebrew drafted to Israeli consumer/B2B norms and flagged for legal review (including cancellation/return policy for custom-made products and the Israeli Consumer Protection Law, cancellation-of-transaction rules where relevant).
- Email notifications: order confirmation to customer; new-order alert to `solidyb@solid-yb.com`; payment-failed notice; refund notice. Hebrew RTL templates.
- Admin can issue **full/partial refunds** through the adapter, with audit log.
- Test matrix (sandbox): successful payment, declined card, abandoned checkout, duplicate webhook, forged webhook, tampered price in the client request, refund. Provide automated tests for the server-side pricing + webhook handler.

## A6. ENV VARS & SECRETS (document all in `.env.example`, never commit real values)

`NEXT_PUBLIC_FIREBASE_*` (public web config), `FIREBASE_ADMIN_*` (via App Hosting secrets / ADC), `PAYMENT_PROVIDER`, `PAYPLUS_API_KEY`, `PAYPLUS_SECRET_KEY`, `PAYPLUS_PAGE_UID` (and equivalents for other adapters), `PAYMENT_WEBHOOK_SECRET`, `INVOICING_*`, `EMAIL_*`/Resend or Trigger Email config, `TURNSTILE_*` or reCAPTCHA keys, `NEXT_PUBLIC_GA_ID`, `SITE_URL`. Provide a script/README step to set secrets with the Firebase CLI.

## A7. DELIVERABLES ADDED BY THIS ADDENDUM

1. `firebase.json`, `.firebaserc`, `apphosting.yaml`, `firestore.rules`, `storage.rules`, `firestore.indexes.json`, emulator config + seed script (loads the 14 seed products into Firestore).
2. Admin dashboard + payment flows working end-to-end against the **emulators and payment sandbox**.
3. `DEPLOYMENT.md`: step-by-step (create Firebase project → upgrade to Blaze → connect GitHub → set secrets → deploy → connect domain → webhooks → go-live checklist → rollback).
4. `PAYMENTS.md`: provider comparison, merchant-account steps, sandbox testing guide, invoice/VAT notes, refund procedure.
5. `SECURITY.md`: threat model summary, rules explanation, key rotation, App Check, backup/restore.
6. Update `CONTENT_TODO.md` and `SALES_KIT.md` with the new features (admin panel, online payments, uptime/monitoring, backups) and suggested monthly maintenance package.

## A8. EXECUTION ORDER (replaces step 5–7 of the master order where relevant)

1. Firebase project link + emulators + auth + Firestore/Storage rules + seed data.
2. Move catalog to Firestore (with local seed fallback), keep SSG/ISR for SEO.
3. Forms/RFQ → Firestore + email + App Check.
4. Admin dashboard.
5. Cart/checkout + payment adapter + webhooks + invoices (sandbox).
6. Hosting config, CI/CD, monitoring, backups, custom domain docs.
7. Full QA: rules tests, payment test matrix, Lighthouse, axe, e2e (Playwright with emulators). Fix everything.
8. Deploy to **staging first**, verify, then give me the exact commands/steps for production. Do NOT switch payment to live mode or change DNS yourself; stop and ask me to confirm.

**Truthfulness rule remains:** do not invent provider capabilities, prices, tax rules or legal text; verify against current official documentation and flag anything uncertain as `TODO(client)`.
