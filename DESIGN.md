---
name: MyThaiTaxes
description: A free Thai income tax estimator, built as a set of soft-coloured carbon-copy forms on an ultramarine desk.
colors:
  desk: "#344A9B"
  desk-deep: "#283B7E"
  desk-night: "#1F2B5C"
  desk-soft: "#5468B0"
  ink: "#25304A"
  ink-soft: "#3A445E"
  ink-mute: "#5A6380"
  paper-white: "#FFFDF5"
  paper-ground: "#EEF1F8"
  paper-rule: "#D5DAEA"
  paper-canary: "#F0E4BF"
  paper-pink: "#E9A8B8"
  paper-sky: "#AFC7E8"
  stamp: "#B83A4B"
typography:
  display:
    fontFamily: "\"Manrope Variable\", Manrope, system-ui, sans-serif"
    fontSize: "76px"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "\"Manrope Variable\", Manrope, system-ui, sans-serif"
    fontSize: "36px"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "\"Manrope Variable\", Manrope, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  body:
    fontFamily: "\"Manrope Variable\", Manrope, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
  body-lead:
    fontFamily: "\"Manrope Variable\", Manrope, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "\"Manrope Variable\", Manrope, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: "0.14em"
  figure:
    fontFamily: "\"JetBrains Mono Variable\", \"JetBrains Mono\", ui-monospace, monospace"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 1.25
    fontFeature: "\"tnum\""
  data:
    fontFamily: "\"JetBrains Mono Variable\", \"JetBrains Mono\", ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: 400
    fontFeature: "\"tnum\""
rounded:
  none: "0px"
  tab: "6px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "40px"
  sheet-x: "32px"
  card: "24px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.desk}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.desk-deep}"
  sheet:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "28px 32px"
  sheet-tab:
    backgroundColor: "{colors.paper-canary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tab}"
    padding: "8px 16px 10px"
  comb-input:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "52px"
    width: "362px"
  result-stamp:
    textColor: "{colors.stamp}"
    rounded: "{rounded.tab}"
    padding: "2px 10px"
  nav-bar:
    backgroundColor: "{colors.desk}"
    textColor: "{colors.paper-white}"
    height: "64px"
  article-card:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px"
  footer:
    backgroundColor: "{colors.desk-night}"
    textColor: "{colors.paper-white}"
---

# Design System: MyThaiTaxes

## Overview

**Creative North Star: "The Carbon-Copy Form Set"**

The site is a desk with forms on it. An ultramarine desk is the ground of the first viewport, header and footer; the working surfaces are carbonless copy papers in warm white, butter canary, soft pink and powder sky blue, stacked and fanned so that the working form is always the nearest sheet. Everything printed on a sheet is printed in one blue ink family (a slate navy for words, the desk blue for ruling): the ruling, the numbered field labels, the boxed digit cells, the text. A single muted red rubber stamp lands only when a result exists. The palette is deliberately soft: chalky papers and a dusty desk blue, so the forms read calm rather than loud.

The world earns trust the way a paper form does: structure is visible. Fields are numbered (1 · 2 · 3), ruled off with a heavy ink line, and filled in. Sources and tax years sit on the sheet in small print beside the figure they qualify, like the fine print on a form. Density is that of a form rather than a brochure: tight vertical rhythm, ruled rows, compact small print, generous only in the hero headline.

Below the desk, the page turns into "the back of the form": a pale ultramarine-tinted ground carrying smaller sheets (rate table, facts, deductions, article cards) and routing slips, divided by perforation lines rather than plain rules.

**Key Characteristics:**
- Ultramarine desk ground with coloured paper sheets as the only major surfaces.
- One ink: every line and every word on paper is in the blue ink family (slate-navy text, desk-blue ruling).
- Square paper; only tab tops and the rubber stamp have soft corners.
- Numbered, tracked-caps field labels over a heavy 2px ink rule.
- Monospaced, tabular figures; income typed into boxed digit cells.
- Red stamp ink appears for the live result and nowhere else on the page.
- Perforation dot-lines as the world's divider and "tear here" cue.

