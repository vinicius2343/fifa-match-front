import { Dices } from "lucide-react";
import type { MatchResult as MatchResultType } from "../types/match";
import TeamCard from "./TeamCard";
import PlayersOut from "./PlayersOut";

interface MatchResultProps {
  result: MatchResultType;
  onReset: () => void;
}

export default function MatchResult({ result, onReset }: MatchResultProps) {
  const isEmpty = result.teams.length === 0;

  return (
    <div className="animate-pop-in space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl">Resultado</h2>
        <button type="button" onClick={onReset} className="btn-outline !py-2.5">
          <Dices size={18} strokeWidth={2.5} />
          Novo sorteio
        </button>
      </div>

      {isEmpty ? (
        <p className="border-2 border-dashed border-ink/30 px-4 py-8 text-center font-mono text-sm text-ink/60">
          O sorteio não retornou nenhum time com os filtros escolhidos. Ajuste os filtros e tente
          novamente.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {result.teams.map((team, index) => (
            <TeamCard key={`${team.team}-${index}`} team={team} index={index} />
          ))}
        </div>
      )}

      <PlayersOut players={result.playersOut} />
    </div>
  );
}
