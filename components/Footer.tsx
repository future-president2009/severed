import Link from 'next/link';

type Props = { showBackToHome?: boolean };

export default function Footer({ showBackToHome = false }: Props) {
  return (
    <footer className="mx-auto mt-14 flex max-w-[680px] items-center justify-between border-t border-rule px-6 py-8 pb-14 text-[12px] text-ink-faint">
      {showBackToHome ? (
        <Link
          href="/"
          className="border-b border-rule pb-0.5 text-ink-soft no-underline hover:border-accent hover:text-accent"
        >
          ← Back to home
        </Link>
      ) : (
        <span>Hosted by Thoughtful India</span>
      )}
      <span>
        <em className="italic">Severed</em> — A Map of the 1947 Partition
      </span>
    </footer>
  );
}
