import { useCallback, useState } from "react";
import { randomizeMatch } from "../services/matchService";
import type { MatchRequest, MatchResult, MatchSize, TeamFilter } from "../types/match";

interface UseMatchDrawState {
  result: MatchResult | null;
  loading: boolean;
  error: string | null;
  draw: (players: string[], filters: TeamFilter[], matchSize: MatchSize) => Promise<void>;
  reset: () => void;
}

/** Basic pre-flight validation before hitting the API. Returns an error message or null. */
function validate(players: string[], matchSize: MatchSize): string | null {
  const minimumPlayers = matchSize === "ONE_V_ONE" ? 2 : 4;

  if (players.length < minimumPlayers) {
    return `Adicione pelo menos ${minimumPlayers} jogadores para sortear ${matchSize === "ONE_V_ONE" ? "1x1" : "2x2"}.`;
  }
  return null;
}

function normalizeFilters(filters: TeamFilter[]): TeamFilter[] {
  return filters.map((filter) =>
    filter.type === "RATING"
      ? {
          ...filter,
          operator: filter.operator ?? "GREATER_THAN_OR_EQUAL",
        }
      : filter
  );
}

/**
 * Orchestrates POST /api/match/randomize: validates input, tracks loading
 * and error state, and stores the resulting MatchResult.
 */
export function useMatchDraw(): UseMatchDrawState {
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const draw = useCallback(async (players: string[], filters: TeamFilter[], matchSize: MatchSize) => {
    const validationError = validate(players, matchSize);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    const request: MatchRequest = {
      players,
      matchSize,
      filters: normalizeFilters(filters),
    };

    try {
      const data = await randomizeMatch(request);
      setResult(data);
    } catch {
      setError("Não foi possível sortear os times agora. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, draw, reset };
}
