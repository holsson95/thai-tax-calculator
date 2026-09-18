# TASK-022A — Technical SEO, Crawlability & Indexation Audit

**AUDIT ONLY.** No source code, content, tax data, routing, metadata, sitemap, robots.txt, or config
was modified in the production of this document. Only `TECHNICAL_SEO_022.md` was created.

Read as part of this audit: `CLAUDE.md`, `CONTENT_INVENTORY.md`, `SEO_METADATA_021.md`,
`INTERNAL_LINKING_020.md`, `TAX_HUB_2026.md`, `TAX_EXAMPLES.md`, `PROJECT_AUDIT.md`, `seo.md`,
`package.json`, `MEMORY.md`; `src/App.tsx`, `src/main.tsx`, `src/entry-server.tsx`,
`scripts/prerender.mjs`, `public/robots.txt`, `docs/robots.txt`, `docs/sitemap.xml`, `docs/llms.txt`,
`index.html`; every file in `src/pages/`; `src/components/layout/{Layout,Header,Footer}.tsx`;
`src/components/AnnualTaxWizard.tsx`, `src/components/MonthlyWithholding.tsx`,
`src/data/calculatorMeta.ts`, `src/data/articles.ts`, `src/data/sources.ts`, `src/data/taxExamples.ts`;
and a sample of the actual generated static HTML in `docs/` (homepage, `/annual-tax/`, `/about/`,
one article) to verify what is actually true of the built output, not just the source.

**Important context this audit relies on**: git history shows `SEO_METADATA_021.md` (a prior metadata
audit) was completed and its Tier 1 fixes were *already implemented* in commit `06a07d8` ("Fix SEO
metadata audit findings...") on the same day, and `docs/` was rebuilt afterward. This audit verified
those fixes directly against current source and the current `docs/` build rather than assuming the
prior audit's findings still apply — several no longer do (see §16 for a list of what SEO_METADATA_021
flagged that is now fixed vs. still open). This audit also goes beyond metadata into sitemap/robots/
rendering/internal-crawlability/structured-data mechanics, which the metadata audit did not cover in
depth.

---

## 1. Executive summary

The site's technical SEO foundation is solid and, since `06a07d8`, materially better than a typical
AI-assisted project: a real SSR pre-render pipeline produces genuine static HTML for every indexable
route, the sitemap is generated from the same article data the site actually serves (no hand-maintained
drift), canonical URLs are present and self-referencing on every page, and structured data (Article,
BreadcrumbList, FAQPage, WebApplication, SoftwareApplication, WebPage) is real, accurate, and not
padded with invented properties. The `/annual-tax/` split-metadata bug documented in `SEO_METADATA_021.md`
is confirmed fixed — verified directly in the built `docs/annual-tax/index.html`, not just in source.

What remains, in order of severity:

1. **The SSR pipeline uses `renderToString`, which does not support `<Suspense>`.** React itself detects
   this at render time and injects a `<template data-msg="The server did not finish this Suspense
   boundary...">` diagnostic comment into `docs/annual-tax/index.html`'s static HTML (confirmed in the
   built file). The fallback's real content is still present and visible-text-crawlable (the comment/
   template wrapper doesn't hide it from parsers), so this is not a content-loss bug, but it is
   technically malformed SSR output on the site's single highest-priority page, and a fragile pattern
   that could break outright on a React/Vite upgrade. See §7, §16 (Issue T-01).
2. **No Open Graph image anywhere on the site** (verified: zero `og:image` matches across all of
   `docs/`). Every shared link renders as a bare text card. See §9, §16 (Issue T-04).
3. **The homepage's `<title>`/H1 still says "Thai Tax Calculator"** while the header logo, footer
   copyright line, and several page titles use "My Thai Taxes" / "MyThaiTaxes" — a three-way brand
   suffix split already documented in `SEO_METADATA_021.md` and confirmed still present in the current
   build. This is a content/brand decision, not re-litigated here (see §16, §17 for the human-decision
   framing), but it is worth restating because it also appears in structured data (`Article` schema's
   `publisher.name` is hardcoded `'Thai Tax Calculator'`, `ArticleDetailPage.tsx:31`).
4. **The primary header nav (`Header.tsx`) does not link to `/thailand-tax-2026/`**, the site's own
   designated "front door" hub — it's reachable only via the footer and one homepage body link. Not a
   crawlability failure (footer + homepage link both exist and are pre-rendered, so the hub is 1 click
   from home either way), but a discoverability gap worth flagging since the hub is explicitly positioned
   as the canonical entry point. See §8, §14.
5. **Sitemap, robots.txt, and canonical URLs are internally consistent and correct** — no mismatches
   found between what's in `docs/sitemap.xml`, what each page's `<link rel="canonical">` says, and what
   `scripts/prerender.mjs` actually generates. This is the strongest part of the technical setup.

None of the findings below require touching `src/utils/tax*.ts`, `tax-data/2026/*.json`, or any
calculator logic, consistent with `CLAUDE.md`'s technical-change guardrail.

---

## 2. Complete URL / indexation inventory

Verified against `src/App.tsx` (route definitions), `scripts/prerender.mjs` (`routes` and
`staticRoutes` arrays), and `docs/sitemap.xml` (actual generated output — 38 `<url>` entries: 11 static
+ 27 articles).

| URL | Purpose / type | Should index? | Currently indexable? | Canonical | In sitemap? | Inbound internal links | Notes |
|---|---|---|---|---|---|---|---|
| `/` | Home, tool entry point | Yes | Yes | `https://mythaitaxes.com/` (self, trailing slash — **fixed**) | Yes | Header logo, footer | — |
| `/annual-tax/` | Calculator (core product) | Yes | Yes | `.../annual-tax/` | Yes | Home (2 links), header nav ("Calculator" only links home, not here directly — reached via homepage cards), every article's CTA, hub | SSR fallback has a React Suspense/`renderToString` mismatch — see §7 |
| `/monthly-withholding/` | Calculator (secondary) | Yes | Yes | `.../monthly-withholding/` | Yes | Home, hub (secondary CTA button) | — |
| `/articles/` | Article index/hub | Yes | Yes | `.../articles/` | Yes | Header nav, footer, home | — |
| `/articles/:slug/` (×27) | Article | Yes | Yes | `.../articles/{slug}/` | Yes (all 27) | Varies — see `INTERNAL_LINKING_020.md` §1 for per-article inbound counts | Slugs match 1:1 between `src/data/articles.ts`, `App.tsx` route pattern, and sitemap generation (all sourced from the same `articles` array) |
| `/faq/` | FAQ, `FAQPage` schema | Yes | Yes | `.../faq/` | Yes | Header nav, footer, home | — |
| `/about/` | Trust/E-E-A-T | Yes | Yes | `.../about/` | **Yes — confirmed fixed** (`scripts/prerender.mjs:57` now includes `/about/`) | Footer, contact page | `SEO_METADATA_021.md` flagged this as missing from the sitemap; verified fixed in current `scripts/prerender.mjs` and present in `docs/sitemap.xml` |
| `/contact/` | Transactional | Yes | Yes | `.../contact/` | Yes | Footer, about page | — |
| `/methodology/` | Reference/methodology | Yes | Yes | `.../methodology/` | Yes | Header nav, footer, hub | — |
| `/sources/` | Reference/trust registry | Yes | Yes | `.../sources/` | Yes | Footer, hub, every article's sources block (added per `INTERNAL_LINKING_020.md` Tier 1 — confirmed present at `ArticleDetailPage.tsx:157-160`) | — |
| `/tax-examples/` | Worked-example reference | Yes | Yes | `.../tax-examples/` | Yes | Header nav, footer, home, hub | Now has 18 examples (`taxExamples.ts`), not 8 as `TAX_EXAMPLES.md` still documents — a doc-staleness note, not a technical SEO issue |
| `/thailand-tax-2026/` | 2026 tax hub (designated front door) | Yes | Yes | `.../thailand-tax-2026/` | Yes | Footer, homepage body link, `/articles/` index intro line | **Not in primary header nav** — see §8 |
| `/privacy/` | Legal | No | **No** (`noindex`, correct) | `.../privacy/` | Not in sitemap (correct — noindex) | Footer | — |
| `/search/` | Utility, live query results | No | **No** (`noindex`, correct) | `.../search/` (bare, no `?q=` variants canonicalized) | Not in sitemap (correct) | Header search icon, mobile search | Prerendered at build time with no query — renders an empty-state page; correctly noindexed so this isn't a thin-content risk |

