// cloud function 서버에서는 LocalStorage가 없기 때문에 제거
// TODO: cloud functions 사용 예정
// [test - const tableData = leagueTableData.slice(0, 2)]
// api-football -> firebase data 연결

import { sleep } from '../utils/timer'
import { database } from '../firebase/config'
import type { ITeam1 } from '../types/api-external.types'

import { DEFAULT_API_PARAMS } from '../shared/params'
import { fetchLeagueTableData, fetchSquadData } from './externalService'
import { ref, serverTimestamp, update } from 'firebase/database'
import { fetchErrorLogger } from '../shared/api'
import type { IFirebasePlayer } from '../shared/api.types'

type IFirebaseObject = Record<string, any>

// TODO: leagueTableData를 사용해서 promise를 호출할 때 slice 제거
// TODO: server를 기준으로 업데이트 시기 추후 설정(if문 및 관련 코드 제거)
export const syncData = async (): Promise<void> => {
  console.log('Firebase의 데이터 동기화 작업을 시작합니다')

  try {
    const leagueTableData = await fetchLeagueTableData(DEFAULT_API_PARAMS)

    if (!leagueTableData || leagueTableData.length === 0)
      throw new Error('리그 데이터를 가져오지 못했습니다.')

    const updates: IFirebaseObject = {}
    const playerIdsInLeague: number[] = []

    // temp
    const tableData = leagueTableData.slice(0, 1)
    // for (const { team } of leagueTableData) {
    for (const { team } of tableData) {
      try {
        const playerIdsInTeam = await syncTeam(team, updates)
        playerIdsInLeague.push(...playerIdsInTeam)

        console.log(`${team.name} 데이터 동기화 완료`)
      } catch (error) {
        console.log(`${team.name} 데이터 동기화 실패`)
      }
      await sleep(8000)
    }

    updates[`leagues/${DEFAULT_API_PARAMS.league}/updatedAt`] =
      serverTimestamp()
    updates[`leagues/${DEFAULT_API_PARAMS.league}/playerIds`] =
      playerIdsInLeague
    updates[`leagues/${DEFAULT_API_PARAMS.league}/teamIds`] = tableData.map(
      // updates[`leagues/${DEFAULT_API_PARAMS.league}/teamIds`] = leagueTableData.map(
      ({ team }) => team.id,
    )

    const dataToStore = { ...updates }

    await update(ref(database), dataToStore)

    console.log(
      'Football API 데이터를 Firebase 데이터베이스에 업데이트 했습니다.',
    )
  } catch (error) {
    fetchErrorLogger(error)
  }
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
          name: removeSpecialAlpha(player.name),
          teamId: team.id,
          teamLogo: team.logo,
          leagueId: DEFAULT_API_PARAMS.league,
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

// 특수 알파벳 제거: 'B. ŠEŠKO' -> 'B. SESKO
const removeSpecialAlpha = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
