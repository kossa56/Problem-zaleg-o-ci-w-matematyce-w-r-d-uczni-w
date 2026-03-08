export type CompetitionStatus = "active" | "upcoming" | "finished";

export interface CompetitionTask {
  id: number;
  content: string;
  solution: string;
}

export interface QAItem {
  id: string;
  author: string;
  initial: string;
  color: string;
  timeAgo: string;
  question: string;
  answer?: { author: string; text: string };
}

export interface Announcement {
  id: string;
  icon: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface RankingEntry {
  position: number;
  name: string;
  initial: string;
  color: string;
  tasks: boolean[];
  points: number;
  maxPoints: number;
  badgeAwarded?: boolean;
}

export interface MySolution {
  taskNumber: number;
  taskContent: string;
  myAnswer: string;
  status: "pending" | "correct" | "incorrect";
  points?: number;
  correctAnswer?: string;
  teacherComment?: string;
}

export interface Competition {
  id: string;
  name: string;
  status: CompetitionStatus;
  date: string;
  time: string;
  location: string;
  organizer: string;
  organizerRole: "teacher" | "student";
  rewards: { emoji: string; label: string }[];
  tasks: CompetitionTask[];
  participants: number;
  description: string;
  duration: string;
  qa: QAItem[];
  announcements: Announcement[];
  ranking: RankingEntry[];
  mySolutions: MySolution[];
  myRankPosition?: number;
  myRankPoints?: number;
  myRankMaxPoints?: number;
}

export const competitions: Competition[] = [
  {
    id: "logarytmy-2026",
    name: "Mistrzostwa z Logarytmów 📈",
    status: "active",
    date: "8 marca 2026",
    time: "15:00",
    location: "Sala 12, SP nr 7, Gdańsk",
    organizer: "Pan Kowalski",
    organizerRole: "teacher",
    rewards: [
      { emoji: "🏅", label: "Król Logarytmów" },
      { emoji: "🍫", label: "Czekolada" },
      { emoji: "⭐", label: "500 XP" },
    ],
    tasks: [],
    participants: 24,
    description: "Wielkie mistrzostwa z logarytmów! Trzy zadania, 30 minut, nagrody dla każdego uczestnika. Przyjdź, rozwiąż i zgarnij odznakę Króla Logarytmów! 🎉",
    duration: "~30 minut",
    qa: [
      {
        id: "q1", author: "LisekCyferki", initial: "L", color: "bg-dp-amber",
        timeAgo: "3 godz. temu", question: "Czy można używać kalkulatora?",
        answer: { author: "Pan Kowalski", text: "Nie, wszystko w pamięci! Ale możesz używać kartki 📝" },
      },
      {
        id: "q2", author: "PandaLiczby", initial: "P", color: "bg-secondary",
        timeAgo: "5 godz. temu", question: "Ile czasu mamy na zadania?",
        answer: { author: "Pan Kowalski", text: "Około 30 minut na wszystkie zadania" },
      },
      {
        id: "q3", author: "KotkiAlgebry", initial: "K", color: "bg-dp-green",
        timeAgo: "wczoraj", question: "Jakie nagrody dostaniemy?",
        answer: { author: "Pan Kowalski", text: "Odznaka + czekolada dla każdego kto przyjdzie i zaprezentuje! 🍫🏅" },
      },
    ],
    announcements: [
      {
        id: "a1", icon: "📢", title: "Jutro konkurs! Przypomnienie 🔔",
        content: "Pamiętajcie — jutro 8 marca o 15:00, sala 12. Przynieście ołówki i dobry humor! 💪 Czekają nagrody!",
        date: "7 marca 2026", author: "Pan Kowalski",
      },
      {
        id: "a2", icon: "📢", title: "Zadania do ćwiczeń już dostępne! 🎮",
        content: "Wrzuciłem do sekcji Gier zadania podobne do jutrzejszych. Ćwiczcie dziś wieczór!",
        date: "6 marca 2026", author: "Pan Kowalski",
      },
      {
        id: "a3", icon: "📢", title: "Konkurs potwierdzony ✅",
        content: "Mamy już 24 zapisanych uczestników! Będzie świetna zabawa 🎉",
        date: "4 marca 2026", author: "Pan Kowalski",
      },
    ],
    ranking: [
      { position: 1, name: "ZajączekPro", initial: "Z", color: "bg-dp-green", tasks: [true, true, true], points: 95, maxPoints: 100 },
      { position: 2, name: "LisekCyferki", initial: "L", color: "bg-dp-amber", tasks: [true, true, true], points: 88, maxPoints: 100 },
      { position: 3, name: "KotkiAlgebry", initial: "K", color: "bg-teal-500", tasks: [true, true, false], points: 82, maxPoints: 100 },
      { position: 4, name: "PandaLiczby", initial: "P", color: "bg-secondary", tasks: [true, true, false], points: 79, maxPoints: 100 },
      { position: 5, name: "MedvědMatik", initial: "M", color: "bg-accent", tasks: [true, false, true], points: 71, maxPoints: 100 },
      { position: 6, name: "WilkGeometrii", initial: "W", color: "bg-destructive", tasks: [true, false, false], points: 65, maxPoints: 100 },
      { position: 7, name: "SówkaProcenty", initial: "S", color: "bg-blue-500", tasks: [false, true, true], points: 60, maxPoints: 100 },
      { position: 8, name: "TygrysMath", initial: "T", color: "bg-primary", tasks: [false, false, true], points: 45, maxPoints: 100 },
    ],
    mySolutions: [
      { taskNumber: 1, taskContent: "Oblicz: log₂(8) + log₂(4) = ?", myAnswer: "5", status: "correct", points: 32 },
      { taskNumber: 2, taskContent: "Dla jakiego x zachodzi: log₃(x) = 2?", myAnswer: "6", status: "incorrect", correctAnswer: "9", teacherComment: "Pamiętaj: log₃(x)=2 oznacza x=3² 💪 Prawie!" },
      { taskNumber: 3, taskContent: "Uprość: log(100) − log(10) = ?", myAnswer: "1", status: "correct", points: 33 },
    ],
    myRankPosition: 8,
    myRankPoints: 45,
    myRankMaxPoints: 100,
  },
  {
    id: "turniej-mnozenia",
    name: "Turniej Mnożenia ✖️",
    status: "upcoming",
    date: "13 marca 2026",
    time: "14:00",
    location: "Sala 8, SP nr 7, Gdańsk",
    organizer: "ZajączekPro",
    organizerRole: "student",
    rewards: [
      { emoji: "🏅", label: "Mistrz Mnożenia" },
      { emoji: "⭐", label: "XP x2 przez tydzień" },
    ],
    tasks: [
      { id: 1, content: "Oblicz: 12 × 15 = ?", solution: "180" },
      { id: 2, content: "Oblicz: 23 × 17 = ?", solution: "391" },
      { id: 3, content: "Oblicz: 8 × 125 = ?", solution: "1000" },
      { id: 4, content: "Oblicz: 99 × 11 = ?", solution: "1089" },
      { id: 5, content: "Oblicz: 37 × 27 = ?", solution: "999" },
    ],
    participants: 18,
    description: "Turniej mnożenia dla wszystkich! 5 zadań, kto najszybciej i najdokładniej — wygrywa. Organizuje ZajączekPro. Będą odznaki i podwójne XP! 🚀",
    duration: "~30 minut",
    qa: [],
    announcements: [],
    ranking: [],
    mySolutions: [],
  },
  {
    id: "geometria-march",
    name: "Konkurs Geometrii 📐",
    status: "finished",
    date: "1 marca 2026",
    time: "15:00",
    location: "Sala 12, SP nr 7, Gdańsk",
    organizer: "Pan Kowalski",
    organizerRole: "teacher",
    rewards: [
      { emoji: "🏅", label: "Król Geometrii" },
      { emoji: "🍫", label: "Czekolada" },
    ],
    tasks: [
      { id: 1, content: "Oblicz pole trójkąta o podstawie 6 cm i wysokości 4 cm.", solution: "P = ½ × 6 × 4 = 12 cm²" },
      { id: 2, content: "Oblicz obwód prostokąta o bokach 5 cm i 3 cm.", solution: "Ob = 2 × (5 + 3) = 16 cm" },
      { id: 3, content: "Ile stopni mają kąty trójkąta równobocznego?", solution: "Każdy kąt = 60°" },
      { id: 4, content: "Oblicz pole koła o promieniu 7 cm (π ≈ 3.14).", solution: "P = π × 7² ≈ 153.86 cm²" },
    ],
    participants: 31,
    description: "Konkurs geometrii zakończony! Świetne wyniki, gratulacje dla wszystkich uczestników. Zadania i rozwiązania dostępne poniżej.",
    duration: "~30 minut",
    qa: [],
    announcements: [],
    ranking: [
      { position: 1, name: "ZajączekPro", initial: "Z", color: "bg-dp-green", tasks: [true, true, true, true], points: 100, maxPoints: 100 },
      { position: 2, name: "LisekCyferki", initial: "L", color: "bg-dp-amber", tasks: [true, true, true, false], points: 85, maxPoints: 100 },
      { position: 3, name: "KotkiAlgebry", initial: "K", color: "bg-teal-500", tasks: [true, true, false, true], points: 78, maxPoints: 100 },
      { position: 4, name: "PandaLiczby", initial: "P", color: "bg-secondary", tasks: [true, false, true, true], points: 72, maxPoints: 100 },
      { position: 5, name: "MedvědMatik", initial: "M", color: "bg-accent", tasks: [true, true, false, false], points: 65, maxPoints: 100 },
    ],
    mySolutions: [],
    myRankPosition: 6,
    myRankPoints: 58,
    myRankMaxPoints: 100,
  },
];

export function getCompetition(id: string): Competition | undefined {
  return competitions.find((c) => c.id === id);
}
