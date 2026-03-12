import type { IPlayer } from './api-external.types'

export interface IFirebaseTeamDetail {
  id: number
  name: string
  code: string
  country: string
  founded: number
  logo: string
  national: boolean
  players: IPlayer[]
}