## Colors

A cool, single-hue ink-and-desk system (dusty ultramarine desk, slate-navy ink) carrying four soft, chalky copy papers and one muted red.

### Primary
- **Ultramarine Desk** (desk): the page ground of the hero, the header bar, primary action buttons, all form ruling (2px field rules, comb-input cells, result box, checkbox frames) and in-text links on paper. It is both the furniture and the ruling ink.
- **Pressed Desk** (desk-deep): hover state of primary actions.
- **Night Desk** (desk-night): the footer ground; the desk at the bottom of the page.
- **Desk Highlight** (desk-soft): scrollbar thumb only.

### Secondary
- **Butter Canary Copy** (paper-canary): the second copy in the stack (Annual return), the "Three numbers to know" sheet, the active-nav underline and active mobile-nav fill, footer column headings, the text selection colour, and the focus ring on desk.
- **Soft Pink Copy** (paper-pink): the third copy (Monthly withholding) and a routing slip.
- **Powder Sky Copy** (paper-sky): the fourth copy (Foreign income) and a routing slip.

### Tertiary
- **Stamp Red** (stamp): the ESTIMATE / NO TAX DUE rubber stamp on the live result, and the text caret in inputs (the pen). Nothing else.

### Neutral
- **Slate Navy Ink** (ink): body text, headings and figures on paper; the default text colour of the site.
- **Faded Ink** (ink-soft): secondary copy on paper: descriptions, form-line values, small-print source lines.
- **Pale Ink** (ink-mute): hints, metadata ("Per year", read time), unchecked-state context, table column heads.
- **Warm Top Copy** (paper-white): a warm, faintly cream white; the top sheet and the default sheet colour for cards, tables and the comb input. It is a paper colour, not a text colour: text on the desk stays pure white.
- **Back-of-Form Ground** (paper-ground): the page ground below the desk.
- **Hairline Rule** (paper-rule): thin row dividers inside white sheets (table rows, deduction rows, FAQ rows). A line colour, not a text colour.

On desk surfaces text is white at stepped opacities: 100% for headings and active nav, 85% for lead copy, 75% for idle nav, 60% for metadata, 25-35% for perforations.

### Named Rules
**The One Stamp Rule.** Stamp red is the result. It appears on the stamp that lands on a computed figure and as the input caret, never on buttons, links, headings, errors or decoration.

**The One Ink Rule.** On paper, every line and every word is in the blue ink family (ink, ink-soft, ink-mute, desk). No neutral grey, no black, no second ink colour.

**The Paper Is the Surface Rule.** Major surfaces are paper colours on the desk or the ground. Tinted panels, gradients and translucent cards are not part of the world.

## Typography

**Display Font:** Manrope Variable, extra-bold and tightly tracked (with Manrope, system-ui fallback)
**Body Font:** Manrope Variable at regular weight
**Label/Mono Font:** JetBrains Mono Variable for every figure, the comb input and data cells

**Character:** A rounded, open geometric grotesque that sets the headline like a heavy form title and stays friendly in body copy, with a mechanical mono for anything that is a number. Weight and tracking, not a second family, separate the voices. Manrope has no width axis; do not specify font-stretch or `wdth`.

### Hierarchy
- **Display** (800, 44px mobile / 60px sm / 76px lg, line-height 0.95, -0.02em, balanced wrap): the single hero headline on the desk.
- **Headline** (800, 30-36px, -0.02em): section headings on the ground ("Thai personal income tax, the essentials").
- **Title** (800, 20px; 24-28px on sheet heads; -0.02em): headings of sheets, cards and routing slips. Article-card titles use 700 at default tracking.
- **Body** (400, 15px, line-height 1.625): sheet copy and form text; 17px (20px on sm+ in the hero) for lead paragraphs, capped at max-w-prose / max-w-3xl.
- **Small print** (400, 11-12px): source lines, hints and disclaimers, in ink-soft or ink-mute.
- **Label** (700, 11px, uppercase, 0.14em tracking): numbered field labels, table column heads, fact labels and footer column headings.
- **Figure** (JetBrains Mono 700, 34px / 40px sm, tabular): the result numbers. Data cells (bracket ranges, maxima, month cells, fact values) use the mono at 11-18px, tabular.

