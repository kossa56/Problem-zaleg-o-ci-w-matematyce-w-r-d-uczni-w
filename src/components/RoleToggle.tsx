import { useRole } from "@/contexts/RoleContext";

export function RoleToggle() {
  const { role, toggleRole } = useRole();

  return (
    <button
      onClick={toggleRole}
      className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-50 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-bold shadow-lg btn-bounce hover:border-primary/50 transition-colors"
    >
      {role === "student" ? (
        <>👤 Uczeń</>
      ) : (
        <>👩‍🏫 Nauczyciel</>
      )}
    </button>
  );
}
