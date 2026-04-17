import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Analyze() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const wordCount = (text) =>
    text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleClear = () => {
    setResumeText("");
    setJobText("");
    setError("");
  };

  const handleAnalyze = async () => {
    setError("");
    if (!resumeText.trim() || !jobText.trim()) {
      setError("Add both your resume and the job text so we can compare them.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobText }),
      });
      if (!response.ok) throw new Error("Failed to analyze match.");
      const data = await response.json();
      navigate("/result", { state: data });
    } catch {
      setError(
        "We could not reach the server. If you are running the app locally, confirm the backend is up and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
      <header className="mb-12 max-w-2xl">
        <p className="text-[13px] font-medium tracking-[0.2em] text-muted uppercase">
          Compare
        </p>
        <h1 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Resume and posting side by side
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">
          Paste plain text. You do not need to format it — just capture what a reader would see. After you
          run a comparison, the results page lists tailored ideas for improving your resume toward this role.
        </p>
      </header>

      {error && (
        <div
          className="mb-8 border border-red-200/80 bg-red-50 px-5 py-4 text-[14px] leading-relaxed text-red-900"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-3">
          <label htmlFor="resume" className="text-[14px] font-medium text-ink">
            Your resume
          </label>
          <textarea
            id="resume"
            rows={14}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste the full resume you would send with an application…"
            className="min-h-[220px] w-full resize-y border border-line bg-cream px-4 py-3.5 text-[15px] leading-relaxed text-ink outline-none transition-[box-shadow] placeholder:text-muted/70 focus:shadow-[inset_0_0_0_1px_var(--color-accent)]"
          />
          <p className="text-right text-[12px] text-muted">
            {wordCount(resumeText)} {wordCount(resumeText) === 1 ? "word" : "words"}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="job" className="text-[14px] font-medium text-ink">
            Job description
          </label>
          <textarea
            id="job"
            rows={14}
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="Paste the role description, requirements, or the sections that list skills…"
            className="min-h-[220px] w-full resize-y border border-line bg-cream px-4 py-3.5 text-[15px] leading-relaxed text-ink outline-none transition-[box-shadow] placeholder:text-muted/70 focus:shadow-[inset_0_0_0_1px_var(--color-accent)]"
          />
          <p className="text-right text-[12px] text-muted">
            {wordCount(jobText)} {wordCount(jobText) === 1 ? "word" : "words"}
          </p>
        </div>
      </div>

      <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-muted">
        Longer entries usually give a steadier read. If the posting lists tools or years of
        experience, include those lines here too.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading}
          className="rounded-full bg-accent px-8 py-3.5 text-[15px] font-medium text-cream transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Working…" : "Run comparison"}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="text-[15px] font-medium text-muted underline decoration-line underline-offset-4 hover:text-ink"
        >
          Clear both fields
        </button>
      </div>
    </div>
  );
}
