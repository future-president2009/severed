'use client';

import dynamic from 'next/dynamic';
import TopBar from '@/components/TopBar';

// Leaflet needs `window`; load the map only on the client.
const SeveredMap = dynamic(() => import('@/components/SeveredMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[calc(100vh-58px)] items-center justify-center text-ink-faint">
      <span className="font-serif italic">Loading map…</span>
    </div>
  ),
});

export default function MapPage() {
  return (
    <>
      <TopBar current="map" />
      <main className="relative">
        <SeveredMap />
      </main>
    </>
  );
}
