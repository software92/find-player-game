// [test - const tableData = leagueTableData.slice(0, 2)]
// api-football -> firebase data 연결
import { ref, serverTimestamp, update } from 'firebase/database'
import { handleFetchError } from '../api'
import { fetchLeagueTableData, fetchSquadData } from './externalService'
import { database } from '../firebase'
import { DEFAULT_LEAGUE } from '../constant'
import type { IFirebasePlayer, ITeam1 } from '../types'
import { sleep } from '../utils/timer'

type IFirebaseObject = Record<string, any>

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

  console.log('Firebase의 데이터 동기화 작업을 시작합니다')

  try {
    const leagueTableData = await fetchLeagueTableData(DEFAULT_LEAGUE)

    if (!leagueTableData || leagueTableData.length === 0)
      throw new Error('리그 데이터를 가져오지 못했습니다.')

    const updates: IFirebaseObject = {}
    const playerIdsInLeague: number[] = []

    // temp
    const tableData = leagueTableData.slice(0, 2)

    // for (const { team } of leagueTableData) {
    for (const { team } of tableData) {
      const playerIdsInTeam = await syncTeam(team, updates)
      playerIdsInLeague.push(...playerIdsInTeam)

      await sleep(3000)
    }

    updates[`leagues/${DEFAULT_LEAGUE.league}/updatedAt`] = serverTimestamp()
    updates[`leagues/${DEFAULT_LEAGUE.league}/playerIds`] = playerIdsInLeague
    updates[`leagues/${DEFAULT_LEAGUE.league}/teamIds`] = leagueTableData.map(
      ({ team }) => team.id,
    )

    const dataToStore = { ...updates }

    await update(ref(database), dataToStore)

    localStorage.setItem(LS_KEY, now)
    console.log(
      'Football API 데이터를 Firebase 데이터베이스에 업데이트 했습니다.',
    )
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

const syncTeam = async (
  team: ITeam1,
  updates: IFirebaseObject,
): Promise<number[]> => {
  updates[`teams/${team.id}/info`] = { ...team }
  updates[`teams/${team.id}/updatedAt`] = serverTimestamp()

  try {
    const squadData = await fetchSquadData(team.id)
    const players = squadData?.players || []

    if (players.length === 0) {
      console.warn(`${team.name} 선수 데이터가 없습니다`)
      updates[`teams/${team.id}/playerIds`] = []

      return []
    } else {
      players.forEach(player => {
        const playerAddedTeamInfo: IFirebasePlayer = {
          ...player,
          teamId: team.id,
          teamLogo: team.logo,
          leagueId: DEFAULT_LEAGUE.league,
        }

        updates[`players/${player.id}/info`] = playerAddedTeamInfo
        updates[`players/${player.id}/updatedAt`] = serverTimestamp()
      })
      const playerIds = players.map(player => player.id)
      updates[`teams/${team.id}/playerIds`] = playerIds

      return playerIds
    }
  } catch (error) {
    console.error(`${team.name} 데이터를 가져올 수 없습니다`)
    updates[`teams/${team.id}/playerIds`] = []

    return []
  }
}
