import { Link } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";

const allNavItems = [
  { label: "Główna", emoji: "🏠", path: "/" },
  { label: "Gry", emoji: "🎮", path: "/gry" },
  { label: "Konkursy", emoji: "🏆", path: "/konkursy" },
  { label: "Profil", emoji: "👤", path: "/profil" },
  { label: "Przerwa", emoji: "🏃", path: "/aktywna-przerwa", teacherOnly: true },
];

export function MobileBottomNav({ currentPath }: { currentPath: string }) {
  const { isTeacher } = useRole();
  const navItems = allNavItems.filter(item => !item.teacherOnly || isTeacher);
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[hsl(var(--sidebar-background))] border-t border-border">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const active = currentPath === item.path || (item.path !== "/" && currentPath.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-medium btn-bounce ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <span className="text-2xl leading-none">{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
