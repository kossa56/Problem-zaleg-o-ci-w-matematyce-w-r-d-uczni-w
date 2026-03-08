import { createContext, useContext, useState, ReactNode } from "react";

type Role = "student" | "teacher";

interface RoleContextType {
  role: Role;
  toggleRole: () => void;
  isTeacher: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("student");

  const toggleRole = () => setRole((r) => (r === "student" ? "teacher" : "student"));

  return (
    <RoleContext.Provider value={{ role, toggleRole, isTeacher: role === "teacher" }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
