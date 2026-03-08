import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, Cell,
  BarChart, Bar, Legend,
  ResponsiveContainer, Tooltip as ReTooltip,
} from "recharts";
import {
  teacherProfile, teacherKPI,
  classProgressWeeks, scoreDistribution, subjectScores, weeklyActivity,
  students, teacherCompetitions, awardedBadges,
  type StudentRow,
} from "@/data/profileData";
import { Search, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

function useCountUp(target: number, duration = 1000) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(id); }
      else setVal(cur);
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);
  return val;
}

export default function TeacherProfile() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "weak">("all");
  const [sortCol, setSortCol] = useState<keyof StudentRow>("avgScore");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const weakStudents = students.filter((s) => s.weakSubjects && s.weakSubjects.length > 0);

  const filtered = students
    .filter((s) => {
      if (search && !s.nickname.toLowerCase().includes(search.toLowerCase())) return false;
      if (filter === "active") return s.daysInactive === 0;
      if (filter === "inactive") return s.daysInactive >= 3;
      if (filter === "weak") return s.avgScore < 50;
      return true;
    })
    .sort((a, b) => {
      const av = a[sortCol] as number;
      const bv = b[sortCol] as number;
      return sortDir === "asc" ? av - bv : bv - av;
    });

  const handleSort = (col: keyof StudentRow) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortCol(col); setSortDir("desc"); }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* ── HERO ── */}
      <Card className="border-border/50">
        <CardContent className="pt-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-primary shrink-0"
                style={{ background: teacherProfile.avatar.color }}
              >
                {teacherProfile.avatar.initial}
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{teacherProfile.name}</h1>
                <p className="text-sm text-muted-foreground">Nauczyciel 👩‍🏫 • {teacherProfile.school}</p>
              </div>
            </div>
            {/* KPI pills */}
            <div className="flex flex-wrap gap-2 md:ml-auto">
              {teacherProfile.kpiPills.map((k) => (
                <span key={k.label} className="bg-muted px-3 py-1.5 rounded-full text-sm font-medium text-foreground">
                  {k.emoji} {k.label}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── KPI CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {teacherKPI.map((k) => (
          <KPICard key={k.title} {...k} />
        ))}
      </div>

      {/* ── CHARTS ── */}
      <Card className="border-border/50">
        <CardContent className="pt-6 pb-6 space-y-8">
          <h2 className="text-lg font-bold text-foreground">📊 Analityka klasy</h2>

          {/* Row 1: Line + Pie */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line chart */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Postępy klasy w czasie</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={classProgressWeeks}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 17%)" />
                  <XAxis dataKey="week" tick={{ fill: "hsl(215 25% 65%)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(215 25% 65%)", fontSize: 12 }} domain={[0, 100]} />
                  <ReTooltip
                    contentStyle={{ background: "hsl(222 47% 9%)", border: "1px solid hsl(217 33% 17%)", borderRadius: 12 }}
                    labelStyle={{ color: "hsl(210 40% 98%)" }}
                  />
                  <Line type="monotone" dataKey="best" stroke="hsl(160 84% 39%)" strokeWidth={2} dot={{ r: 3 }} name="Najlepszy" />
                  <Line type="monotone" dataKey="avg" stroke="hsl(263 86% 76%)" strokeWidth={2} dot={{ r: 3 }} name="Średnia" />
                  <Line type="monotone" dataKey="lowest" stroke="hsl(38 92% 50%)" strokeWidth={2} dot={{ r: 3 }} name="Najsłabszy" />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie chart */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Rozkład wyników</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={scoreDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    dataKey="value"
                    stroke="none"
                  >
                    {scoreDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ReTooltip
                    contentStyle={{ background: "hsl(222 47% 9%)", border: "1px solid hsl(217 33% 17%)", borderRadius: 12 }}
                  />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="hsl(210 40% 98%)" fontSize={16} fontWeight={700}>
                    24
                  </text>
                  <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" fill="hsl(215 25% 65%)" fontSize={10}>
                    uczniów
                  </text>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 justify-center">
                {scoreDistribution.map((d) => (
                  <span key={d.name} className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.fill }} />
                    {d.name}: {d.value}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Subject bar chart */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Wyniki per dział matematyki</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={subjectScores}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 17%)" />
                <XAxis dataKey="subject" tick={{ fill: "hsl(215 25% 65%)", fontSize: 11 }} />
                <YAxis tick={{ fill: "hsl(215 25% 65%)", fontSize: 12 }} domain={[0, 100]} />
                <ReTooltip
                  contentStyle={{ background: "hsl(222 47% 9%)", border: "1px solid hsl(217 33% 17%)", borderRadius: 12 }}
                  formatter={(value: number, _name: string, props: any) =>
                    [`${value}% • ${props.payload.weak} uczniów poniżej 50%`, "Wynik"]
                  }
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {subjectScores.map((s) => (
                    <Cell
                      key={s.subject}
                      fill={s.score >= 80 ? "hsl(160 84% 39%)" : s.score >= 60 ? "hsl(263 86% 76%)" : "hsl(38 92% 50%)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Row 3: Stacked weekly */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Aktywność tygodniowa uczniów</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 17%)" />
                <XAxis dataKey="day" tick={{ fill: "hsl(215 25% 65%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(215 25% 65%)", fontSize: 12 }} />
                <ReTooltip
                  contentStyle={{ background: "hsl(222 47% 9%)", border: "1px solid hsl(217 33% 17%)", borderRadius: 12 }}
                />
                <Bar dataKey="tests" stackId="a" fill="hsl(239 84% 67%)" radius={[0, 0, 0, 0]} name="Quick testy" />
                <Bar dataKey="competitions" stackId="a" fill="hsl(330 81% 60%)" name="Konkursy" />
                <Bar dataKey="games" stackId="a" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} name="Gry" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ── WEAK STUDENTS ALERT ── */}
      {weakStudents.length > 0 && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="pt-4 pb-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                ⚠️ {weakStudents.length} uczniów wymaga uwagi:
              </p>
              {weakStudents.map((s) => (
                <p key={s.id} className="text-sm text-muted-foreground">
                  {s.nickname} — słabe: {s.weakSubjects!.join(", ")}
                </p>
              ))}
              <p className="text-xs text-primary mt-1 cursor-pointer hover:underline">
                Przyznaj im zadania dodatkowe →
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── STUDENTS TABLE ── */}
      <Card className="border-border/50">
        <CardContent className="pt-6 pb-4 space-y-4">
          <h2 className="text-lg font-bold text-foreground">👥 Moi uczniowie</h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Szukaj ucznia..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {(["all", "active", "inactive", "weak"] as const).map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? "default" : "outline"}
                  onClick={() => setFilter(f)}
                  className="text-xs"
                >
                  {{ all: "Wszyscy", active: "Aktywni", inactive: "Nieaktywni", weak: "Słabi" }[f]}
                </Button>
              ))}
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Uczeń</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("streak")}>Streak</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("avgScore")}>Wynik śr.</TableHead>
                  <TableHead>Zadania</TableHead>
                  
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.id} className={s.daysInactive >= 3 ? "bg-destructive/5" : ""}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: s.color }}>
                          {s.initial}
                        </div>
                        <span className="font-medium text-foreground">{s.nickname}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {s.streakBroken ? <span className="text-amber-400">⚠️ 0</span> : <span>🔥 {s.streak}</span>}
                    </TableCell>
                    <TableCell>
                      <span className={s.avgScore >= 80 ? "text-green-400" : s.avgScore >= 60 ? "text-foreground" : s.avgScore >= 40 ? "text-amber-400" : "text-destructive"}>
                        {s.avgScore}%
                      </span>
                    </TableCell>
                    <TableCell>{s.tasksCompleted}/{s.tasksTotal}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" className="text-xs text-primary">
                        Zobacz profil →
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-2">
            {filtered.map((s) => (
              <div
                key={s.id}
                className={`rounded-2xl border p-3 flex items-center gap-3 ${
                  s.daysInactive >= 3 ? "border-destructive/30 bg-destructive/5" : "border-border/50"
                }`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: s.color }}>
                  {s.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{s.nickname}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.streakBroken ? "⚠️" : `🔥${s.streak}`} • {s.avgScore}%
                  </p>
                </div>
                <Button size="sm" variant="ghost" className="text-xs text-primary shrink-0">→</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── COMPETITIONS ── */}
      <Card className="border-border/50">
        <CardContent className="pt-6 pb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">🏆 Moje konkursy</h2>
            <Button size="sm" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
              + Utwórz nowy konkurs
            </Button>
          </div>
          <div className="divide-y divide-border">
            {teacherCompetitions.map((c) => (
              <div key={c.name} className="flex items-center justify-between py-3 gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.date} • {c.participants} uczestników</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={c.status === "Aktywny" ? "default" : "secondary"} className="text-xs">
                    {c.status}
                  </Badge>
                  <Button size="sm" variant="ghost" className="text-xs text-primary">Zarządzaj →</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── BADGES AWARDED ── */}
      <Card className="border-border/50">
        <CardContent className="pt-6 pb-6 space-y-3">
          <h2 className="text-lg font-bold text-foreground">🏅 Przyznane odznaki</h2>
          <p className="text-sm text-muted-foreground">Odznaki które przyznałeś uczniom</p>
          <div className="divide-y divide-border">
            {awardedBadges.map((a, i) => (
              <div key={i} className="flex items-center gap-3 py-3">
                <span className="text-xl">{a.badge.split(" ")[0]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <strong>{a.student}</strong> otrzymał {a.badge}
                  </p>
                  <p className="text-xs text-muted-foreground">{a.date} • {a.competition}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── SHARED SETTINGS ── */}
      <Card className="border-border/50">
        <CardContent className="pt-6 pb-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">⚙️ Ustawienia</h3>
          <div className="space-y-3">
            {[
              { icon: "🔔", label: "Powiadomienia" },
              { icon: "🌙", label: "Motyw ciemny", disabled: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.icon} {item.label}</span>
                <Switch defaultChecked disabled={item.disabled} />
              </div>
            ))}
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">🔒 Zmień hasło</span>
              <Button size="sm" variant="ghost" className="text-xs text-primary">Zmień →</Button>
            </div>
          </div>
          <Button variant="destructive" className="w-full mt-2">🚪 Wyloguj się</Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ── KPI Card ──
function KPICard(props: (typeof teacherKPI)[number]) {
  const animVal = useCountUp(props.value, 900);

  return (
    <Card className="border-border/50">
      <CardContent className="pt-4 pb-4 space-y-1">
        <p className="text-xs text-muted-foreground font-medium">{props.title}</p>
        <p className="text-2xl font-bold text-foreground">
          {props.isCountdown && "Za "}
          {animVal}
          {props.total ? `/${props.total}` : ""}
          {props.suffix ?? ""}
          {props.isCountdown && " 🏆"}
        </p>
        <p className="text-xs text-muted-foreground">{props.subtitle}</p>
        <div className="flex items-center gap-1">
          {props.trendUp ? (
            <TrendingUp className="w-3 h-3 text-green-400" />
          ) : (
            <TrendingDown className="w-3 h-3 text-amber-400" />
          )}
          <span className={`text-[11px] ${props.trendUp ? "text-green-400" : "text-amber-400"}`}>
            {props.trend}
          </span>
        </div>
        {props.sparkline && (
          <div className="flex items-end gap-0.5 h-6 pt-1">
            {props.sparkline.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-primary/40"
                style={{ height: `${(v / Math.max(...props.sparkline!)) * 100}%` }}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
