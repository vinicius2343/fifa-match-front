import type { TeamTypeSelection } from "../types/match";

interface TeamTypeSelectorProps {
  value: TeamTypeSelection;
  onChange: (value: TeamTypeSelection) => void;
}

const OPTIONS: Array<{ value: TeamTypeSelection; label: string }> = [
  { value: "CLUB", label: "Clubes" },
  { value: "NATIONAL_TEAM", label: "Seleções" },
  { value: "BOTH", label: "Clubes + Seleções" },
];

export default function TeamTypeSelector({ value, onChange }: TeamTypeSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Tipo de time"
      className="grid grid-cols-1 gap-2 sm:grid-cols-3"
    >
      {OPTIONS.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={`border-[3px] border-ink px-4 py-3 font-display text-lg uppercase tracking-wide transition-all duration-150 ${
              active
                ? "bg-gold text-ink shadow-poster-sm"
                : "bg-cream text-ink/70 hover:bg-cream-dark"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
