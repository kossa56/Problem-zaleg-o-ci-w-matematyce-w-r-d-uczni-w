// ── Student Profile Data ──

export const studentProfile = {
  nickname: "TygrysMath",
  handle: "@tygrysmatch",
  level: 12,
  xp: 1280,
  xpNext: 1500,
  avatar: { initial: "T", color: "hsl(263 86% 76%)" },
  streak: 7,
  streakFreezes: 2,
  quickStats: [
    { emoji: "🔥", label: "7 dni" },
    { emoji: "⚡", label: "287 zadań" },
    { emoji: "🏆", label: "#8 miejsce" },
  ],
};

export const streakMilestones = [
  { day: 1, achieved: true },
  { day: 3, achieved: true },
  { day: 7, achieved: true, current: true },
  { day: 14, achieved: false },
  { day: 21, achieved: false },
  { day: 30, achieved: false },
  { day: 50, achieved: false },
  { day: 100, achieved: false },
];

// March 2026 activity (day -> intensity 0-3)
export const activityMap: Record<number, number> = {
  1: 2, 2: 3, 3: 1, 4: 0, 5: 2, 6: 3, 7: 3,
  8: 1, 9: 0, 10: 2, 11: 3, 12: 1, 13: 2, 14: 3,
  15: 0, 16: 1, 17: 2, 18: 3, 19: 1, 20: 2, 21: 3,
  22: 2, 23: 0, 24: 1, 25: 2, 26: 3, 27: 1, 28: 2,
};

export const activityTasks: Record<number, number> = {
  1: 5, 2: 12, 3: 3, 5: 8, 6: 15, 7: 14,
  8: 4, 10: 7, 11: 11, 12: 2, 13: 6, 14: 13,
  16: 3, 17: 9, 18: 12, 19: 4, 20: 8, 21: 10,
  22: 7, 24: 2, 25: 6, 26: 11, 27: 3, 28: 9,
};

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  earned: boolean;
  gradient: string;
  progress?: { current: number; total: number };
  teacherAwarded?: boolean;
  mystery?: boolean;
}

export const badges: Badge[] = [
  {
    id: "log-king",
    name: "Król Logarytmów",
    emoji: "🏆",
    description: "Rozwiązałeś 50 zadań z logarytmów",
    earned: true,
    gradient: "from-amber-500 to-yellow-400",
  },
  {
    id: "streak-guard",
    name: "Strażnik Passy",
    emoji: "🔥",
    description: "7 dni nauki z rzędu",
    earned: true,
    gradient: "from-orange-500 to-red-400",
  },
  {
    id: "lightning",
    name: "Błyskawica",
    emoji: "⚡",
    description: "Quick test ukończony w 60 sekund",
    earned: true,
    gradient: "from-indigo-500 to-blue-400",
  },
  {
    id: "algebra-master",
    name: "Mistrz Algebry",
    emoji: "🧠",
    description: "Przyznana przez nauczyciela",
    earned: true,
    gradient: "from-pink-500 to-rose-400",
    teacherAwarded: true,
  },
  {
    id: "mult-master",
    name: "Mistrz Mnożenia",
    emoji: "✖️",
    description: "Rozwiąż 30 zadań z mnożenia",
    earned: false,
    gradient: "",
    progress: { current: 18, total: 30 },
  },
  {
    id: "geo-king",
    name: "Król Geometrii",
    emoji: "📐",
    description: "Przyjdź na 3 konkursy z geometrii",
    earned: false,
    gradient: "",
    progress: { current: 1, total: 3 },
  },
  {
    id: "perfectionist",
    name: "Perfekcjonista",
    emoji: "💯",
    description: "Zdobądź 100% w 5 testach",
    earned: false,
    gradient: "",
    progress: { current: 3, total: 5 },
  },
  {
    id: "community",
    name: "Społeczność",
    emoji: "💬",
    description: "Odpowiedz na 10 pytań na forum",
    earned: false,
    gradient: "",
    progress: { current: 4, total: 10 },
  },
  {
    id: "mystery-1",
    name: "???",
    emoji: "❓",
    description: "Odkryj tę odznakę!",
    earned: false,
    gradient: "",
    mystery: true,
  },
  {
    id: "mystery-2",
    name: "???",
    emoji: "❓",
    description: "Odkryj tę odznakę!",
    earned: false,
    gradient: "",
    mystery: true,
  },
];

export const subjectStats = [
  { emoji: "➗", name: "Arytmetyka", points: 820, maxPoints: 1000 },
  { emoji: "📐", name: "Algebra", points: 610, maxPoints: 1000 },
  { emoji: "📏", name: "Geometria", points: 540, maxPoints: 1000 },
  { emoji: "🥧", name: "Ułamki", points: 880, maxPoints: 1000 },
  { emoji: "📈", name: "Funkcje", points: 430, maxPoints: 1000 },
];

