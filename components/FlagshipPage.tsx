// FlagshipPage.tsx
//
// Reusable flagship-site page component.
//
// Required packages (in addition to react-leaflet from the map):
//   npm i react-markdown remark-gfm rehype-slug
//
// Usage (Next.js App Router): see app/sites/[slug]/page.tsx for the route wrapper.

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';

import data from '@/data/severed-data.json';
import type {
  SeveredData,
  FlagshipSite,
  AccessStatus,
} from '@/types/severed-types';

const typed = data as SeveredData;

const STATUS_COLOR: Record<AccessStatus, string> = {
  active: '#3d8c4f',
  partial: '#d4a52e',
  reopened: '#d4a52e',
  restricted: '#c46a2d',
  reconstructed: '#3d8c4f',
  inaccessible: '#a83329',
  defunct: '#a83329',
};

const STATUS_LABEL: Record<AccessStatus, string> = {
  active: 'Active',
  partial: 'Partial Access',
  reopened: 'Reopened',
  restricted: 'Restricted',
  reconstructed: 'Reconstructed',
  inaccessible: 'Inaccessible',
  defunct: 'Defunct',
};

const SOURCE_TYPE_LABEL: Record<string, string> = {
  article: 'Article',
  academic: 'Academic',
  book: 'Book',
  wikipedia: 'Wikipedia',
  primary: 'Primary',
  official: 'Official',
  report: 'Report',
  other: 'Other',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getFlagshipBySlug(slug: string): FlagshipSite | null {
  const site = typed.sites.find((s) => s.slug === slug);
  if (!site || !site.flagship) return null;
  return site;
}

export function allFlagshipSlugs(): string[] {
  return typed.sites.filter((s) => s.flagship).map((s) => s.slug);
}

// ---------------------------------------------------------------------------
// FlagshipPage
// ---------------------------------------------------------------------------

export default function FlagshipPage({ site }: { site: FlagshipSite }) {
  const statusColor = STATUS_COLOR[site.accessStatus];
  const statusLabel = STATUS_LABEL[site.accessStatus];

  return (
    <div className="min-h-screen bg-[#f5efe6] font-sans antialiased">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-[#d8d2c8] bg-[#f5efe6]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between px-6 py-3.5">
          <Link
            href="/"
            className="text-[13px] text-[#4a4a4a] hover:text-[#1a1a1a]"
          >
            ← Back to map
          </Link>
          <span className="font-serif text-[18px] font-medium tracking-tight text-[#a83329]">
            Severed
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto mt-10 max-w-[880px] px-6">
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#d8d2c8]">
          <Image
            src={site.heroImage.src}
            alt={site.heroImage.alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 880px) 100vw, 880px"
          />
          {site.heroImage.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-12">
              <p className="max-w-[540px] font-serif italic text-[15px] leading-[1.4] text-white/95">
                {site.heroImage.caption}
              </p>
            </div>
          )}
        </div>
        <p className="mt-2 text-[11px] uppercase tracking-[0.1em] text-[#8a8a8a]">
          {site.heroImage.credit} — {site.heroImage.license}
        </p>
      </section>

      {/* Article */}
      <article className="mx-auto max-w-[680px] px-6 pt-10">
        <div className="mb-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8a8a8a]">
          {site.tradition}
          <span className="mx-2 text-[#d8d2c8]">·</span>
          {site.country}
          <span className="mx-2 text-[#d8d2c8]">·</span>
          <span className="text-[#a83329]">Flagship site</span>
        </div>

        <h1 className="font-serif text-[44px] font-medium leading-[1.08] tracking-tight text-[#1a1a1a] sm:text-[44px]">
          {site.name}
        </h1>

        {site.altNames && site.altNames.length > 0 && (
          <p className="mt-2 font-serif text-[16px] italic text-[#8a8a8a]">
            also: {site.altNames.join(', ')}
          </p>
        )}

        <p className="mt-3.5 text-[14px] text-[#4a4a4a]">
          {site.locality}, {site.region}, {site.country}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 border border-[#d8d2c8] bg-white px-3 py-1 text-[11px] uppercase tracking-wider text-[#4a4a4a]">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: statusColor }}
            />
            {statusLabel}
          </span>
        </div>

        <div className="my-9 border-l-2 border-[#a83329] bg-white px-5 py-4 font-serif text-[16px] italic leading-[1.55] text-[#4a4a4a]">
          {site.severanceDescription}
        </div>

        {/* Body */}
        <div className="prose-severed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="mb-5 font-serif text-[19px] leading-[1.7] text-[#1a1a1a]">
                  {children}
                </p>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
              sup: ({ children }) => (
                <sup className="text-[11px]">{children}</sup>
              ),
              a: ({ href, children }) => {
                const isFootnoteRef = href?.startsWith('#user-content-fn-');
                return (
                  <a
                    href={href}
                    className={
                      isFootnoteRef
                        ? 'mx-px px-0.5 text-[#a83329] no-underline hover:bg-[#a83329] hover:text-white'
                        : 'text-[#a83329] underline decoration-[#d8d2c8] decoration-1 underline-offset-2 hover:decoration-[#a83329]'
                    }
                  >
                    {children}
                  </a>
                );
              },
              // Hide the auto-generated footnotes section since we render our own below
              section: ({ node, ...props }) => {
                const className = (props as { className?: string }).className;
                if (className?.includes('footnotes')) return null;
                return <section {...props} />;
              },
            }}
          >
            {site.body}
          </ReactMarkdown>
        </div>

        {/* Pull quote */}
        {site.pullQuote && (
          <blockquote className="relative my-11 border-y border-[#d8d2c8] py-6 font-serif text-[24px] italic leading-[1.4] text-[#1a1a1a]">
            <span className="absolute -left-4 top-3 font-serif text-[40px] leading-none text-[#a83329]">
              &ldquo;
            </span>
            {site.pullQuote}
          </blockquote>
        )}
      </article>

      {/* Gallery */}
      {site.gallery.length > 0 && (
        <section className="mx-auto mt-14 max-w-[880px] px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {site.gallery.map((img, i) => (
              <figure key={i} className="relative">
                <div className="relative aspect-[4/3] overflow-hidden border border-[#d8d2c8]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 880px) 100vw, 280px"
                  />
                </div>
                {img.caption && (
                  <figcaption className="mt-2 font-serif text-[12.5px] italic leading-[1.4] text-[#4a4a4a]">
                    {img.caption}
                  </figcaption>
                )}
                <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-[#8a8a8a]">
                  {img.credit} — {img.license}
                </p>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Sources */}
      <section className="mx-auto mt-16 max-w-[680px] border-t border-[#d8d2c8] px-6 pt-8">
        <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8a8a8a]">
          Sources
        </h2>
        <ol className="list-none p-0">
          {site.sources.map((s) => (
            <li
              key={s.id}
              id={`user-content-fn-${s.id}`}
              className="relative mb-3.5 pl-8 text-[13.5px] leading-[1.5] text-[#4a4a4a] target:border-l-2 target:border-[#a83329] target:bg-[#a83329]/[0.08] target:pl-[30px]"
            >
              <span className="absolute left-0 top-0 font-medium text-[#a83329]">
                {s.id}.
              </span>
              <span className="mr-1.5 text-[10px] uppercase tracking-wider text-[#8a8a8a]">
                {SOURCE_TYPE_LABEL[s.type] || s.type}
              </span>
              {s.author && <>{s.author}. </>}
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[#d8d2c8] decoration-1 underline-offset-2 hover:text-[#a83329] hover:decoration-[#a83329]"
                >
                  "{s.title}"
                </a>
              ) : (
                <>"{s.title}"</>
              )}
              {s.publication && (
                <>
                  . <em className="italic">{s.publication}</em>
                </>
              )}
              {s.date && <>, {s.date}</>}
              .
              {s.note && (
                <span className="mt-1 block text-[12.5px] italic text-[#8a8a8a]">
                  {s.note}
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Footer */}
      <footer className="mx-auto mt-14 flex max-w-[680px] items-center justify-between border-t border-[#d8d2c8] px-6 py-8 pb-16 text-[12px] text-[#8a8a8a]">
        <Link
          href="/"
          className="border-b border-[#d8d2c8] pb-0.5 text-[#4a4a4a] no-underline hover:border-[#a83329] hover:text-[#a83329]"
        >
          ← Back to map
        </Link>
        <span>
          <em className="italic">Severed</em> — A Map of the 1947 Partition
        </span>
      </footer>
    </div>
  );
}
