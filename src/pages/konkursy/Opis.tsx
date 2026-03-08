import { useOutletContext } from "react-router-dom";
import { Competition } from "@/data/competitions";

export default function Opis() {
  const comp = useOutletContext<Competition>();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Left column */}
      <div className="lg:col-span-2 space-y-4 md:space-y-6">
        <div className="rounded-2xl md:rounded-3xl border border-border bg-card p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4">Opis konkursu</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed break-words">{comp.description}</p>
        </div>

        <div className="rounded-2xl md:rounded-3xl border border-border bg-card p-4 md:p-6 space-y-2 md:space-y-3">
          <h3 className="text-base md:text-lg font-bold text-foreground mb-1 md:mb-2">Informacje</h3>
          <p className="text-xs md:text-sm text-muted-foreground">📅 Kiedy: {comp.date}, {comp.time}</p>
          <p className="text-xs md:text-sm text-muted-foreground">📍 Gdzie: {comp.location}</p>
          <p className="text-xs md:text-sm text-muted-foreground">⏱️ Czas trwania: {comp.duration}</p>
          <p className="text-xs md:text-sm text-muted-foreground">👥 Zapisanych: {comp.participants} uczniów</p>
          <p className="text-xs md:text-sm text-muted-foreground">👤 Organizator: {comp.organizer}</p>
        </div>

        <div className="rounded-2xl md:rounded-3xl border border-border bg-card p-4 md:p-6">
          <h3 className="text-base md:text-lg font-bold text-foreground mb-3 md:mb-4">Jak to działa? 🤔</h3>
          <div className="space-y-3 md:space-y-4">
            {[
              { step: "1️⃣", title: "Przyjdź na konkurs", desc: `Fizyczne spotkanie, ${comp.location}` },
              { step: "2️⃣", title: "Rozwiąż zadania", desc: `${comp.duration} na rozwiązanie zadań` },
              { step: "3️⃣", title: "Zaprezentuj i zgarnij nagrody", desc: "Omówienie zadań + nagrody dla uczestników" },
            ].map((s, i) => (
              <div key={i} className="flex gap-3 md:gap-4 items-start">
                <span className="text-xl md:text-2xl">{s.step}</span>
                <div className="min-w-0">
                  <p className="text-sm md:text-base font-bold text-foreground">{s.title}</p>
                  <p className="text-xs md:text-sm text-muted-foreground break-words">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right column - CTA */}
      <div>
        <div className="rounded-2xl md:rounded-3xl border border-border bg-card p-4 md:p-6 sticky top-8">
          {comp.status === "upcoming" && (
            <>
              <h3 className="text-base md:text-lg font-bold text-foreground mb-2">Zapisz się! 🚀</h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">Zostało miejsc: wiele!</p>
              <button className="w-full rounded-xl md:rounded-2xl bg-gradient-to-r from-primary to-secondary py-2.5 md:py-3 text-xs md:text-sm font-bold text-primary-foreground btn-bounce">
                Dołącz do konkursu 🚀
              </button>
            </>
          )}
          {comp.status === "active" && (
            <>
              <h3 className="text-base md:text-lg font-bold text-foreground mb-2">Jesteś zapisany ✓</h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">Konkurs trwa teraz!</p>
              <div className="w-full rounded-xl md:rounded-2xl bg-emerald-500/20 py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-emerald-400">
                Jesteś zapisany ✅
              </div>
            </>
          )}
          {comp.status === "finished" && (
            <>
              <h3 className="text-base md:text-lg font-bold text-foreground mb-2">Konkurs zakończony</h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">Zakończył się {comp.date}</p>
              <div className="w-full rounded-xl md:rounded-2xl bg-muted py-2.5 md:py-3 text-center text-xs md:text-sm font-bold text-muted-foreground">
                Zakończony ⚫
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
