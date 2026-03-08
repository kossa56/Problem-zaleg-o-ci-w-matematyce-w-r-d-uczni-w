export type Category = "tabliczka-mnozenia" | "ulamki" | "procenty" | "pojecia";
export type Difficulty = "prosty" | "sredni" | "trudny" | "ekspert";

export const categoryLabels: Record<Category, string> = {
  "tabliczka-mnozenia": "Tabliczka mnożenia",
  ulamki: "Ułamki",
  procenty: "Procenty",
  pojecia: "Podstawowe pojęcia i język matematyczny",
};

export const difficultyLabels: Record<Difficulty, string> = {
  prosty: "Prosty",
  sredni: "Średniozaawansowany",
  trudny: "Trudny",
  ekspert: "Ekspert",
};

export interface Question {
  question: string;
  answers: string[];
  correct: number;
}

export interface CompareQuestion {
  left: string;
  right: string;
  answer: "<" | "=" | ">";
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function genMultiplication(d: Difficulty): Question {
  const ranges: Record<Difficulty, [number, number]> = {
    prosty: [2, 5],
    sredni: [3, 10],
    trudny: [6, 15],
    ekspert: [10, 25],
  };
  const [lo, hi] = ranges[d];
  const a = rand(lo, hi), b = rand(lo, hi);
  const correct = a * b;
  const wrongs = new Set<number>();
  while (wrongs.size < 3) {
    const w = correct + rand(-10, 10);
    if (w !== correct && w > 0) wrongs.add(w);
  }
  const answers = shuffle([correct, ...wrongs]);
  return { question: `${a} × ${b} = ?`, answers: answers.map(String), correct: answers.indexOf(correct) };
}

function genFractions(d: Difficulty): Question {
  const maxDen: Record<Difficulty, number> = { prosty: 4, sredni: 8, trudny: 12, ekspert: 20 };
  const den = rand(2, maxDen[d]);
  const num1 = rand(1, den - 1);
  const num2 = rand(1, den - 1);
  const sum = num1 + num2;
  const qStr = `${num1}/${den} + ${num2}/${den} = ?`;
  const correctStr = sum % den === 0 ? `${sum / den}` : `${sum}/${den}`;
  const wrongs = new Set<string>();
  while (wrongs.size < 3) {
    const w = sum + rand(-3, 3);
    const ws = w % den === 0 ? `${w / den}` : `${w}/${den}`;
    if (ws !== correctStr && w > 0) wrongs.add(ws);
  }
  const answers = shuffle([correctStr, ...wrongs]);
  return { question: qStr, answers, correct: answers.indexOf(correctStr) };
}

function genPercents(d: Difficulty): Question {
  const bases: Record<Difficulty, number[]> = {
    prosty: [10, 20, 50, 100],
    sredni: [25, 40, 60, 80, 200],
    trudny: [75, 120, 150, 250],
    ekspert: [130, 175, 240, 360],
  };
  const percs: Record<Difficulty, number[]> = {
    prosty: [10, 25, 50],
    sredni: [15, 20, 30, 75],
    trudny: [12, 33, 45, 60],
    ekspert: [17, 23, 37, 68],
  };
  const base = bases[d][rand(0, bases[d].length - 1)];
  const perc = percs[d][rand(0, percs[d].length - 1)];
  const correct = (perc / 100) * base;
  const correctStr = Number.isInteger(correct) ? String(correct) : correct.toFixed(1);
  const wrongs = new Set<string>();
  while (wrongs.size < 3) {
    const w = correct + rand(-10, 10);
    const ws = Number.isInteger(w) ? String(w) : w.toFixed(1);
    if (ws !== correctStr && w > 0) wrongs.add(ws);
  }
  const answers = shuffle([correctStr, ...wrongs]);
  return { question: `${perc}% z ${base} = ?`, answers, correct: answers.indexOf(correctStr) };
}

function genConcepts(d: Difficulty): Question {
  const pool: Question[] = [
    { question: "Jak nazywamy wynik dodawania?", answers: ["Suma", "Różnica", "Iloczyn", "Iloraz"], correct: 0 },
    { question: "Jak nazywamy wynik mnożenia?", answers: ["Iloczyn", "Suma", "Różnica", "Iloraz"], correct: 0 },
    { question: "Jak nazywamy wynik odejmowania?", answers: ["Różnica", "Suma", "Iloczyn", "Iloraz"], correct: 0 },
    { question: "Jak nazywamy wynik dzielenia?", answers: ["Iloraz", "Iloczyn", "Suma", "Różnica"], correct: 0 },
    { question: "Co to jest liczba pierwsza?", answers: ["Dzieli się tylko przez 1 i siebie", "Jest parzysta", "Jest większa od 10", "Ma 3 dzielniki"], correct: 0 },
    { question: "Ile wynosi 2⁰?", answers: ["1", "0", "2", "Nie istnieje"], correct: 0 },
    { question: "Co to jest mianownik?", answers: ["Dolna część ułamka", "Górna część ułamka", "Wynik dzielenia", "Znak ułamka"], correct: 0 },
    { question: "Co to jest NWW?", answers: ["Najmniejsza wspólna wielokrotność", "Największy wspólny wielokrotnik", "Najmniejszy wspólny wielokrotnik", "Największa wspólna wielokrotność"], correct: 0 },
  ];
  const q = pool[rand(0, pool.length - 1)];
  const answers = shuffle(q.answers);
  return { ...q, answers, correct: answers.indexOf(q.answers[q.correct]) };
}

export function generateQuestion(cat: Category, diff: Difficulty): Question {
  switch (cat) {
    case "tabliczka-mnozenia": return genMultiplication(diff);
    case "ulamki": return genFractions(diff);
    case "procenty": return genPercents(diff);
    case "pojecia": return genConcepts(diff);
  }
}

function compareAnswer(a: number, b: number): "<" | "=" | ">" {
  return a < b ? "<" : a > b ? ">" : "=";
}

function genCompareMultiplication(diff: Difficulty): CompareQuestion {
  const ranges: Record<Difficulty, [number, number]> = {
    prosty: [2, 5], sredni: [3, 10], trudny: [6, 15], ekspert: [10, 25],
  };
  const [lo, hi] = ranges[diff];
  const a1 = rand(lo, hi), b1 = rand(lo, hi);
  const a2 = rand(lo, hi), b2 = rand(lo, hi);
  return { left: `${a1} × ${b1}`, right: `${a2} × ${b2}`, answer: compareAnswer(a1 * b1, a2 * b2) };
}

function genCompareFractions(diff: Difficulty): CompareQuestion {
  const maxDen: Record<Difficulty, number> = { prosty: 4, sredni: 8, trudny: 12, ekspert: 20 };
  const den = rand(2, maxDen[diff]);
  const num1 = rand(1, den * 2);
  const num2 = rand(1, den * 2);
  const den2 = rand(2, maxDen[diff]);
  const val1 = num1 / den;
  const val2 = num2 / den2;
  return { left: `${num1}/${den}`, right: `${num2}/${den2}`, answer: compareAnswer(val1, val2) };
}

function genComparePercents(diff: Difficulty): CompareQuestion {
  const bases: Record<Difficulty, number[]> = {
    prosty: [10, 20, 50, 100], sredni: [25, 40, 60, 200],
    trudny: [75, 120, 150, 250], ekspert: [130, 175, 240, 360],
  };
  const percs: Record<Difficulty, number[]> = {
    prosty: [10, 25, 50], sredni: [15, 20, 30, 75],
    trudny: [12, 33, 45, 60], ekspert: [17, 23, 37, 68],
  };
  const b1 = bases[diff][rand(0, bases[diff].length - 1)];
  const p1 = percs[diff][rand(0, percs[diff].length - 1)];
  const b2 = bases[diff][rand(0, bases[diff].length - 1)];
  const p2 = percs[diff][rand(0, percs[diff].length - 1)];
  const v1 = (p1 / 100) * b1;
  const v2 = (p2 / 100) * b2;
  return { left: `${p1}% z ${b1}`, right: `${p2}% z ${b2}`, answer: compareAnswer(v1, v2) };
}

function genCompareBasicNumbers(diff: Difficulty): CompareQuestion {
  const ranges: Record<Difficulty, [number, number]> = {
    prosty: [1, 20], sredni: [10, 100], trudny: [50, 500], ekspert: [100, 1000],
  };
  const [lo, hi] = ranges[diff];
  const a = rand(lo, hi), b = rand(lo, hi);
  return { left: String(a), right: String(b), answer: compareAnswer(a, b) };
}

export function generateCompareNumbers(cat: Category, diff: Difficulty): CompareQuestion {
  switch (cat) {
    case "tabliczka-mnozenia": return genCompareMultiplication(diff);
    case "ulamki": return genCompareFractions(diff);
    case "procenty": return genComparePercents(diff);
    case "pojecia": return genCompareBasicNumbers(diff);
  }
}

export function generateCompareEquations(cat: Category, diff: Difficulty): CompareQuestion {
  switch (cat) {
    case "tabliczka-mnozenia": return genCompareMultiplication(diff);
    case "ulamki": return genCompareFractions(diff);
    case "procenty": return genComparePercents(diff);
    case "pojecia": {
      const ops = ["+", "-", "×"];
      const ranges: Record<Difficulty, [number, number]> = {
        prosty: [1, 10], sredni: [5, 25], trudny: [10, 50], ekspert: [20, 100],
      };
      const [lo, hi] = ranges[diff];
      function makeExpr(): [string, number] {
        const a = rand(lo, hi), b = rand(lo, hi);
        const op = ops[rand(0, ops.length - 1)];
        let val: number;
        switch (op) {
          case "+": val = a + b; break;
          case "-": val = a - b; break;
          case "×": val = a * b; break;
          default: val = a + b;
        }
        return [`${a} ${op} ${b}`, val];
      }
      const [exprL, valL] = makeExpr();
      const [exprR, valR] = makeExpr();
      return { left: exprL, right: exprR, answer: compareAnswer(valL, valR) };
    }
  }
}

export interface ExamTask {
  id: string;
  title: string;
  content: string;
  category: string;
  correctAnswer: string;
  solution: string;
}

export const mockExamTasks: ExamTask[] = [
  {
    id: "1",
    title: "Oblicz pole prostokąta",
    content: "Prostokąt ma boki długości 7 cm i 12 cm. Oblicz jego pole.",
    category: "Geometria",
    correctAnswer: "84 cm²",
    solution: "P = a × b = 7 × 12 = 84 cm²",
  },
  {
    id: "2",
    title: "Równanie z jedną niewiadomą",
    content: "Rozwiąż równanie: 3x + 7 = 22",
    category: "Algebra",
    correctAnswer: "x = 5",
    solution: "3x + 7 = 22 → 3x = 15 → x = 5",
  },
  {
    id: "3",
    title: "Procenty w życiu",
    content: "Buty kosztowały 200 zł. Po obniżce o 25% ile zapłacimy?",
    category: "Procenty",
    correctAnswer: "150 zł",
    solution: "25% z 200 = 50 zł. 200 - 50 = 150 zł",
  },
];
