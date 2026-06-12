import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Lora, Inter } from 'next/font/google';
import 'leaflet/dist/leaflet.css';
import './globals.css';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://severed.thoughtfulindia.com'),
  title: {
    default: 'Severed — A Map of Sacred Sites Cut Off by the 1947 Partition',
    template: '%s — Severed',
  },
  description:
    'A map of twenty-eight sacred sites cut off from their worshipping communities by the 1947 partition of British India.',
  openGraph: {
    type: 'website',
    siteName: 'Severed',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
