export const FIREBASE_API_ENDPOINT = {
  LEAGUE_TEAMS: (leagueId: number) => `/${leagueId}/teams`,
  TEAM_DETAIL: (leagueId: number, teamId: number) =>
    `/${leagueId}/teams/${teamId}`,
  ALL_SQUAD_IN_LEAGUE: (leagueId: number) => `/${leagueId}/squads`,
  TEAM_SQUAD: (leagueId: number, teamId: number) =>
    `/${leagueId}/squads/${teamId}`,
} as const
