import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import ContactBlock from '@/components/ContactBlock';

export const metadata = {
  title: 'About',
  description: 'About Severed — a map of sacred sites cut off by the 1947 partition.',
};

export default function AboutPage() {
  return (
    <>
      <TopBar current="about" />

      <article className="mx-auto max-w-[680px] px-6 pt-14">
        <div className="eyebrow mb-4">About</div>
        <h1 className="mb-5 font-serif text-[44px] font-medium leading-[1.08] tracking-tight max-sm:text-[34px]">
          Who made this
        </h1>

        <p className="mb-10 font-serif text-[19px] italic leading-[1.6] text-ink-soft">
          Severed was built by Maya Sharma, a high school junior in the United States, as a
          research project on the long aftermath of the 1947 partition of British India.
        </p>

        <H2>Why this project</H2>
        <P>
          Partition is most often taught—when it is taught at all—as a story of who moved.
          The figures cited are refugees, deaths, migrations. The maps in textbooks show arrows:
          people going west, people going east. But the sites that didn't move—that were left
          in the wrong country when the line was drawn—tell a different story about what was
          lost. Twenty-eight of them are on this map.
        </P>
        <P>
          The project began as an essay for an AP Language class on the long political and
          cultural effects of partition. It grew, over the summer of 2026, into a full
          interactive map and four long-form essays.
        </P>

        <H2>What this project is</H2>
        <P>
          Severed is a static interactive site. The map uses Leaflet with OpenStreetMap and
          CARTO tiles. The data layer is a single JSON file documenting all twenty-eight sites,
          their sourcing, their access status, and the project's methodology. Each of the four
          flagship sites—Kartarpur Sahib, Hinglaj Mata Mandir, Sharada Peeth, and Ajmer Sharif
          Dargah—has its own long-form page with prose, footnoted sources, and a small image gallery.
        </P>
        <P>Severed is hosted by Thoughtful India.</P>

        <div className="my-6 border border-rule bg-paper px-6 py-5 text-[14px] leading-[1.7] text-ink-soft">
          <div className="eyebrow mb-3">Built with</div>
          <code className="bg-bg px-1.5 py-0.5 font-mono text-[12.5px] text-ink">Next.js</code>
          {' · '}
          <code className="bg-bg px-1.5 py-0.5 font-mono text-[12.5px] text-ink">React</code>
          {' · '}
          <code className="bg-bg px-1.5 py-0.5 font-mono text-[12.5px] text-ink">TypeScript</code>
          {' · '}
          <code className="bg-bg px-1.5 py-0.5 font-mono text-[12.5px] text-ink">Leaflet</code>
          {' · '}
          <code className="bg-bg px-1.5 py-0.5 font-mono text-[12.5px] text-ink">Tailwind CSS</code>
          {' · hosted on '}
          <code className="bg-bg px-1.5 py-0.5 font-mono text-[12.5px] text-ink">Vercel</code>
        </div>

        <P>
          The project is open about its sources, limits, and the author's own position relative
          to the material—see the methodology page.
        </P>

        <H2>Acknowledgments</H2>
        <P>
          This project would not exist without Thoughtful India, which provided the editorial
          home for it.
        </P>
        <P>
          The substantial scholarly debt of this project is to the work of historians including{' '}
          <strong className="font-semibold">Anupama Rao</strong>,{' '}
          <strong className="font-semibold">Vazira Zamindar</strong>,{' '}
          <strong className="font-semibold">Manan Ahmed Asif</strong>, and{' '}
          <strong className="font-semibold">William Dalrymple</strong>, whose writing on partition
          and its aftermath shaped the project's thesis and structure. The journalists{' '}
          <strong className="font-semibold">Haroon Khalid</strong> and{' '}
          <strong className="font-semibold">Nikhil Mandalaparthy</strong> have done some of the
          most valuable contemporary reporting on the sites this project documents.
        </P>
        <P>Errors that remain are the author's.</P>
        <ContactBlock>
          <div className="mt-3 text-[14px] text-ink-soft">
            For corrections, additions, sources, or general discussion. Press inquiries welcome.
          </div>
        </ContactBlock>
      </article>

      <Footer showBackToHome />
    </>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 mb-3.5 font-serif text-[22px] font-medium tracking-tight text-ink">
      {children}
    </h2>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4.5 font-serif text-[18px] leading-[1.7] text-ink max-sm:text-[17px]">
      {children}
    </p>
  );
}