**No orphaned or accidentally-crawlable utility routes were found.** `App.tsx`'s route list and
`scripts/prerender.mjs`'s `routes` array are in agreement (13 static routes + 27 article routes = 40
prerendered pages; sitemap carries 38 because `/search/` and `/privacy/` are correctly excluded from
it despite being prerendered).

**No duplicate-URL risk found**: no trailing-slash variants, no case variants, no query-parameter
pages other than `/search/?q=...` (noindex, self-canonicalizing to the bare path).

---

## 3. Sitemap audit

`scripts/prerender.mjs:57-77` is the actual (and only) sitemap implementation — statically generated
at build time, not runtime-dynamic.

- **Generation source**: `staticRoutes` is a hand-maintained array (line 57); article routes are
  `articles.map((a) => `/articles/${a.slug}/`)` — **generated from the live content data**, not
  hand-typed, so a new article automatically appears in the sitemap with no risk of drift. This is a
  correct pattern.
- **Static-route completeness**: cross-checked `staticRoutes` (11 entries) against `App.tsx`'s route
  list (13 routes). The two **not** in the sitemap are `/search` and `/privacy` — both correctly
  `noindex`, so their absence is correct, not a gap. All other routes are present, including `/about/`
  (confirmed fixed — see §2).
- **Trailing slash**: every sitemap `<loc>` uses a trailing slash (`${SITE_URL}${r}` where every entry
  in `staticRoutes` and the article-route map already includes the trailing `/`). Consistent with every
  page's own canonical convention (see §5) — no mismatch.
- **Canonical alignment**: spot-checked every static route's sitemap URL against its page's own
  `<link rel="canonical">` — all match exactly (verified via `grep` across `src/pages/*.tsx` for
  `canonicalUrl`/`SITE_URL` constructions; all use the same `https://mythaitaxes.com` + `/path/` form).
- **`lastmod` accuracy**: static routes all get `today`'s date (the build date) regardless of whether
  that page actually changed — this means `lastmod` on static pages is not a meaningful "last actually
  changed" signal, just "last time the site was built." This is a minor accuracy issue (not severity
  P0/P1 — Google treats `lastmod` as a hint, not a directive) but worth naming: it means `lastmod` can't
  be used to prioritize re-crawling recently-changed pages over unchanged ones. Article `lastmod` values
  are more meaningful (`a.updatedAt || a.publishedAt`, real content dates).
- **No non-indexable pages leak into the sitemap.** No old/duplicate URLs found — the sitemap is
  regenerated fully on every build from current route/content lists, so there is no accumulation
  mechanism that could carry forward stale entries.
- **Sitemap declared in robots.txt**: yes (see §4).

**Conclusion**: the sitemap implementation is correct and low-risk. The only real gap
(`/about/` missing) is already fixed. No further action needed beyond the optional `lastmod` accuracy
note (P3).

---

## 4. Robots.txt audit

`public/robots.txt` (source) and `docs/robots.txt` (built output) are identical:

```
User-agent: *
Allow: /

Sitemap: https://mythaitaxes.com/sitemap.xml
```

- **Accessible at `/robots.txt`**: yes, in the build output at the site root (`docs/robots.txt`),
  which GitHub Pages serves at `mythaitaxes.com/robots.txt`.
- **No `Disallow` rules at all.** Nothing is blocked — including `/search/` and `/privacy/`, which are
  `noindex` at the page level rather than robots-blocked. This is the correct pattern: `noindex` requires
  the page to be crawled so the directive can be read; a `Disallow` would prevent Googlebot from ever
  seeing the `noindex` meta tag, which can paradoxically cause a blocked-but-linked-to URL to be indexed
  anyway (with no snippet). Recommend **no change** — the current all-`Allow` + per-page-`noindex`
  approach is correct for this site's two non-indexable pages.
- **No crawl-waste risk found**: no query-parameter-driven pages other than `/search/?q=`, which is
  already excluded from indexing via meta `noindex` and doesn't need a robots block on top.
  `Disallow: /search` is not recommended per the point above.
- **Sitemap location correctly declared** and matches the actual served sitemap path.
- **No conflicts** between robots.txt and any page-level `noindex`/`index` directive.
- **`llms.txt`** (`public/llms.txt` / `docs/llms.txt`) also exists — not part of the standard robots
  protocol, but worth noting it's present, accurate, and lists the same canonical URLs used elsewhere
  (verified: `/annual-tax/`, `/monthly-withholding/`, `/articles/`, `/faq/`, `/about/` all match the
  site's actual canonical forms). No issues.

**Conclusion**: robots.txt is minimal, correct, and requires no change.

---

## 5. Canonical URL audit

- **Domain**: every canonical URL, every sitemap entry, and robots.txt's `Sitemap:` line use the bare
  apex `https://mythaitaxes.com` (no `www`, always `https`). Fully internally consistent.
- **Trailing slash**: every page canonicalizes with a trailing slash, including the homepage —
  **confirmed fixed**: `src/pages/HomePage.tsx:30` now renders `<link rel="canonical" href={`${SITE_URL}/`} />`
  where `SITE_URL = 'https://mythaitaxes.com'` (line 10), producing `https://mythaitaxes.com/`. Verified
  in the actual built `docs/index.html`: `<link data-rh="true" rel="canonical" href="https://mythaitaxes.com/"/>`.
  This matches `docs/sitemap.xml`'s homepage entry exactly. `SEO_METADATA_021.md`'s Tier 1 finding on
  this is resolved.
- **Self-canonicalization**: every page's canonical points to itself; no cross-page canonical pointing
  found anywhere.
- **`/annual-tax/`**: canonical is now sourced from the single shared `ANNUAL_TAX_META.canonicalUrl`
  constant (`src/data/calculatorMeta.ts:11`) and imported identically by both `App.tsx`'s Suspense
  fallback and `AnnualTaxWizard.tsx`'s own `<Helmet>` (`AnnualTaxWizard.tsx:548`) — there is now
  structurally only one possible canonical value for this URL, not two that could drift. Same pattern
  for `/monthly-withholding/` via `MONTHLY_WITHHOLDING_META.canonicalUrl`.
- **`/search/`**: canonical is the bare `/search/` regardless of `?q=` value (`SearchPage.tsx:42`) —
  correct, prevents infinite query-variant canonical proliferation; belt-and-suspenders with the page's
  own `noindex`.
- **No duplicate route forms exist** — `App.tsx` defines exactly one route per canonical URL; there is
  no case where two different route paths could serve the same content with different canonicals.
- **www vs. non-www — cannot be verified from code alone.** `docs/CNAME` contains only `mythaitaxes.com`
  (no `www`), and every canonical/OG/sitemap URL in the codebase uses the bare apex domain — this is
  what the code says should happen. However, `cloudflare-worker/bot-proxy.js:20`, 
  `cloudflare-worker/mcp-server/server.json:6`, and `cloudflare-worker/mcp-server/src/index.ts:184` all
  reference `https://www.mythaitaxes.com` (a `www` subdomain) — these are Cloudflare Worker
  infrastructure files, not page-metadata files, and none of them affects any canonical tag, sitemap
  entry, or OG tag on the actual site pages. **This audit cannot determine from the codebase alone
  whether `www.mythaitaxes.com` actually resolves, and if so whether it 301-redirects to the apex
  domain or serves duplicate content at a second host.** This requires a live check
  (`curl -I https://www.mythaitaxes.com/`) outside this audit's scope — flagged as a human/live-site
  verification item, not guessed at. See §16 (Issue T-06) and §18.
- **HTTP vs HTTPS**: all canonical/OG/sitemap URLs use `https://` uniformly. Whether `http://` requests
  are redirected to `https://` is a hosting-layer (GitHub Pages) behavior not verifiable from the
  codebase — GitHub Pages enforces HTTPS by default for custom domains with HTTPS enforcement enabled,
  but this specific site's current setting cannot be confirmed by reading files. Flagged for live
  verification, not assumed.

**Conclusion**: every canonical bug this audit could check from the codebase is either already fixed
or was never present. The one open question (`www` subdomain behavior) is explicitly a live-site check,
not a code fix.

---

## 6. Indexability audit

Classification per task's A/B/C/D framework (A = definitely index, B = probably index, C = probably
noindex, D = needs human decision):

