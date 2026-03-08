import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const games = [
  {
    path: "quick-test",
    emoji: "⚡",
    title: "Quick Test",
    desc: "10 zadań na czas — sprawdź swoją szybkość!",
  },
  {
    path: "swipe-it",
    emoji: "👆",
    title: "Swipe It",
    desc: "Przesuń kartę w lewo lub prawo, aby wybrać odpowiedź.",
  },
  {
    path: "more-or-less-numbers",
    emoji: "🔢",
    title: "Więcej czy mniej — Liczby",
    desc: "Porównuj dwie liczby: <, = lub >.",
  },
  {
    path: "more-or-less-equation",
    emoji: "➕",
    title: "Więcej czy mniej — Działania",
    desc: "Porównuj wyniki dwóch działań matematycznych.",
  },
  {
    path: "egzamin-osmoklasisty",
    emoji: "📝",
    title: "Egzamin ósmoklasisty",
    desc: "Ćwicz z zadaniami dodanymi przez nauczyciela.",
  },
];

const Gry = () => (
  <div className="py-6 md:py-10 max-w-4xl mx-auto space-y-6">
    <h1 className="text-2xl md:text-3xl font-bold text-foreground">🎮 Gry matematyczne</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {games.map((g) => (
        <Link key={g.path} to={`/gry/${g.path}`} className="block">
          <Card className="h-full card-lift hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="text-4xl mb-2">{g.emoji}</div>
              <CardTitle className="text-lg">{g.title}</CardTitle>
              <CardDescription>{g.desc}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  </div>
);

export default Gry;
