import { useState } from "react";
import { Link } from "react-router-dom";
import { competitions, CompetitionStatus } from "@/data/competitions";

const filters: { label: string; value: CompetitionStatus | "all" }[] = [
  { label: "📋 Wszystkie", value: "all" },
  { label: "🟢 Trwające", value: "active" },
  { label: "🟡 Nadchodzące", value: "upcoming" },
  { label: "⚫ Zakończone", value: "finished" },
];

function StatusBadge({ status }: { status: CompetitionStatus }) {
  const map = {
    active: { label: "🟢 Trwa teraz", cls: "bg-emerald-500/20 text-emerald-400 animate-pulse" },
    upcoming: { label: "🟡 Za 5 dni", cls: "bg-amber-500/20 text-amber-400" },
    finished: { label: "⚫ Zakończony", cls: "bg-muted text-muted-foreground" },
  };
  const s = map[status];
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 md:px-3 md:py-1 text-[11px] md:text-xs font-bold ${s.cls}`}>{s.label}</span>;
}

const Konkursy = () => {
  const [filter, setFilter] = useState<CompetitionStatus | "all">("all");
  const filtered = filter === "all" ? competitions : competitions.filter((c) => c.status === filter);

  return (
    <div className="py-6 lg:py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1">Konkursy 🏆</h1>
        <p className="text-muted-foreground text-sm md:text-base lg:text-lg">Przyjdź, rozwiąż zadania i zgarnij nagrody!</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 md:mb-8 scrollbar-hide -mx-1 px-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 md:px-4 md:py-2 text-[13px] md:text-sm font-bold btn-bounce transition-colors ${
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {filtered.map((comp) => {
          const actionMap = {
            active: { label: "Wejdź teraz 👉", cls: "bg-emerald-500 hover:bg-emerald-600 text-white" },
            upcoming: { label: "Dołącz 🚀", cls: "bg-gradient-to-r from-primary to-secondary text-primary-foreground" },
            finished: { label: "Zobacz wyniki 📊", cls: "bg-muted text-muted-foreground hover:text-foreground" },
          };
          const action = actionMap[comp.status];

          return (
            <Link key={comp.id} to={`/konkursy/${comp.id}/opis`} className="block card-lift">
              <div className="rounded-2xl md:rounded-3xl border border-border bg-card overflow-hidden">
                {/* Rewards banner */}
                <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/10 border-b border-amber-500/20 px-3 py-2 md:px-5 md:py-3">
                  <p className="text-xs md:text-sm font-bold text-amber-400">
                    🎁 {comp.rewards.map((r) => `${r.emoji} ${r.label}`).join(" + ")}
                  </p>
                </div>

                {/* Body */}
                <div className="p-4 md:p-5 space-y-2 md:space-y-3">
                  <h2 className="text-base md:text-xl font-bold text-foreground">{comp.name}</h2>
                  <StatusBadge status={comp.status} />
                  <div className="space-y-0.5 text-xs md:text-sm text-muted-foreground">
                    <p>📅 {comp.date}, {comp.time}</p>
                    <p>📍 {comp.location}</p>
                    <p>👤 {comp.organizer} {comp.organizerRole === "teacher" ? "👨‍🏫" : "🧑‍🎓"}</p>
                  </div>
                  <div className={`w-full text-center rounded-xl md:rounded-2xl py-2.5 md:py-3 text-xs md:text-sm font-bold btn-bounce ${action.cls}`}>
                    {action.label}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🏆</p>
          <p className="text-muted-foreground text-sm md:text-lg">Brak konkursów w tej kategorii</p>
        </div>
      )}
    </div>
  );
};

export default Konkursy;
