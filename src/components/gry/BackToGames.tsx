import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackToGames() {
  return (
    <Button variant="ghost" size="sm" asChild className="mb-4">
      <Link to="/gry">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Powrót do gier
      </Link>
    </Button>
  );
}
