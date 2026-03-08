import { useState } from "react";

const activities = [
  { id: 1, emoji: "🔢", title: "Matematyczne klasy", desc: "Gra w klasy z działaniami matematycznymi. Narysuj klasę kredą i wpisz w każde pole działanie — uczeń skacze i podaje wynik na głos. Świetna zabawa na przerwie!", tag: "Ruch + Liczenie" },
  { id: 2, emoji: "📐", title: "Geometryczne figury ciałem", desc: "Uczniowie w grupach tworzą figury geometryczne swoimi ciałami — trójkąty, kwadraty, koła. Nauczyciel ocenia poprawność i kreatywność. Ćwiczy rozpoznawanie figur.", tag: "Ruch + Geometria" },
  { id: 3, emoji: "🎯", title: "Celowanie ułamkowe", desc: "Narysuj tarczę z polami oznaczonymi ułamkami. Rzucaj piłeczką i sumuj trafione ułamki. Kto pierwszy uzbiera całość, wygrywa!", tag: "Ruch + Ułamki" },
  { id: 4, emoji: "🧮", title: "Biegowe tabliczki mnożenia", desc: "Rozłóż kartki z wynikami po boisku. Nauczyciel krzyczy działanie, uczniowie biegną do poprawnego wyniku. Łączy ruch z szybkim liczeniem!", tag: "Ruch + Mnożenie" },
];

export default function AktywnaPrzerwa() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="py-6 lg:py-8 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl lg:text-[28px] font-bold text-foreground">🏃 Aktywna przerwa</h1>
        <p className="text-muted-foreground text-sm lg:text-base">Aktywności zatwierdzone przez nauczycieli, które wspomagają naukę przez ruch!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activities.map((a) => (
          <button
            key={a.id}
            onClick={() => setOpenId(openId === a.id ? null : a.id)}
            className="text-left rounded-3xl border border-border bg-card p-5 hover:bg-muted/40 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{a.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-foreground">{a.title}</p>
                <span className="text-[10px] font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">{a.tag}</span>
              </div>
            </div>
            {openId === a.id && (
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-t border-dashed border-border pt-3">
                {a.desc}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
