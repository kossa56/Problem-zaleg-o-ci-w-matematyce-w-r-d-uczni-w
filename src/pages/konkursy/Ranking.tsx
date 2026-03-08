import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Competition } from "@/data/competitions";
import { useRole } from "@/contexts/RoleContext";
import { toast } from "@/hooks/use-toast";

const medals = ["🥇", "🥈", "🥉"];
const borderColors = ["border-yellow-500/50", "border-gray-400/50", "border-amber-700/50"];

const badgeOptions = [
  { emoji: "🏅", label: "Król Logarytmów" },
  { emoji: "⭐", label: "Wyróżnienie" },
  { emoji: "🧠", label: "Najlepsze rozwiązanie" },
  { emoji: "💪", label: "Największy postęp" },
];

export default function Ranking() {
  const comp = useOutletContext<Competition>();
  const { isTeacher } = useRole();
  const [badgeModal, setBadgeModal] = useState<string | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<number>(0);

  if (comp.ranking.length === 0) {
    return (
      <div className="rounded-2xl md:rounded-3xl border border-border bg-card p-6 md:p-8 text-center">
        <p className="text-3xl md:text-4xl mb-3">🏆</p>
        <p className="text-sm text-muted-foreground">Ranking będzie dostępny po rozpoczęciu konkursu</p>
      </div>
    );
  }

  const handleAwardBadge = (name: string) => {
    toast({ title: "Odznaka przyznana! 🎉", description: `${name} dostanie powiadomienie` });
    setBadgeModal(null);
  };

  if (isTeacher) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-foreground">Pełny ranking 👩‍🏫</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Widoczny tylko dla nauczyciela</p>
        </div>

        {/* Mobile: card-based view */}
        <div className="block lg:hidden space-y-3">
          {comp.ranking.map((entry) => (
            <div key={entry.position} className={`rounded-2xl border bg-card p-4 ${
              entry.position <= 3 ? borderColors[entry.position - 1] : "border-border"
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl w-7 text-center">
                  {entry.position <= 3 ? medals[entry.position - 1] : entry.position + "."}
                </span>
                <div className={`${entry.color} w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white`}>
                  {entry.initial}
                </div>
                <span className="text-sm font-medium text-foreground flex-1">{entry.name}</span>
                <span className="text-sm font-bold text-primary">{entry.points} pkt</span>
              </div>
              <div className="flex items-center justify-between ml-10">
                <div className="flex gap-1.5">
                  {entry.tasks.map((correct, i) => (
                    <span key={i} className="text-sm">{correct ? "✅" : "❌"}</span>
                  ))}
                </div>
                <button
                  onClick={() => { setBadgeModal(entry.name); setSelectedBadge(0); }}
                  className="text-[11px] rounded-full bg-primary/20 px-2.5 py-1 text-primary font-bold btn-bounce"
                >
                  Przyznaj 🏅
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table view */}
        <div className="hidden lg:block rounded-3xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-muted-foreground font-bold">#</th>
                  <th className="text-left p-4 text-muted-foreground font-bold">Uczeń</th>
                  {comp.tasks.map((_, i) => (
                    <th key={i} className="text-center p-4 text-muted-foreground font-bold">Zad. {i + 1}</th>
                  ))}
                  <th className="text-center p-4 text-muted-foreground font-bold">Suma</th>
                  <th className="text-center p-4 text-muted-foreground font-bold">Odznaka</th>
                </tr>
              </thead>
              <tbody>
                {comp.ranking.map((entry) => (
                  <tr key={entry.position} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="p-4 font-bold text-foreground">
                      {entry.position <= 3 ? medals[entry.position - 1] : entry.position}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className={`${entry.color} w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white`}>
                          {entry.initial}
                        </div>
                        <span className="text-foreground font-medium">{entry.name}</span>
                      </div>
                    </td>
                    {entry.tasks.map((correct, i) => (
                      <td key={i} className="text-center p-4">{correct ? "✅" : "❌"}</td>
                    ))}
                    <td className="text-center p-4 font-bold text-primary">{entry.points} pkt</td>
                    <td className="text-center p-4">
                      <button
                        onClick={() => { setBadgeModal(entry.name); setSelectedBadge(0); }}
                        className="text-xs rounded-full bg-primary/20 px-3 py-1 text-primary font-bold btn-bounce hover:bg-primary/30"
                      >
                        Przyznaj 🏅
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Badge modal */}
        {badgeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setBadgeModal(null)}>
            <div className="rounded-2xl md:rounded-3xl border border-border bg-card p-5 md:p-6 w-full max-w-md animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-base md:text-lg font-bold text-foreground mb-1">Przyznaj odznakę uczniowi</h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-4">{badgeModal}</p>
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
                {badgeOptions.map((b, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedBadge(i)}
                    className={`rounded-xl md:rounded-2xl border p-2.5 md:p-3 text-center btn-bounce transition-colors ${
                      selectedBadge === i ? "border-primary bg-primary/10" : "border-border bg-muted"
                    }`}
                  >
                    <span className="text-xl md:text-2xl block mb-1">{b.emoji}</span>
                    <span className="text-[10px] md:text-xs font-bold text-foreground">{b.label}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleAwardBadge(badgeModal)}
                className="w-full rounded-xl md:rounded-2xl bg-gradient-to-r from-primary to-secondary py-2.5 md:py-3 text-sm font-bold text-primary-foreground btn-bounce"
              >
                Przyznaj odznakę ✓
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Student view
  const top5 = comp.ranking.slice(0, 5);
  const blurred = comp.ranking.slice(5, 8);

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-foreground">Ranking 🏆</h2>
        <p className="text-xs md:text-sm text-muted-foreground">Top 5 tego konkursu</p>
      </div>

      <div className="space-y-2 md:space-y-3">
        {top5.map((entry) => (
          <div
            key={entry.position}
            className={`rounded-2xl md:rounded-3xl border bg-card p-3 md:p-4 flex items-center gap-3 md:gap-4 animate-fade-in ${
              entry.position <= 3 ? borderColors[entry.position - 1] : "border-border"
            } ${entry.position === 1 ? "shadow-[0_0_20px_rgba(234,179,8,0.15)]" : ""}`}
          >
            <span className="text-xl md:text-2xl w-7 md:w-8 text-center">
              {entry.position <= 3 ? medals[entry.position - 1] : entry.position + "."}
            </span>
            <div className={`${entry.color} w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-white shrink-0`}>
              {entry.initial}
            </div>
            <span className="text-sm md:text-base text-foreground font-medium flex-1 truncate">{entry.name}</span>
            <span className="text-sm md:text-base text-primary font-bold whitespace-nowrap">{entry.points}/{entry.maxPoints}</span>
          </div>
        ))}
      </div>

      {/* Blurred rows */}
      {blurred.length > 0 && (
        <div className="relative">
          <div className="space-y-2 md:space-y-3 blur-sm select-none">
            {blurred.map((entry) => (
              <div key={entry.position} className="rounded-2xl md:rounded-3xl border border-border bg-card p-3 md:p-4 flex items-center gap-3 md:gap-4">
                <span className="text-base md:text-lg w-7 md:w-8 text-center text-muted-foreground">{entry.position}.</span>
                <div className="bg-muted w-8 h-8 md:w-9 md:h-9 rounded-full" />
                <span className="text-muted-foreground flex-1">██████</span>
                <span className="text-muted-foreground">██ pkt</span>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xs md:text-sm font-bold text-muted-foreground bg-card/80 rounded-full px-3 md:px-4 py-2">
              🔒 Pełny ranking dostępny dla nauczyciela
            </p>
          </div>
        </div>
      )}

      {/* My position */}
      {comp.myRankPosition && (
        <div className="rounded-2xl md:rounded-3xl border border-amber-500/30 bg-amber-500/5 p-4 md:p-5">
          <p className="text-xs md:text-sm font-bold text-amber-400 mb-1">Twoje miejsce w tym konkursie:</p>
          <p className="text-base md:text-lg font-bold text-foreground">
            #{comp.myRankPosition} miejsce — {comp.myRankPoints}/{comp.myRankMaxPoints} punktów
          </p>
        </div>
      )}
    </div>
  );
}
