import { GraduationCap, Home, Gamepad2, Trophy, User, PersonStanding } from "lucide-react";
import { Link } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";

const allNavItems = [
  { label: "Strona główna", icon: Home, emoji: "🏠", path: "/" },
  { label: "Gry", icon: Gamepad2, emoji: "🎮", path: "/gry" },
  { label: "Konkursy", icon: Trophy, emoji: "🏆", path: "/konkursy" },
  { label: "Profil", icon: User, emoji: "👤", path: "/profil" },
  { label: "Aktywna przerwa", icon: PersonStanding, emoji: "🏃", path: "/aktywna-przerwa", teacherOnly: true },
];

export function DesktopSidebar({ currentPath }: { currentPath: string }) {
  const { isTeacher } = useRole();
  const navItems = allNavItems.filter(item => !item.teacherOnly || isTeacher);
  return (
    <aside className="hidden lg:flex flex-col w-[260px] h-screen sticky top-0 bg-[hsl(var(--sidebar-background))] border-r border-border">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <GraduationCap className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold text-primary">DonPedros</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const active = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all btn-bounce ${
                active
                  ? "bg-primary/15 text-primary border-l-4 border-primary shadow-[inset_0_0_20px_hsl(var(--primary)/0.1)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <span className="text-lg">{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Streak badge */}
      <div className="p-4">
        <div className="bg-card rounded-2xl p-4 border border-border">
          <p className="text-dp-amber font-bold text-sm">🔥 3 dni z rzędu!</p>
          <p className="text-muted-foreground text-xs mt-1">Tak trzymaj!</p>
        </div>
      </div>
    </aside>
  );
}
