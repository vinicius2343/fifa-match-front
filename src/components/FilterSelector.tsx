import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type {
  FilterType,
  FiltersResponse,
  RatingOperator,
  TeamFilter,
  TeamType,
  TeamTypeSelection,
} from "../types/match";

interface FilterSelectorProps {
  filtersResponse: FiltersResponse;
  teamTypeSelection: TeamTypeSelection;
  activeFilters: TeamFilter[];
  onAdd: (filter: TeamFilter) => string | null;
}

const FILTER_TYPE_LABELS: Record<FilterType, string> = {
  COUNTRY: "País",
  LEAGUE: "Liga",
  RATING: "Força",
};

const RATING_VALUES = Array.from({ length: 9 }, (_, index) => (1 + index * 0.5).toFixed(1));

const RATING_OPERATOR_OPTIONS: Array<{ value: RatingOperator; label: string }> = [
  { value: "EQUALS", label: "Igual a" },
  { value: "LESS_THAN_OR_EQUAL", label: "Até" },
  { value: "GREATER_THAN_OR_EQUAL", label: "A partir de" },
];

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

const TEAM_TYPE_LABELS: Record<TeamType, string> = {
  CLUB: "Clube",
  NATIONAL_TEAM: "Seleção",
};

function teamTypesFor(selection: TeamTypeSelection): TeamType[] {
  if (selection === "BOTH") return ["CLUB", "NATIONAL_TEAM"];
  return [selection];
}

export default function FilterSelector({
  filtersResponse,
  teamTypeSelection,
  activeFilters,
  onAdd,
}: FilterSelectorProps) {
  const availableTeamTypes = teamTypesFor(teamTypeSelection);

  const [teamType, setTeamType] = useState<TeamType>(availableTeamTypes[0]);
  const [filterType, setFilterType] = useState<FilterType | "">("");
  const [value, setValue] = useState("");
  const [operator, setOperator] = useState<RatingOperator>("GREATER_THAN_OR_EQUAL");
  const [error, setError] = useState<string | null>(null);

  // Keep the selected teamType valid whenever the user changes CLUBES / SELEÇÕES / AMBOS.
  useEffect(() => {
    if (!availableTeamTypes.includes(teamType)) {
      setTeamType(availableTeamTypes[0]);
      setFilterType("");
      setValue("");
      setOperator("GREATER_THAN_OR_EQUAL");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamTypeSelection]);

  const filterTypeOptions = useMemo<FilterType[]>(() => {
    let group = null;
    if (teamType === "CLUB") group = filtersResponse.teamFilters;
    if (teamType === "NATIONAL_TEAM") group = filtersResponse.nationalTeamFilters;
    if (!group) return [];
    return group.map((f) => f.type);
  }, [filtersResponse, teamType]);

  const valueOptions = useMemo(() => {
    let group = null;
    if (teamType === "CLUB") group = filtersResponse.teamFilters;
    if (teamType === "NATIONAL_TEAM") group = filtersResponse.nationalTeamFilters;
    if (!filterType || !group) return [];

    if (filterType === "RATING") {
      return RATING_VALUES.map((value) => ({ value, label: value }));
    }

    const filter = group.find((f) => f.type === filterType);
    if (!filter) return [];
    return filter.options.map((value) => ({ value, label: value }));
  }, [filtersResponse, teamType, filterType]);

  function handleTeamTypeChange(next: TeamType) {
    setTeamType(next);
    setFilterType("");
    setValue("");
    setOperator("GREATER_THAN_OR_EQUAL");
    setError(null);
  }

  function handleFilterTypeChange(next: FilterType | "") {
    setFilterType(next);
    setValue("");
    setOperator("GREATER_THAN_OR_EQUAL");
    setError(null);
  }

  function handleAdd() {
    if (!filterType || !value) {
      setError("Escolha um tipo de filtro e um valor antes de adicionar.");
      return;
    }
    const alreadyActive = activeFilters.some(
      (f) =>
        f.teamType === teamType &&
        f.type === filterType &&
        f.value === value &&
        (filterType !== "RATING" || f.operator === operator)
    );
    if (alreadyActive) {
      setError("Esse filtro já está ativo.");
      return;
    }
    const result = onAdd({
      teamType,
      type: filterType,
      value,
      ...(filterType === "RATING" ? { operator } : {}),
    });
    if (result) {
      setError(result);
      return;
    }
    setValue("");
    setError(null);
  }

  return (
    <div className="space-y-4">
      <div
        className={`grid gap-3 ${
          filterType === "RATING"
            ? availableTeamTypes.length > 1
              ? "sm:grid-cols-4"
              : "sm:grid-cols-3"
            : availableTeamTypes.length > 1
              ? "sm:grid-cols-3"
              : "sm:grid-cols-2"
        }`}
      >
        {availableTeamTypes.length > 1 && (
          <label className="block">
            <span className="eyebrow mb-1 block">Aplicar a</span>
            <select
              value={teamType}
              onChange={(e) => handleTeamTypeChange(e.target.value as TeamType)}
              className="w-full border-[3px] border-ink bg-cream px-3 py-2.5 font-body focus:outline-none"
            >
              {availableTeamTypes.map((t) => (
                <option key={t} value={t}>
                  {TEAM_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="block">
          <span className="eyebrow mb-1 block">Filtro</span>
          <select
            value={filterType}
            onChange={(e) => handleFilterTypeChange(e.target.value as FilterType | "")}
            disabled={filterTypeOptions.length === 0}
            className="w-full border-[3px] border-ink bg-cream px-3 py-2.5 font-body focus:outline-none disabled:opacity-50"
          >
            <option value="">Selecione…</option>
            {filterTypeOptions.map((type) => (
              <option key={type} value={type}>
                {FILTER_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="eyebrow mb-1 block">Valor</span>
          <select
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(null);
            }}
            disabled={!filterType || valueOptions.length === 0}
            className="w-full border-[3px] border-ink bg-cream px-3 py-2.5 font-body focus:outline-none disabled:opacity-50"
          >
            <option value="">Selecione…</option>
            {valueOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {filterType === "RATING" ? formatRatingFilterValue(opt.value) : opt.label}
              </option>
            ))}
          </select>
        </label>

        {filterType === "RATING" && (
          <label className="block">
            <span className="eyebrow mb-1 block">Operador</span>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value as RatingOperator)}
              className="w-full border-[3px] border-ink bg-cream px-3 py-2.5 font-body focus:outline-none"
            >
              {RATING_OPERATOR_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {filterType && filterTypeOptions.length > 0 && valueOptions.length === 0 && (
        <p className="font-mono text-sm text-ink/50">
          Nenhuma opção disponível para {FILTER_TYPE_LABELS[filterType].toLowerCase()} no momento.
        </p>
      )}

      <button type="button" onClick={handleAdd} className="btn-outline">
        <Plus size={18} strokeWidth={3} />
        Adicionar filtro
      </button>

      {error && <p className="font-mono text-sm font-semibold text-cta-dark">{error}</p>}
    </div>
  );
}
