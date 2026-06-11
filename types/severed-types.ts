// severed-types.ts
//
// Type definitions for severed-data.json — the single source of truth for the Severed project.
// Import in React components like:
//
//   import data from './severed-data.json';
//   import type { SeveredData, FlagshipSite, PopupSite } from './severed-types';
//   const typed = data as SeveredData;
//
// The discriminated union on `flagship` means TypeScript narrows the type for you:
//
//   if (site.flagship) { site.body }  // TS knows body exists
//   if (!site.flagship) { /* body not accessible */ }

// ---------------------------------------------------------------------------
// Enums and primitives
// ---------------------------------------------------------------------------

/** How accessible the site is to its severed community as of project publication. */
export type AccessStatus =
  | "active"          // functioning, accessible to relevant community
  | "partial"         // limited corridor / occasional visa group access
  | "reopened"        // recently reopened after long closure
  | "restricted"      // functioning structure, visa-gated access
  | "reconstructed"   // destroyed and rebuilt
  | "inaccessible"    // cannot be visited; ruined or militarized
  | "defunct";        // structure lost or collapsed

/** Broad religious-tradition grouping. Used for filter UI. */
export type TraditionGroup =
  | "Sikh"
  | "Hindu"
  | "Sufi"
  | "Jain"
  | "Buddhist";

/** Severance direction — which community was cut off, regardless of where the site is. */
export type SeveranceDirection =
  | "cutoff-india-to-pakistan"     // Indian community lost access to site in Pakistan
  | "cutoff-pakistan-to-india"     // Pakistani community lost access to site in India
  | "cutoff-india-to-bangladesh"   // Indian community lost access to site in Bangladesh
  | "destroyed"                    // Site itself destroyed during partition era
  | "bidirectional"                // Both communities cut off in different ways
  | "internal-displacement";       // Site severed by internal community displacement (e.g., Kashmiri Pandit)

// ---------------------------------------------------------------------------
// Image — every image MUST carry credit and license info.
// Thoughtful India is a publication; image rights are non-optional.
// ---------------------------------------------------------------------------

export interface SiteImage {
  /** Path or URL to image file. */
  src: string;
  /** Required alt text for accessibility. */
  alt: string;
  /** Optional caption shown beneath the image. */
  caption?: string;
  /** Photographer or source — REQUIRED for every image. */
  credit: string;
  /** License — Public Domain, CC BY-SA 4.0, Wikimedia Commons, etc. */
  license: string;
  /** Link back to the original source if applicable. */
  sourceUrl?: string;
}

// ---------------------------------------------------------------------------
// Source — for inline numbered footnotes.
// Body text references these with markdown footnote syntax: `[^1]` `[^2]`.
// The footnote number on the rendered page matches the `id` field.
// ---------------------------------------------------------------------------

export interface Source {
  /** Footnote number — matches `[^id]` in body text. Must be unique per site. */
  id: number;
  /** Source type, used for citation formatting on the page. */
  type:
    | "article"     // news article / magazine piece
    | "academic"    // peer-reviewed paper / academic book
    | "book"        // non-academic book
    | "wikipedia"   // Wikipedia article
    | "primary"     // primary historical source (Al-Biruni, Kalhana, etc.)
    | "official"    // government / institutional document
    | "report"      // think-tank or NGO report
    | "other";
  title: string;
  author?: string;
  publication?: string;
  date?: string;
  url?: string;
  /** Page number, chapter, paragraph reference if relevant. */
  locator?: string;
  /** Optional one-line note explaining what the source supports. */
  note?: string;
}

// ---------------------------------------------------------------------------
// Geography
// ---------------------------------------------------------------------------

export interface Coordinates {
  lat: number;
  lng: number;
  /** Set to true if the precise coordinates are not yet verified. */
  approximate?: boolean;
}

// ---------------------------------------------------------------------------
// Base site — fields common to flagship and popup sites
// ---------------------------------------------------------------------------

export interface BaseSite {
  /** Stable numeric ID matching the master spreadsheet. */
  id: number;
  /** URL-safe slug for routing: `/sites/kartarpur-sahib`. */
  slug: string;
  /** Primary display name. */
  name: string;
  /** Alternate names, transliterations, or short forms. */
  altNames?: string[];
  /** Free-form descriptor for display: "Sufi (Chishti)", "Hindu (Shakti)". */
  tradition: string;
  /** Coarse-grained grouping for filter UI. */
  traditionGroup: TraditionGroup;
  /** Modern country containing the site. */
  country: string;
  /** State / province / region within country. */
  region: string;
  /** City, district, or village. */
  locality: string;
  coordinates: Coordinates;
  accessStatus: AccessStatus;
  severanceDirection: SeveranceDirection;
  /** Human-readable severance sentence ("Cut off from Indian Sikhs after 1947"). */
  severanceDescription: string;
  /** ~50-100 words shown in the map popup card when the marker is clicked. */
  popupSummary: string;
  /** Hero / lead image for the site. Optional on popup sites, required on flagships. */
  heroImage?: SiteImage;
  /** Numbered footnote sources referenced in popupSummary and (for flagships) body. */
  sources: Source[];
}

// ---------------------------------------------------------------------------
// PopupSite — the 24 sites that get a map marker + popup card but no full page
// ---------------------------------------------------------------------------

export interface PopupSite extends BaseSite {
  flagship: false;
}

// ---------------------------------------------------------------------------
// FlagshipSite — the 4 sites that get a full page with hero + gallery + body
// ---------------------------------------------------------------------------

export interface FlagshipSite extends BaseSite {
  flagship: true;
  /** Hero image is REQUIRED for flagship pages. */
  heroImage: SiteImage;
  /** 2-4 additional images for the page. */
  gallery: SiteImage[];
  /** Full long-form page content in Markdown. Use `[^1]` `[^2]` footnote markers. */
  body: string;
  /** Optional pull-quote rendered as a callout on the page. */
  pullQuote?: string;
  /** Word count of body — useful for editorial tracking. */
  wordCount?: number;
}

export type Site = PopupSite | FlagshipSite;

// ---------------------------------------------------------------------------
// Top-level data shape
// ---------------------------------------------------------------------------

export interface SeveredData {
  meta: {
    version: string;
    lastUpdated: string;       // ISO date
    sitesCount: number;
    flagshipsCount: number;
    /** Notes about data limitations, last research pass, etc. */
    editorialNote?: string;
  };
  sites: Site[];
}

// ---------------------------------------------------------------------------
// Type guards for narrowing in React components
// ---------------------------------------------------------------------------

export const isFlagship = (site: Site): site is FlagshipSite => site.flagship === true;
export const isPopup = (site: Site): site is PopupSite => site.flagship === false;
