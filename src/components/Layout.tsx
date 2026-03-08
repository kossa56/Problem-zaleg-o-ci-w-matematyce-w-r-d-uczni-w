import { Outlet, useLocation } from "react-router-dom";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { RoleToggle } from "./RoleToggle";

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex w-full">
      <DesktopSidebar currentPath={location.pathname} />
      <main className="flex-1 pb-20 lg:pb-0 px-4 lg:px-8 xl:px-10 overflow-x-hidden min-w-0">
        <Outlet />
      </main>
      <MobileBottomNav currentPath={location.pathname} />
      <RoleToggle />
    </div>
  );
}
