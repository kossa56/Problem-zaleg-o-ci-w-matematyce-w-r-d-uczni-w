import { useState, useCallback } from "react";
import { BackToGames } from "@/components/gry/BackToGames";
import { GameSettings } from "@/components/gry/GameSettings";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Category, Difficulty, generateCompareEquations, CompareQuestion } from "@/data/mathQuestions";

type Phase = "setup" | "playing" | "done";

export default function MoreOrLessEquation() {
  const [category, setCategory] = useState<Category>("tabliczka-mnozenia");
  const [difficulty, setDifficulty] = useState<Difficulty>("prosty");
  const [phase, setPhase] = useState<Phase>("setup");
  const [q, setQ] = useState<CompareQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const nextQ = useCallback(() => {
    setQ(generateCompareEquations(category, difficulty));
    setFeedback(null);
  }, [category, difficulty]);

  const start = () => { setScore(0); setTotal(0); setPhase("playing"); nextQ(); };

  const answer = (a: "<" | "=" | ">") => {
    if (!q) return;
    const correct = a === q.answer;
    if (correct) setScore((s) => s + 1);
    setFeedback(correct ? "correct" : "wrong");
    const next = total + 1;
    setTotal(next);
    setTimeout(() => {
      if (next >= 10) { setPhase("done"); return; }
      nextQ();
    }, 500);
  };

  return (
    <div className="py-6 md:py-10 max-w-2xl mx-auto space-y-6">
      <BackToGames />
      <h1 className="text-2xl font-bold text-foreground">➕ Więcej czy mniej — Działania</h1>

      {phase === "setup" && (
        <div className="space-y-6">
          <GameSettings category={category} difficulty={difficulty} onCategoryChange={setCategory} onDifficultyChange={setDifficulty} />
          <Button onClick={start} size="lg" className="w-full sm:w-auto">Start</Button>
        </div>
      )}

      {phase === "playing" && q && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{total + 1}/10</span>
            <span>Wynik: {score}</span>
          </div>

          <Card className={`p-6 md:p-8 text-center transition-colors ${feedback === "correct" ? "border-[hsl(var(--dp-green))]" : feedback === "wrong" ? "border-[hsl(var(--dp-red))]" : ""}`}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <span className="text-xl md:text-2xl font-bold text-foreground break-words">{q.left}</span>
              <span className="text-muted-foreground text-xl">?</span>
              <span className="text-xl md:text-2xl font-bold text-foreground break-words">{q.right}</span>
            </div>
          </Card>

          <div className="flex gap-3">
            {(["<", "=", ">"] as const).map((sym) => (
              <Button key={sym} variant="outline" className="flex-1 h-14 text-2xl" onClick={() => answer(sym)} disabled={feedback !== null}>
                {sym}
              </Button>
            ))}
          </div>
        </div>
      )}

      {phase === "done" && (
        <Card className="p-6 text-center space-y-4">
          <p className="text-5xl">{score >= 8 ? "🎉" : "👍"}</p>
          <h2 className="text-xl font-bold text-foreground">Wynik: {score}/10</h2>
          <Button onClick={() => setPhase("setup")}>Zagraj ponownie</Button>
        </Card>
      )}
    </div>
  );
}
