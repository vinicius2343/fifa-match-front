interface FieldPlayer {
  name: string;
  /** Position as percentages, so the marker scales with the field. */
  top: string;
  left: string;
}

interface FootballFieldProps {
  /** Player names to place on the pitch, in formation order (max 11 used). */
  players?: string[];
  className?: string;
}

/** Fixed 4-3-3-ish formation slots, expressed as top/left percentages. */
const FORMATION: Array<{ top: string; left: string }> = [
  { top: "92%", left: "50%" }, // GK
  { top: "72%", left: "16%" }, // DEF
  { top: "76%", left: "38%" },
  { top: "76%", left: "62%" },
  { top: "72%", left: "84%" },
  { top: "50%", left: "22%" }, // MID
  { top: "46%", left: "50%" },
  { top: "50%", left: "78%" },
  { top: "20%", left: "22%" }, // FWD
  { top: "14%", left: "50%" },
  { top: "20%", left: "78%" },
];

function buildFieldPlayers(names: string[]): FieldPlayer[] {
  return names.slice(0, FORMATION.length).map((name, i) => ({
    name,
    top: FORMATION[i].top,
    left: FORMATION[i].left,
  }));
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function FootballField({ players = [], className = "" }: FootballFieldProps) {
  const fieldPlayers = buildFieldPlayers(players);

  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden border-[3px] border-ink bg-pitch shadow-poster ${className}`}
      role="img"
      aria-label="Campo de futebol"
    >
      {/* Mowed-stripe texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 10%, transparent 10%, transparent 20%)",
        }}
      />

      {/* Outer boundary */}
      <div className="absolute inset-3 border-2 border-cream/80" />

      {/* Halfway line */}
      <div className="absolute left-3 right-3 top-1/2 h-0.5 -translate-y-1/2 bg-cream/80" />

      {/* Center circle */}
      <div className="absolute left-1/2 top-1/2 h-[22%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cream/80" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/80" />

      {/* Top penalty area */}
      <div className="absolute left-1/2 top-3 h-[16%] w-[54%] -translate-x-1/2 border-2 border-t-0 border-cream/80" />
      <div className="absolute left-1/2 top-3 h-[7%] w-[26%] -translate-x-1/2 border-2 border-t-0 border-cream/80" />

      {/* Bottom penalty area */}
      <div className="absolute bottom-3 left-1/2 h-[16%] w-[54%] -translate-x-1/2 border-2 border-b-0 border-cream/80" />
      <div className="absolute bottom-3 left-1/2 h-[7%] w-[26%] -translate-x-1/2 border-2 border-b-0 border-cream/80" />

      {/* Player markers */}
      {fieldPlayers.map((p) => (
        <div
          key={p.name}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          style={{ top: p.top, left: p.left }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-cream font-mono text-[11px] font-bold text-ink shadow-poster-sm sm:h-9 sm:w-9 sm:text-xs">
            {initials(p.name)}
          </span>
          <span className="max-w-[72px] truncate rounded-sm bg-ink/80 px-1 font-mono text-[9px] font-semibold uppercase text-cream sm:text-[10px]">
            {p.name}
          </span>
        </div>
      ))}

      {/* When no players yet, show a placeholder mark at kickoff spot */}
      {fieldPlayers.length === 0 && (
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/90" />
      )}
    </div>
  );
}
