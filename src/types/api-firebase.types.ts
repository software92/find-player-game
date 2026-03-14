import type { IPlayer } from './api-external.types'

export interface IFirebasePlayer extends IPlayer {
  teamId: number
  teamLogo: string
  leagueId: number
}
export interface IFirebaseTeamDetail {
  id: number
  name: string
  code: string
  country: string
  founded: number
  logo: string
  national: boolean
}
export interface IFirebaseTeamPlayerIds {
  playerIds: number[]
}
