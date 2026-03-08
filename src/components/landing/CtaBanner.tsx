export function CtaBanner() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-primary to-secondary p-10 md:p-16 text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold text-primary-foreground mb-8">
          Dołącz do ponad 1000 uczniów! 🌟
        </h2>
        <button className="btn-bounce px-10 py-4 rounded-full bg-foreground text-background font-bold text-lg hover:opacity-90 transition-opacity">
          Załóż konto za darmo →
        </button>
      </div>
    </section>
  );
}
