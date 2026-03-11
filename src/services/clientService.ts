// firebase -> client
import { firebaseApiInstance } from '../api/firebaseClient'
import { DB_DEFAULT_DATA, FIREBASE_API_ENDPOINT } from '../constant'
import type { IPlayer, ITeamDetail } from '../types'
import { getFirebaseURLPath, type FirebaseReturnPath } from '../utils/path'

// tanstack query와 함께 사용할 때, 데이터를 가져오는 fetch 함수에서 try-catch를 사용하면
// tanstack query의 error 상태가 동작하지 않을 수 있습니다
interface IFetchCommon {
  leagueId?: number
}
interface IFetchProps extends IFetchCommon {
  teamId: number
}

// 39: PL
const fetchFirebaseData = async <T>(path: FirebaseReturnPath): Promise<T> => {
  const response = await firebaseApiInstance.get<T>(path)

  return response.data
}

// club
export const fetchClub = async ({
  leagueId = DB_DEFAULT_DATA.league,
  teamId,
}: IFetchProps): Promise<ITeamDetail> => {
  const url = FIREBASE_API_ENDPOINT.TEAM_DETAIL(leagueId, teamId)

  return await fetchFirebaseData<ITeamDetail>(getFirebaseURLPath(url))
}
// club`s squad
export const fetchSquad = async ({
  leagueId = DB_DEFAULT_DATA.league,
  teamId,
}: IFetchProps): Promise<IPlayer[]> => {
  const url = FIREBASE_API_ENDPOINT.TEAM_SQUAD(leagueId, teamId)

  return await fetchFirebaseData<IPlayer[]>(getFirebaseURLPath(url))
}

// total clubs in league
export const fetchClubs = async ({
  leagueId = DB_DEFAULT_DATA.league,
}: IFetchCommon): Promise<ITeamDetail[]> => {
  const url = FIREBASE_API_ENDPOINT.LEAGUE_TEAMS(leagueId)

  const data = await fetchFirebaseData<Record<number, ITeamDetail>>(
    getFirebaseURLPath(url),
  )

  return data ? Object.values(data) : []
}

// total club`s squad in league
export const fetchSquads = async ({
  leagueId = DB_DEFAULT_DATA.league,
}: IFetchCommon): Promise<IPlayer[][]> => {
  const url = FIREBASE_API_ENDPOINT.ALL_SQUAD_IN_LEAGUE(leagueId)

  const data = await fetchFirebaseData<Record<number, IPlayer[]>>(
    getFirebaseURLPath(url),
  )

  return data ? Object.values(data) : []
}
