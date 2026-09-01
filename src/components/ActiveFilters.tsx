import { X } from "lucide-react";
import type { FilterType, TeamFilter } from "../types/match";

interface ActiveFiltersProps {
  filters: TeamFilter[];
  onRemove: (index: number) => void;
}

const FILTER_TYPE_LABELS: Record<FilterType, string> = {
  COUNTRY: "País",
  LEAGUE: "Liga",
  RATING: "Força",
};

export default function ActiveFilters({ filters, onRemove }: ActiveFiltersProps) {
  if (filters.length === 0) {
    return (
      <p className="border-2 border-dashed border-ink/30 px-4 py-4 text-center font-mono text-sm text-ink/50">
        Nenhum filtro ativo. Times de qualquer tipo poderão ser sorteados.
      </p>
    );
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {filters.map((filter, index) => (
        <li key={`${filter.teamType}-${filter.type}-${filter.value}-${index}`} className="chip">
          {FILTER_TYPE_LABELS[filter.type]}: {filter.value}
          <button
            type="button"
            onClick={() => onRemove(index)}
            aria-label={`Remover filtro ${FILTER_TYPE_LABELS[filter.type]}: ${filter.value}`}
            className="text-ink/60 hover:text-cta-dark"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </li>
      ))}
    </ul>
  );
}
