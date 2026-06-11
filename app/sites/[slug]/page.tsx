// app/sites/[slug]/page.tsx
//
// Next.js App Router dynamic route for the four flagship site pages.
// At build time, generateStaticParams pre-renders each flagship slug,
// so the routes are static and CDN-cacheable.

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import FlagshipPage, {
  getFlagshipBySlug,
  allFlagshipSlugs,
} from '@/components/FlagshipPage';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allFlagshipSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = getFlagshipBySlug(slug);
  if (!site) return { title: 'Not found — Severed' };

  return {
    title: `${site.name} — Severed`,
    description: site.popupSummary,
    openGraph: {
      title: `${site.name} — Severed`,
      description: site.popupSummary,
      type: 'article',
      images: [{ url: site.heroImage.src, alt: site.heroImage.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} — Severed`,
      description: site.popupSummary,
      images: [site.heroImage.src],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const site = getFlagshipBySlug(slug);
  if (!site) notFound();
  return <FlagshipPage site={site} />;
}
