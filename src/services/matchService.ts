import { api } from "./api";
import type { FiltersResponse, MatchRequest, MatchResult } from "../types/match";

export async function getFilters(): Promise<FiltersResponse> {
  const { data } = await api.get("/api/match/filters");

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

export async function randomizeMatch(request: MatchRequest): Promise<MatchResult> {
  const { data } = await api.post<MatchResult>("/api/match/randomize", request);
  return data;
}
