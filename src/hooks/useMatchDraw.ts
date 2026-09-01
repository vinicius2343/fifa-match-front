import { useCallback, useState } from "react";
import { randomizeMatch } from "../services/matchService";
import type { MatchRequest, MatchResult, TeamFilter } from "../types/match";

interface UseMatchDrawState {
  result: MatchResult | null;
  loading: boolean;
  error: string | null;
  draw: (players: string[], filters: TeamFilter[]) => Promise<void>;
  reset: () => void;
}

/** Basic pre-flight validation before hitting the API. Returns an error message or null. */
function validate(players: string[], filters: TeamFilter[]): string | null {
  if (players.length === 0) {
    return "Adicione pelo menos um jogador antes de sortear.";
  }
  if (filters.length === 0) {
    return "Escolha ao menos um filtro para o sorteio.";
  }
  return null;
}

/**
 * Orchestrates POST /api/match/randomize: validates input, tracks loading
 * and error state, and stores the resulting MatchResult.
 */
export function useMatchDraw(): UseMatchDrawState {
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const draw = useCallback(async (players: string[], filters: TeamFilter[]) => {
    const validationError = validate(players, filters);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    const request: MatchRequest = { players, filters };

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