| Page | Class | Rationale |
|---|---|---|
| `/`, `/annual-tax/`, `/monthly-withholding/`, `/articles/`, `/articles/:slug/` (×27), `/faq/`, `/about/`, `/contact/`, `/methodology/`, `/sources/`, `/tax-examples/`, `/thailand-tax-2026/` | **A** | All indexable today, all correctly so — each has unique title/description, real content, and a canonical destination; none is thin-utility or duplicate |
| `/privacy/` | **A** (correctly noindex) | Legal boilerplate; `noindex` is the right call, not flagged for review |
| `/search/` | **A** (correctly noindex) | Query-parameter utility page with no fixed content; `noindex` is correct — **not** recommended for indexing regardless of content depth, since search-result pages are a canonical "don't index" case, not a judgment call |
| Any `/search/?q=...` variant | **A** (correctly noindex, canonical collapses to bare `/search/`) | No change needed |

**No page was found that is currently indexable but arguably shouldn't be**, and no page was found
that is noindexed but arguably should be indexed. This audit did **not** recommend noindexing any page
for being short (per the task's explicit instruction) — e.g., `/contact/` and `/about/` are relatively
short pages but serve genuine trust/transactional purposes and are correctly left indexable.

**X-Robots-Tag / HTTP header-level directives**: not used anywhere (only page-level `<meta name="robots"
content="noindex">`, confirmed on `/privacy/` and `/search/` only). GitHub Pages static hosting doesn't
allow custom response headers without a CDN/worker layer in front — this audit found no evidence a
`cloudflare-worker/` component adds `X-Robots-Tag` headers, so meta-tag-only is the only mechanism in
use, and it's applied correctly on the two pages that need it.

---

## 7. JavaScript / rendering audit

This is the section with the audit's most significant finding.

**Pipeline** (per `MEMORY.md` and verified against `scripts/prerender.mjs`,
`src/entry-server.tsx`, `package.json`'s `build` script): `vite build` (client bundle) →
`BUILD_SSR=1 vite build --ssr src/entry-server.tsx` (SSR bundle) → `node scripts/prerender.mjs`
(calls `renderToString()` per route, writes static HTML + sitemap) → client hydrates via
`hydrateRoot` (`src/main.tsx:19-20`, conditioned on `rootElement.hasChildNodes()`).

**Finding (P1): `renderToString` does not support `<Suspense>`, and `/annual-tax/` uses `<Suspense>`.**

`src/App.tsx:29-89` wraps the `/annual-tax` route in `<Suspense fallback={...}>` around a
`React.lazy(() => import('./components/AnnualTaxWizard'))` (line 20). `src/entry-server.tsx:13`
renders every route with `renderToString()`. React's own `renderToString` implementation does not wait
for lazy/Suspense boundaries to resolve — it renders whatever is available synchronously and, when it
detects a `<Suspense>` boundary it couldn't fully resolve, **injects a diagnostic HTML comment/template
node describing the problem**, rather than silently producing clean fallback markup. This is confirmed
directly in the built output, `docs/annual-tax/index.html`:

```html
<div id="root"><div class="min-h-screen flex flex-col bg-gray-100"><main class="flex-grow">
<!--$!--><template data-msg="The server did not finish this Suspense boundary: The server used
&quot;renderToString&quot; which does not support Suspense. If you intended for this Suspense boundary
to render the fallback content on the server consider throwing an Error somewhere within the Suspense
boundary. If you intended to have the server wait for the suspended component please switch to
&quot;renderToPipeableStream&quot; which supports Suspense on the server" data-stck="...">
</template>
  <div class="bg-gray-100 min-h-screen py-8 px-4">
    <div class="bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-2xl w-full mx-auto">
      ... (the actual fallback content: heading, FAQ text, "Loading calculator…") ...
    </div>
  </div>
<!--/$--></main></div></div>
```

**What this means in practice**:
- The fallback's actual visible text content **is** present in the static HTML and **is**
  crawlable — the diagnostic `<template>` element's contents are not rendered by browsers by default
  (a `<template>` tag's children are inert), so this is not hiding text from Googlebot or from a plain
  HTML parser. The page is not "empty" — this corrects an over-reading that could otherwise be drawn
  from `MEMORY.md`'s note that the wizard is "not pre-rendered."
- However, this **is** technically malformed/unintended SSR output — React itself is emitting a
  developer-facing warning message into production HTML, not a clean render. This is fragile: a future
  React/Vite upgrade, a stricter HTML validator used by some crawlers or a social-link unfurler, or any
  tool that treats `<template data-msg="...">` as meaningful content rather than inert markup could
  behave unpredictably. It is also simply not the correct way to do SSR with `Suspense` — the message
  itself names the fix (`renderToPipeableStream`, a Node-stream API, or avoiding `Suspense` in the
  server-rendered tree entirely).
- The **head metadata is unaffected** — `react-helmet-async` captures `<Helmet>` tags into a separate
  `helmetContext` object (`entry-server.tsx:11-21`) independent of the body-render timing, which is why
  `/annual-tax/`'s title/canonical/schema are correctly present in the static `<head>` despite the body
  Suspense issue. This is confirmed correct in the built file (`<title data-rh="true">Annual Tax
  Calculator | My Thai Taxes</title>` present, `SoftwareApplication` schema present).
- This issue is **specific to `/annual-tax/`** — it's the only route using `<Suspense>`/`React.lazy` in
  `App.tsx`. Every other route (including `/monthly-withholding/`, which is *not* lazy-loaded) renders
  cleanly with no equivalent warning.

**Recommendation** (flagged for TASK-022B, not implemented here): either (a) render the fallback content
directly (not inside a `Suspense`/`lazy` boundary) during SSR and only apply `React.lazy` on the client
side via a hydration-time check, or (b) migrate the prerender script from `renderToString` to
`renderToStaticMarkup` combined with resolving the lazy import before rendering (since prerendering
doesn't need streaming), or (c) accept the current behavior (content is crawlable today) but note the
fragility for future framework upgrades. This is a rendering-architecture question, not a pure bug fix,
so it's listed as **P1 (important, not urgent)** rather than P0 — nothing is currently un-indexed or
invisible to crawlers as a result.

**Other rendering findings**:
- **No duplicate `<title>`/meta tags found.** Each route's `<Helmet>` is the sole source for its head
  tags; `react-helmet-async`'s last-write-wins behavior is a non-issue for any route except the fixed
  `/annual-tax/` case (§5, §7 above — now a single shared source, not two).
- **Article content, the 2026 hub, `/tax-examples/`, `/methodology/`, `/sources/`, and all FAQ content
  are fully present in server-rendered/pre-rendered static HTML** — confirmed by inspecting
  `docs/articles/how-to-use-the-thai-tax-calculator/index.html` (full article text, `Article` +
  `BreadcrumbList` JSON-LD present) and `docs/index.html` (full homepage body, including the bracket
  table, deduction table, FAQ teasers, and article teasers, all as static text — not behind any
  client-only fetch).
- **Calculator metadata is discoverable without executing the app** — both `/annual-tax/`'s and
  `/monthly-withholding/`'s `<title>`, description, canonical, OG tags, and `SoftwareApplication` JSON-LD
  are present in the static HTML `<head>`, independent of the Suspense body issue above.
- **No fallback/loading component creates conflicting SEO information post-fix.** Before `06a07d8`,
  the wizard's hydrated `<Helmet>` overwrote the fallback's with a *different* title/description and no
  schema (the central `SEO_METADATA_021.md` finding). Verified in current source
  (`AnnualTaxWizard.tsx:545-554`) that both `<Helmet>` blocks now import the same
  `ANNUAL_TAX_META`/`ANNUAL_TAX_SCHEMA` constants — they cannot disagree because they are the same
  object, not just visually matching strings.

---

## 8. Internal link crawlability

Building on `INTERNAL_LINKING_020.md` (which remains an accurate map of the *content* link graph) —
this section checks the *crawlability* mechanics specifically: are links real `<a href>`/React Router
`<Link>` elements present in server-rendered HTML (not JS-only interactions)?

- **All navigation is real anchor-tag based.** `Header.tsx`, `Footer.tsx`, and every page use React
  Router's `<Link>`, which renders to a real `<a href="...">` in the DOM (confirmed in the built
  `docs/index.html`: `<a ... href="/annual-tax/" data-discover="true">`). Nothing on the site relies on
  a `<button onClick={navigate(...)}>` pattern or a JS-only click handler for primary navigation — this
  means every internal link is crawlable by a plain HTML parser, not just a JS-executing one.
- **Hierarchy check (Home → Hub → Specialist guides → Examples/Methodology/Sources → Calculator)**:
  - Home → Hub: **present** (`HomePage.tsx:153-167`, a full-width card link).
  - Hub → Specialist guides: **present and extensive** — every one of the hub's 12 sections links to
    at least one canonical article or tool (verified directly in `ThailandTax2026Page.tsx`).
  - Hub → Examples/Methodology/Sources: **present** — dedicated sections (`#examples`,
    `#methodology-sources`) link to `/tax-examples/`, `/methodology/`, and `/sources/`.
  - Hub → Calculator: **present** — a `CalculateTaxCTA` block in the `#calculator` section.
  - This matches the task's expected hierarchy end-to-end and is fully crawlable (all real `<a>` tags,
    all present in the SSR HTML for `/thailand-tax-2026/`).
- **Gap: Header nav omits the hub.** `Header.tsx:38-44`'s `navLinks` array is `Calculator, Articles,
  Examples, FAQ, Methodology` — `/thailand-tax-2026/` is absent from the persistent top nav that appears
  on every non-wizard page. It's still reachable (footer link on every page, homepage body link, one
  `/articles/` index intro link), so this is not an orphan-page problem, but it means the site's own
  designated "front door" isn't in its most prominent, always-visible navigation element. This is a
  **navigation/IA decision**, not a pure technical defect — flagged as P2, human-reviewable (should the
  header nav change?), not silently fixed here.
- **No orphan pages found.** Every route in `App.tsx` has at least one verified inbound `<Link>` from
  another page (traced via `grep` for each route path across `src/pages/`, `src/components/layout/`).
- **No pages reachable only via JS interaction** (e.g., a modal-only or accordion-only link) — confirmed
  no route is linked to exclusively from inside a component that doesn't server-render (the FAQ
  accordion, for instance, expands/collapses Q&A visibility but the underlying `<a>` links elsewhere in
  the page, like the CTA and related-articles blocks, are not gated behind that interaction).
- **`/about/#for-developers` fragment link** (`Footer.tsx:47`): the footer's "API" link points to an
  in-page anchor. Verified the target `id="for-developers"` exists (`AboutPage.tsx:147`). This is not a
  crawlability issue (fragments aren't separate URLs to crawlers, and `/about/` itself is already
  indexed and in the sitemap) — noted only because it's a link-hygiene item worth being aware of, not a
  finding requiring action.
- **No excessive/spammy internal linking found.** `INTERNAL_LINKING_020.md`'s own audit (contextual
  links, related-articles cap of 2-4, one calculator CTA per article) remains accurate — this audit found
  no new evidence of link-farming or automated keyword-link injection since that document was written.

---

## 9. URL structure audit

- **Descriptive & stable**: every URL segment is a real word/slug describing its content
  (`/thailand-tax-2026/`, `/tax-examples/`, `/articles/understanding-thai-tax-residency/`) — no
  auto-generated IDs, no query-string-driven content pages.
- **Lowercase, consistent**: all routes and slugs are lowercase, hyphen-separated — confirmed across
  all 27 article slugs and all static routes in `App.tsx`.
- **Trailing slash convention**: the *canonical* form is always with a trailing slash (`/annual-tax/`),
  but the **React Router route definitions themselves are registered without one**
  (`<Route path="/annual-tax" ...>`, `App.tsx:29`) — React Router v7 in declarative mode matches both
  `/annual-tax` and `/annual-tax/` to the same route by default (no strict-slash mode is configured), so
  this doesn't create a duplicate-content or 404 risk; it's purely a source-code style point (routes are
  defined without slashes, links/canonicals are written with them) rather than a live routing bug. No
  action needed — this is what the task calls "URL structure," not "URL correctness," and correctness is
  fine here.
- **No parameterized routes exist that expose internal state as a URL** other than `/search/?q=...`
  (correctly noindexed).
- **No duplicate URL patterns** — one canonical path per piece of content, verified via the route table
  in §2.
- **No old/legacy URLs or route aliases found** in `App.tsx`. No `Navigate` redirect components exist
  except the one described in §10 (invalid article slug → `/articles/`).
- **Logical grouping**: articles nest under `/articles/`, calculators are top-level
  (`/annual-tax/`, `/monthly-withholding/`) matching their role as primary product surfaces rather than
  sub-pages of anything — consistent with `CLAUDE.md`'s "calculator as core product" goal. No structural
  change is recommended or justified.

---

## 10. 404 / redirect audit

- **`docs/404.html` exists** and is a copy of `docs/index.html` (per `package.json`'s build script:
  `cp docs/index.html docs/404.html`) — this is the standard GitHub Pages SPA-fallback pattern: any
  unmatched path serves the client app shell, which then lets React Router render a real 404 experience
  client-side (or, for a path that *does* match a client route, hydrates correctly). This is a
  reasonable, common pattern for a static-hosted SPA and not flagged as an issue.
- **However**: there is no dedicated **not-found UI** inside `App.tsx`'s `<Routes>` — no
  `<Route path="*" element={<NotFoundPage />}>` catch-all was found. An unmatched path (e.g. a stale
  external link to a URL that never existed) will silently render **whatever route React Router's
  matching falls through to**, which in a `<Routes>` block with no catch-all typically renders nothing
  inside `<Layout>`'s `<main>` — an unstyled blank content area with header/footer intact, not a real
  "page not found" message, and it would return an HTTP 200 (since GitHub Pages serves `docs/404.html`,
  itself a 200-served copy of the SPA shell, for genuinely unmatched *server* paths, but any path that
  *does* match one of `App.tsx`'s dynamic segments loosely — none currently do besides `/articles/:slug`
  — would 200 with blank content instead of 404). This is a real, if minor, gap: a mistyped or
  since-removed article slug correctly redirects to `/articles/` (see next point), but there's no generic
  catch-all for entirely invalid paths. **P2** — see §16 (Issue T-05).
- **`/articles/:slug` invalid-slug handling**: `ArticleDetailPage.tsx:17-19` — `if (!article) { return
  <Navigate to="/articles/" replace />; }` — a client-side redirect to the articles index for any slug
  not found in `articles.ts`. This is a **client-side** redirect (React Router's `<Navigate>`), not an
  HTTP 301/302 — a plain HTTP crawler or a crawler that doesn't execute JS would still receive whatever
  static HTML was prerendered for that exact path (which, since invalid slugs aren't in the prerender
  route list at all, means such a path was never prerendered and falls through to the `docs/404.html`
  SPA-shell fallback at the hosting layer instead). Net effect: an invalid article URL correctly does not
  resolve to real content and does not appear indexable, but the *mechanism* is host-level 404 fallback,
  not an application-level 301 — worth understanding, not a bug.
- **No broken internal links found** — cross-referenced every `<Link to="...">` and hardcoded `href`
  found via `grep` across `src/` against `App.tsx`'s route list; every internal link target matches a
  defined route. No references to old/removed URLs were found in the current codebase (no dangling
  references to a route that once existed and was later removed — the article-slug system in particular
  has no history of removed slugs to check against, since `CONTENT_INVENTORY.md`/`INTERNAL_LINKING_020.md`
  both describe consolidation *recommendations* that were never actually executed as deletions).
- **No redirect chains or loops exist** — there is exactly one client-side redirect in the whole app
  (the invalid-slug case above), and it does not chain into any further redirect.
- **Sitemap URLs resolving**: every sitemap URL corresponds to a route that is both defined in `App.tsx`
  and included in `scripts/prerender.mjs`'s `routes` array, so every sitemap entry has a real prerendered
  file backing it — verified by cross-referencing `staticRoutes`/`articles.map(...)` in both the sitemap
  generator and the prerender-routes list.
- **External/live-site verification required, not performed here**: whether GitHub Pages actually serves
  `docs/404.html` with an HTTP 404 status code (rather than 200) for genuinely unmatched paths is a
  hosting-platform behavior this audit cannot confirm from the repository alone — GitHub Pages'
  documented behavior is to serve a custom `404.html` with a 404 status, but this specific deployment's
  actual response code was not checked live. Flagged for live verification, not assumed.

---

## 11. Structured data technical audit

| Schema | Page(s) | Where generated | Matches visible content? | Notes |
|---|---|---|---|---|
| `WebApplication` | `/` | `HomePage.tsx:35-44` | Yes — `offers.price: '0'`, `applicationCategory: 'FinanceApplication'` both accurate | No issues |
| `SoftwareApplication` | `/annual-tax/` | `src/data/calculatorMeta.ts` (`ANNUAL_TAX_SCHEMA`), imported identically by `App.tsx` and `AnnualTaxWizard.tsx` | Yes | **Fixed** — previously present only pre-hydration (`SEO_METADATA_021.md`'s central finding); now a single shared constant used in both places, so it cannot disagree with itself or disappear post-hydration |
| `SoftwareApplication` | `/monthly-withholding/` | `calculatorMeta.ts` (`MONTHLY_WITHHOLDING_SCHEMA`), `MonthlyWithholding.tsx:230` | Yes | **Added** — `SEO_METADATA_021.md` flagged this calculator as having no schema at all; confirmed now present |
| `Article` | Every article (×27) | `ArticleDetailPage.tsx:22-34` | Yes — `headline`, `description`, `url`, `datePublished` all match the rendered page | **Minor, still-open issue**: `publisher.name` is hardcoded `'Thai Tax Calculator'` (line 31) — a third brand-name variant alongside the `<title>` suffix's `'My Thai Taxes'` (line 54) and other pages' `'MyThaiTaxes'`. Not invented/fabricated data, just inconsistent — a brand-consistency item, not a correctness bug. No `dateModified` emitted (data model has no separate field, as `CONTENT_INVENTORY.md` already notes) — acceptable, not a fabrication risk (better to omit than invent a modification date) |
| `BreadcrumbList` | Every article (×27) | `ArticleDetailPage.tsx:35-43` | Yes — 3-level (Home → Articles → Article), matches the actual "← Back to Articles" link's implied hierarchy | Accurate but **no matching visible breadcrumb UI** exists — see §12 |
| `FAQPage` | `/faq/` | `FAQPage.tsx:19-29` | Yes — all Q&As mapped 1:1 from `faqData`, no invented questions | No issues |
| `WebPage` | `/thailand-tax-2026/`, `/tax-examples/` | `ThailandTax2026Page.tsx:32-38`, `TaxExamplesPage.tsx:51-57` | Yes — minimal (`name`, `description`, `url`), appropriately conservative | No issues |

**No fabricated or unsupported schema properties found anywhere** — no `aggregateRating`, `review`,
`price` beyond the genuinely-free `0`, or invented `author` entities. This matches `CLAUDE.md`'s
trust/transparency goal and `SEO_METADATA_021.md`'s prior finding that the site does not over-claim in
structured data.

**Duplicate schema blocks**: none found — each page emits exactly the schema types listed above, no page
emits the same `@type` twice except `ArticleDetailPage.tsx`, which correctly emits two *different* types
(`Article` + `BreadcrumbList`) as separate `<script>` tags, not a duplicate of the same type.

**ID/reference consistency**: no `@id` cross-referencing is used anywhere (each schema block is
self-contained, no `sameAs`/`@id` links between them) — this is a simple, low-risk pattern; there's
nothing to get inconsistent since nothing references anything else.

---

## 12. Breadcrumb technical readiness

Restating and confirming `SEO_METADATA_021.md` §11's finding, which remains accurate:

- **Structured data**: `BreadcrumbList` JSON-LD exists only on article pages (§11 above).
- **Visible UI**: no true breadcrumb trail exists anywhere. What exists instead:
  - Article pages: a single "← Back to Articles" link (`ArticleDetailPage.tsx:67-71`).
  - `/methodology/`: a single "← Back to the 2026 tax overview" link (`MethodologyPage.tsx:29`).
  - `/tax-examples/`: no back-link of any kind (confirmed — no equivalent line found in
    `TaxExamplesPage.tsx`).
  - `/sources/`: not fully verified line-by-line in this pass, but no breadcrumb component exists
    anywhere in `src/components/` to check against — there is no shared `Breadcrumb` component in the
    codebase at all.
- **Technical feasibility of adding one**: straightforward. The data needed already exists in each
  case — article pages already compute `article.category` and could derive a 2-3-level trail; the hub
  relationship (`/thailand-tax-2026/` as parent of specialist guides) is already documented in
  `INTERNAL_LINKING_020.md` §2. No new data model or calculation is required, only a new shared
  component and per-page wiring.
- **Would visible breadcrumbs match the existing schema?** Article pages' `BreadcrumbList` schema
  (Home → Articles → Article) already matches the simplest possible visible trail; if a future
  implementation adds a 4-level visible trail (Home → 2026 Guide → Cluster → Article, per
  `SEO_METADATA_021.md`'s suggestion), the **schema would need to be updated to match**, or the visible
  UI and the structured data would disagree about the page's position in the hierarchy — a real risk to
  flag for whoever implements this, not a current problem (today the 3-level schema and the "← Back to
  Articles" single-step link are at least not contradictory, just different levels of detail).
- **Recommendation**: this remains a good candidate for a dedicated future task (matches
  `SEO_METADATA_021.md`'s Tier 3, item 11) — technically easy, would improve on-page wayfinding and give
  `/tax-examples/` its first upward navigation link, but is a UI/design decision (exact hierarchy levels,
  visual treatment) that should not be decided unilaterally here. **Not implemented in this audit, per
  its scope.**

---

## 13. Mobile / Core Web Vitals risk review (code-level only)

This audit did not run Lighthouse, PageSpeed Insights, or any live measurement — everything below is a
static code/build-output review. Live CWV data (LCP, INP, CLS field/lab scores) requires live
measurement and is explicitly **not** claimed here.

- **Bundle sizes** (from `docs/assets/`, the actual build output):
  - `AnnualTaxWizard-Blrsc2bc.js`: **1.7 MB** (uncompressed) — this is the lazy-loaded chunk for the
    entire annual-tax wizard (all steps, PDF generation via `@react-pdf/renderer`, all form types). It
    is genuinely lazy-loaded (`React.lazy`, `App.tsx:20`) and only fetched when a user is on
    `/annual-tax/`, so it does not affect load time on any other page — this is the correct pattern for
    a large, single-page-specific feature, not a site-wide performance problem. Whether 1.7 MB is itself
    too large for that one page's real-world load time is a **requires-live-measurement** question
    (network-gzipped size, actual device/connection performance) — flagged, not asserted as a problem.
  - `index-DCRECXJQ.js`: **612 KB** (uncompressed) — this is the shared main bundle loaded on every
    page. This is a moderate size for a site with `react-router-dom`, `react-helmet-async`, and all
    non-wizard page components bundled together; whether it materially affects a real user's load time
    depends on gzip/brotli compression (applied by GitHub Pages' CDN, not measurable from the raw file)
    and actual network conditions — **requires live measurement**, not assumed here to be a problem.
  - No code-splitting was found for `/monthly-withholding/` (not lazy-loaded, unlike `/annual-tax/`) —
    it ships as part of the main bundle. Given it's a full multi-step wizard with its own step
    components, this is a candidate for the same `React.lazy` treatment `/annual-tax/` already has, if
    the main-bundle size becomes a measured concern — flagged as a **possible** future optimization
    (P3), not a confirmed problem, since this audit has no live bundle-size-vs-target data to judge
    against.
- **Third-party scripts** (`index.html`, all confirmed `async`): Google Analytics (`gtag.js`), Google
  AdSense (`adsbygoogle.js`), Ahrefs Analytics (`analytics.ahrefs.com/analytics.js`). All three use the
  `async` attribute, so none blocks initial HTML parsing. Three third-party scripts is a modest number
  for a site that needs both analytics and ad monetization (per `CLAUDE.md` goal 5, "prepare the site
  for AdSense review") — not flagged as excessive.
- **Images**: no `<img>` tags with missing `width`/`height` attributes were found in a scan of the page
  components reviewed in this audit (the site is almost entirely text/table/SVG-icon based — SVGs are
  inlined `<svg>` elements, not separate image requests, which avoids a whole category of image-loading
  CLS/LCP risk). No large raster images were found anywhere in `public/` or `docs/` (the only static
  assets are `CNAME`, `ads.txt`, `llms.txt`, `robots.txt`, and a `vite.svg` favicon) — meaning the site
  currently has **no hero images, no article header images, and no OG image** (the last is a genuine gap,
  §9/§16, but from a pure CWV-risk perspective, the absence of large images is a net *positive* for
  LCP/CLS, worth naming as a two-sided fact rather than purely negative).
- **Layout-shift risk**: no dynamically-injected above-the-fold content requiring a network round-trip
  before layout stabilizes was found (the homepage's quick-calculator widget renders its shell
  server-side; only the numeric output updates client-side after user input, which happens after initial
  load, not during it — not a CLS risk in the traditional sense).
- **Render-blocking CSS**: a single bundled stylesheet (`index-CjHE6G1q.css`, 36 KB) is loaded via a
  standard `<link rel="stylesheet">` — this is render-blocking by definition (as all `<link
  rel="stylesheet">` tags are), but 36 KB is a small file; whether it measurably affects LCP requires
  live measurement, not asserted here.
- **Font loading**: no `@font-face`/Google Fonts `<link>` was found anywhere in `index.html` or
  `docs/index.html` — the site relies on system/Tailwind default fonts, which has **zero** font-loading
  performance cost (no FOUT/FOIT risk, no extra network request). This is a positive finding, not a gap.

**Summary**: no speculative optimizations are recommended. The one item worth flagging for a future
pass (P3) is evaluating whether `/monthly-withholding/` should be lazy-loaded like `/annual-tax/` is,
and whether `AnnualTaxWizard`'s 1.7 MB chunk should be measured against a live LCP/INP target before
deciding it needs splitting further. Everything else in this section either has no evidence of being a
problem or explicitly requires live measurement this audit did not perform.

---

## 14. Content discovery / crawl depth

Approximate click-depth from `/` (homepage), counting only real, server-rendered `<a>`/`<Link>` paths
(not JS-only interactions):

| Destination | Depth from home | Path |
|---|---|---|
| 2026 Tax Hub (`/thailand-tax-2026/`) | **1** | Homepage body link (`HomePage.tsx:153-167`) or footer |
| Tax brackets (`thai-tax-brackets-explained`) | **1** | Homepage's bracket-table "See full breakdown" link, or **2** via hub → brackets section |
| Residency (`understanding-thai-tax-residency`) | **2** | Home → Hub → Residency section link (no direct homepage link to this specific article) |
| Foreign income (`foreign-income-thailand-tax`) | **2** | Home → Hub → Foreign income section |
| Remittance (`transferring-money-to-thailand-tax-rules`) | **2** | Home → Hub → Foreign income section (linked alongside the conceptual article) |
| Deductions (`maximizing-tax-deductions-thailand`) | **1** | Homepage's deductions-table "Full guide" link, or **2** via hub |
| Filing (`expat-guide-filing-thai-taxes`) | **2** | Home → Hub → Filing section |
| Tax examples (`/tax-examples/`) | **1** | Homepage body link, header nav, footer |
| Methodology (`/methodology/`) | **1** | Header nav, footer |
| Sources (`/sources/`) | **1** | Footer |
| FAQ (`/faq/`) | **1** | Header nav, footer, homepage "View all FAQ" link |

**Assessment**: every topic the task asks about is reachable within **2 clicks** of the homepage, and
most of the highest-intent ones (brackets, deductions, hub, examples, methodology, FAQ) are reachable in
**1 click**. This is a shallow, search-friendly structure — no page requiring the task's attention is
"unnecessarily deep." The 2-click pages (residency, foreign income, remittance, filing) are all reached
via the hub, which is itself 1 click away and is explicitly designed as the routing layer for exactly
these topics (`TAX_HUB_2026.md` §3) — this is the intended architecture, not an accidental depth
problem. Considering user intent (not just click-count): a visitor arriving at the homepage looking for
"how residency works" is more likely to search-land directly on the residency article itself (which
Google can do regardless of internal click-depth, since it has its own canonical URL, title, and
content) than to navigate three clicks deep from the homepage — internal click-depth mainly affects
crawl-priority signals and human browse-discovery, both of which are already well-served here.

**No unnecessarily deep or hard-to-discover pages were found.**

---

## 15. Search engine access to tax content

- **No explanatory content is hidden exclusively behind an interactive gate.** The FAQ accordion
  (`FAQAccordion.tsx`) visually collapses/expands answers, but the underlying HTML contains the full
  question+answer text regardless of expand state (confirmed via the `FAQPage.tsx` schema block, which
  independently maps the same `faqData` used to render the visible accordion — both draw from the same
  source, and the accordion is a CSS/JS *visibility* toggle, not a network-fetch-on-expand pattern,
  meaning the answer text is present in the initial HTML whether or not the user has clicked to expand
  it).
- **The 2026 hub, all articles, methodology, sources, and tax-examples pages** are fully static-text
  content in server-rendered HTML — none of this is calculator-generated or requires a user action to
  reveal (confirmed in §7 via direct inspection of `docs/` output).
- **The two calculators are correctly the one place genuinely gated behind user interaction** — you
  cannot see "your tax result" without entering your income, which is appropriate (a calculator's output
  is inherently personalized and shouldn't be pre-rendered as generic content) and is not treated as an
  SEO problem by this audit, consistent with the task's explicit instruction not to recommend "exposing
  every calculator UI element as indexable content."
- **Worked examples (`/tax-examples/`, and 3 examples embedded on the hub) are pre-computed, static,
  and fully visible in server-rendered HTML** — not gated behind any calculator interaction, even though
  they were originally computed by the same engine.

**No content-access issues found.**

---

## 16. Technical quality / AdSense-related issues (technical only, no approval claims)

- **No broken pages, empty routes, or placeholder content found** anywhere in the current route list.
- **No duplicate pages found** — every route serves genuinely distinct content; the earlier
  content-duplication concerns raised in `CONTENT_INVENTORY.md` (thin/overlapping articles) are a
  *content*-quality question already tracked in that document, not a *technical* duplication (no two
  URLs serve byte-identical or near-identical rendered content).
- **No inaccessible source/reference pages** — `/sources/`, `/methodology/`, `TAX_RULES.md`'s underlying
  registry are all reachable and indexable.
- **No misleading metadata found** — titles and descriptions were spot-checked against actual page
  content in this pass and in `SEO_METADATA_021.md`'s more exhaustive pass; nothing overclaims.
- **No excessive thin utility pages** — the only two non-content utility pages (`/search/`, `/privacy/`)
  are both correctly noindexed, not indexed-and-thin.
- **Navigation is clear and consistent** — header + footer present on every content page (hidden only on
  the two calculator wizard pages, which have their own internal "Home" link — `App.tsx:44` — plus their
  own step-based UI, an intentional focused-flow design choice, not a navigation defect).
- **The rendering/Suspense issue in §7** is the one item in this section with genuine technical-quality
  weight — malformed SSR markup on the highest-priority page, even though not currently
  content-blocking, is the kind of thing worth being clean about before an AdSense (or any) technical
  review, since it reflects on overall code/output quality even where it doesn't break user-facing
  behavior.
- **No fabricated trust signals** — no fake reviews, ratings, testimonials, or authorship claims found
  anywhere (confirmed again in this pass, consistent with `SEO_METADATA_021.md`'s structured-data
  finding).

---

## 17. Prioritized issue list

Severity: 🔴 P0 (correctness/serious indexation) · 🟠 P1 (important technical SEO) · 🟡 P2 (useful
improvement) · 🔵 P3 (future/optional).

| ID | Severity | URL(s) | Problem | Evidence | Why it matters | Recommended fix | Objective or human judgment? | Difficulty |
|---|---|---|---|---|---|---|---|---|
| T-01 | 🟠 P1 | `/annual-tax/` | SSR uses `renderToString` with a `<Suspense>` boundary it doesn't support; React injects a diagnostic `<template data-msg="...">` comment into production static HTML | `docs/annual-tax/index.html` (built output); `src/entry-server.tsx:13`; `src/App.tsx:29-89` | Malformed SSR output on the site's highest-priority page; visible text is still crawlable today, but this is fragile across framework upgrades and is not a clean render | Restructure so `/annual-tax/`'s SSR pass doesn't rely on an unresolved `Suspense`/`lazy` boundary (render fallback content directly server-side, or switch prerendering to resolve the lazy import before calling `renderToString`) | Objective (a rendering-correctness fix), but the specific approach is an architecture choice — needs a decision, not a one-line patch | Medium |
| T-02 | 🟠 P1 | Site-wide | No `og:image` anywhere on the site | `grep -rn 'og:image' docs/` → zero matches | Every shared link (Slack, LINE, WhatsApp, X) renders as a bare text card — a real click-through/trust cost for a public-facing tool site | Design/add at least one default OG image (site-wide), reference it in each page's `<Helmet>` | Objective that an image is missing; **which image / whether per-page-type variants** is a design decision (human) | Medium (needs a design asset, not just code) |
| T-03 | 🟡 P2 | Site-wide | Brand suffix inconsistent across `<title>` tags and `Article` schema's `publisher.name` (`'Thai Tax Calculator'` vs. `'My Thai Taxes'` vs. `'MyThaiTaxes'`) | `ArticleDetailPage.tsx:31,54`; `HomePage.tsx:21`; `SourcesPage.tsx`/`TaxExamplesPage.tsx`/`ThailandTax2026Page.tsx` title strings | Google may rewrite inconsistent titles unpredictably in SERPs; weakens brand recognition | Standardize on one brand string sitewide, including schema | **Human decision** (which brand string is correct is a product choice, already flagged in `SEO_METADATA_021.md` §21) | Low (mechanical once decided) |
| T-04 | 🟡 P2 | `/thailand-tax-2026/` | Not linked from the primary header nav (`Header.tsx:38-44`), only from footer + homepage body + one `/articles/` intro line | `Header.tsx` `navLinks` array | The site's own designated "front door" hub isn't in its most prominent always-visible nav element; not an orphan (still 1 click from home) but a discoverability/IA question | Consider adding to header nav | **Human decision** (nav real estate / IA choice) | Low |
| T-05 | 🟡 P2 | Any invalid/unmatched path | No catch-all `<Route path="*">` in `App.tsx`; relies entirely on the GitHub Pages `docs/404.html` SPA-shell fallback, with no in-app "not found" UI for a path that doesn't match any route | `App.tsx` route list (no `path="*"` route found) | A user or crawler hitting a genuinely invalid URL sees the SPA shell with no clear "this page doesn't exist" message; unclear whether the response is actually a 404 status without live verification | Add a `<Route path="*" element={<NotFoundPage />}>` with a clear noindex 404 UI | Objective (missing catch-all is a defect); the exact 404 page design is a smaller human/content call | Low |
| T-06 | 🔵 P3 (flagged, not scored as a confirmed defect) | `www.mythaitaxes.com` | Referenced in `cloudflare-worker/` infra files but never in page metadata; whether it resolves and correctly redirects to the apex domain cannot be determined from the codebase | `cloudflare-worker/bot-proxy.js:20`, `cloudflare-worker/mcp-server/server.json:6`, `cloudflare-worker/mcp-server/src/index.ts:184` | If `www` resolves and serves duplicate content without redirecting, it's a canonical/duplicate-content risk; if it 404s or isn't a real host, it's a harmless stale reference | Live check: `curl -I https://www.mythaitaxes.com/` — confirm redirect or absence | **Requires live verification**, not a code fix | Trivial (a single live check) — no code change unless a problem is found |
| T-07 | 🔵 P3 | Sitemap `lastmod` on static (non-article) pages | `lastmod` is always the build date, not a real "last changed" date, for all 11 static routes | `scripts/prerender.mjs:62-63` (`today` used for every static route regardless of actual change) | Reduces the usefulness of `lastmod` as a re-crawl-priority signal for static pages (articles already use real dates) | Low priority; could track real per-page-type last-changed dates if ever desired | Objective, but very low value — not urgent | Low, if ever done |
| T-08 | 🔵 P3 | `Article` schema, all 27 articles | No `dateModified` property (data model has no separate `updatedAt`-from-`publishedAt` distinction for schema purposes... actually `article.updatedAt` exists and is used in the visible "Updated:" line but not fed into the schema) | `ArticleDetailPage.tsx:22-34` (schema) vs. `:92-100` (visible "Updated:" line, which *does* use `article.updatedAt`) | The visible page already shows an update date when one exists, but the schema doesn't carry it — a real, small, objective gap (the data already exists, it's just not passed into the schema object) | Add `dateModified: article.updatedAt || article.publishedAt` to `articleSchema` in `ArticleDetailPage.tsx:22-34` | **Objective** — the field is only missing because it wasn't wired in, not a decision needed | Trivial |

**Nothing was found at 🔴 P0 severity.** No page is un-indexed that should be indexed, no sitemap/canonical
mismatch exists, no broken internal link chain exists, and no serious duplicate-content risk was found
in the codebase. This reflects that `06a07d8` already resolved the two items (`/annual-tax/` metadata
split, `/about/` sitemap gap) that would otherwise have been the top candidates for P0/P1.

---

## 18. Objective fixes vs. human / strategy decisions

### Objective fixes (Claude Code can safely implement without further sign-off)

- **T-08**: add `dateModified` to the `Article` schema in `ArticleDetailPage.tsx` using the
  already-existing `article.updatedAt` field — the data exists, the visible UI already uses it, only the
  schema object is missing it.
- **T-05**: add a `<Route path="*" element={<NotFoundPage />}>` catch-all with a simple, clearly-labeled
  "page not found" component (noindexed) — this is a standard, low-risk addition that doesn't change any
  existing route's behavior.
- **T-07**: if ever prioritized, deriving more accurate `lastmod` values for static pages is mechanical
  (e.g., a hand-maintained per-route "last meaningfully changed" date, or omitting `lastmod` for pages
  where no real date is tracked) — low value, so not recommended as a priority item, but objective if
  undertaken.

### Human / strategy decisions (not to be silently decided)

- **T-01 (rendering architecture)**: *how* to fix the `renderToString`/`Suspense` mismatch is an
  architecture choice (render fallback directly vs. switch prerender APIs vs. accept current behavior
  with documentation) — flagged for a decision, not a unilateral rewrite of the SSR pipeline.
- **T-02 (OG image)**: whether the site should have one shared default OG image or per-page-type
  templated images, and what it should look like, is a design decision — this audit only confirms the
  gap exists.
- **T-03 (brand suffix)**: which brand string is canonical (`My Thai Taxes` vs. `MyThaiTaxes` vs.
  something else) — already flagged as a human decision in `SEO_METADATA_021.md` §21, restated here
  because it also affects structured data (`publisher.name`), not just titles.
- **T-04 (header nav)**: whether `/thailand-tax-2026/` belongs in the primary header nav is an
  information-architecture/navigation-real-estate decision, not a technical defect.
- **T-06 (www subdomain)**: requires a live check, and if a problem is found, the fix (DNS/redirect
  configuration) is an infrastructure decision outside this codebase's `docs/`/`src/` scope.
- **Breadcrumb visible-UI implementation (§12)**: hierarchy depth and visual design are human/design
  decisions; the underlying data is ready whenever this is prioritized.

---

## 19. Recommended TASK-022B implementation plan

### Phase 1 — Critical correctness
*(Nothing found at P0. No items placed here — the two items that would have qualified, `/annual-tax/`
metadata split and the `/about/` sitemap gap, are both already fixed as of `06a07d8`.)*

### Phase 2 — Crawlability / discovery
1. **T-05**: add a catch-all 404 route.
   Files: `src/App.tsx` (add `<Route path="*">`), a new `src/pages/NotFoundPage.tsx`.
2. **T-08**: wire `dateModified` into the `Article` schema.
   Files: `src/pages/ArticleDetailPage.tsx` (the `articleSchema` object, lines ~22-34).
3. **T-04** (pending human sign-off): add `/thailand-tax-2026/` to the header nav if approved.
   Files: `src/components/layout/Header.tsx` (`navLinks` array).

### Phase 3 — Rendering / structured data (only justified fixes)
4. **T-01**: resolve the `renderToString`/`Suspense` SSR mismatch on `/annual-tax/` once an approach is
   chosen (see §18).
   Files: `src/entry-server.tsx`, `src/App.tsx`, possibly `scripts/prerender.mjs` (if the lazy import
   needs to be pre-resolved before calling `render()`).
5. **T-03** (pending human sign-off): standardize the brand suffix across all `<title>` tags and
   `ArticleDetailPage.tsx`'s `publisher.name`.
   Files: every `src/pages/*.tsx` with a `title` constant, `ArticleDetailPage.tsx`, `AnnualTaxWizard.tsx`
   (already unified via `calculatorMeta.ts` — would just need the constant's string value changed in one
   place).

### Phase 4 — Optional optimization
6. **T-02**: design and add a default OG image (and, if wanted, `twitter:card` tags reusing existing
   title/description — no new copy needed).
   Files: `public/` (new image asset), each page's `<Helmet>` block, possibly a new
   `src/data/socialMeta.ts` constant for the shared image URL.
7. **T-06**: live-check `www.mythaitaxes.com` behavior; fix only if a problem is found (DNS/redirect
   config, outside `src`/`docs`).
8. **T-07**: reconsider static-route `lastmod` accuracy, only if ever prioritized.
9. Visible breadcrumb UI (§12) — separate future task, per `SEO_METADATA_021.md`'s own recommendation;
   needs a hierarchy-depth decision first.
10. Evaluate lazy-loading `/monthly-withholding/` and/or measuring `AnnualTaxWizard`'s bundle against a
    live Core Web Vitals target (§13) — only after live measurement data exists to justify it.

No item in any phase touches `src/utils/tax*.ts`, `src/config/taxConfig.ts`, `tax-data/2026/*.json`, or
any calculator/tax-engine logic.

---

## 20. Final technical SEO scorecard

Scored 0-10. These scores describe **technical readiness for crawling and indexing**, not search
ranking or AdSense approval likelihood — neither is claimed or implied by any score below.

| Dimension | Score | Rationale |
|---|---|---|
| Crawlability | 9 | Every page uses real `<a>`/`<Link>` elements in server-rendered HTML; no JS-only navigation gates; robots.txt allows everything appropriate; the one deduction is for the `renderToString`/Suspense diagnostic markup on `/annual-tax/` (T-01), which doesn't block crawling today but is not clean |
| Indexability | 9 | Correct `noindex` on exactly the two pages that need it (`/privacy/`, `/search/`); every other page indexable with unique, accurate metadata; no accidental noindex found anywhere |
| Canonical consistency | 9 | Every canonical checked is present, absolute, self-referencing, and matches its sitemap entry exactly; the one open item (`www` subdomain, T-06) is explicitly a live-verification gap, not a confirmed code defect |
| Sitemap quality | 9 | Generated from live content data (no drift risk for articles), all indexable static routes present including the previously-missing `/about/`, correctly excludes the two noindex pages; only ding is non-meaningful `lastmod` on static routes (T-07, very low stakes) |
| Robots configuration | 10 | Minimal, correct, no unnecessary blocking, sitemap declared, no conflicts with page-level directives |
| Internal crawlability | 8 | Strong hierarchy (home → hub → guides → examples/methodology/sources → calculator) fully wired with real links; the one gap is the hub's absence from the primary header nav (T-04), a discoverability nice-to-have, not a crawlability break |
| Rendering | 7 | Content is genuinely server-rendered and text-crawlable everywhere, including the previously-problematic `/annual-tax/` metadata; the T-01 Suspense/renderToString mismatch is the main drag on this score — technically incorrect SSR usage, even though not currently content-blocking |
| URL architecture | 9 | Descriptive, stable, lowercase, no duplicate patterns, no legacy/alias routes, logical grouping; trailing-slash convention is consistent at the canonical/link level even though route definitions themselves omit it (a source-style point, not a live bug) |
| Structured data | 8 | Accurate, non-fabricated, correctly scoped Article/BreadcrumbList/FAQPage/WebApplication/SoftwareApplication/WebPage schema on every relevant page; deductions for the missing `dateModified` (T-08, trivial) and the brand-name inconsistency inside `publisher.name` (T-03) |
| Technical trustworthiness | 8 | No broken pages, no fabricated trust signals, no misleading metadata, consistent citations and verification-status flagging (`/sources/`); deductions for the OG-image gap (a real trust/polish cost on social shares, T-02) and the still-open brand inconsistency |
| **Overall technical SEO readiness** | **8.5** | The foundation (sitemap, robots, canonical, indexability, structured data accuracy) is genuinely strong and the highest-priority known bug (`/annual-tax/` metadata split) is already fixed and verified. What remains is one rendering-correctness item (T-01), one visual/trust gap (T-02, OG image), and several small, well-scoped human decisions (brand suffix, header nav, breadcrumbs) — none of which represent a current indexation failure. This score describes technical readiness only; it says nothing about content depth, ranking potential, or AdSense's actual review decision. |

---

## Appendix: SEO_METADATA_021.md findings — verified status in this audit

For continuity with the prior audit, confirmed against current source and the current `docs/` build:

| SEO_METADATA_021.md finding | Status verified in this audit |
|---|---|
| `/annual-tax/` split title/description/schema across SSR fallback vs. hydrated wizard | **Fixed** — both now import `ANNUAL_TAX_META`/`ANNUAL_TAX_SCHEMA` from `src/data/calculatorMeta.ts`; confirmed identical in built `docs/annual-tax/index.html` head |
| Homepage canonical missing trailing slash | **Fixed** — `HomePage.tsx:30`, confirmed in built `docs/index.html` |
| `/about/` indexable but absent from sitemap | **Fixed** — `scripts/prerender.mjs:57`, confirmed present in `docs/sitemap.xml` |
| `/monthly-withholding/` missing all OG tags and schema | **Fixed** — `MonthlyWithholding.tsx:222-231`, uses shared `MONTHLY_WITHHOLDING_META`/`SCHEMA` |
| `thailand-tax-guide-for-expats` stale "(2025)" title | Not independently re-verified in this pass (a content/article-data change, outside this audit's file-reading scope for `articles.ts` full contents) — commit message for `06a07d8` claims this was fixed; not contradicted by anything found here |
| No `og:image` anywhere | **Still open** — reconfirmed, zero matches across all of `docs/` (T-02) |
| Brand suffix inconsistency (3 variants) | **Still open** — reconfirmed across `<title>` tags and now also noted in `Article` schema's `publisher.name` (T-03) |
| No visible breadcrumb UI (only JSON-LD) | **Still open**, unchanged (§12) |
| `www.mythaitaxes.com` live-redirect status unverified | **Still open**, unchanged — restated here as T-06 with the exact file references |
