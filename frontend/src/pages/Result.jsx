import { Link, useLocation } from "react-router-dom";

function matchLevelLabel(score) {
  if (score >= 70) return { label: "Strong fit", tone: "text-emerald-900", bg: "bg-emerald-50" };
  if (score >= 40)
    return { label: "Mixed fit", tone: "text-amber-950", bg: "bg-amber-50" };
  return { label: "Light fit", tone: "text-rose-950", bg: "bg-rose-50" };
}

export default function Result() {
  const location = useLocation();
  const result = location.state;

  if (!result) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center sm:py-32">
        <h1 className="font-display text-3xl font-medium text-ink">No result here</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">
          Run a new comparison from the analyzer and you will land on this page with your readout.
        </p>
        <Link
          to="/analyze"
          className="mt-10 inline-flex rounded-full bg-accent px-7 py-3.5 text-[15px] font-medium text-cream hover:bg-accent-hover"
        >
          Start a comparison
        </Link>
      </div>
    );
  }

  const formattedDate =
    result.createdAt != null && !Number.isNaN(new Date(result.createdAt).getTime())
      ? new Date(result.createdAt).toLocaleString(undefined, {
          dateStyle: "long",
          timeStyle: "short",
        })
      : "—";

  const score = typeof result.score === "number" ? result.score : 0;
  const level = matchLevelLabel(score);
  const matched = Array.isArray(result.matchedSkills) ? result.matchedSkills : [];
  const missing = Array.isArray(result.missingSkills) ? result.missingSkills : [];
  const suggestions = Array.isArray(result.suggestions) ? result.suggestions : [];
  const circumference = 2 * Math.PI * 52;
  const dashOffset = circumference - (circumference * Math.min(100, Math.max(0, score))) / 100;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
      <header className="mb-12 flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-medium tracking-[0.2em] text-muted uppercase">
            Readout
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Your comparison
          </h1>
          <p className="mt-2 font-mono text-[13px] text-muted">
            Saved as #{result.matchId ?? "—"}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/analyze"
            className="rounded-full border border-line bg-cream px-5 py-2.5 text-[14px] font-medium text-ink hover:bg-paper"
          >
            New comparison
          </Link>
          <Link
            to="/history"
            className="rounded-full bg-accent px-5 py-2.5 text-[14px] font-medium text-cream hover:bg-accent-hover"
          >
            History
          </Link>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="border border-line bg-cream p-10 text-center">
            <div className="relative mx-auto inline-block">
              <svg width="140" height="140" viewBox="0 0 120 120" className="-rotate-90">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#e4dfd4"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#8b4d2f"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-4xl font-medium text-accent">{score}</span>
                <span className="text-[11px] font-medium tracking-wide text-muted">fit</span>
              </div>
            </div>
            <span
              className={`mt-6 inline-block rounded-full px-3 py-1 text-[12px] font-medium ${level.bg} ${level.tone}`}
            >
              {level.label}
            </span>
            <p className="mt-6 text-[13px] text-muted">
              <time dateTime={result.createdAt ? String(result.createdAt) : undefined}>
                {formattedDate}
              </time>
            </p>
          </div>
        </div>

        <div className="space-y-10 lg:col-span-7">
          <section>
            <h2 className="font-display text-xl font-medium">Aligned skills</h2>
            {matched.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {matched.map((skill, index) => (
                  <li
                    key={index}
                    className="border border-line bg-cream px-3 py-2 text-[14px] text-ink"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-[15px] text-muted">None listed for this run.</p>
            )}
          </section>

          <section className="border-t border-line pt-10">
            <h2 className="font-display text-xl font-medium">Gaps to consider</h2>
            {missing.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {missing.map((skill, index) => (
                  <li
                    key={index}
                    className="border border-dashed border-line bg-paper px-3 py-2 text-[14px] text-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-[15px] text-muted">No gaps called out this time.</p>
            )}
          </section>
        </div>
      </div>

      {suggestions.length > 0 && (
        <section className="mt-14 border-t border-line pt-14">
          <h2 className="font-display text-2xl font-medium tracking-tight">
            Ways to strengthen your resume
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            Concrete edits based on this comparison—use what is truthful for you, then run another
            comparison to see if overlap improves.
          </p>
          <ol className="mt-8 space-y-5">
            {suggestions.map((line, index) => (
              <li
                key={index}
                className="flex gap-4 border-l-2 border-accent/30 pl-5 text-[15px] leading-relaxed text-ink/90"
              >
                <span className="shrink-0 font-display text-lg font-medium text-accent tabular-nums">
                  {index + 1}
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
