import { Outlet, useParams, NavLink, Navigate } from "react-router-dom";
import { getCompetition } from "@/data/competitions";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    active: { label: "🟢 Trwa teraz", cls: "bg-emerald-500/20 text-emerald-400 animate-pulse" },
    upcoming: { label: "🟡 Nadchodzące", cls: "bg-amber-500/20 text-amber-400" },
    finished: { label: "⚫ Zakończony", cls: "bg-muted text-muted-foreground" },
  };
  const s = map[status] || map.finished;
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 md:px-3 md:py-1 text-[11px] md:text-xs font-bold ${s.cls}`}>{s.label}</span>;
}

const tabs = [
  { path: "opis", label: "📋 Opis" },
  { path: "zadania", label: "📝 Zadania" },
  { path: "pytania", label: "❓ Pytania" },
  { path: "ogloszenia", label: "📢 Ogłoszenia" },
  { path: "ranking", label: "🏆 Ranking" },
];

export default function CompetitionLayout() {
  const { id } = useParams<{ id: string }>();
  const comp = getCompetition(id || "");

  if (!comp) return <Navigate to="/konkursy" replace />;

  return (
    <div className="py-4 md:py-6 lg:py-8 max-w-5xl mx-auto overflow-x-hidden">
      {/* Hero */}
      <div className="rounded-2xl md:rounded-3xl border border-border bg-card p-4 md:p-6 lg:p-8 mb-4 md:mb-6">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">{comp.name}</h1>
          <StatusBadge status={comp.status} />
        </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-4 text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
          <span>📅 {comp.date}, {comp.time}</span>
          <span>📍 {comp.location}</span>
          <span>👤 {comp.organizer}</span>
        </div>

        {/* Rewards */}
        <div className="rounded-xl md:rounded-2xl border border-amber-500/30 bg-amber-500/5 p-3 md:p-4">
          <p className="text-xs md:text-sm font-bold text-amber-400 mb-2 md:mb-3">🎁 Za udział możesz zdobyć:</p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {comp.rewards.map((r, i) => (
              <div key={i} className="rounded-xl md:rounded-2xl bg-card border border-border px-3 py-2 md:px-4 md:py-3 text-center min-w-[80px] md:min-w-[100px]">
                <span className="text-xl md:text-2xl block mb-0.5">{r.emoji}</span>
                <span className="text-[10px] md:text-xs font-bold text-foreground">{r.label}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] md:text-xs text-muted-foreground mt-2 md:mt-3">
            Nagrody przyznawane przez nauczyciela za obecność i prezentację rozwiązań
          </p>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-2 mb-4 md:mb-6 scrollbar-hide -mx-1 px-1">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={`/konkursy/${id}/${tab.path}`}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-full px-3 py-1.5 md:px-4 md:py-2 text-[13px] md:text-sm font-bold btn-bounce transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      {/* Content */}
      <Outlet context={comp} />
    </div>
  );
}
