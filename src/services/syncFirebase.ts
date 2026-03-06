import { ref, set } from 'firebase/database'
import { database } from '../firebase'
import { fetchLeagueTableData, fetchSquadData } from './footballApi'
import { handleFetchError } from './footballClient'

const LS_KEY = 'last_update'
const DEFAULT_LEAGUE = {
  league: 39, // pl
  season: 2024, // 26년 기준 최신
}

const DB_PREFIX = 'football-squads'

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

    const totalTeamInfo = await Promise.all(
      leagueTableData.slice(0, 2).map(async ({ team }) => {
        const { players } = await fetchSquadData(team.id)

        return { ...team, players }
      }),
    )

    // 2. Firebase Realtime Database에 저장
    const dbName = `${DB_PREFIX}`
    const databaseRef = ref(database, dbName)

    const dataToStore = {
      lastUpdate: now,
      league: {
        pl: totalTeamInfo,
      },
    }

    await set(databaseRef, dataToStore)

    localStorage.setItem(LS_KEY, now)
    console.log('API 데이터를 Firebase 데이터베이스에 등록했습니다.')
  } catch (error) {
    // API 요청 에러와 Firebase 저장 에러를 모두 여기서 잡습니다.
    handleFetchError(error)
  }
}

const getNowYearNMonth = (): string => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}
