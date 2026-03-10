import { firebaseApiInstance } from '../api/firebaseClient'
import { FIREBASE_API_ENDPOINT } from '../constant'
import type { ITeamDetail } from '../types/api-firebase.types'
import { getFirebaseURLPath } from '../utils/path'

// firebase -> client
export const getClubss = async (): Promise<ITeamDetail[]> => {
  try {
    const response = await firebaseApiInstance.get<{
      [key: string]: ITeamDetail
    }>(getFirebaseURLPath(FIREBASE_API_ENDPOINT.LEAGUE_TABLE(39))) // 39: PL

    if (!response.data) return []

    return Object.values(response.data)
  } catch (error) {
    console.error('Firebase api fetch error: ', error)
    return []
  }
}
