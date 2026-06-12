'use client';

// SeveredMap.tsx
//
// Drop-in React/Next.js component for the Severed project map.
//
// Required packages:
//   npm i leaflet react-leaflet
//   npm i -D @types/leaflet
//
// Required imports in your global CSS or _app:
//   @import 'leaflet/dist/leaflet.css';
//
// Usage (Next.js App Router):
//   import dynamic from 'next/dynamic';
//   const SeveredMap = dynamic(() => import('@/components/SeveredMap'), { ssr: false });
//   <SeveredMap />
//
// (Dynamic import with ssr:false is required because Leaflet touches `window`.)

import { useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import type { FeatureCollection } from 'geojson';

import data from '@/data/severed-data.json';
import type { SeveredData, Site, AccessStatus, TraditionGroup } from '@/types/severed-types';

const typed = data as SeveredData;

// ---------------------------------------------------------------------------
// Approximate 1947 Radcliffe Line as GeoJSON.
// Replace with proper sourced border data before publication.
// ---------------------------------------------------------------------------

const RADCLIFFE_LINE: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: '1947 Western Border (approx.)' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [73.85, 34.10], [74.50, 32.75], [74.55, 31.60], [73.95, 30.50],
          [72.50, 29.20], [71.00, 27.40], [70.40, 25.50], [69.30, 24.10],
          [68.55, 24.00],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: '1947 Eastern Border (approx.)' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [88.70, 26.60], [88.60, 25.00], [88.60, 23.80], [88.70, 22.40],
          [89.00, 21.70], [91.10, 21.80], [92.40, 22.90], [92.30, 24.00],
          [92.00, 25.30], [90.50, 25.90], [89.20, 26.20], [88.70, 26.60],
        ],
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Status color palette (muted, color-blind tested)
// ---------------------------------------------------------------------------

