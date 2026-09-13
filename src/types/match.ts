/**
 * Domain types for FIFA Match.
 *
 * These mirror the Spring Boot contract described in the project brief.
 * `Player` is intentionally NOT a modeled entity — it's just a name (string)
 * carried inside the request/response payloads.
 */

export type TeamType = "CLUB" | "NATIONAL_TEAM";

export type MatchSize = "ONE_V_ONE" | "TWO_V_TWO";

export type RatingOperator = "EQUALS" | "LESS_THAN_OR_EQUAL" | "GREATER_THAN_OR_EQUAL";


export type TeamTypeSelection = "CLUB" | "NATIONAL_TEAM" | "BOTH";

export type FilterType = "COUNTRY" | "LEAGUE" | "RATING";

export interface TeamFilter {
  teamType: TeamType;
  type: FilterType;
  value: string;
  operator?: RatingOperator;
}

export interface MatchRequest {
  players: string[];
  matchSize: MatchSize;
  filters: TeamFilter[];
}

export interface TeamResult {
  team: string;
  players: string[];
}

export interface MatchResult {
  teams: TeamResult[];
  playersOut: string[];
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterOptionResponse {
  type: FilterType;
  name: string;
  options: string[];
}

export interface FiltersResponse {
  teamFilters: FilterOptionResponse[];
  nationalTeamFilters: FilterOptionResponse[];
}
