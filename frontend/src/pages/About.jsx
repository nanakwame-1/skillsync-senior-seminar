import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24 sm:px-8">
        <p className="text-[13px] font-medium tracking-[0.2em] text-muted uppercase">
          About
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
          SkillSync is for anyone rewriting the next chapter of their work.
        </h1>

        <div className="mt-12 space-y-8 text-[17px] leading-[1.75] text-muted">
          <p className="text-ink/90">
            Job posts are dense. Resumes are long. It is easy to miss the overlap between
            what you have done and what a role is asking for. SkillSync helps you see that
            overlap clearly — and notice the gaps before you hit send.
          </p>
          <p>
            Paste a resume and a posting. You get a simple read on fit, the skills that
            already line up, and the ones worth addressing in a cover letter or conversation.
          </p>
        </div>

        <div className="mt-16 border-t border-line pt-12">
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 border-b border-accent pb-0.5 text-[15px] font-medium text-accent transition-colors hover:border-accent-hover hover:text-accent-hover"
          >
            Try a comparison
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
