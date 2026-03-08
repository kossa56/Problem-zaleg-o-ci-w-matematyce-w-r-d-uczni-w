import { useState } from "react";
import { BackToGames } from "@/components/gry/BackToGames";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useRole } from "@/contexts/RoleContext";
import { ExamTask, mockExamTasks } from "@/data/mathQuestions";

export default function EgzaminOsmoklasisty() {
  const { isTeacher } = useRole();
  const [tasks, setTasks] = useState<ExamTask[]>(mockExamTasks);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // teacher form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [solution, setSolution] = useState("");

  const addTask = () => {
    if (!title.trim() || !content.trim()) return;
    const newTask: ExamTask = {
      id: String(Date.now()),
      title: title.trim(),
      content: content.trim(),
      category: taskCategory.trim() || "Inne",
      correctAnswer: correctAnswer.trim(),
      solution: solution.trim(),
    };
    setTasks((t) => [...t, newTask]);
    setTitle(""); setContent(""); setTaskCategory(""); setCorrectAnswer(""); setSolution("");
  };

  return (
    <div className="py-6 md:py-10 max-w-3xl mx-auto space-y-6">
      <BackToGames />
      <h1 className="text-2xl font-bold text-foreground">📝 Egzamin ósmoklasisty</h1>

      {isTeacher && (
        <Card className="p-4 md:p-6 space-y-4 border-primary/30">
          <h2 className="text-lg font-semibold text-foreground">Dodaj nowe zadanie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input placeholder="Tytuł zadania" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="Dział (np. Geometria)" value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)} />
          </div>
          <Textarea placeholder="Treść zadania..." value={content} onChange={(e) => setContent(e.target.value)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input placeholder="Poprawna odpowiedź" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} />
          </div>
          <Textarea placeholder="Rozwiązanie (opcjonalnie)" value={solution} onChange={(e) => setSolution(e.target.value)} className="min-h-[60px]" />
          <Button onClick={addTask} disabled={!title.trim() || !content.trim()}>Dodaj zadanie</Button>
        </Card>
      )}

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Lista zadań ({tasks.length})</h2>
        {tasks.map((t) => (
          <Card
            key={t.id}
            className="p-4 cursor-pointer hover:border-primary/40 transition-colors"
            onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-medium text-foreground">{t.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 break-words">{t.content}</p>
              </div>
              <Badge variant="secondary" className="shrink-0">{t.category}</Badge>
            </div>
            {expandedId === t.id && (
              <div className="mt-4 pt-3 border-t border-border space-y-2 text-sm">
                <p><span className="font-medium text-foreground">Odpowiedź:</span> <span className="text-muted-foreground">{t.correctAnswer}</span></p>
                {t.solution && (
                  <p><span className="font-medium text-foreground">Rozwiązanie:</span> <span className="text-muted-foreground">{t.solution}</span></p>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
