import { onRequest } from 'firebase-functions/https'
import { syncData } from './services/syncData'

const FOOTBALL_KEY = process.env.FUNCTION_FOOTBALL_API_KEY
const FIREBASE_KEY = process.env.FUNCTION_FIREBASE_API_KEY

// Football api 데이터를 Firebase에 동기화 시켜주는 함수
export const syncFootballDataToFirebase = onRequest(async (req, res) => {
  const clientToken = req.headers['authorization']
  const serverToken = `Bearer ${FOOTBALL_KEY}${FIREBASE_KEY}`

  if (!clientToken || clientToken !== serverToken) {
    console.error('데이터 동기화 작업을 실패했습니다.')
    res.status(403).send('Unauthorized: Invalid API Key')
    return
  }

  try {
    await syncData()
    res.status(200).send('데이터를 동기화 완료했습니다')
  } catch (error) {
    res.status(500).send('서버 오류')
  }
})
