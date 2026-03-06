interface IPlayer {
  id: number
  name: string
  age: number
  number: number
  photo: string
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker'
}
export interface ITeamDetail {
  id: number
  name: string
  code: string
  country: string
  founded: number
  logo: string
  national: boolean
  players: IPlayer[]
}