export const historyItems = [
  { icon: "⚡", title: "Quick Test — Ułamki", score: "9/10", time: "2 godz. temu" },
  { icon: "🏆", title: "Konkurs Logarytmy 2026", score: "42 pkt", time: "wczoraj" },
  { icon: "🎮", title: "Swipe It — Procenty", score: "15 streak", time: "wczoraj" },
  { icon: "📊", title: "More or Less — Mnożenie", score: "12/15", time: "2 dni temu" },
  { icon: "⚡", title: "Quick Test — Algebra", score: "7/10", time: "3 dni temu" },
  { icon: "🎮", title: "Swipe It — Ułamki", score: "22 streak", time: "4 dni temu" },
  { icon: "📊", title: "More or Less — Geometria", score: "8/10", time: "5 dni temu" },
  { icon: "🏆", title: "Konkurs Geometria", score: "38 pkt", time: "tydzień temu" },
  { icon: "⚡", title: "Quick Test — Arytmetyka", score: "10/10", time: "tydzień temu" },
  { icon: "🎮", title: "Egzamin ósmoklasisty", score: "5 zadań", time: "2 tyg. temu" },
];

export const animalAvatars = [
  { emoji: "🐯", name: "Tygrys" },
  { emoji: "🐰", name: "Zajączek" },
  { emoji: "🦊", name: "Lis" },
  { emoji: "🐻", name: "Miś" },
  { emoji: "🐼", name: "Panda" },
  { emoji: "🐱", name: "Kot" },
  { emoji: "🦁", name: "Lew" },
  { emoji: "🦉", name: "Sowa" },
  { emoji: "🐸", name: "Żaba" },
  { emoji: "🐧", name: "Pingwin" },
];

// ── Teacher Profile Data ──

export const teacherProfile = {
  name: "Pan Kowalski",
  school: "SP nr 7, Gdańsk",
  avatar: { initial: "K", color: "hsl(160 84% 39%)" },
  kpiPills: [
    { emoji: "👥", label: "24 uczniów" },
    { emoji: "🏆", label: "3 konkursy" },
    { emoji: "📅", label: "aktywny od 6 mies." },
    { emoji: "⭐", label: "4.8 ocena" },
  ],
};

export const teacherKPI = [
  {
    title: "Aktywni uczniowie",
    value: 18,
    total: 24,
    subtitle: "aktywnych dziś",
    trend: "+3 vs wczoraj",
    trendUp: true,
    color: "dp-green",
    sparkline: [14, 15, 13, 16, 15, 17, 18],
  },
  {
    title: "Średnia klasy",
    value: 74,
    suffix: "%",
    subtitle: "średni wynik",
    trend: "+2% vs zeszły tydzień",
    trendUp: true,
    color: "dp-green",
    sparkline: [68, 70, 69, 72, 71, 73, 74],
  },
  {
    title: "Zadania oddane",
    value: 142,
    total: 180,
    subtitle: "zadań oddanych",
    trend: "79% completion",
    trendUp: false,
    color: "dp-amber",
    sparkline: [120, 125, 128, 132, 135, 139, 142],
  },
  {
    title: "Nadchodzący konkurs",
    value: 5,
    suffix: " dni",
    subtitle: "Turniej Mnożenia",
    trend: "18 zapisanych uczniów",
    trendUp: true,
    color: "primary",
    isCountdown: true,
  },
];

export const classProgressWeeks = [
  { week: "T1", avg: 62, best: 88, lowest: 35 },
  { week: "T2", avg: 65, best: 90, lowest: 38 },
  { week: "T3", avg: 63, best: 87, lowest: 32 },
  { week: "T4", avg: 68, best: 92, lowest: 40 },
  { week: "T5", avg: 70, best: 91, lowest: 42 },
  { week: "T6", avg: 72, best: 93, lowest: 45 },
  { week: "T7", avg: 71, best: 95, lowest: 41 },
  { week: "T8", avg: 74, best: 94, lowest: 44 },
];

export const scoreDistribution = [
  { name: "Świetnie (>80%)", value: 8, fill: "hsl(160 84% 39%)" },
  { name: "Dobrze (60-80%)", value: 11, fill: "hsl(263 86% 76%)" },
  { name: "Wymaga uwagi (40-60%)", value: 4, fill: "hsl(38 92% 50%)" },
  { name: "Pilna pomoc (<40%)", value: 1, fill: "hsl(0 91% 71%)" },
];

export const subjectScores = [
  { subject: "Arytmetyka", score: 78, weak: 2 },
  { subject: "Algebra", score: 65, weak: 5 },
  { subject: "Geometria", score: 58, weak: 7 },
  { subject: "Ułamki", score: 82, weak: 1 },
  { subject: "Funkcje", score: 51, weak: 9 },
  { subject: "Procenty", score: 71, weak: 4 },
];

