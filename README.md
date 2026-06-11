# Severed

A map of sacred sites cut off from their communities by the 1947 partition of British India.

---

## Quick start

You'll need Node.js 18.17 or later. Then:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Routes:
- `/` — Landing page (thesis + featured Kartarpur + stats)
- `/map` — The interactive map of 28 sites
- `/sites/[slug]` — Flagship long-form pages (kartarpur-sahib, hinglaj-mata, sharada-peeth, ajmer-sharif)
- `/methodology` — Methodology / credibility doc
- `/about` — About + acknowledgments + contact

## Project structure

```
severed/
├── app/                    Next.js App Router pages
│   ├── layout.tsx          Root layout (fonts, metadata, globals)
│   ├── page.tsx            Landing
│   ├── globals.css         Design tokens + shared utility classes
│   ├── map/                /map
│   ├── methodology/        /methodology
│   ├── about/              /about
│   └── sites/[slug]/       /sites/kartarpur-sahib, etc.
├── components/
│   ├── SeveredMap.tsx      Leaflet map (client component)
│   ├── FlagshipPage.tsx    Flagship-page template
│   ├── TopBar.tsx          Shared nav
│   └── Footer.tsx          Shared footer
├── data/
│   └── severed-data.json   Single source of truth: 28 sites, 35 images, credits, sources
├── types/
│   └── severed-types.ts    TypeScript interfaces
├── public/
│   └── images/
│       ├── flagships/      14 sourced flagship images
│       └── sites/          21 sourced popup-site images
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts      Design tokens as Tailwind colors/fonts
├── postcss.config.js
└── .gitignore
```

## Build and deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com/new and import the repo.
3. Vercel detects Next.js automatically — no config needed.
4. First deploy takes ~2-3 minutes. You'll get a `*.vercel.app` URL.
5. For a custom domain (e.g. `severed.thoughtfulindia.com`), add it under Vercel project settings → Domains.

You can also build locally to verify:

```bash
npm run build
npm start
```

## Before you launch — punchlist

Search the codebase for `todo-flag` (or `[your-email`) to find every placeholder. The visual yellow flags in the rendered pages show you exactly what's left:

- **`/methodology`** — the positionality statement is drafted with reasonable defaults; verify each factual detail (Indian-American, Hindu upbringing, no displaced-community family connection) actually matches. Replace the email and date range.
- **`/about`** — fill in: the date range you worked on this, the GitHub link to this repo, the specific acknowledgments (name your AP Lang teacher, anyone who reviewed drafts), and the Thoughtful India description paragraph.
- **`metadataBase` in `app/layout.tsx`** — change `https://severed.thoughtfulindia.com` to your actual deployed URL once you have one. This drives Open Graph image URLs in social shares.

## Image sourcing — what's done and what's not

**37 of 40 images sourced** from Wikimedia Commons under verified free licenses (CC BY, CC BY-SA, CC0, Public Domain, GFDL). All credits and licenses live in `data/severed-data.json` alongside the image path.

**3 images not sourced** — these sites have no usable Wikimedia coverage:

| Site | Type | Notes |
|---|---|---|
| Gurdwara Ratan Talao | popup hero | Obscure Karachi gurdwara, no usable Wikimedia coverage (the "Karachi Gurdwara IMG 7778" series is the gurdwara inside the Swaminarayan Mandir complex — a different site) |
| Gurdwara Pakhoke | popup hero | Among the smallest in the dataset; rediscovered through Gurmukhi sources only |
| Bebe Nanaki Gurdwara | popup hero | "Gurudwara Bebe Nanaki Ji" exists on Wikimedia but it's the Sultanpur Lodhi (India) shrine — wrong site; this dataset references the Dera Chahal (Pakistan) one |

Two earlier gaps were closed in round 2 with accurate captions:

- **Kartarpur "grave"** (gallery): the sourced image is actually the *samadh* (the Sikh-tradition memorial inside the shrine), not the Muslim grave outside. The caption in `data/severed-data.json` reflects this honestly — the dossier text already addresses both markers.
- **Sharada Tikker** (gallery): the sourced image is the Karnah valley landscape, not the temple itself. The caption notes that the LoC runs through the river visible in the photo.

For each, the JSON simply has no image field — pages render correctly without them. To add later: source the image (Wikimedia, direct photographer permission, etc.), drop into `public/images/sites/{slug}.jpg` (or `flagships/`), and add the image block to the relevant entry in `data/severed-data.json` with `src`, `alt`, `caption`, `credit`, `license`, `sourceUrl`.

## Image credits

Each image has a `credit` and `license` field in `data/severed-data.json`. The credit is displayed below the image on every page. Common licenses in this dataset:

- **CC BY-SA 4.0** — must credit + share-alike (any derivative work must also be CC BY-SA)
- **CC BY 4.0** — must credit
- **Public Domain** — no requirement, but credited anyway
- **GFDL** — free use with credit

When you deploy: the share-alike clause of CC BY-SA means this site's content is also licensed share-alike. Note this on the methodology page when ready, or use a footer line: "Image content under CC BY-SA 4.0. Text content © Maya Sharma."

## A few editorial notes from the build

- **Pull-quote placement**: each flagship's pull quote sits between specific paragraphs in `build_flagship_pages.py` (in the project root, not in this folder). If you change the body in `severed-data.json`, the pull-quote position may need adjusting.
- **Map status colors**: the four-color status palette (green=active, amber=partial, orange=restricted, red=inaccessible) is locked. Tradition is NOT color-coded on markers — that's intentional; coding tradition would conflict with the project's thesis that severance crosses tradition lines.
- **Hosted by Thoughtful India**: the project is structured for sub-hosting (severed.thoughtfulindia.com or thoughtfulindia.com/severed). The internal nav uses absolute paths from `/`, so a subpath deploy would need a `basePath` in `next.config.js`.

## Adding a new site later

1. Add a new entry to `data/severed-data.json` following the existing schema.
2. Source an image if you want one. Drop it in `public/images/sites/{slug}.jpg`.
3. Update `meta.sitesCount` and any flagship counts.
4. Add the slug to the master `severed-sites.xlsx` if you maintain that.

The map auto-renders all sites from the JSON; no component changes needed.

## Adding a fifth flagship later

If you ever want to add a fifth flagship long-form page:

1. Set `flagship: true` on its entry in `data/severed-data.json`.
2. Add the long-form `body` field with markdown, `pullQuote`, `gallery` (3 images), and the full `sources` array.
3. The route `/sites/{new-slug}` will work automatically via `generateStaticParams` in `app/sites/[slug]/page.tsx`.

## License

- Code: MIT (or whatever you prefer — adjust this line).
- Text content: © Maya Sharma. All rights reserved unless otherwise noted.
- Image content: see individual credits in `severed-data.json`. Free-licensed (CC, GFDL, PD) where so noted.
