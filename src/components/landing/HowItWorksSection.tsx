const steps = [
  { num: "1️⃣", title: "Załóż konto", desc: "Rejestracja zajmuje 30 sekund" },
  { num: "2️⃣", title: "Ćwicz i rywalizuj", desc: "Graj w gry i przychodź na konkursy" },
  { num: "3️⃣", title: "Zgarniaj nagrody", desc: "Odznaki, punkty i fizyczne nagrody!" },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
        Jak to działa? 🤔
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s) => (
          <div key={s.title} className="text-center">
            <div className="text-5xl mb-4">{s.num}</div>
            <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
