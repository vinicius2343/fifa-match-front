import api from "./api";
import type { FiltersResponse, MatchRequest, MatchResult } from "../types/match";

/**
 * GET /api/match/filters
 *
 * The backend returns the catalog in two arrays:
 * - teamFilters
 * - nationalTeamFilters
 *
 * Each array contains items like { type, name, options }.
 */
export async function getFilters(): Promise<FiltersResponse> {
  const { data } = await api.get("/match/filters");

  if (data && Array.isArray(data.teamFilters) && Array.isArray(data.nationalTeamFilters)) {
    return data as FiltersResponse;
  }

  if (data && typeof data === "object") {
    return {
      teamFilters: Array.isArray(data.CLUB) ? data.CLUB : [],
      nationalTeamFilters: Array.isArray(data.NATIONAL_TEAM) ? data.NATIONAL_TEAM : [],
    } as FiltersResponse;
  }

  return { teamFilters: [], nationalTeamFilters: [] };
}

/**
 * POST /api/match/randomize
 *
 * Sends the players and the active filters, and returns the drawn teams.
 * All draw logic lives on the backend — this only assembles the request
 * and returns the parsed response.
 */
export async function randomizeMatch(request: MatchRequest): Promise<MatchResult> {
  const { data } = await api.post<MatchResult>("/match/randomize", request);
  return data;
}