const STATUS_COLOR: Record<AccessStatus, string> = {
  active: '#4a7c4e',
  partial: '#c69b3a',
  reopened: '#c69b3a',
  restricted: '#b86b3a',
  reconstructed: '#4a7c4e',
  inaccessible: '#94352f',
  defunct: '#94352f',
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

// Group status filters: 'partial' filter includes reopened, etc.
function statusMatchesFilter(siteStatus: AccessStatus, filter: string): boolean {
  if (filter === 'all') return true;
  if (filter === 'partial') return siteStatus === 'partial' || siteStatus === 'reopened';
  if (filter === 'active') return siteStatus === 'active' || siteStatus === 'reconstructed';
  if (filter === 'inaccessible') return siteStatus === 'inaccessible' || siteStatus === 'defunct';
  return siteStatus === filter;
}

// ---------------------------------------------------------------------------
// Marker icon factory
// ---------------------------------------------------------------------------

function makeIcon(status: AccessStatus, flagship: boolean): L.DivIcon {
  const color = STATUS_COLOR[status];
  const size = flagship ? 20 : 14;
  const ringWidth = flagship ? 2 : 1;

  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        border: 2px solid #ffffff;
        box-shadow: 0 0 0 ${ringWidth}px rgba(0,0,0,0.4);
        cursor: pointer;
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type TraditionFilter = 'all' | TraditionGroup;
type StatusFilter = 'all' | 'active' | 'partial' | 'restricted' | 'inaccessible';

export default function SeveredMap() {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [traditionFilter, setTraditionFilter] = useState<TraditionFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const visibleSites = useMemo(() => {
    return typed.sites.filter((s) => {
      const tMatch = traditionFilter === 'all' || s.traditionGroup === traditionFilter;
      const sMatch = statusMatchesFilter(s.accessStatus, statusFilter);
      return tMatch && sMatch;
    });
  }, [traditionFilter, statusFilter]);

  const closePanel = useCallback(() => setSelectedSite(null), []);

  return (
    <div className="relative h-screen w-screen bg-[#f7f4ef]">
      <MapContainer
        center={[27, 78]}
        zoom={5}
        minZoom={4}
        maxZoom={12}
        maxBounds={[[5, 55], [40, 100]]}
        maxBoundsViscosity={0.8}
        style={{ height: '100%', width: '100%', background: '#f7f4ef' }}
        zoomControl
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors &middot; &copy; CARTO"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />

        <GeoJSON
          data={RADCLIFFE_LINE}
          style={{ color: '#94352f', weight: 1.5, opacity: 0.55, dashArray: '4 6' }}
        />

        {visibleSites.map((site) => (
          <Marker
            key={site.id}
            position={[site.coordinates.lat, site.coordinates.lng]}
            icon={makeIcon(site.accessStatus, site.flagship)}
            eventHandlers={{ click: () => setSelectedSite(site) }}
          />
        ))}
      </MapContainer>

      {/* Title card */}
      <div className="pointer-events-none absolute left-5 top-5 z-[500] max-w-[380px]">
        <div className="pointer-events-auto border border-[#d8d2c8] bg-white px-[22px] py-[18px] shadow-sm">
          <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#8a8a8a]">
            A map of the 1947 Partition
          </div>
          <h1 className="font-serif text-[28px] font-medium leading-[1.1] tracking-tight text-[#1a1a1a]">
            Severed
          </h1>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-[#4a4a4a]">
            Sacred sites cut off from their communities when British India was partitioned in 1947, and the further severances of 1971 and after.{' '}
            <strong>{typed.meta.sitesCount} sites</strong> across Pakistan, India, and Bangladesh.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="absolute right-5 top-5 z-[500] flex flex-col items-end gap-2">
        <FilterGroup
          options={[
            { value: 'all', label: 'All traditions' },
            { value: 'Sikh', label: 'Sikh' },
            { value: 'Hindu', label: 'Hindu' },
            { value: 'Sufi', label: 'Sufi' },
            { value: 'Jain', label: 'Jain' },
            { value: 'Buddhist', label: 'Buddhist' },
          ]}
          value={traditionFilter}
          onChange={(v) => setTraditionFilter(v as TraditionFilter)}
        />
        <FilterGroup
          options={[
            { value: 'all', label: 'All access' },
            { value: 'active', label: 'Active' },
            { value: 'partial', label: 'Partial / Reopened' },
            { value: 'restricted', label: 'Restricted' },
            { value: 'inaccessible', label: 'Inaccessible' },
          ]}
          value={statusFilter}
          onChange={(v) => setStatusFilter(v as StatusFilter)}
        />
      </div>

      {/* Legend */}
      <div className="absolute bottom-5 left-5 z-[500] hidden max-w-[280px] border border-[#d8d2c8] bg-white px-4 py-3 text-[11px] sm:block">
        <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a8a8a]">
          Access status
        </div>
        <LegendRow color={STATUS_COLOR.active} label="Active / Reconstructed" />
        <LegendRow color={STATUS_COLOR.partial} label="Partial / Reopened" />
        <LegendRow color={STATUS_COLOR.restricted} label="Restricted (visa-gated)" />
        <LegendRow color={STATUS_COLOR.inaccessible} label="Inaccessible / Defunct" />
        <div className="mt-2 border-t border-[#d8d2c8] pt-2 text-[10.5px] italic text-[#8a8a8a]">
          Larger markers indicate flagship sites with full pages.
        </div>
      </div>

      {/* Side panel */}
      <SidePanel site={selectedSite} onClose={closePanel} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// FilterGroup
// ---------------------------------------------------------------------------

function FilterGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex max-w-[480px] flex-wrap justify-end gap-1.5 border border-[#d8d2c8] bg-white p-1.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-[11px] py-[5px] text-[12px] tracking-wide transition-colors ${
            value === opt.value
              ? 'bg-[#1a1a1a] text-[#f7f4ef]'
              : 'text-[#4a4a4a] hover:text-[#1a1a1a]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// LegendRow
// ---------------------------------------------------------------------------

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="mb-1 flex items-center gap-2 text-[#4a4a4a]">
      <span
        className="h-2.5 w-2.5 flex-shrink-0 rounded-full border-[1.5px] border-white"
        style={{ background: color, boxShadow: '0 0 0 1px rgba(0,0,0,0.3)' }}
      />
      {label}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Side Panel
// ---------------------------------------------------------------------------

function SidePanel({ site, onClose }: { site: Site | null; onClose: () => void }) {
  const open = site !== null;

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-[600] w-[420px] max-w-[92vw] overflow-y-auto border-l border-[#d8d2c8] bg-white shadow-lg transition-transform duration-300 ease-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
      aria-hidden={!open}
    >
      <button
        onClick={onClose}
        aria-label="Close panel"
        className="absolute right-[18px] top-[14px] px-2 py-1 text-[22px] leading-none text-[#8a8a8a] hover:text-[#1a1a1a]"
      >
        &times;
      </button>
      {site && <SitePanelContent site={site} />}
    </aside>
  );
}

function SitePanelContent({ site }: { site: Site }) {
  const statusColor = STATUS_COLOR[site.accessStatus];
  const statusText = STATUS_LABEL[site.accessStatus];

  return (
    <div className="px-8 pb-10 pt-14">
      {site.heroImage && (
        <figure className="-mx-8 mb-6 border-y border-[#d8d2c8]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.heroImage.src}
            alt={site.heroImage.alt}
            className="block h-auto w-full"
            loading="lazy"
          />
          <figcaption className="px-8 py-2.5 text-[11px] leading-[1.45] text-[#8a8a8a]">
            {site.heroImage.credit} — {site.heroImage.license}
          </figcaption>
        </figure>
      )}

      <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#8a8a8a]">
        {site.tradition} &middot; {site.country}
      </div>
      <h2 className="font-serif text-[26px] font-medium leading-[1.15] tracking-tight text-[#1a1a1a]">
        {site.name}
      </h2>
      {site.altNames && site.altNames.length > 0 && (
        <div className="mt-1 text-[12px] italic text-[#8a8a8a]">
          also: {site.altNames.join(', ')}
        </div>
      )}
      <div className="mt-2.5 text-[13px] text-[#4a4a4a]">
        {site.locality}, {site.region}
      </div>

      <div className="mt-[18px] flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 border border-[#d8d2c8] bg-[#f7f4ef] px-2.5 py-1 text-[11px] uppercase tracking-wider text-[#4a4a4a]">
          <span className="h-2 w-2 rounded-full" style={{ background: statusColor }} />
          {statusText}
        </span>
        {site.flagship && (
          <span className="inline-flex items-center border border-[#d8d2c8] bg-[#f7f4ef] px-2.5 py-1 text-[11px] uppercase tracking-wider text-[#4a4a4a]">
            Flagship
          </span>
        )}
      </div>

      <div className="my-[22px] border-l-2 border-[#8a8a8a] bg-[#f7f4ef] px-4 py-3.5 text-[13.5px] italic leading-[1.55] text-[#4a4a4a]">
        {site.severanceDescription}
      </div>

      <p className="mb-6 font-serif text-[15.5px] leading-[1.65] text-[#1a1a1a]">
        {site.popupSummary}
      </p>

      {site.flagship && (
        <a
          href={`/sites/${site.slug}`}
          className="inline-block border-b border-[#1a1a1a] pb-0.5 text-[12px] uppercase tracking-wider text-[#1a1a1a] hover:border-[#b86b3a] hover:text-[#b86b3a]"
        >
          Read the full page →
        </a>
      )}
    </div>
  );
}
