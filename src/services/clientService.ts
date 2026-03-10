import { firebaseApiInstance, getURLPath, routes } from '../api/firebaseClient'
import type { ITeamDetail } from '../types/api-firebase.types'

// firebase -> client
export const getClubss = async (): Promise<ITeamDetail[]> => {
  try {
    const response = await firebaseApiInstance.get<{
      [key: string]: ITeamDetail
    }>(getURLPath(routes.LEAGUE_TABLE(39))) // 39: PL

    if (!response.data) return []

    return Object.values(response.data)
  } catch (error) {
    console.error('Firebase api fetch error: ', error)
    return []
  }
}
