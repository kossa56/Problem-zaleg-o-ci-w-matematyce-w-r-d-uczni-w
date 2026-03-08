import { Link } from "react-router-dom";

const weeklyRanking = [
  { pos: "🥇", name: "TygrysMath", pts: 520, color: "bg-primary", gold: true },
  { pos: "🥈", name: "ZajączekPro", pts: 480, color: "bg-dp-green" },
  { pos: "🥉", name: "LisekCyferki", pts: 450, color: "bg-dp-amber" },
  { pos: "4", name: "MedvědMatik", pts: 380, color: "bg-accent" },
  { pos: "5", name: "PandaLiczby", pts: 320, color: "bg-secondary" },
];


const quickActions = [
  { icon: "⚡", label: "Quick Test", gradient: "from-secondary/30 to-secondary/10 border-secondary/30", link: "/gry" },
  { icon: "🤖", label: "AI Test", gradient: "from-accent/30 to-accent/10 border-accent/30", link: "/gry" },
  { icon: "🏆", label: "Turniej", gradient: "from-dp-amber/30 to-dp-amber/10 border-dp-amber/30", link: "/konkursy" },
  { icon: "🧠", label: "Diagnostyka", gradient: "from-dp-green/30 to-dp-green/10 border-dp-green/30", link: "/gry" },
];

const weekDays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];
const weekData = [30, 50, 40, 70, 60, 25, 20];
const maxVal = Math.max(...weekData);

const calendarEvents: Record<number, { label: string; color: string }> = {
  3: { label: "Mnożenie", color: "bg-secondary" },
  5: { label: "Logarytmy", color: "bg-accent" },
  13: { label: "Geometria", color: "bg-dp-green" },
  20: { label: "Ułamki", color: "bg-dp-amber" },
  27: { label: "Algebra", color: "bg-secondary" },
};

