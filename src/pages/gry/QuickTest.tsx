import { useState, useEffect, useCallback } from "react";
import { BackToGames } from "@/components/gry/BackToGames";
import { GameSettings } from "@/components/gry/GameSettings";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Category, Difficulty, generateQuestion, Question } from "@/data/mathQuestions";

const TOTAL = 10;

const mockRanking = [
  { name: "Kasia W.", score: 10, time: 18.2 },
  { name: "Bartek M.", score: 10, time: 22.5 },
  { name: "Zuzia K.", score: 9, time: 25.1 },
  { name: "Olek P.", score: 9, time: 30.8 },
  { name: "Hania S.", score: 8, time: 27.3 },
];

type Phase = "setup" | "playing" | "done";

export default function QuickTest() {
  const [category, setCategory] = useState<Category>("tabliczka-mnozenia");
  const [difficulty, setDifficulty] = useState<Difficulty>("prosty");
  const [phase, setPhase] = useState<Phase>("setup");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const start = useCallback(() => {
    const qs = Array.from({ length: TOTAL }, () => generateQuestion(category, difficulty));
    setQuestions(qs);
    setCurrent(0);
    setScore(0);
    setPhase("playing");
    setStartTime(Date.now());
  }, [category, difficulty]);

  useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => setElapsed((Date.now() - startTime) / 1000), 100);
    return () => clearInterval(id);
  }, [phase, startTime]);

  const answer = (idx: number) => {
    const correct = idx === questions[current].correct;
    if (correct) setScore((s) => s + 1);
    if (current + 1 >= TOTAL) {
      setElapsed((Date.now() - startTime) / 1000);
      setPhase("done");
    } else {
      setCurrent((c) => c + 1);
    }
  };

  return (
    <div className="py-6 md:py-10 max-w-2xl mx-auto space-y-6">
      <BackToGames />
      <h1 className="text-2xl font-bold text-foreground">⚡ Quick Test</h1>

      {phase === "setup" && (
        <div className="space-y-6">
          <GameSettings category={category} difficulty={difficulty} onCategoryChange={setCategory} onDifficultyChange={setDifficulty} />
          <Button onClick={start} size="lg" className="w-full sm:w-auto">Rozpocznij test</Button>
        </div>
      )}

      {phase === "playing" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Pytanie {current + 1}/{TOTAL}</span>
            <span>{elapsed.toFixed(1)}s</span>
          </div>
          <Progress value={((current) / TOTAL) * 100} />

          <Card className="p-6">
            <p className="text-xl md:text-2xl font-semibold text-center text-foreground mb-6 break-words">
              {questions[current].question}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {questions[current].answers.map((a, i) => (
                <Button key={i} variant="outline" className="h-14 text-base" onClick={() => answer(i)}>
                  {a}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {phase === "done" && (
        <div className="space-y-6">
          <Card className="p-6 text-center space-y-3">
            <p className="text-5xl">{score >= 8 ? "🎉" : score >= 5 ? "👍" : "💪"}</p>
            <h2 className="text-xl font-bold text-foreground">
              {score >= 8 ? "Świetny wynik!" : score >= 5 ? "Nieźle!" : "Próbuj dalej!"}
            </h2>
            <p className="text-muted-foreground">
              Wynik: <span className="font-bold text-foreground">{score}/{TOTAL}</span> • Czas: <span className="font-bold text-foreground">{elapsed.toFixed(1)}s</span>
            </p>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">🏆 Ranking Top 5</h3>
            <div className="space-y-2">
              {mockRanking.map((r, i) => (
                <div key={i} className="flex justify-between items-center text-sm px-2 py-1.5 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">{i + 1}. {r.name}</span>
                  <span className="text-foreground font-medium">{r.score}/{TOTAL} — {r.time}s</span>
                </div>
              ))}
            </div>
          </Card>

          <Button onClick={() => setPhase("setup")} className="w-full sm:w-auto">Zagraj ponownie</Button>
        </div>
      )}
    </div>
  );
}
