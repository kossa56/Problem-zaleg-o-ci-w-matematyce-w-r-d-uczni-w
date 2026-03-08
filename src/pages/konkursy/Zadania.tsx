import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { Competition } from "@/data/competitions";

const MAX_ATTEMPTS = 10;
const POINTS_PER_ATTEMPT = 5;
const taskColors = ["bg-primary", "bg-secondary", "bg-accent", "bg-dp-green", "bg-dp-amber"];
const difficultyMap: Record<number, { label: string; cls: string }> = {
  0: { label: "Łatwe", cls: "bg-dp-green/20 text-dp-green" },
  1: { label: "Średnie", cls: "bg-dp-amber/20 text-dp-amber" },
  2: { label: "Trudne", cls: "bg-destructive/20 text-destructive" },
};

interface TaskState {
  answer: string;
  attempts: number;
  solved: boolean;
  points: number;
  showSolution: boolean;
}

export default function Zadania() {
  const comp = useOutletContext<Competition>();
  const [taskStates, setTaskStates] = useState<Record<number, TaskState>>(() => {
    const initial: Record<number, TaskState> = {};
    comp.tasks.forEach((t) => {
      const existing = comp.mySolutions.find((s) => s.taskNumber === t.id);
      if (existing) {
        initial[t.id] = {
          answer: existing.myAnswer,
          attempts: existing.status === "correct" ? MAX_ATTEMPTS - Math.floor((existing.points || 0) / POINTS_PER_ATTEMPT) : MAX_ATTEMPTS,
          solved: existing.status === "correct",
          points: existing.points || 0,
          showSolution: false,
        };
      } else {
        initial[t.id] = { answer: "", attempts: 0, solved: false, points: 0, showSolution: false };
      }
    });
    return initial;
  });
  const [flashRed, setFlashRed] = useState<number | null>(null);

  if (comp.status === "upcoming") {
    return (
      <div className="rounded-2xl md:rounded-3xl border border-border bg-card p-6 md:p-8 text-center">
        <p className="text-4xl md:text-5xl mb-3 md:mb-4">🔒</p>
        <h2 className="text-lg md:text-xl font-bold text-foreground mb-2">Zadania ukryte</h2>
        <p className="text-sm text-muted-foreground">Zadania będą dostępne w trakcie konkursu</p>
        <p className="text-xs md:text-sm text-muted-foreground mt-2">📅 Start: {comp.date}, {comp.time}</p>
      </div>
    );
  }

  const getDifficulty = (i: number) => difficultyMap[i % 3];

  const handleSubmit = (taskId: number, correctSolution: string) => {
    const state = taskStates[taskId];
    if (state.solved || state.attempts >= MAX_ATTEMPTS) return;

    const userAnswer = state.answer.trim().toLowerCase();
    const isCorrect = checkAnswer(userAnswer, correctSolution);
    const newAttempts = state.attempts + 1;

    if (isCorrect) {
      const remaining = MAX_ATTEMPTS - newAttempts + 1;
      const pts = remaining * POINTS_PER_ATTEMPT;
      setTaskStates((prev) => ({
        ...prev,
        [taskId]: { ...prev[taskId], solved: true, attempts: newAttempts, points: pts },
      }));
    } else {
      setFlashRed(taskId);
      setTimeout(() => setFlashRed(null), 600);
      setTaskStates((prev) => ({
        ...prev,
        [taskId]: { ...prev[taskId], attempts: newAttempts, answer: "" },
      }));
    }
  };

  const checkAnswer = (userAnswer: string, solution: string): boolean => {
    const sol = solution.toLowerCase();
    if (sol.includes(userAnswer) && userAnswer.length > 0) return true;
    const nums = sol.match(/\d+/g);
    if (nums && nums.some((n) => n === userAnswer)) return true;
    return false;
  };

  const updateAnswer = (taskId: number, value: string) => {
    setTaskStates((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], answer: value },
    }));
  };

  const toggleSolution = (taskId: number) => {
    setTaskStates((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], showSolution: !prev[taskId].showSolution },
    }));
  };

  // Check if tasks are "not yet published" by teacher
  const tasksNotPublished = comp.tasks.length === 0;

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-bold text-foreground">Zadania konkursowe 📝</h2>
        {!tasksNotPublished && (
          <div className="relative group">
            <span className="text-[11px] md:text-xs text-muted-foreground cursor-help">💡 Punktacja</span>
            <div className="absolute right-0 top-full mt-1 z-10 hidden group-hover:block w-52 md:w-56 rounded-xl md:rounded-2xl border border-border bg-card p-3 shadow-xl">
              <p className="text-[11px] md:text-xs text-foreground font-bold mb-1">System punktacji:</p>
              <p className="text-[10px] md:text-[11px] text-muted-foreground">Im mniej prób zużyjesz, tym więcej punktów! Pierwsza próba = 50 pkt, każda kolejna -5 pkt.</p>
            </div>
          </div>
        )}
      </div>

      {/* Not published by teacher yet */}
      {tasksNotPublished && (
        <div className="relative">
          {/* Blurred placeholder cards */}
          <div className="space-y-4 blur-sm select-none pointer-events-none">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-2xl md:rounded-3xl border border-border bg-card p-4 md:p-5">
                <div className="flex items-start gap-3 md:gap-4 mb-3">
                  <div className="bg-muted w-9 h-9 md:w-10 md:h-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded-lg w-3/4" />
                    <div className="h-3 bg-muted rounded-lg w-1/3" />
                  </div>
                </div>
                <div className="space-y-2 ml-12">
                  <div className="h-10 bg-muted rounded-xl w-full" />
                  <div className="h-3 bg-muted rounded-lg w-1/2" />
                </div>
              </div>
            ))}
          </div>

          {/* Overlay message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl md:rounded-3xl border border-border bg-card/95 backdrop-blur-sm p-6 md:p-8 text-center max-w-sm mx-4 shadow-xl">
              <p className="text-4xl md:text-5xl mb-3">🔒</p>
              <h3 className="text-base md:text-lg font-bold text-foreground mb-2">Konkurs już trwa!</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Nauczyciel nie dodał Cię jeszcze do tego konkursu. Skontaktuj się z organizatorem! 👨‍🏫</p>
            </div>
          </div>
        </div>
      )}

      {!tasksNotPublished && comp.status === "finished" && (
        <div className="rounded-2xl md:rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 p-4 md:p-5">
          <p className="text-base md:text-lg font-bold text-foreground mb-1">💡 Konkurs zakończony!</p>
          <p className="text-xs md:text-sm text-muted-foreground mb-3">Ćwicz te zadania w sekcji Gier →</p>
          <Link
            to="/gry"
            className="inline-block rounded-xl md:rounded-2xl bg-gradient-to-r from-primary to-secondary px-5 py-2 text-xs md:text-sm font-bold text-primary-foreground btn-bounce"
          >
            Przejdź do Gier 🎮
          </Link>
        </div>
      )}

      {comp.tasks.map((task, i) => {
        const state = taskStates[task.id];
        const remaining = MAX_ATTEMPTS - state.attempts;
        const diff = getDifficulty(i);
        const isFlashing = flashRed === task.id;
        const failedAll = !state.solved && state.attempts >= MAX_ATTEMPTS;
        const mySol = comp.mySolutions.find((s) => s.taskNumber === task.id);

        let borderClass = "border-border";
        if (state.solved) borderClass = "border-dp-green/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]";
        else if (failedAll) borderClass = "border-destructive/50";
        else if (isFlashing) borderClass = "border-destructive animate-pulse";

        return (
          <div key={task.id} className={`rounded-2xl md:rounded-3xl border ${borderClass} bg-card p-4 md:p-5 transition-all`}>
            {/* Header */}
            <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
              <div className={`${taskColors[i % taskColors.length]} w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-white shrink-0`}>
                {task.id}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground font-medium text-base md:text-lg mb-1.5">{task.content}</p>
                <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] md:text-[11px] font-bold ${diff.cls}`}>{diff.label}</span>
              </div>
            </div>

            {/* Active competition: answer section */}
            {comp.status === "active" && !state.solved && !failedAll && (
              <div className="ml-0 md:ml-14 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={state.answer}
                    onChange={(e) => updateAnswer(task.id, e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(task.id, task.solution)}
                    placeholder="Wpisz swoją odpowiedź..."
                    className="flex-1 rounded-xl md:rounded-2xl border border-border bg-muted px-3 md:px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    onClick={() => handleSubmit(task.id, task.solution)}
                    className="rounded-xl md:rounded-2xl bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-bold text-primary-foreground btn-bounce whitespace-nowrap"
                  >
                    Wyślij →
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] md:text-xs text-muted-foreground">🔄 Pozostało prób: {remaining}/{MAX_ATTEMPTS}</span>
                </div>
                <div className="flex gap-0.5 md:gap-1">
                  {Array.from({ length: MAX_ATTEMPTS }).map((_, dot) => {
                    const used = dot < state.attempts;
                    const isWarning = remaining <= 3 && remaining > 0;
                    return (
                      <div
                        key={dot}
                        className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${
                          used
                            ? isWarning ? "bg-dp-amber" : "bg-destructive/70"
                            : "bg-muted"
                        }`}
                      />
                    );
                  })}
                </div>
                {remaining <= 3 && remaining > 0 && (
                  <p className="text-[11px] md:text-xs text-dp-amber font-bold">⚠️ Uwaga! Zostały Ci tylko {remaining} próby!</p>
                )}
              </div>
            )}

            {/* Solved correctly */}
            {state.solved && comp.status === "active" && (
              <div className="ml-0 md:ml-14 rounded-xl md:rounded-2xl border border-dp-green/30 bg-dp-green/10 p-3 md:p-4">
                <p className="text-dp-green font-bold text-base md:text-lg">✅ Poprawne! +{state.points} pkt</p>
                <p className="text-lg md:text-xl mt-1">🎉🎊⭐</p>
              </div>
            )}

            {/* Failed all attempts */}
            {failedAll && comp.status === "active" && (
              <div className="ml-0 md:ml-14 space-y-2 md:space-y-3">
                <div className="rounded-xl md:rounded-2xl border border-destructive/30 bg-destructive/10 p-3 md:p-4">
                  <p className="text-destructive font-bold text-sm md:text-base">❌ Wykorzystałeś wszystkie próby</p>
                </div>
                <div className="rounded-xl md:rounded-2xl bg-muted p-3 md:p-4 border-l-4 border-muted-foreground">
                  <p className="text-[11px] md:text-xs text-muted-foreground mb-1">Poprawna odpowiedź:</p>
                  <p className="text-xs md:text-sm text-foreground font-medium">{task.solution}</p>
                </div>
              </div>
            )}

            {/* Finished competition */}
            {comp.status === "finished" && (
              <div className="ml-0 md:ml-14 space-y-2 md:space-y-3">
                {mySol && (
                  <div className={`rounded-xl md:rounded-2xl border p-3 ${
                    mySol.status === "correct" ? "border-dp-green/30 bg-dp-green/10" : "border-destructive/30 bg-destructive/10"
                  }`}>
                    <p className="text-[11px] md:text-xs text-muted-foreground mb-0.5">Twoja odpowiedź:</p>
                    <p className="text-sm font-bold text-foreground">{mySol.myAnswer}</p>
                    {mySol.status === "correct" && (
                      <p className="text-dp-green font-bold text-xs md:text-sm mt-1">✅ Poprawne! +{mySol.points} pkt</p>
                    )}
                    {mySol.status === "incorrect" && (
                      <p className="text-destructive font-bold text-xs md:text-sm mt-1">❌ Niepoprawne</p>
                    )}
                  </div>
                )}
                <button
                  onClick={() => toggleSolution(task.id)}
                  className="text-xs md:text-sm font-bold text-primary hover:underline btn-bounce"
                >
                  {state.showSolution ? "Ukryj rozwiązanie 🔼" : "👁️ Rozwiązanie"}
                </button>
                {state.showSolution && (
                  <div className="rounded-xl md:rounded-2xl bg-muted p-3 md:p-4 border-l-4 border-primary">
                    <p className="text-xs md:text-sm text-foreground font-medium">{task.solution}</p>
                  </div>
                )}
              </div>
            )}

            {/* Teacher comment */}
            {mySol?.teacherComment && (
              <div className="ml-0 md:ml-14 mt-3 rounded-xl md:rounded-2xl border-l-4 border-primary bg-primary/5 p-3 md:p-4">
                <p className="text-[11px] md:text-xs text-muted-foreground mb-1">👩‍🏫 Komentarz nauczyciela:</p>
                <p className="text-xs md:text-sm text-foreground">{mySol.teacherComment}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