function getMarchDays(): (number | null)[][] {
  // March 2026 starts on Sunday (0-indexed: Sun=0)
  // Grid: Mon-Sun, so Sun is last column
  const weeks: (number | null)[][] = [];
  // March 1 is Sunday → first week: [null,null,null,null,null,null,1]
  let day = 1;
  // First week
  const firstWeek: (number | null)[] = [null, null, null, null, null, null, 1];
  weeks.push(firstWeek);
  day = 2;
  while (day <= 31) {
    const week: (number | null)[] = [];
    for (let i = 0; i < 7 && day <= 31; i++) {
      week.push(day);
      day++;
    }
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

const marchWeeks = getMarchDays();
const today = 8; // March 8

const Index = () => {

  return (
    <div className="py-6 lg:py-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-[28px] font-bold text-foreground">Hej, TygrysMath! 👋</h1>
          <p className="text-muted-foreground text-sm lg:text-base">Masz dziś 3 nowe zadania! 🎯</p>
        </div>
        <div className="flex items-center gap-3 bg-card rounded-full border border-border px-4 py-2 w-fit">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">T</div>
          <div>
            <p className="text-sm font-bold text-foreground leading-tight">TygrysMath</p>
            <p className="text-xs text-muted-foreground">Poziom 12</p>
          </div>
        </div>
      </div>

      {/* Streak Banner */}
      <div className="rounded-3xl border border-dp-amber/40 bg-gradient-to-r from-dp-amber/10 to-dp-amber/5 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <span className="text-5xl">🔥</span>
        <div className="flex-1">
          <p className="text-xl lg:text-2xl font-bold text-dp-amber">7 dni z rzędu!</p>
          <p className="text-muted-foreground text-sm">Niesamowite! Nie przerywaj passy! 💪</p>
        </div>
        <div className="w-full sm:w-44">
          <p className="text-xs text-muted-foreground mb-1">Do 10 dni: 7/10</p>
          <div className="h-2.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-dp-amber transition-all" style={{ width: "70%" }} />
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Goal */}
        <div className="rounded-3xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-foreground">🎯 Dzisiejszy cel</h3>
            <span className="text-xs font-bold text-muted-foreground bg-muted rounded-full px-3 py-1">Gamification</span>
          </div>
          <p className="text-base font-bold text-foreground mb-3">Rozwiąż 10 zadań</p>
          <div className="h-3 rounded-full bg-muted overflow-hidden mb-2">
            <div className="h-full rounded-full bg-gradient-to-r from-dp-amber to-dp-amber/70 transition-all" style={{ width: "70%" }} />
          </div>
          <p className="text-sm text-foreground font-medium">Postęp: 7/10 🔥</p>
          <div className="mt-3 pt-3 border-t border-dashed border-border">
            <p className="text-sm text-primary font-medium">✔ Jeszcze 3 zadania i cel Twój!</p>
          </div>
        </div>

        {/* Weekly Ranking */}
        <div className="rounded-3xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-foreground">🏆 Ranking tygodnia</h3>
            <span className="text-xs font-bold text-muted-foreground bg-muted rounded-full px-3 py-1">Konkursy</span>
          </div>
          <div className="space-y-2">
            {weeklyRanking.map((r) => (
              <div
                key={r.name}
                className={`flex items-center gap-3 p-2 rounded-2xl ${r.gold ? "border border-yellow-500/40" : ""}`}
              >
                <span className="text-lg w-7 text-center font-bold">{r.pos}</span>
                <div className={`w-7 h-7 rounded-full ${r.color} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                  {r.name.charAt(0)}
                </div>
                <span className="flex-1 text-sm font-medium text-foreground">{r.name}</span>
                <span className="text-sm font-bold text-primary">{r.pts} pkt</span>
              </div>
            ))}
           </div>
         </div>
      </div>

      {/* Weekly Chart */}
      <div className="rounded-3xl border border-border bg-card p-5">
        <h3 className="text-lg font-bold text-foreground">📅 Twój tydzień</h3>
        <p className="text-sm text-muted-foreground mb-4">Ile zadań rozwiązałeś?</p>
        <div className="flex items-end justify-between gap-2 h-28">
          {weekData.map((val, i) => {
            const pct = (val / maxVal) * 100;
            const isMax = val === maxVal;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">{weekDays[i]}</span>
                <div className="w-full h-20 bg-muted rounded-t-lg relative overflow-hidden">
                  <div
                    className={`absolute bottom-0 left-0 right-0 rounded-t-lg transition-all ${isMax ? "bg-primary" : "bg-secondary"}`}
                    style={{ height: `${pct}%` }}
                  />
                </div>
                <span className={`text-xs font-bold ${isMax ? "text-primary" : "text-secondary"}`}>{val}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 bg-muted/50 rounded-2xl p-3">
          <p className="text-xs text-muted-foreground">
            ℹ️ W czwartek byłeś nie do zatrzymania! W weekend odpoczywasz — tak trzymaj! 💪
          </p>
        </div>
      </div>

      {/* Competition Calendar */}
      <div className="rounded-3xl border border-border bg-card p-5">
        <h3 className="text-lg font-bold text-foreground">📅 Harmonogram konkursów</h3>
        <p className="text-sm text-muted-foreground mb-4">Marzec 2026</p>
        {/* Header */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"].map((d) => (
            <div key={d} className="text-center text-[10px] lg:text-xs font-bold text-primary py-1">{d}</div>
          ))}
        </div>
        {/* Weeks */}
        <div className="grid grid-cols-7 gap-1">
          {marchWeeks.flat().map((day, i) => {
            if (day === null) return <div key={i} />;
            const event = calendarEvents[day];
            const isToday = day === today;
            return (
              <div
                key={i}
                className={`rounded-xl p-1 lg:p-2 min-h-[44px] lg:min-h-[56px] flex flex-col items-center bg-muted/30 ${
                  isToday ? "ring-2 ring-primary/60" : ""
                }`}
              >
                <span className={`text-xs font-bold ${isToday ? "text-primary" : "text-foreground"}`}>{day}</span>
                {event && (
                  <span className={`mt-0.5 text-[8px] lg:text-[9px] font-bold text-white ${event.color} rounded-full px-1.5 py-0.5 leading-none truncate max-w-full`}>
                    {event.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4">
        <p className="text-xs text-muted-foreground">© 2026 DonPedros 🌟</p>
      </footer>
    </div>
  );
};

export default Index;
