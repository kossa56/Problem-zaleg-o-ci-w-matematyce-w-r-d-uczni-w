import { useOutletContext } from "react-router-dom";
import { Competition } from "@/data/competitions";

export default function Ogloszenia() {
  const comp = useOutletContext<Competition>();

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-lg md:text-xl font-bold text-foreground">Ogłoszenia 📢</h2>

      {comp.announcements.length === 0 ? (
        <div className="rounded-2xl md:rounded-3xl border border-border bg-card p-6 md:p-8 text-center">
          <p className="text-3xl md:text-4xl mb-3">📢</p>
          <p className="text-sm text-muted-foreground">Brak ogłoszeń — wróć wkrótce!</p>
        </div>
      ) : (
        comp.announcements.map((ann) => (
          <div key={ann.id} className="rounded-2xl md:rounded-3xl border border-border bg-card p-4 md:p-5">
            <div className="flex items-start gap-2 md:gap-3 mb-2">
              <span className="text-xl md:text-2xl">{ann.icon}</span>
              <h3 className="text-base md:text-lg font-bold text-foreground">{ann.title}</h3>
            </div>
            <p className="text-sm text-foreground leading-relaxed mb-2 md:mb-3">{ann.content}</p>
            <p className="text-[11px] md:text-xs text-muted-foreground text-right">{ann.date} — {ann.author}</p>
          </div>
        ))
      )}
    </div>
  );
}
