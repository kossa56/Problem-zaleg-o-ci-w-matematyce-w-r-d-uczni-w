import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  studentProfile,
  streakMilestones,
  activityMap,
  activityTasks,
  badges as badgesData,
  subjectStats,
  historyItems,
  animalAvatars,
  type Badge as BadgeType,
} from "@/data/profileData";

// ── Animated counter hook ──
function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(start);
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);
  return val;
}

// ── Activity intensity color ──
function dotColor(intensity: number, isStreak: boolean) {
  if (isStreak) return "bg-amber-400";
  if (intensity === 0) return "bg-muted";
  if (intensity === 1) return "bg-primary/40";
  if (intensity === 2) return "bg-primary/70";
  return "bg-primary";
}

function barColor(pct: number) {
  if (pct >= 80) return "from-green-500 to-emerald-400";
  if (pct >= 60) return "from-primary to-secondary";
  return "from-amber-500 to-yellow-400";
}

// ════════════════════════════════════════
// STUDENT PROFILE COMPONENT
// ════════════════════════════════════════
export default function StudentProfile() {
  const [selectedAvatar, setSelectedAvatar] = useState(0); // 🐯
  const [xpAnimated, setXpAnimated] = useState(0);
  const streakCount = useCountUp(studentProfile.streak, 800);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const t = setTimeout(() => setXpAnimated((studentProfile.xp / studentProfile.xpNext) * 100), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8">
      {/* ── HERO ── */}
      <Card className="overflow-hidden border-border/50">
        <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
        <CardContent className="pt-8 pb-6 flex flex-col items-center text-center space-y-3">
          {/* Avatar */}
          <div className="relative group">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-primary"
              style={{
                background: studentProfile.avatar.color,
                boxShadow: "0 0 24px hsl(263 86% 76% / 0.45)",
              }}
            >
              {animalAvatars[selectedAvatar]?.emoji ?? "🐯"}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">{studentProfile.nickname}</h1>
            <p className="text-sm text-muted-foreground">{studentProfile.handle}</p>
          </div>

          <Badge className="bg-primary/20 text-primary border-primary/30 text-sm px-4 py-1">
            ⭐ Poziom {studentProfile.level}
          </Badge>

          {/* XP Bar */}
          <div className="w-full max-w-xs space-y-1">
            <div className="relative h-3 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                style={{ width: `${xpAnimated}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {studentProfile.xp.toLocaleString()} / {studentProfile.xpNext.toLocaleString()} XP do poziomu {studentProfile.level + 1}
            </p>
            <p className="text-xs text-primary font-medium">
              Jeszcze {(studentProfile.xpNext - studentProfile.xp).toLocaleString()} XP!
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex gap-3 flex-wrap justify-center pt-1">
            {studentProfile.quickStats.map((s) => (
              <span key={s.label} className="bg-muted px-3 py-1.5 rounded-full text-sm font-medium text-foreground">
                {s.emoji} {s.label}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── STREAK ── */}
      <Card className="border-border/50">
        <CardContent className="pt-6 pb-6 space-y-6">
          <h2 className="text-lg font-bold text-foreground">🔥 Twoja passa</h2>

          {/* Big number */}
          <div className="text-center">
            <span
              className="text-7xl sm:text-8xl font-extrabold bg-gradient-to-b from-amber-400 to-orange-500 bg-clip-text text-transparent leading-none"
            >
              {streakCount}
            </span>
            <p className="text-lg text-foreground mt-1">dni z rzędu!</p>
          </div>

          {/* Milestone bar */}
          <div className="relative flex items-center justify-between px-2">
            {/* Connecting line */}
            <div className="absolute inset-x-4 top-1/2 h-0.5 bg-muted -translate-y-1/2 z-0" />
            {streakMilestones.map((m) => (
              <Tooltip key={m.day}>
                <TooltipTrigger asChild>
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all ${
                        m.current
                          ? "bg-orange-400 border-orange-400 animate-pulse shadow-[0_0_8px_hsl(38_92%_50%/0.6)]"
                          : m.achieved
                            ? "bg-amber-400 border-amber-400"
                            : "bg-muted border-muted-foreground/30"
                      }`}
                    />
                    <span className="text-[10px] text-muted-foreground">{m.day}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{m.day} dni</TooltipContent>
              </Tooltip>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Do 14 dni: jeszcze 7 więcej!
          </p>

          {/* Activity calendar */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Aktywność w tym miesiącu</h3>
            <div className="grid grid-cols-7 gap-1.5">
              {["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"].map((d) => (
                <span key={d} className="text-[10px] text-muted-foreground text-center">{d}</span>
              ))}
              {/* March 2026 starts on Sunday → 6 empty cells (Mon-Sat) */}
              {Array.from({ length: 6 }, (_, i) => (
                <div key={`e${i}`} />
              ))}
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const intensity = activityMap[day] ?? 0;
                const tasks = activityTasks[day] ?? 0;
                const isToday = day === 8;
                const isStreak = intensity === 3;
                return (
                  <Tooltip key={day}>
                    <TooltipTrigger asChild>
                      <div
                        className={`w-full aspect-square rounded-sm ${dotColor(intensity, isStreak)} transition-colors ${
                          isToday ? "ring-2 ring-primary ring-offset-1 ring-offset-background animate-pulse" : ""
                        }`}
                        style={{ animationDelay: `${i * 30}ms` }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      {day} mar: {tasks > 0 ? `${tasks} zadań ⚡` : "brak aktywności"}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>

          {/* Streak freeze */}
          <p className="text-sm text-muted-foreground text-center">
            🛡️ Masz {studentProfile.streakFreezes} zamrożenia passy
          </p>
        </CardContent>
      </Card>

      {/* ── BADGES ── */}
      <Card className="border-border/50">
        <CardContent className="pt-6 pb-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">🏅 Twoje odznaki</h2>
            <p className="text-sm text-muted-foreground">Zbieraj odznaki i pokazuj światu!</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {badgesData.map((b, i) => (
              <BadgeCard key={b.id} badge={b} index={i} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── STATS ── */}
      <Card className="border-border/50">
        <CardContent className="pt-6 pb-6 space-y-4">
          <h2 className="text-lg font-bold text-foreground">📊 Twoje statystyki</h2>

          <div className="space-y-3">
            {subjectStats.map((s) => (
              <SubjectBar key={s.name} {...s} />
            ))}
          </div>

          {subjectStats.filter((s) => s.points / s.maxPoints < 0.6).map((s) => (
            <div key={s.name} className="bg-muted/50 rounded-2xl p-3 flex items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">
                💪 <strong className="text-foreground">{s.name}</strong> wymaga uwagi — zagraj w gry!
              </p>
              <Button size="sm" variant="ghost" className="text-primary shrink-0" asChild>
                <Link to="/gry">Przejdź do Gier →</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── TABS: Historia / Ustawienia ── */}
      <Tabs defaultValue="history">
        <TabsList className="w-full bg-muted/50">
          <TabsTrigger value="history" className="flex-1">📜 Historia</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">⚙️ Ustawienia</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card className="border-border/50">
            <CardContent className="pt-4 pb-4 divide-y divide-border">
              {historyItems.map((h, i) => (
                <div key={i} className="flex items-center gap-3 py-3">
                  <span className="text-xl">{h.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{h.title}</p>
                    <p className="text-xs text-muted-foreground">{h.time}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">{h.score}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="border-border/50">
            <CardContent className="pt-6 pb-6 space-y-6">
              {/* Avatar selector */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Wybierz awatar</h3>
                <div className="grid grid-cols-5 gap-2">
                  {animalAvatars.map((a, i) => (
                    <button
                      key={a.name}
                      onClick={() => setSelectedAvatar(i)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
                        selectedAvatar === i
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {a.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nickname */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Zmień pseudonim</h3>
                <Input defaultValue={studentProfile.nickname} className="max-w-xs" />
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Powiadomienia</h3>
                {["Przypomnienia o passie", "Nowe konkursy", "Wyniki zadań"].map((label) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{label}</span>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>

              <Button variant="destructive" className="w-full">🚪 Wyloguj się</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ── Badge Card ──
function BadgeCard({ badge: b, index }: { badge: BadgeType; index: number }) {
  const [hovered, setHovered] = useState(false);

  if (b.earned) {
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative rounded-2xl p-4 flex flex-col items-center text-center gap-2 overflow-hidden cursor-default"
        style={{
          animationDelay: `${index * 100}ms`,
          animationFillMode: "both",
        }}
      >
        {/* gradient bg */}
        <div className={`absolute inset-0 bg-gradient-to-br ${b.gradient} opacity-20`} />
        {/* shine sweep */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700"
          style={{ transform: hovered ? "translateX(100%)" : "translateX(-100%)" }}
        />
        <div className="relative z-10">
          <span className="text-4xl">{b.emoji}</span>
          <p className="text-sm font-bold text-foreground mt-1">{b.name}</p>
          <p className="text-[11px] text-muted-foreground">{b.description}</p>
          <span className="inline-block mt-1 text-[10px] text-green-400 font-semibold">✓ Zdobyta!</span>
          {b.teacherAwarded && (
            <span className="block text-[10px] text-muted-foreground">👩‍🏫 od nauczyciela</span>
          )}
        </div>
      </div>
    );
  }

  // Locked badge
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`rounded-2xl border-2 border-dashed border-muted-foreground/20 p-4 flex flex-col items-center text-center gap-2 cursor-default transition-transform ${
            hovered && !b.mystery ? "animate-[shake_0.3s_ease-in-out]" : ""
          }`}
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
        >
          <span className="text-3xl opacity-40">{b.mystery ? "🔒" : b.emoji}</span>
          <p className="text-sm font-medium text-muted-foreground">{b.name}</p>
          <p className="text-[11px] text-muted-foreground/70">{b.description}</p>
          {b.progress && (
            <div className="w-full space-y-0.5">
              <Progress value={(b.progress.current / b.progress.total) * 100} className="h-1.5" />
              <p className="text-[10px] text-muted-foreground">{b.progress.current}/{b.progress.total}</p>
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {b.mystery
          ? "Tajemnicza odznaka — odkryj ją!"
          : b.progress
            ? `Jeszcze ${b.progress.total - b.progress.current} do zdobycia!`
            : b.description}
      </TooltipContent>
    </Tooltip>
  );
}

// ── Subject progress bar ──
function SubjectBar({ emoji, name, points, maxPoints }: { emoji: string; name: string; points: number; maxPoints: number }) {
  const pct = Math.round((points / maxPoints) * 100);
  const [animatedPct, setAnimatedPct] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimatedPct(pct), 200);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-lg w-7 text-center">{emoji}</span>
      <span className="text-sm font-medium text-foreground w-24 truncate">{name}</span>
      <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barColor(pct)} transition-all duration-700 ease-out`}
          style={{ width: `${animatedPct}%` }}
        />
      </div>
      <span className="text-sm font-bold text-primary w-20 text-right">{points} pkt</span>
    </div>
  );
}