### Named Rules
**The Numbers Are Mono Rule.** Any tax figure, bracket range, or entered amount is set in JetBrains Mono with tabular numerals. Prose numbers inside sentences stay in Manrope.

**The Labels Are Fields Rule.** Tracked caps belong to form fields: numbered labels over a ruled line, table heads, fact labels, footer column heads. They name the thing directly beneath them; they are never a floating tagline above a heading.

## Layout

A 1280px max container (max-w-7xl) with side gutters of 16px / 24px (sm) / 40px (lg). The first viewport is a full-height desk (min-height 100svh minus the 64px header on lg) split 5fr : 7fr, headline left and the copy stack right; it collapses to one column below lg, headline first. The stack reserves 24-32px right padding so the fanned sheets never clip.

The copy stack puts all sheets in one grid cell so the tallest sets the height and switching tabs never shifts layout. Sheets behind the active one step by 12px right, 4-8px up and 1.6 degrees of rotation per depth, pivoting at the bottom-left.

Below the desk, the reference area runs 7fr : 5fr (rate table : facts + deductions) on lg, then a two-column routing-slip row, then a two-column FAQ / guides area. Vertical rhythm between blocks is 32-40px; sections open with 56-80px top padding. Sheets pad 20px (mobile) / 24-32px (sm+).

The monthly 12-month row never wraps: on phones it scrolls sideways (56px cells) with a right-edge fade mask; from sm it fills the sheet as twelve equal cells.

## Elevation & Depth

Depth is physical paper on a desk: sheets cast a soft, low, desk-coloured shadow and stack by offset and tilt, never by blur or translucency. There are two shadow weights; flat elements on paper (fields, result box, rows) have no shadow and are defined by ruling instead.

### Shadow Vocabulary
- **Sheet** (`box-shadow: 0 1px 0 rgba(20,29,92,0.08), 0 18px 36px -12px rgba(10,15,60,0.45)`): the hero copy-stack sheets lying on the desk.
- **Small Sheet** (`box-shadow: 0 1px 0 rgba(20,29,92,0.06), 0 8px 18px -10px rgba(10,15,60,0.35)`): sheets, cards and routing slips on the back-of-form ground.

### Named Rules
**The Paper Lift Rule.** Interactive sheets (cards, routing slips) respond to hover by lifting 2px (translateY(-0.5)), not by changing shadow or colour.

**The Nearest Sheet Rule.** The working form is always the top sheet; selecting another copy brings it forward and pushes the rest back into the fan.

## Shapes

Paper is square: sheets, cards, buttons, inputs, checkboxes, result boxes and tables all have 0 radius. The only soft corners are the 6px top corners of sheet tabs and the 6px corners of the rubber stamp, both because the real objects have them. Borders are ruling: 2px desk for field rules, box frames and the comb input; 1px ink at 25% or paper-rule for row hairlines. The perforation (dots of 1.6px radius every 12px, 6px tall, in currentColor) is the divider between major regions and the top edge of the footer.

## Components

### Buttons
Sturdy, square and blue; the desk colour pressed onto paper.
- **Shape:** square (0px).
- **Primary (sheet action):** desk fill, white 15px semibold text, 12px 20px padding, trailing 16px arrow that nudges 2px right on hover.
- **Hover / Focus:** fill deepens to desk-deep; focus is the global 3px outline (desk on paper).
- **Text link action:** 15px semibold desk text, underlined, for secondary actions beside a primary ("Read the foreign income guide", "All articles").

### Chips
Not used.

