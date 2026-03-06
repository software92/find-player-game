import axios from 'axios'
import { FOOTBAL_API_ENDPOINT } from '../constant/routes'
import type {
  IGetLeagueTable,
  IGetTeamSquads,
  IGetTeamSquadsResponse,
  IResponse,
} from '../types/api-football.types'
import { footballApiInstance, handleFetchError } from './footballClient'

// const fetchData = async (url, params) => {
//   try {
//     const response = await footballApiInstance.get(url, { params })
//     return response.data
//   } catch (error) {
//     handleFetchError(error)
//   }
// }

// API 요청 분리(football api)
// 팀의 선수 정보 가져오기
export const fetchSquadData = async (
  teamId: number,
): Promise<IGetTeamSquadsResponse> => {
  try {
    const response = await footballApiInstance.get<IGetTeamSquads>(
      FOOTBAL_API_ENDPOINT.TEAM_SQUADS,
      {
        params: { team: teamId },
      },
    )
    if (!response.data && response.data.response.length === 0)
      throw new Error('팀의 선수 정보를 가져오지 못했습니다.')

    return response.data.response[0]
  } catch (error) {
    handleFetchError(error)
  }
}

interface IFetchLeague {
  league: number
  season: number
}

// 리그 내 팀 정보 가져오기
export const fetchLeagueTableData = async ({
  league,
  season,
}: IFetchLeague): Promise<IResponse[]> => {
  try {
    const response = await footballApiInstance.get<IGetLeagueTable>(
      FOOTBAL_API_ENDPOINT.LEAGUE_TABLE,
      {
        params: { league, season },
      },
    )

    if (!response.data) throw new Error('리그 테이블을 가져오지 못했습니다.')

    return response.data.response
  } catch (error) {
    handleFetchError(error)
  }
}
