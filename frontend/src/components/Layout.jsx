import { Link, NavLink, Outlet } from "react-router-dom";

const NAV = [
  { to: "/", label: "Home", icon: "home", end: true },
  { to: "/analyze", label: "Analyze", icon: "edit_note" },
  { to: "/history", label: "History", icon: "schedule" },
  { to: "/about", label: "About", icon: "favorite" },
  { to: "/dashboard", label: "Overview", icon: "grid_view" },
];

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <header className="sticky top-0 z-50 border-b border-line/80 bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <Link to="/" className="group flex shrink-0 items-baseline gap-2">
            <span className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              SkillSync
            </span>
            <span className="hidden text-[11px] font-medium tracking-wide text-muted sm:inline">
              resume fit
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    "px-3 py-2 text-[13px] transition-colors",
                    isActive
                      ? "font-medium text-accent"
                      : "text-muted hover:text-ink",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/analyze"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-cream transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            Compare roles
          </Link>
        </div>
      </header>

      <main className="w-full flex-1 pb-24 md:pb-12">
        <Outlet />
      </main>

      <footer className="hidden border-t border-line bg-cream py-10 md:block">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-lg text-ink">SkillSync</p>
          <p className="max-w-sm text-[14px] leading-relaxed text-muted">
            A quiet tool for seeing how your resume lines up with the roles you want.
          </p>
          <p className="text-[13px] text-muted">© {new Date().getFullYear()}</p>
        </div>
      </footer>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-cream/95 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-md md:hidden"
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-lg justify-around px-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  "flex min-w-[56px] flex-1 flex-col items-center gap-0.5 py-2 transition-colors",
                  isActive ? "text-accent" : "text-muted",
                ].join(" ")
              }
            >
              <span className="material-symbols-outlined text-[22px] font-light">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
