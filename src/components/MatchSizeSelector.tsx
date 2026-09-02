import type { MatchSize } from "../types/match";

interface MatchSizeSelectorProps {
  value: MatchSize;
  onChange: (value: MatchSize) => void;
}

const OPTIONS: Array<{ value: MatchSize; label: string }> = [
  { value: "ONE_V_ONE", label: "1x1" },
  { value: "TWO_V_TWO", label: "2x2" },
];

export default function MatchSizeSelector({ value, onChange }: MatchSizeSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Tamanho da partida"
      className="grid grid-cols-1 gap-2 sm:grid-cols-2"
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