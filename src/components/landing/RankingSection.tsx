const rankings = [
  { pos: "🥇", name: "TygrysMath", pts: "1 240", color: "bg-primary" },
  { pos: "🥈", name: "ZajączekPro", pts: "980", color: "bg-dp-green" },
  { pos: "🥉", name: "LisekCyferki", pts: "870", color: "bg-dp-amber" },
  { pos: "4", name: "MedvědMatik", pts: "750", color: "bg-accent" },
  { pos: "5", name: "PandaLiczby", pts: "690", color: "bg-secondary" },
];

export function RankingSection() {
  return (
    <section className="py-16 px-6 max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-2">
        Ranking tygodnia 🏆
      </h2>
      <p className="text-center text-muted-foreground mb-10">Top 5 tej tygodnia</p>

      <div className="bg-card rounded-3xl border border-border p-4 md:p-6 space-y-3">
        {rankings.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-muted/30 transition-colors"
          >
            <span className="text-2xl w-8 text-center font-bold">{r.pos}</span>
            <div className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center text-sm font-bold text-foreground`}>
              {r.name.charAt(0)}
            </div>
            <span className="flex-1 font-medium text-foreground">{r.name}</span>
            <span className="text-primary font-bold">{r.pts} pkt</span>
          </div>
        ))}
      </div>
    </section>
  );
}
