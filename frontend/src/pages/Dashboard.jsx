import { Link } from "react-router-dom";

const cards = [
  {
    title: "Run a comparison",
    desc: "Paste resume and posting text to see fit, aligned skills, and gaps.",
    to: "/analyze",
    cta: "Go to analyzer",
  },
  {
    title: "Past comparisons",
    desc: "Skim what you have already run without redoing the work.",
    to: "/history",
    cta: "View history",
  },
  {
    title: "About SkillSync",
    desc: "A short note on what the tool is meant to do.",
    to: "/about",
    cta: "Read more",
  },
];

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
      <header className="mb-14 max-w-2xl">
        <p className="text-[13px] font-medium tracking-[0.2em] text-muted uppercase">
          Overview
        </p>
        <h1 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Pick up where you left off
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">
          Three entry points — each kept narrow so you spend time on your materials, not the UI.
        </p>
      </header>

      <div className="grid gap-px bg-line sm:grid-cols-3">
        {cards.map((c) => (
          <article key={c.to} className="bg-cream p-8 sm:min-h-[280px] sm:flex sm:flex-col">
            <h2 className="font-display text-xl font-medium">{c.title}</h2>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{c.desc}</p>
            <Link
              to={c.to}
              className="mt-8 inline-flex items-center gap-1 text-[14px] font-medium text-accent underline decoration-line underline-offset-4 hover:text-accent-hover"
            >
              {c.cta}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
