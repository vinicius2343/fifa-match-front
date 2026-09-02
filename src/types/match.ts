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

/**
 * UI-only concept (not sent directly to the backend): which kind(s) of
 * team the user wants in the draw. Controls which filter groups are shown.
 * "BOTH" means filters for CLUB and NATIONAL_TEAM can both be active.
 */
export type TeamTypeSelection = "CLUB" | "NATIONAL_TEAM" | "BOTH";

export type FilterType = "COUNTRY" | "LEAGUE" | "RATING";

/** A single active filter the user has configured for the draw. */
export interface TeamFilter {
  teamType: TeamType;
  type: FilterType;
  value: string;
  operator?: RatingOperator;
}

/** Body sent to POST /api/match/randomize */
export interface MatchRequest {
  players: string[];
  matchSize: MatchSize;
  filters: TeamFilter[];
}

/** One team returned by the backend, with the players assigned to it. */
export interface TeamResult {
  team: string;
  players: string[];
}

/** Body received from POST /api/match/randomize */
export interface MatchResult {
  teams: TeamResult[];
  playersOut: string[];
}

/**
 * A single selectable option for a given filter, as returned by
 * GET /api/match/filters. `label` is what's shown in the UI, `value` is
 * what's sent back to the backend inside a TeamFilter.
 */
export interface FilterOption {
  value: string;
  label: string;
}

/**
 * Full response of GET /api/match/filters.
 * The backend sends a flat array per team kind, each item describing a filter
 * category and its selectable values.
 */
export interface FilterOptionResponse {
  type: FilterType;
  name: string;
  options: string[];
}

export interface FiltersResponse {
  teamFilters: FilterOptionResponse[];
  nationalTeamFilters: FilterOptionResponse[];
}
