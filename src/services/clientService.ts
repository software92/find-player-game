import { firebaseApiInstance, getURLPath, routes } from '../api/firebaseClient'
import type { ITeamDetail } from '../types/api-firebase.types'

// firebase -> client
export const getClubss = async (): Promise<ITeamDetail[]> => {
  try {
    const response = await firebaseApiInstance.get<{
      [key: string]: ITeamDetail
    }>(getURLPath(routes.PL_TABLE))

    if (!response.data) return []

    return Object.values(response.data)
  } catch (error) {
    console.error('Firebase api fetch error: ', error)
    return []
  }
}
