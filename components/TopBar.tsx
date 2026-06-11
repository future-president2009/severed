import Link from 'next/link';

type Props = { current?: 'map' | 'methodology' | 'about' };

export default function TopBar({ current }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1080px] items-center justify-between px-6 py-3.5">
        <Link
          href="/"
          className="font-serif text-[18px] font-medium tracking-tight text-accent no-underline"
        >
          Severed
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/map"
            className={`text-[13px] no-underline ${
              current === 'map' ? 'text-accent' : 'text-ink-soft hover:text-accent'
            }`}
          >
            Map
          </Link>
          <Link
            href="/methodology"
            className={`text-[13px] no-underline ${
              current === 'methodology' ? 'text-accent' : 'text-ink-soft hover:text-accent'
            }`}
          >
            Methodology
          </Link>
          <Link
            href="/about"
            className={`text-[13px] no-underline ${
              current === 'about' ? 'text-accent' : 'text-ink-soft hover:text-accent'
            }`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
