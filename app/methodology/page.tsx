import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import data from '@/data/severed-data.json';
import type { SeveredData } from '@/types/severed-types';

const typed = data as SeveredData;

export const metadata = {
  title: 'Methodology',
  description: 'Inclusion criteria, sources, limitations, and a positionality statement for Severed.',
};

export default function MethodologyPage() {
  return (
    <>
      <TopBar current="methodology" />

      <article className="mx-auto max-w-[680px] px-6 pt-14">
        <div className="eyebrow mb-4">Methodology</div>
        <h1 className="mb-5 font-serif text-[44px] font-medium leading-[1.08] tracking-tight max-sm:text-[34px]">
          How this map was made
        </h1>

        <p className="mb-12 font-serif text-[19px] italic leading-[1.6] text-ink-soft">
          Severed is a deliberately limited project, made under deliberately stated constraints.
          This page explains those constraints, the criteria by which sites were included or
          excluded, the sources relied on, the author's own position relative to the material,
          and the gaps that remain.
        </p>

        <div className="mb-12 border border-rule bg-paper px-7 py-5">
          <div className="eyebrow mb-2.5">In short</div>
          <p className="m-0 font-serif text-[16px] leading-[1.6] text-ink-soft">
            Twenty-eight sites, included if they met four criteria and excluded if any of three
            rules applied. Sourced from at least two independent references each, prioritizing
            academic and primary sources where available. The author is a high school student
            writing from outside the wound. Errors are flagged where known and remain mine.
            Corrections welcome.
          </p>
        </div>

        <Section title="What this project is">
          <P>
            Severed is an interactive map of twenty-eight sacred sites whose worshipping communities
            were cut off from access by the 1947 partition of British India, and by the further
            severances of 1971 and after. It exists to make visible a kind of cultural loss that
            demographic statistics flatten: the phantom-amputation of religious geographies from
            religious communities.
          </P>
          <P>
            The project's underlying argument extends the analytical work of historians like
            Anupama Rao, Manan Ahmed Asif, and Vazira Zamindar—that partition was not an event
            in 1947 but a long, ongoing institutional process whose mechanics deserve to be made
            visible. The map is a starting point for further inquiry, not a definitive resource.
          </P>
        </Section>

        <Section title="What this project is not">
          <UL>
            <li>Not a comprehensive partition history.</li>
            <li>Not an oral history archive. The 1947 Partition Archive does this work at a scale Severed cannot match.</li>
            <li>Not a political document in the partisan sense. It does not assign blame to India or Pakistan as modern states; it engages with the British colonial decisions that produced the conditions, and treats both successor states as inheritors of the same fracture.</li>
            <li>Not a travel guide. Several featured sites are dangerous or inaccessible.</li>
            <li>Not a finished, definitive resource. Limitations are documented openly below.</li>
          </UL>
        </Section>

        <Section title="Inclusion criteria">
          <P>A site was included only if it met all four of:</P>
          <ol className="mb-5 list-decimal pl-6 font-serif text-[18px] leading-[1.7] max-sm:text-[17px]">
            <li className="mb-2"><strong className="font-semibold">Religious significance</strong>: sacred to at least one community with documented pre-1947 presence.</li>
            <li className="mb-2"><strong className="font-semibold">Severance</strong>: partition (1947 or 1971) cut a substantial worshipping community off from access, whether geographically, politically, or practically.</li>
            <li className="mb-2"><strong className="font-semibold">Verifiability</strong>: at least two independent sources, one academic where possible.</li>
            <li className="mb-2"><strong className="font-semibold">Geographic balance</strong>: across the full list, sites are distributed across Punjab, Sindh, Bengal, Kashmir, Balochistan, and the Northwest Frontier—not concentrated in any one region.</li>
          </ol>
        </Section>

        <Section title="Exclusion rules">
          <P>A site was excluded if:</P>
          <UL>
            <li>Its religious significance was contested in ways the project could not adjudicate honestly.</li>
            <li>Its current status could not be verified with confidence.</li>
            <li>Including it would have required taking a partisan India/Pakistan position the project does not defend.</li>
          </UL>
          <P>When in doubt, sites were left out. A tighter, defensible list beats a sprawling list with errors.</P>
        </Section>

        <Section title="Sources">
          <P>
            Each site is documented with at least two independent references, listed on the
            individual site pages. Preference was given to academic sources and primary historical
            references where available — Al-Biruni's eleventh-century survey, Kalhana's <em>Rajatarangini</em>,
            the records of the Pakistani Evacuee Trust Property Board, and the published scholarship
            of historians including Anupama Rao, Vazira Zamindar, Manan Ahmed Asif, and William Dalrymple.
          </P>
          <P>
            For contemporary access status, news reporting from inside the relevant country was
            prioritized — Dawn, Tribune India, Scroll, The Wire, Daily Star, Express Tribune — over
            outside coverage. Where a claim depends on a single source, or where the underlying
            status may have changed since the project was published, a verification flag is noted
            on the relevant site page.
          </P>
        </Section>

        <Section title="A note on the author">
          <div className="my-6 border-l-2 border-accent bg-paper px-7 py-6">
            <P>
              I'm Maya Sharma, a rising high school senior in Naperville, Illinois, United States. I am Indian-American and
              Hindu. I have no immediate family connection to any of the displaced communities
              documented in this project—I am not Sikh, not Muslim, not Kashmiri Pandit, not
              Sindhi Hindu, not from a partition-displaced family. I write from outside the wound
              this project documents.
            </P>
            <P>
              This means a few things. It means I have approached each site through sources rather
              than memory. Where I have written about a tradition I do not belong to, I have leaned
              on sources from inside that tradition—Sikh writers on the Sikh shrines, Pakistani
              Muslim writers on the Sufi sites, or Kashmiri Pandit advocates on Sharada Peeth, etc. Where
              I am likely to have gotten the inside view wrong, I have flagged it on the relevant
              site page. Errors that remain are mine.
            </P>
            <P>
              I also want to be clear about what this project is not trying to do. It is not making
              a claim about who has the right to be sad about which site. Partition cut across
              communities in ways that did not respect the categories the new states later imposed.
            </P>
          </div>
        </Section>

        <Section title="Limitations">
          <h3 className="mb-3 mt-7 text-[14px] font-medium uppercase tracking-wider text-accent">
            Geographic asymmetry
          </h3>
          <P>
            Of the twenty-eight sites currently on the map, twenty represent severance from the
            Indian side to the Pakistani side. This reflects the empirical reality that most
            religious-site abandonment after 1947 happened to Hindu, Sikh, and Jain communities
            leaving West Pakistan. But it also reflects gaps in the author's own access to
            sources: severed Muslim sites in India and severed Hindu sites in Bangladesh are
            represented but undercounted relative to their lived significance. Future versions
            of this project will expand both.
          </P>

          <h3 className="mb-3 mt-7 text-[14px] font-medium uppercase tracking-wider text-accent">
            Linguistic limits
          </h3>
          <P>
            The author does not read Urdu, Punjabi, Sindhi, Pashto, or Bengali. The project relies
            on English-language scholarship and translated primary sources throughout. There is
            significant material in regional languages—particularly the histories maintained by
            individual communities about their own lost sites—that this project has not reached.
          </P>

          <h3 className="mb-3 mt-7 text-[14px] font-medium uppercase tracking-wider text-accent">
            Image limits
          </h3>
          <P>
            Three sites currently lack images: the smaller gurdwaras at Ratan Talao (Karachi),
            Pakhoke (Narowal), and Bebe Nanaki (Dera Chahal). Photographic documentation of
            remote and lightly trafficked sites is uneven, and Wikimedia Commons—the
            project's free-license image source—does not yet cover them. All thirty-seven
            images currently displayed are sourced from Wikimedia Commons under free licenses
            (CC BY, CC BY-SA, Public Domain, GFDL) and credited on the relevant page.
          </P>

          <h3 className="mb-3 mt-7 text-[14px] font-medium uppercase tracking-wider text-accent">
            Temporal limits
          </h3>
          <P>
            Diplomatic relations between India and Pakistan affect access to many of these sites.
            A site's status as "restricted" or "partial" may have changed by the time you read this.
            The last-updated date is shown on every page. Updates will be made when the project's
            status data shifts.
          </P>
        </Section>

        <Section title="What you can do">
          <P>
            I would love to hear from you. If you have corrections, comments, or would just like to chat, please write to me!
          </P>
          <div className="mt-12 border-t-2 border-accent bg-paper py-7">
            <div className="eyebrow mb-2">Contact</div>
            <div className="font-serif text-[22px] text-accent">maayusharma@gmail.com</div>

          </div>
        </Section>

        <Section title="Acknowledgments">
          <P>
            This project is hosted by Thoughtful India. Thank you very much to Tarunjit Singh Butalia, Farooq Soomro, and Shahid Shabbir for their help with the project. {' '}

          </P>
        </Section>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-5 text-[12px] text-ink-faint">
          <span>Version 1.0.0</span>
          <span>Last updated: June 11, 2026</span>
          <span>{typed.meta.sitesCount} sites · {typed.meta.flagshipsCount} flagships</span>
        </div>
      </article>

      <Footer showBackToHome />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h2 className="mt-14 mb-4 font-serif text-[26px] font-medium leading-[1.2] tracking-tight text-ink first:mt-0">
        {title}
      </h2>
      {children}
    </>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 font-serif text-[18px] leading-[1.7] text-ink max-sm:text-[17px]">
      {children}
    </p>
  );
}
function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mb-5 list-disc pl-6 font-serif text-[18px] leading-[1.7] max-sm:text-[17px]">
      {children}
    </ul>
  );
}
