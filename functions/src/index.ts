import { HttpsOptions, onRequest } from 'firebase-functions/https'
import { syncData } from './services/syncData'

// 공통 옵션 (필요시 개별 함수에서 덮어쓰기 가능)
const defaultOptions: HttpsOptions = {
  region: 'us-central1',
  timeoutSeconds: 300, // 루프 처리를 위해 넉넉히 설정
  memory: '512MiB',
  invoker: 'public',
}

// 고차 함수 정의
// const createAuthorizedFunction = (
//   fn: () => Promise<void>,
//   options: HttpsOptions = defaultOptions,
// ) => {
//   return onRequest(options, async (req, res) => {
//     console.log(`[${req.path}] 작업 시작`)

//     const FOOTBALL_KEY = process.env.FUNCTION_FOOTBALL_API_KEY
//     const FIREBASE_KEY = process.env.FUNCTION_FIREBASE_API_KEY
//     const clientToken = req.headers['authorization']
//     const serverToken = `Bearer ${FOOTBALL_KEY}${FIREBASE_KEY}`

//     // 1. 인증 체크
//     if (!clientToken || clientToken !== serverToken) {
//       console.error('인증 실패')
//       res.status(403).send('Unauthorized')
//       return
//     }

//     try {
//       await fn()

//       res.status(200).send('OK')
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Unknown Error'
//       console.error('에러 발생:', message)
//       if (!res.headersSent) {
//         res.status(500).send(message)
//       }
//     }
//   })
// }

// 10개 데이터 처리 가능한지 확인

// // Football api 데이터를 Firebase에 동기화 시켜주는 함수
// export const syncFootballDataToFirebase = onRequest(
//   {
//     invoker: 'public',
//     memory: '512MiB',
//     timeoutSeconds: 300,
//     region: 'us-central1',
//   },
//   async (req, res) => {
//     console.log('데이터 동기화 작업을 시작합니다')
//     const FOOTBALL_KEY = process.env.FUNCTION_FOOTBALL_API_KEY
//     const FIREBASE_KEY = process.env.FUNCTION_FIREBASE_API_KEY

//     const clientToken = req.headers['authorization']
//     const serverToken = `Bearer ${FOOTBALL_KEY}${FIREBASE_KEY}`

//     if (!clientToken || clientToken !== serverToken) {
//       console.error('인증이 필요한 요청입니다.')
//       res.status(403).send('Unauthorized: Invalid API Key')
//       return
//     }

//     try {
//       await syncData()
//       res.status(200).send('데이터를 동기화 완료했습니다')
//     } catch (error) {
//       const message =
//         error instanceof Error ? error.message : '서버에 오류가 발생했습니다.'

//       console.log(message)

//       res.status(500).send(message)
//     }
//   },
// )

// Football api 데이터를 Firebase에 동기화 시켜주는 함수
export const syncFootballToFirebase = onRequest(
  defaultOptions,
  async (req, res) => {
    const FOOTBALL_KEY = process.env.FUNCTION_FOOTBALL_API_KEY
    const FIREBASE_KEY = process.env.FUNCTION_FIREBASE_API_KEY

    const clientToken = req.headers['authorization']
    const serverToken = `Bearer ${FOOTBALL_KEY}${FIREBASE_KEY}`

    if (!clientToken || clientToken !== serverToken) {
      console.error('인증이 필요한 요청입니다.')
      res.status(403).send('Unauthorized: Invalid API Key')
      return
    }

    try {
      await syncData()
      res.status(200).send('데이터를 동기화 완료했습니다')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '서버에 오류가 발생했습니다.'

      console.error(message)

      res.status(500).send(message)
    }
  },
)
