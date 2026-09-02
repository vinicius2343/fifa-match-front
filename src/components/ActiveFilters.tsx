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

const RATING_OPERATOR_LABELS: Record<NonNullable<TeamFilter["operator"]>, string> = {
  EQUALS: "Igual a",
  LESS_THAN_OR_EQUAL: "Até",
  GREATER_THAN_OR_EQUAL: "A partir de",
};

function formatRatingStars(value: string | number): string {
  const numeric = typeof value === "number" ? value : Number(value);

  if (Number.isNaN(numeric)) {
    return String(value);
  }

  const fullStars = Math.floor(numeric);
  const hasHalfStar = numeric % 1 >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return `${"★".repeat(fullStars)}${hasHalfStar ? "½" : ""}${"☆".repeat(emptyStars)}`;
}

function formatRatingFilterValue(value: string): string {
  return `${formatRatingStars(value)} (${value})`;
}

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
          {FILTER_TYPE_LABELS[filter.type]}:{" "}
          {filter.type === "RATING"
            ? `${RATING_OPERATOR_LABELS[filter.operator ?? "GREATER_THAN_OR_EQUAL"]} ${formatRatingFilterValue(filter.value)}`
            : filter.value}
          <button
            type="button"
            onClick={() => onRemove(index)}
            aria-label={`Remover filtro ${FILTER_TYPE_LABELS[filter.type]}: ${filter.type === "RATING" ? `${RATING_OPERATOR_LABELS[filter.operator ?? "GREATER_THAN_OR_EQUAL"]} ${formatRatingFilterValue(filter.value)}` : filter.value}`}
            className="text-ink/60 hover:text-cta-dark"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </li>
      ))}
    </ul>
  );
}
