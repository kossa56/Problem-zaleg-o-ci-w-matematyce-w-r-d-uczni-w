const mathSymbols = [
  { symbol: "+", top: "10%", left: "5%", delay: "0s" },
  { symbol: "−", top: "20%", left: "85%", delay: "2s" },
  { symbol: "×", top: "60%", left: "10%", delay: "4s" },
  { symbol: "÷", top: "70%", left: "90%", delay: "1s" },
  { symbol: "=", top: "40%", left: "92%", delay: "3s" },
  { symbol: "?", top: "80%", left: "15%", delay: "5s" },
  { symbol: "+", top: "15%", left: "70%", delay: "6s" },
  { symbol: "−", top: "85%", left: "80%", delay: "2.5s" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 px-6 flex flex-col items-center text-center">
      {/* Floating math symbols */}
      {mathSymbols.map((s, i) => (
        <span
          key={i}
          className={`absolute text-primary/10 text-4xl md:text-6xl font-bold select-none pointer-events-none ${
            i % 3 === 0 ? "animate-float-slow" : i % 3 === 1 ? "animate-float-slower" : "animate-float-slowest"
          }`}
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          {s.symbol}
        </span>
      ))}

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight max-w-3xl">
        Matematyka?{" "}
        <br />
        To brzmi jak gra! 🎮
      </h1>

      <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
        Ucz się, rywalizuj i zgarniaj nagrody
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button className="btn-bounce px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
          Zagraj teraz 🚀
        </button>
        <button className="btn-bounce px-8 py-4 rounded-full border-2 border-primary text-primary font-bold text-lg hover:bg-primary/10 transition-colors">
          Zaloguj się
        </button>
      </div>
    </section>
  );
}
