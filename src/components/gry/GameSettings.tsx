import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Category, Difficulty, categoryLabels, difficultyLabels,
} from "@/data/mathQuestions";

interface Props {
  category: Category;
  difficulty: Difficulty;
  onCategoryChange: (c: Category) => void;
  onDifficultyChange: (d: Difficulty) => void;
  disabled?: boolean;
}

export function GameSettings({ category, difficulty, onCategoryChange, onDifficultyChange, disabled }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Select value={category} onValueChange={(v) => onCategoryChange(v as Category)} disabled={disabled}>
        <SelectTrigger className="w-full sm:w-56">
          <SelectValue placeholder="Wybierz dział" />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(categoryLabels) as Category[]).map((k) => (
            <SelectItem key={k} value={k}>{categoryLabels[k]}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={difficulty} onValueChange={(v) => onDifficultyChange(v as Difficulty)} disabled={disabled}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Wybierz poziom" />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(difficultyLabels) as Difficulty[]).map((k) => (
            <SelectItem key={k} value={k}>{difficultyLabels[k]}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
