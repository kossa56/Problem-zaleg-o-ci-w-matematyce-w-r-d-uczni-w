const features = [
  {
    emoji: "🎮",
    title: "Gry",
    desc: "Swipuj, klikaj, zdobywaj punkty!",
    gradient: "from-secondary/20 to-secondary/5 border-secondary/20",
  },
  {
    emoji: "🏆",
    title: "Konkursy",
    desc: "Przychodź co tydzień i rywalizuj!",
    gradient: "from-dp-amber/20 to-dp-amber/5 border-dp-amber/20",
  },
  {
    emoji: "📊",
    title: "Ranking",
    desc: "Top 5 najlepszych graczy tygodnia",
    gradient: "from-accent/20 to-accent/5 border-accent/20",
  },
  {
    emoji: "🏅",
    title: "Odznaki",
    desc: "Zbieraj odznaki i fizyczne nagrody!",
    gradient: "from-dp-green/20 to-dp-green/5 border-dp-green/20",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
        Co tu znajdziesz? 👇
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className={`card-lift rounded-3xl bg-gradient-to-br ${f.gradient} border p-6 md:p-8 text-center`}
          >
            <div className="text-4xl md:text-5xl mb-4">{f.emoji}</div>
            <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
