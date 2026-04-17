import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-cream text-ink">
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:items-end lg:gap-16 lg:py-28">
          <div>
            <p className="text-[13px] font-medium tracking-[0.2em] text-muted uppercase">
              Resume & role
            </p>
            <h1 className="mt-6 font-display text-[2.35rem] font-medium leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              See how your story reads against the job you want.
            </h1>
            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-muted">
              No dashboards to learn. You bring two texts; we help you spot alignment and
              gaps so you can edit with intention.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/analyze"
                className="rounded-full bg-accent px-7 py-3.5 text-[15px] font-medium text-cream transition-colors hover:bg-accent-hover"
              >
                Start a comparison
              </Link>
              <Link
                to="/about"
                className="text-[15px] font-medium text-accent underline decoration-line underline-offset-4 transition-colors hover:text-accent-hover"
              >
                What this is
              </Link>
            </div>
          </div>

          <div className="relative lg:pb-4">
            <figure className="border border-line bg-paper p-8 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:p-10">
              <figcaption className="text-[12px] font-medium tracking-wide text-muted">
                Example readout
              </figcaption>
              <div className="mt-8 flex items-end gap-2">
                <span className="font-display text-5xl font-medium text-accent sm:text-6xl">
                  78
                </span>
                <span className="mb-2 text-[15px] text-muted">fit</span>
              </div>
              <p className="mt-6 text-[14px] leading-relaxed text-muted">
                Matched strengths might include communication and tooling you already use.
                Gaps might name a skill to study or reframe from past work.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Writing", "Research", "Collaboration"].map((s) => (
                  <span
                    key={s}
                    className="border border-line bg-cream px-3 py-1.5 text-[13px] text-ink/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Three calm steps
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              The flow stays small on purpose so you can focus on words, not widgets.
            </p>
          </div>

          <ol className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {[
              {
                step: "01",
                title: "Paste your resume",
                body: "Use the version you would actually send. Full text is fine.",
              },
              {
                step: "02",
                title: "Add the posting",
                body: "Drop in the job description or the parts that list must-haves.",
              },
              {
                step: "03",
                title: "Read the fit",
                body: "Use the score and lists as a map for your next draft or interview prep.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="border-t border-line pt-8 sm:border-t-0 sm:border-l sm:border-line sm:pl-8 sm:pt-0 sm:first:border-l-0 sm:first:pl-0"
              >
                <span className="font-display text-sm text-muted">{item.step}</span>
                <h3 className="mt-3 font-display text-xl font-medium">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line bg-ink text-cream">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:px-8 sm:py-24">
          <h2 className="mx-auto max-w-lg font-display text-3xl font-medium leading-snug sm:text-4xl">
            Ready when you are.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-cream/70">
            One comparison usually takes a minute. Keep the tab open while you revise.
          </p>
          <Link
            to="/analyze"
            className="mt-10 inline-flex rounded-full bg-cream px-8 py-3.5 text-[15px] font-medium text-ink transition-opacity hover:opacity-90"
          >
            Open the analyzer
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
