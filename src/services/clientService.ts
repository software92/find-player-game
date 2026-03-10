// firebase -> client
import { firebaseApiInstance } from '../api/firebaseClient'
import { FIREBASE_API_ENDPOINT } from '../constant'
import type { IPlayer, ITeamDetail } from '../types'
import { getFirebaseURLPath, type FirebaseReturnPath } from '../utils/path'

// tanstack query와 함께 사용할 때, 데이터를 가져오는 fetch 함수에서 try-catch를 사용하면
// tanstack query의 error 상태가 동작하지 않을 수 있습니다

// 39: PL
const fetchFirebaseData = async <T>(path: FirebaseReturnPath): Promise<T[]> => {
  const response = await firebaseApiInstance.get<{ [key: number]: T }>(path)

  return response.data ? Object.values(response.data) : []
}

export const fetchClubs = () => {
  const url = FIREBASE_API_ENDPOINT.LEAGUE_TEAMS(39)

  return fetchFirebaseData<ITeamDetail>(getFirebaseURLPath(url))
}

export const fetchSquads = () => {
  const url = FIREBASE_API_ENDPOINT.ALL_SQUAD_IN_LEAGUE(39)

  return fetchFirebaseData<IPlayer[]>(getFirebaseURLPath(url))
}
