import type { TeamResult } from "../types/match";

interface TeamCardProps {
  team: TeamResult;
  index: number;
}

export default function TeamCard({ team, index }: TeamCardProps) {
  return (
    <div className="poster-card animate-pop-in p-5">
      <p className="eyebrow mb-2">Time {String(index + 1).padStart(2, "0")}</p>
      <h3 className="mb-4 text-2xl leading-none sm:text-3xl">{team.team}</h3>
      <ul className="space-y-2">
        {team.players.map((player) => (
          <li key={player} className="flex items-center gap-2 font-body font-medium">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-cta" />
            {player}
          </li>
        ))}
      </ul>
    </div>
  );
}
