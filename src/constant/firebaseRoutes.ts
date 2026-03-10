export const FIREBASE_API_ENDPOINT = {
  LEAGUE_TABLE: (leagueId: number) => `/${leagueId}/teams`,
} as const
