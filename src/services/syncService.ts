// [o] TODO: 변경된 sync함수 실행 후 아래 주석 데이터 구조와 비교
import { ref, serverTimestamp, update } from 'firebase/database'
import { handleFetchError } from '../api'
import { fetchLeagueTableData, fetchSquadData } from './externalService'
import { database } from '../firebase'
import { DB_DEFAULT_DATA, DB_METADATA_PATH, DEFAULT_LEAGUE } from '../constant'
import type { IPlayer, ITeam1 } from '../types/api-external.types'

// temp keys
const LS_KEY = 'last_update'

// TODO: leagueTableData를 사용해서 promise를 호출할 때 slice 제거
// TODO: server를 기준으로 업데이트 시기 추후 설정(if문 및 관련 코드 제거)
export const syncFirebase = async (): Promise<void> => {
  const now = getNowYearNMonth()
  const lastUpdate = localStorage.getItem(LS_KEY)

  if (lastUpdate == now) {
    console.log('최신 데이터입니다. firebase를 동기화하지 않습니다.')
    return
  }

  try {
    // 1. API 데이터 가져오기
    const leagueTableData = await fetchLeagueTableData(DEFAULT_LEAGUE)

    if (!leagueTableData || leagueTableData.length === 0)
      throw new Error('리그 데이터를 가져오지 못했습니다.')

    const teamsObj: Record<number, ITeam1> = {}
    const squadsObj: Record<number, IPlayer[]> = {}

    const squadPromises = leagueTableData.slice(0, 2).map(async ({ team }) => {
      teamsObj[team.id] = team

      const squadData = await fetchSquadData(team.id)
      return { players: squadData.players, teamId: team.id }
    })

    const totalTeamSquads = await Promise.all(squadPromises)

    if (!totalTeamSquads || totalTeamSquads.length === 0)
      throw new Error('리그 데이터를 가져오지 못했습니다.')

    totalTeamSquads.forEach(({ teamId, players }) => {
      squadsObj[teamId] = players
    })

    // 2. Firebase Realtime Database에 저장
    const dataToStore = {
      [`${DB_DEFAULT_DATA.league}/teams`]: teamsObj,
      [`${DB_DEFAULT_DATA.league}/squads`]: squadsObj,
      [`${DB_METADATA_PATH}/lastUpdate`]: serverTimestamp(),
    }

    await update(ref(database), dataToStore)

    localStorage.setItem(LS_KEY, now)
    console.log('API 데이터를 Firebase 데이터베이스에 등록했습니다.')
  } catch (error) {
    handleFetchError(error)
  }
}

const getNowYearNMonth = (): string => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}
