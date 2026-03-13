// firebase -> client
import { firebaseApiInstance } from '../api/firebaseClient'
import { DB_DEFAULT_DATA, FIREBASE_API_ENDPOINT } from '../constant'
import type { IPlayer, IFirebaseTeamDetail } from '../types'
import { getFirebaseURLPath, type FirebaseReturnPath } from '../utils/path'

// tanstack query와 함께 사용할 때, 데이터를 가져오는 fetch 함수에서 try-catch를 사용하면
// tanstack query의 error 상태가 동작하지 않을 수 있습니다

// 39: PL
const fetchFirebaseData = async <T>(path: FirebaseReturnPath): Promise<T> => {
  const response = await firebaseApiInstance.get<T>(path)

  return response.data
}

// 하나의 팀 조회
export const fetchTeam = async (
  teamId: number,
): Promise<IFirebaseTeamDetail> => {
  const url = FIREBASE_API_ENDPOINT.TEAM_DETAIL(teamId)

  return await fetchFirebaseData<IFirebaseTeamDetail>(getFirebaseURLPath(url))
}

// 팀의 모든 선수 id 조회
export const fetchTeamPlayerIds = async (teamId: number): Promise<number[]> => {
  const url = FIREBASE_API_ENDPOINT.TEAM_PLAYER_IDS(teamId)

  return await fetchFirebaseData<number[]>(getFirebaseURLPath(url))
}

// 리그 내 모든 팀 id 조회
export const fetchTeamIdsInLeague = async (
  leagueId: number = DB_DEFAULT_DATA.league,
): Promise<number[]> => {
  const url = FIREBASE_API_ENDPOINT.LEAGUE_TEAM_IDS(leagueId)

  return await fetchFirebaseData<number[]>(getFirebaseURLPath(url))
}

// // total club`s squad in league
// export const fetchSquads = async ({
//   leagueId = DB_DEFAULT_DATA.league,
// }: IFetchCommon): Promise<IPlayer[][]> => {
//   const url = FIREBASE_API_ENDPOINT.ALL_SQUAD_IN_LEAGUE(leagueId)

//   const data = await fetchFirebaseData<Record<number, IPlayer[]>>(
//     getFirebaseURLPath(url),
//   )

//   return data ? Object.values(data) : []
// }
