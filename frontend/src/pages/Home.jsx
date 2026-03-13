import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="font-display bg-background-light text-slate-900 min-h-screen">
      <nav className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg text-white">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-primary">
              SkillSync
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              className="text-sm font-semibold text-primary hover:opacity-70 transition-opacity"
              to="/"
            >
              Home
            </Link>
            <Link
              className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
              to="/analyze"
            >
              Analyze
            </Link>
            <Link
              className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
              to="/result"
            >
              Results
            </Link>
            <Link
              className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
              to="/about"
            >
              About
            </Link>
            <Link
              className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm font-bold text-primary">Sign In</button>
            <Link
              to="/analyze"
              className="bg-primary text-white text-sm font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Now
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col gap-10 md:flex-row md:items-center">
              <div className="flex flex-col gap-6 md:w-1/2">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  <span className="material-symbols-outlined text-sm">
                    auto_awesome
                  </span>
                  <span>AI-Powered Resume Matching</span>
                </div>

                <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
                  Match Your Resume to Job Descriptions with{" "}
                  <span className="text-primary/70">AI</span>
                </h1>

                <p className="text-slate-600 text-lg leading-relaxed max-w-[540px]">
                  SkillSync compares resume content with job descriptions to
                  generate a match score, identify matching skills, and reveal
                  missing skills through an AI-powered analysis pipeline.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/analyze"
                    className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg bg-primary h-14 px-8 text-white text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/about"
                    className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg border-2 border-primary/20 bg-transparent h-14 px-8 text-primary text-base font-bold hover:bg-primary/5 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-3">
                    <img
                      className="h-10 w-10 rounded-full border-2 border-white object-cover"
                      alt="Professional woman smiling"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZCC7D3IrjmiKQj88FOKMl6Y8qaba0NVv_Uc8X93i2l-UKExA5lVHmuZwk8DCOMHdCumkc5a4KPu35cKiI8DjOCCo8FeM0x2cn4B4_3KXfoDDb34m6A0LQJvLSqH9aZuSsQLYDL26mah0weEwvHKRhyckpWWioudkeFlvluc4jLtFWDEVCtpfgqombeFiW7OEVq4yiG0yBeViD2rpCWAoW2TAoszhVx9oRXYL4TVNo8Is9R8xOwY8w7UfAGCAWYanLB0akLabVbKXn"
                    />
                    <img
                      className="h-10 w-10 rounded-full border-2 border-white object-cover"
                      alt="Professional man in suit"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9JAlZx4uJ62VRw0Z1JjfLl-werhpsqRfptfxBAixH42M7rIgyC9cVkqalMHAICREpEkFfZDrmpnX5jBqOy1-Wwn0qFQUnSYDSoVg7Z7Pz-xDCLVpGD4TWm8qxRoHUjGHTqi8CE41y6oSMgJj-w7tLhivkiq0wqiUOx4gHi-9HzSF3suoxPBrr13w15Ebkz-XyqXAuBe0ZyY4WHROUZxL9Rz-jgCwi2PYbahgi7EJvPQRjTM8lCKbBA401tCqe5OE_fgay7y0RO5b1"
                    />
                    <img
                      className="h-10 w-10 rounded-full border-2 border-white object-cover"
                      alt="Creative professional portrait"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5jpkjjuc2ziRIqEUGHJIqWNChM_iU0fnxKzQE_xAKGegYpGpgx5ytkSDRIyBZ_DyiJwGY_4UIchXiQjkSX-SZvSr5fqGeFnwRW0ofv0LXDYMkouh8ymIg9_8xoYinWSk1lcUF7sH2jzRvkqnf6kx-hu74lEHbsGdaTlfAGem4qbWBQbsYdMLF7jukZzREGDDVtrHplcCRhhfjwV-unGsCWBLu1BvkSifnkV4Yd4SlbXXmzNqagDgDRDDLoh94euj5NPKs7oTkJSwn"
                    />
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    Built for intelligent resume-to-job comparison
                  </p>
                </div>
              </div>

              <div className="relative md:w-1/2">
                <div className="aspect-video w-full overflow-hidden rounded-2xl bg-primary/5 shadow-2xl">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB4VnDRM26D0slWRN7EvmtuebNCBm8NH9DOIa-MWKVDGcAQXaiRb1q6mD1bO62WiQw4ZxT0HZlE3RpBX6N_nrBj2chnS8DUyHk4fh-i680XE9XP1c6FpK8te4ED1F5HfmCvUcxlfHGrA2hAIZcTgLVTOXwhug-8kYoJldlExfLhKVP_QzQY_bhJ7mRp5INgAInN5nQL5k5llueU_Ty6EW-j67JuEpy5zYVRqwF0a_h18I-ULLRWU_SEduqPuqfPtohFzZ5oRUrCV9yd")',
                    }}
                  ></div>
                </div>

                <div className="absolute -bottom-6 -left-6 hidden md:block w-56 rounded-xl bg-white p-4 shadow-xl border border-primary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-green-500">
                      check_circle
                    </span>
                    <span className="text-xs font-bold">Analysis Complete</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[85%]"></div>
                  </div>
                  <p className="text-[10px] mt-2 text-slate-500">
                    Score and skill gap analysis ready
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
              <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
                The Process
              </h4>
              <h2 className="text-slate-900 text-3xl md:text-5xl font-black leading-tight mb-6">
                How SkillSync Works
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                SkillSync follows a simple workflow: enter a resume, paste a job
                description, and receive a structured analysis showing fit score
                and skill alignment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group flex flex-col items-center text-center p-8 rounded-2xl border border-slate-100 bg-background-light/50 hover:border-primary/30 transition-all">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">
                    description
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">1. Enter Resume</h3>
                <p className="text-slate-600">
                  Paste resume text into the analysis form so the system can
                  evaluate your skills and experience against a target role.
                </p>
              </div>

              <div className="group flex flex-col items-center text-center p-8 rounded-2xl border border-slate-100 bg-background-light/50 hover:border-primary/30 transition-all">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">
                    model_training
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">2. Run Analysis</h3>
                <p className="text-slate-600">
                  The backend sends the resume and job description to the AI
                  service, which computes a similarity score and extracts matched
                  and missing skills.
                </p>
              </div>

              <div className="group flex flex-col items-center text-center p-8 rounded-2xl border border-slate-100 bg-background-light/50 hover:border-primary/30 transition-all">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">
                    analytics
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">3. Review Results</h3>
                <p className="text-slate-600">
                  View the generated match score, matched skills, missing skills,
                  and saved results through the SkillSync application workflow.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background-light">
          <div className="mx-auto max-w-7xl px-4">
            <div className="rounded-3xl bg-primary p-12 text-center text-white relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              ></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-6">
                  Ready to test your resume against a job posting?
                </h2>
                <p className="text-lg opacity-80 mb-10 max-w-xl mx-auto">
                  Use SkillSync to compare resume content against job
                  requirements and better understand your current fit for a
                  target role.
                </p>
                <div className="flex justify-center gap-4">
                  <Link
                    to="/analyze"
                    className="bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    Start Analysis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/10 py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded text-white">
              <span className="material-symbols-outlined text-sm">
                psychology
              </span>
            </div>
            <h2 className="text-lg font-bold tracking-tight text-primary">
              SkillSync
            </h2>
          </div>

          <div className="flex gap-8 text-sm text-slate-500">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Contact
            </a>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 SkillSync. Senior Seminar Project.
          </p>
        </div>
      </footer>

      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white px-4 pb-3 pt-2 z-50">
        <div className="flex gap-2">
          <Link
            className="flex flex-1 flex-col items-center justify-end gap-1 text-primary"
            to="/"
          >
            <span className="material-symbols-outlined">home</span>
            <p className="text-[10px] font-medium">Home</p>
          </Link>

          <Link
            className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400"
            to="/analyze"
          >
            <span className="material-symbols-outlined">search</span>
            <p className="text-[10px] font-medium">Analyze</p>
          </Link>

          <Link
            className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400"
            to="/result"
          >
            <span className="material-symbols-outlined">fact_check</span>
            <p className="text-[10px] font-medium">Results</p>
          </Link>

          <Link
            className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-400"
            to="/about"
          >
            <span className="material-symbols-outlined">info</span>
            <p className="text-[10px] font-medium">About</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;