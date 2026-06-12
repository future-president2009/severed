import Link from 'next/link';
import Image from 'next/image';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import data from '@/data/severed-data.json';
import type { SeveredData, FlagshipSite } from '@/types/severed-types';

const typed = data as SeveredData;
const featured = typed.sites.find((s) => s.slug === 'kartarpur-sahib') as FlagshipSite;

export default function HomePage() {
  return (
    <>
      <TopBar />

      {/* Hero / thesis */}
      <section className="mx-auto max-w-[760px] px-6 pb-14 pt-20">
        <div className="eyebrow mb-6">A map of the 1947 Partition</div>

        <h1 className="font-serif text-[72px] font-medium leading-none tracking-[-0.025em] text-accent sm:text-[72px] max-sm:text-[52px]">
          Severed
        </h1>

        <p className="mt-6 max-w-[640px] font-serif text-[26px] italic leading-[1.3] text-ink-soft max-sm:text-[22px]">
          Sacred sites that didn't move, and the people who could no longer reach them.
        </p>

        <div className="mt-10 max-w-[640px] font-serif text-[19px] leading-[1.7] text-ink">
          <p className="mb-5">
            The Partition of British India in 1947 is most often told as a story of people who moved: refugees, deaths, migrations. <em>Severed</em> tells it differently. Made in collaboration with Pakistani, American, and Indian authors, it is a map of sacred sites that did not move—sites whose worshippers were left on the wrong side of the new borders.
          </p>
          <p className="mb-5">
            <strong className="font-medium text-accent">Twenty-eight places. Five religious traditions. Three modern nations.</strong> One drawn line, with consequences that have lasted seventy-eight years.
          </p>
          <p className="mb-5">
            Some of these sites have reopened, partially, through diplomatic gesture. Most have not. Some have been destroyed. Some sit ten kilometres from a militarized border and are unreachable from the country whose script they gave the language a name in. Some are visited every week by tens of thousands of people on one side and almost no one from the other. The map below shows them all.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href="/map"
              className="inline-flex items-center gap-2.5 bg-accent px-6 py-3.5 text-[14px] font-medium tracking-wide text-paper no-underline hover:bg-accent-dark"
            >
              Open the map <span>→</span>
            </Link>
            <Link
              href="/methodology"
              className="border-b border-rule pb-0.5 text-[13px] tracking-wide text-ink-soft no-underline hover:border-accent hover:text-accent"
            >
              Read the methodology
            </Link>
          </div>
        </div>
      </section>

      {/* Featured site */}
      <section className="mx-auto max-w-[880px] border-t border-rule px-6 py-14">
        <div className="eyebrow mb-4">Featured site</div>
        <div className="grid items-stretch gap-8 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden border border-rule">
            <Image
              src={featured.heroImage.src}
              alt={featured.heroImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 880px) 100vw, 440px"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="eyebrow mb-3.5 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-status-partial" />
              Partial access · Sikh · Pakistan
            </div>
            <h3 className="mb-3 font-serif text-[28px] font-medium leading-[1.15] text-ink">
              Kartarpur Sahib
            </h3>
            <p className="mb-4 font-serif text-[16px] leading-[1.6] text-ink-soft">
              Where Guru Nanak spent the last 18 years of his life and died in 1539. The site holds both a samadh and a grave, marking the resolution of a dispute between his Hindu and Muslim devotees over his last rites. Abandoned in 1947, briefly fell to smugglers in the 1980s, and finally reopened to Indian Sikh pilgrims via a visa-free corridor in November 2019 — the only such corridor across the partition line.
            </p>
            <Link
              href="/sites/kartarpur-sahib"
              className="self-start border-b border-accent pb-0.5 text-[13px] tracking-wide text-accent no-underline hover:border-ink hover:text-ink"
            >
              Read the full page →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-[880px] border-t border-rule px-6 py-14">
        <div className="eyebrow mb-4">What the map holds</div>
        <h2 className="mb-6 font-serif text-[32px] font-medium leading-[1.15] tracking-tight text-ink">
          Twenty-eight sites, across the lines drawn in 1947 and after
        </h2>
        <p className="mb-8 max-w-[640px] font-serif text-[17px] leading-[1.65] text-ink-soft">
          From Sikh gurdwaras in West Punjab to Hindu Shakti Peethas in Balochistan; from a Buddhist learning centre near Islamabad to a Sufi shrine in Rajasthan whose Pakistani pilgrims are increasingly denied visas. The map includes severance in both directions, across five religious traditions and three modern countries.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { num: '28', label: 'Sites mapped, including 4 flagship long-form pages' },
            { num: '5', label: 'Religious traditions: Sikh, Hindu, Sufi, Jain, Buddhist' },
            { num: '3', label: 'Modern countries: India, Pakistan, Bangladesh' },
            { num: '78', label: 'Years since partition, as of this writing' },
          ].map((s, i) => (
            <div key={i} className="border-t-2 border-accent pt-3.5">
              <div className="font-serif text-[36px] font-medium leading-none text-ink">{s.num}</div>
              <div className="mt-1.5 text-[12px] leading-[1.4] text-ink-soft">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About / hosted */}
      <section className="mx-auto max-w-[880px] border-t border-rule px-6 py-14">
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <div className="eyebrow mb-4">About the project</div>
            <h2 className="mb-4 font-serif text-[32px] font-medium leading-[1.15] tracking-tight text-ink">
              How this map was made
            </h2>
            <p className="mb-3 font-serif text-[17px] leading-[1.65] text-ink-soft">
              Severed is a deliberately limited project. It is not a comprehensive partition history. It is not an oral history archive. It does not assign blame to any modern state. It documents one specific kind of cultural loss—the phantom-amputation of religious geographies from religious communities—across one analytically chosen list of sites.
            </p>
            <p className="mb-4 font-serif text-[17px] leading-[1.65] text-ink-soft">
              The methodology page explains the inclusion criteria, sources, limits, and the author's own position relative to the material.
            </p>
            <Link
              href="/methodology"
              className="border-b border-rule pb-0.5 text-[13px] tracking-wide text-ink-soft no-underline hover:border-accent hover:text-accent"
            >
              Read the methodology →
            </Link>
          </div>
          <div>
            <div className="eyebrow mb-4">Hosted by</div>
            <h2 className="mb-4 font-serif text-[32px] font-medium leading-[1.15] tracking-tight text-ink">
              Thoughtful India
            </h2>
            <p className="mb-4 font-serif text-[17px] leading-[1.65] text-ink-soft">
              Severed is published as part of Thoughtful India's broader work on the cultural, intellectual, and political history of the subcontinent. The project is hosted by Thoughtful India and was researched and written by Maya Sharma.
            </p>
            <Link
              href="/about"
              className="border-b border-rule pb-0.5 text-[13px] tracking-wide text-ink-soft no-underline hover:border-accent hover:text-accent"
            >
              More about the project →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
