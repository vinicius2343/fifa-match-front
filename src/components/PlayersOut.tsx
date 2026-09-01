interface PlayersOutProps {
  players: string[];
}

export default function PlayersOut({ players }: PlayersOutProps) {
  if (players.length === 0) return null;

  return (
    <div className="border-[3px] border-dashed border-ink/50 bg-cream-dark/60 p-5">
      <p className="eyebrow mb-3">Ficaram de fora</p>
      <ul className="flex flex-wrap gap-2">
        {players.map((player) => (
          <li
            key={player}
            className="border-2 border-ink/40 bg-cream px-3 py-1 font-mono text-sm font-semibold text-ink/70"
          >
            {player}
          </li>
        ))}
      </ul>
    </div>
  );
}
