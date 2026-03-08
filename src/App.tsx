import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RoleProvider } from "./contexts/RoleContext";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Gry from "./pages/Gry";
import QuickTest from "./pages/gry/QuickTest";
import SwipeIt from "./pages/gry/SwipeIt";
import MoreOrLessNumbers from "./pages/gry/MoreOrLessNumbers";
import MoreOrLessEquation from "./pages/gry/MoreOrLessEquation";
import EgzaminOsmoklasisty from "./pages/gry/EgzaminOsmoklasisty";
import Konkursy from "./pages/Konkursy";
import Profil from "./pages/Profil";
import AktywnaPrzerwa from "./pages/AktywnaPrzerwa";
import NotFound from "./pages/NotFound";
import CompetitionLayout from "./pages/konkursy/CompetitionLayout";
import Opis from "./pages/konkursy/Opis";
import Zadania from "./pages/konkursy/Zadania";
import Pytania from "./pages/konkursy/Pytania";
import Ogloszenia from "./pages/konkursy/Ogloszenia";
import Ranking from "./pages/konkursy/Ranking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/gry" element={<Gry />} />
              <Route path="/gry/quick-test" element={<QuickTest />} />
              <Route path="/gry/swipe-it" element={<SwipeIt />} />
              <Route path="/gry/more-or-less-numbers" element={<MoreOrLessNumbers />} />
              <Route path="/gry/more-or-less-equation" element={<MoreOrLessEquation />} />
              <Route path="/gry/egzamin-osmoklasisty" element={<EgzaminOsmoklasisty />} />
              <Route path="/konkursy" element={<Konkursy />} />
              <Route path="/konkursy/:id" element={<CompetitionLayout />}>
                <Route index element={<Navigate to="opis" replace />} />
                <Route path="opis" element={<Opis />} />
                <Route path="zadania" element={<Zadania />} />
                <Route path="pytania" element={<Pytania />} />
                <Route path="ogloszenia" element={<Ogloszenia />} />
                <Route path="ranking" element={<Ranking />} />
              </Route>
              <Route path="/profil" element={<Profil />} />
              <Route path="/aktywna-przerwa" element={<AktywnaPrzerwa />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