### Cards / Containers
- **Copy sheet:** paper colour fill, ink text, 0 radius, Sheet shadow, 24-28px top / 20-32px side padding.
- **Back-of-form sheet** (rate table, facts, deductions): white or canary, Small Sheet shadow, header ruled off with a 2px desk line, small-print source footer ruled off above.
- **Article card:** white, Small Sheet shadow, 20px padding; title over a 2px desk rule, then a metadata line and a three-line excerpt; hover lifts 2px and the title turns desk.
- **Routing slip:** sky or pink full-width link sheet, 24px x 20px padding, title + one-line description and a trailing arrow that moves 4px on hover.

### Inputs / Fields
- **Comb input:** the income field is a row of nine boxed digit cells (40px cells, 28px JetBrains Mono 600; 32px / 22px under 420px), 2px desk frame and cell dividers, warm paper-white fill, square. Placeholder digits in a pale blue-grey ink (#A8AEC2). Focus fills the cells with a pale butter wash (#FEF8E1) instead of an outline. Caret is stamp red.
- **Form box (radio and checkbox):** 20px square, 2px desk frame, white; checked draws an X cross in ink. Selected option label goes semibold; unselected stays ink-soft. Focus is a 2px desk outline offset 2px.
- **Field label:** numbered tracked caps ("2 · Monthly salary, in baht") over a 2px desk rule with 6px gap.
- **Search (header):** white fill, 2px white border, square, ink text, ink-mute placeholder.

### Navigation
- **Header:** sticky 64px desk bar. Wordmark is Manrope 800 at -0.02em beside a 28px three-sheet mark (sky, canary, warm white with desk ruling). Links are 15px medium white at 75%, going to 100% on hover; the current page gets a 2px canary underline. Search collapses to an icon.
- **Mobile:** hamburger opens a stacked list; the current page is a canary-filled row with ink text, others white at 85% with a 10% white hover wash.
- **Sheet tabs:** the copy stack's navigation is a tablist of paper-coloured tabs with 6px top corners and 13-14px bold ink labels; idle tabs sit 6px lower and 7% darker, rise 4px on hover, and the active tab sits flush with its sheet. Arrow keys, Home and End move between tabs; short labels on phones.
- **Footer:** night-desk ground under a perforation; four link columns headed by canary field labels, links white at 80%.

### Result Box and Stamp (signature)
The result is a 2px desk-framed box split into Per year / Per month cells with Figure-size mono numbers; before input the figures show as pale dashes and the strip below explains what to do. When a result exists a rubber stamp (3px stamp-red border, 6px corners, 14px heaviest-weight uppercase, 0.18em tracking, multiply blend) lands at -12 degrees with the stamp-in motion: 380ms, cubic-bezier(0.16, 1, 0.3, 1), from 1.6x scale and 2px blur to rest. It reads ESTIMATE, or NO TAX DUE when the tax is zero.

### Perforation and Tear Strip (signature)
The hero ends in a perforated "tear here" strip: a perforation line in white at 35% over a tracked-caps link (12-13px bold, 0.14-0.16em) with a scissors glyph and a down arrow that nudges 4px on a 1.8s loop. It scrolls to the reference section.

### Source Ticket
Every figure-bearing sheet closes with an 11px small-print line naming the source (underlined link), the tax year and "an estimate, not tax advice". It sits on the sheet, below the figure it qualifies, never in a separate notes area.

## Do's and Don'ts

### Do:
- **Do** put every working surface on a paper colour (warm white, canary, pink, sky) sitting on the desk or the back-of-form ground.
- **Do** rule fields with a 2px desk line under a numbered tracked-caps label.
- **Do** set every tax figure, bracket and entered amount in JetBrains Mono with tabular numerals.
- **Do** close every figure-bearing sheet with a source ticket: source link, tax year, estimate disclaimer.
- **Do** use perforation lines to divide major regions.
- **Do** use the global focus ring: 3px canary on desk, desk on paper (the `on-paper` wrapper switches it).
- **Do** set headings in Manrope 800 with -0.02em tracking; never reach for a width axis or font-stretch.
- **Do** keep motion physical and short (sheet transforms 300ms cubic-bezier(0.16, 1, 0.3, 1)) and honour reduced motion.

### Don't:
- **Don't** use stamp red for anything but the result stamp and the input caret.
- **Don't** introduce grey, black or a second ink on paper; text and ruling stay in the blue ink family.
- **Don't** round sheets, cards, buttons or inputs; soft corners belong to tabs and the stamp only.
- **Don't** add tracked-caps lines that float above headings as taglines; tracked caps label a field, a column or a list directly beneath them.
- **Don't** let the monthly 12-month row wrap.
- **Don't** imitate official Revenue Department forms, layouts or emblems; the forms are a generic carbon-copy set.

### Calculator pages (annual, monthly, foreign income)
The calculators are one page frame (`components/calculator/CalculatorFrame`): a short desk band with breadcrumb, title, last-updated and intro; the working form as a warm-white top sheet straddling the desk edge, with the calculator's own copy lying behind it (canary for annual, pink for monthly, sky for foreign income) and that copy's tab reading "Annual return · tax year 2026". The copy tilts 1.4° from the sm breakpoint up and lies flat on phones: the tilt pivots on its bottom-left corner, so on a long form it would swing the tab off a narrow screen. The route fallbacks in App.tsx render the same frame with a loading sheet, so the static HTML and the loaded page match.
- **Step track:** the steps as a row of boxed numbered cells (comb input shape). Done cells are desk-filled and go back on click; the current cell carries the butter wash; future cells are blank. The current step's name and percentage sit on the 2px rule below.
- **Numbered parts (foreign income):** the one-page form is split into numbered parts ruled off by 2px desk lines. Each header has a boxed number (butter wash when open, desk-filled when closed) and, when closed, a one-line summary of what was filled in. Transfers are 2px desk boxes inside the money part; results follow the form on the same sheet after a perforation. Transfer status tags are square and desk-only: filled for "May be taxable", outlined grey for "Likely not taxable", dashed for "Unclear: counted".
- **Choice row** (`ui/form` ChoiceRow): option lists are ruled rows with a form box, title and one-line description; the selected row gets the butter wash and a bold title. No icons or emoji.
- **Fields:** `.field-input` (2px desk box, mono figures, butter wash on focus, 3px ink frame when `aria-invalid`); `.field-error` (ink, bold, led by a drawn boxed "!" mark; never stamp red). Native checkboxes and radios on paper are drawn as form boxes by CSS.
- **Notes:** `.note` (hairline box) for guidance, `.note-strong` (2px desk box) for things to act on or disclaimers. No tinted panels, no side stripes.
- **Results:** a result box with Figure-size cells, a source ticket below, and the stamp: ESTIMATE, NO TAX DUE, REFUND or BALANCE DUE. Refund and owed are told apart by words and stamp, never by green or red. Totals and breakdowns are ruled form lines (`.form-line`, `.form-total`). The monthly result repeats the 12-month row.
- **Back of the form:** below a perforation, reference sheets: the bracket table (built from `BRACKET_RULES` in taxRules.ts, with source and checked date), how it works, and FAQ.

### Worked examples page (/tax-examples/)
Laid out like an article page: header on the ground, a 46rem reading column and a sticky 15rem contents rail on lg (a folded "On this page" sheet below lg). The six concept sections are numbered parts (boxed number beside a display heading over a 2px desk rule), because they are a learning sequence; the rail lists each part with its examples and their tax owed in mono.
- **Example sheet** (`TaxExampleCard`): white sheet, Small Sheet shadow. Title and concept line ruled off by 2px desk; scenario; numbered-style assumptions label over a square-marker list; a result box (Taxable income and Tax for the year as large mono cells, then gross income, marginal and effective rate in a small strip; gross takes its own row on phones). No stamp: an example is not a live result. The deductions example adds a Without / With / Change `.sheet-table`. The calculation sits in a native `<details>` (folded, still in the static HTML) as TaxFlowDiagram form lines, and the sheet closes with a source line that names secondary sources as such.
- **TaxFlowDiagram:** ruled form lines, shared with the calculators' result steps: starting amounts semibold, subtractions with a minus in mono, each subtotal ruled off by 2px desk, bracket bands indented under a hairline.

### FAQ page (/faq/)
Same reading layout: header with a labelled search field (`.field-input`, a live count in the hint line) on the ground, then one white sheet per question group (display heading and a tracked-caps question count over a 2px desk rule). A 300px rail on lg carries the ad rectangle, the sky "Calculate Your Tax" sheet, a `.note`, and the group list, which alone is sticky (the whole rail is taller than a laptop screen). Search swaps the groups for one results sheet, first answer open; no matches offers "Show all questions".
- **Question row** (`FAQAccordion`): a native `<details>` so answers are in the static HTML while folded. Question 16px semibold (bold when open) beside a form box drawing a plus that becomes a minus; answer at prose measure, a "Read more" link and a small-print source line.

### Info pages (About, Methodology, Sources, Privacy, Funding, Contact, 2026 overview, Search, 404, Thank you)
One frame (`components/layout/InfoPage`): `PageHeader` (display h1, lead paragraph, last-updated line, optional extras such as a search field or a back link) on the ground, then `ProseSheet`, a warm-white sheet carrying the shared `.article-body` reading style, so these pages read like the articles. Inside a prose sheet, `.note` and `.note-strong` replace every tinted callout (no amber, green or blue panels), tables take the article table style in a `.table-scroll`, and worked sums are `.form-line` / `.form-total` rows. Content that is itself a sheet (example sheets, the sky calculator sheet) sits on the ground between prose sheets, never inside one.
- **Sources register:** sources are ruled rows, not cards: organisation, a square desk-only type tag (filled "Official source", outlined "Professional tax advisory"), the title link, tax year and review date in mono, and the articles that cite it. One white sheet per topic, with a topic jump list.
- **OfficialSource:** a sourced figure as a 2px desk box: label, mono figure, then a hairline-ruled source ticket (source, tax year, last verified). An unverified figure gets a dashed "Unverified" tag and its note in ink, never a warning colour.
- **Contact:** the four reasons to write are ruled sections on one sheet, each ending in a text-link action with the drawn arrow.

## Tailwind defaults

The migration is complete: no legacy components or migration overrides remain. Tailwind's own `gray-*` and `blue-*` scales, the `rounded`/`-lg`/`-xl`/`-2xl`/`-3xl` radii and the `shadow`/`shadow-sm/md/lg` classes are back to Tailwind's values, so don't use them: they fall outside the one-ink palette and square paper. Use the ink, desk and paper tokens, square corners (`rounded-md` only for sheet tabs, folder tabs and the stamp; `rounded-full` for circles) and the Sheet / Small Sheet shadows. The default border and ring colours point at paper-rule and desk in tailwind.config.js, and input placeholders are set in src/index.css, because Tailwind's preflight would otherwise pull them from its gray and blue scales.

## Brand images

- **Favicon** (`public/favicon.svg`, plus `favicon-32.png` and `apple-touch-icon.png`): the header's stacked-sheets mark (sky, canary, warm white with desk rules) on a square desk tile, with the rules thickened to stay legible at 16px.
- **Link preview** (`public/og-image.png`, 1200×630): the home hero on the desk, with the headline, its subline and the quick-estimate form on a copy stack. It's set once in `index.html` (`og:image`, `twitter:card`), so every page shares it. Its source is `scripts/brand/og-image.html`. After editing the HTML or the favicon SVG, re-render the PNGs with `scripts/brand/render.cjs` (the header of that script says how). Keep tax figures off the image: it can't update when the rates change.
