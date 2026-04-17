import { useEffect, useState } from "react";

function matchLevel(score) {
  if (score >= 70) return { label: "Strong", className: "text-emerald-800 bg-emerald-50" };
  if (score >= 40) return { label: "Moderate", className: "text-amber-900 bg-amber-50" };
  return { label: "Low", className: "text-rose-900 bg-rose-50" };
}

export default function History() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:8080/matches");
        if (!response.ok) throw new Error("Failed to fetch history.");
        const data = await response.json();
        setMatches(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("History could not load. Check your connection and try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
      <header className="mb-12 max-w-2xl">
        <p className="text-[13px] font-medium tracking-[0.2em] text-muted uppercase">
          Past runs
        </p>
        <h1 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Comparisons you have already made
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">
          A simple list of saved results. Open the latest comparison from the analyzer for full detail.
        </p>
      </header>

      {loading && (
        <div className="border border-line bg-cream px-8 py-20 text-center">
          <p className="text-[15px] text-muted">Loading…</p>
        </div>
      )}

      {!loading && error && (
        <div className="border border-red-200/80 bg-red-50 px-5 py-4 text-[14px] text-red-900" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && matches.length === 0 && (
        <div className="border border-line bg-cream px-8 py-16 text-center sm:px-12">
          <p className="font-display text-xl text-ink">Nothing saved yet</p>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
            When you run a comparison, it can appear here for quick reference.
          </p>
        </div>
      )}

      {!loading && !error && matches.length > 0 && (
        <ul className="divide-y divide-line border border-line bg-cream">
          {matches.map((m, i) => {
            const score = typeof m.score === "number" ? m.score : 0;
            const lvl = matchLevel(score);
            const date =
              m.createdAt != null &&
              !Number.isNaN(new Date(m.createdAt).getTime())
                ? new Date(m.createdAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "—";
            const matchedCount = Array.isArray(m.matchedSkills) ? m.matchedSkills.length : 0;
            const missingCount = Array.isArray(m.missingSkills) ? m.missingSkills.length : 0;

            return (
              <li key={m.matchId != null ? String(m.matchId) : `row-${i}`} className="px-6 py-6 sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[12px] text-muted">{date}</p>
                    <p className="mt-1 font-mono text-[13px] text-ink/70">
                      #{m.matchId ?? "—"}
                    </p>
                  </div>
                  <span
                    className={`inline-flex w-fit rounded-full px-3 py-1 text-[12px] font-medium ${lvl.className}`}
                  >
                    {lvl.label} · {score}%
                  </span>
                </div>
                <div className="mt-4 flex gap-8 text-[14px] text-muted">
                  <span>
                    <span className="font-medium text-ink">{matchedCount}</span> aligned
                  </span>
                  <span>
                    <span className="font-medium text-ink">{missingCount}</span> gaps
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
