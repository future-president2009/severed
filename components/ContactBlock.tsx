const EMAIL = 'maayusharma@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/mayasharma27/';

type Props = {
  children?: React.ReactNode;
};

export default function ContactBlock({ children }: Props) {
  return (
    <div className="mt-12 border-t-2 border-accent bg-paper py-7">
      <div className="eyebrow mb-2">Contact</div>
      <div className="flex flex-col gap-2">
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-2.5 font-serif text-[22px] text-accent no-underline hover:text-ink"
        >
          <MailIcon />
          {EMAIL}
        </a>
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 font-serif text-[22px] text-accent no-underline hover:text-ink"
        >
          <LinkedInIcon />
          LinkedIn
        </a>
      </div>
      {children}
    </div>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
