import { useState, useCallback, useRef } from "react";
import { BackToGames } from "@/components/gry/BackToGames";
import { GameSettings } from "@/components/gry/GameSettings";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Category, Difficulty, generateQuestion, Question } from "@/data/mathQuestions";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Phase = "setup" | "playing" | "done";

export default function SwipeIt() {
  const [category, setCategory] = useState<Category>("tabliczka-mnozenia");
  const [difficulty, setDifficulty] = useState<Difficulty>("prosty");
  const [phase, setPhase] = useState<Phase>("setup");
  const [question, setQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  // Drag state
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [flyOut, setFlyOut] = useState<"left" | "right" | null>(null);
  const startX = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const THRESHOLD = 100;

  const nextQ = useCallback(() => {
    const q = generateQuestion(category, difficulty);
    const correct = q.answers[q.correct];
    const wrong = q.answers.find((_, i) => i !== q.correct)!;
    setQuestion({ question: q.question, answers: [correct, wrong], correct: 0 });
    setDragX(0);
    setFlyOut(null);
  }, [category, difficulty]);

  const start = () => { setScore(0); setTotal(0); setPhase("playing"); nextQ(); };

  const answer = useCallback((idx: number) => {
    if (!question) return;
    if (idx === question.correct) setScore((s) => s + 1);
    const next = total + 1;
    setTotal(next);
    if (next >= 10) { setPhase("done"); return; }
    nextQ();
  }, [question, total, nextQ]);

  const commitSwipe = useCallback((dir: "left" | "right") => {
    setFlyOut(dir);
    setTimeout(() => {
      answer(dir === "left" ? 0 : 1);
    }, 250);
  }, [answer]);

  // Mouse handlers
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragX(e.clientX - startX.current);
  };
  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragX) > THRESHOLD) {
      commitSwipe(dragX < 0 ? "left" : "right");
    } else {
      setDragX(0);
    }
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragX(e.touches[0].clientX - startX.current);
  };
  const onTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragX) > THRESHOLD) {
      commitSwipe(dragX < 0 ? "left" : "right");
    } else {
      setDragX(0);
    }
  };

  const rotation = dragX * 0.08;
  const leftOpacity = Math.min(1, Math.max(0, -dragX / THRESHOLD));
  const rightOpacity = Math.min(1, Math.max(0, dragX / THRESHOLD));

  const cardStyle: React.CSSProperties = flyOut
    ? {
        transform: `translateX(${flyOut === "left" ? "-120vw" : "120vw"}) rotate(${flyOut === "left" ? -30 : 30}deg)`,
        transition: "transform 0.3s ease-out",
      }
    : {
        transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
        transition: isDragging ? "none" : "transform 0.3s ease-out",
      };

  return (
    <div className="py-6 md:py-10 max-w-2xl mx-auto space-y-6">
      <BackToGames />
      <h1 className="text-2xl font-bold text-foreground">👆 Swipe It</h1>

      {phase === "setup" && (
        <div className="space-y-6">
          <GameSettings category={category} difficulty={difficulty} onCategoryChange={setCategory} onDifficultyChange={setDifficulty} />
          <Button onClick={start} size="lg" className="w-full sm:w-auto">Start</Button>
        </div>
      )}

      {phase === "playing" && question && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">{total + 1}/10</p>

          {/* Zone indicators */}
          <div className="relative h-[340px] md:h-[400px] flex items-center justify-center select-none">
            {/* Left zone label */}
            <div
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 pointer-events-none transition-opacity"
              style={{ opacity: 0.3 + leftOpacity * 0.7 }}
            >
              <div className={`rounded-full p-2 md:p-3 border-2 ${leftOpacity > 0.3 ? "border-primary bg-primary/20 text-primary" : "border-muted-foreground/40 text-muted-foreground"} transition-colors`}>
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <span className={`text-xs md:text-sm font-bold max-w-[70px] md:max-w-[90px] text-center leading-tight ${leftOpacity > 0.3 ? "text-primary" : "text-muted-foreground"} transition-colors`}>
                {question.answers[0]}
              </span>
            </div>

            {/* Right zone label */}
            <div
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 pointer-events-none transition-opacity"
              style={{ opacity: 0.3 + rightOpacity * 0.7 }}
            >
              <div className={`rounded-full p-2 md:p-3 border-2 ${rightOpacity > 0.3 ? "border-primary bg-primary/20 text-primary" : "border-muted-foreground/40 text-muted-foreground"} transition-colors`}>
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <span className={`text-xs md:text-sm font-bold max-w-[70px] md:max-w-[90px] text-center leading-tight ${rightOpacity > 0.3 ? "text-primary" : "text-muted-foreground"} transition-colors`}>
                {question.answers[1]}
              </span>
            </div>

            {/* Draggable card */}
            <div
              ref={cardRef}
              className="cursor-grab active:cursor-grabbing touch-none"
              style={cardStyle}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={() => { if (isDragging) { setIsDragging(false); setDragX(0); } }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <Card className="w-[220px] h-[280px] md:w-[280px] md:h-[340px] flex items-center justify-center p-6 shadow-lg relative overflow-hidden">
                {/* Colored edge indicators on the card */}
                <div
                  className="absolute inset-y-0 left-0 w-2 bg-primary rounded-l-lg transition-opacity"
                  style={{ opacity: leftOpacity }}
                />
                <div
                  className="absolute inset-y-0 right-0 w-2 bg-primary rounded-r-lg transition-opacity"
                  style={{ opacity: rightOpacity }}
                />
                <p className="text-2xl md:text-3xl font-bold text-foreground text-center break-words">
                  {question.question}
                </p>
              </Card>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Przeciągnij kartę w lewo lub prawo, aby wybrać odpowiedź
          </p>
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