export const weeklyActivity = [
  { day: "Pon", tests: 12, competitions: 3, games: 8 },
  { day: "Wt", tests: 15, competitions: 0, games: 11 },
  { day: "Śr", tests: 9, competitions: 5, games: 6 },
  { day: "Czw", tests: 18, competitions: 2, games: 14 },
  { day: "Pt", tests: 14, competitions: 0, games: 10 },
  { day: "Sob", tests: 6, competitions: 0, games: 4 },
  { day: "Ndz", tests: 3, competitions: 0, games: 2 },
];

export interface StudentRow {
  id: string;
  nickname: string;
  initial: string;
  color: string;
  streak: number;
  streakBroken: boolean;
  avgScore: number;
  tasksCompleted: number;
  tasksTotal: number;
  lastActive: string;
  daysInactive: number;
  weakSubjects?: string[];
}

export const students: StudentRow[] = [
  { id: "1", nickname: "TygrysMath", initial: "T", color: "hsl(263 86% 76%)", streak: 7, streakBroken: false, avgScore: 82, tasksCompleted: 45, tasksTotal: 50, lastActive: "2 godz. temu", daysInactive: 0 },
  { id: "2", nickname: "ZajączekPro", initial: "Z", color: "hsl(160 84% 39%)", streak: 12, streakBroken: false, avgScore: 91, tasksCompleted: 48, tasksTotal: 50, lastActive: "1 godz. temu", daysInactive: 0 },
  { id: "3", nickname: "LisMędrzec", initial: "L", color: "hsl(38 92% 50%)", streak: 3, streakBroken: false, avgScore: 74, tasksCompleted: 38, tasksTotal: 50, lastActive: "5 godz. temu", daysInactive: 0 },
  { id: "4", nickname: "MiśGeometria", initial: "M", color: "hsl(330 81% 60%)", streak: 0, streakBroken: true, avgScore: 65, tasksCompleted: 30, tasksTotal: 50, lastActive: "wczoraj", daysInactive: 1 },
  { id: "5", nickname: "PandaAlgebra", initial: "P", color: "hsl(239 84% 67%)", streak: 5, streakBroken: false, avgScore: 78, tasksCompleted: 42, tasksTotal: 50, lastActive: "3 godz. temu", daysInactive: 0 },
  { id: "6", nickname: "KotUłamek", initial: "K", color: "hsl(0 91% 71%)", streak: 0, streakBroken: true, avgScore: 45, tasksCompleted: 20, tasksTotal: 50, lastActive: "4 dni temu", daysInactive: 4, weakSubjects: ["Geometria", "Funkcje"] },
  { id: "7", nickname: "LewProcent", initial: "L", color: "hsl(263 86% 76%)", streak: 1, streakBroken: false, avgScore: 71, tasksCompleted: 35, tasksTotal: 50, lastActive: "wczoraj", daysInactive: 1 },
  { id: "8", nickname: "SowaLogika", initial: "S", color: "hsl(160 84% 39%)", streak: 14, streakBroken: false, avgScore: 88, tasksCompleted: 47, tasksTotal: 50, lastActive: "30 min temu", daysInactive: 0 },
  { id: "9", nickname: "ŻabaRówna", initial: "Ż", color: "hsl(38 92% 50%)", streak: 0, streakBroken: true, avgScore: 38, tasksCompleted: 15, tasksTotal: 50, lastActive: "5 dni temu", daysInactive: 5, weakSubjects: ["Algebra", "Funkcje", "Procenty"] },
  { id: "10", nickname: "PingwinMatma", initial: "P", color: "hsl(330 81% 60%)", streak: 2, streakBroken: false, avgScore: 59, tasksCompleted: 28, tasksTotal: 50, lastActive: "wczoraj", daysInactive: 1 },
  { id: "11", nickname: "OrzeczeMatma", initial: "O", color: "hsl(239 84% 67%)", streak: 0, streakBroken: true, avgScore: 52, tasksCompleted: 22, tasksTotal: 50, lastActive: "6 dni temu", daysInactive: 6, weakSubjects: ["Geometria", "Arytmetyka"] },
];

export const teacherCompetitions = [
  { name: "Logarytmy 2026", date: "1 mar 2026", participants: 24, status: "Aktywny" as const },
  { name: "Turniej Mnożenia", date: "13 mar 2026", participants: 18, status: "Nadchodzący" as const },
  { name: "Geometria March", date: "20 mar 2026", participants: 0, status: "Planowany" as const },
];

export const awardedBadges = [
  { student: "TygrysMath", badge: "🏆 Król Logarytmów", date: "2 mar 2026", competition: "Logarytmy 2026" },
  { student: "ZajączekPro", badge: "⚡ Błyskawica", date: "28 lut 2026", competition: "Quick Test" },
  { student: "SowaLogika", badge: "🧠 Mistrz Algebry", date: "25 lut 2026", competition: "Algebra Challenge" },
  { student: "PandaAlgebra", badge: "🔥 Strażnik Passy", date: "20 lut 2026", competition: "—" },
];
