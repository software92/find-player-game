import { onRequest } from 'firebase-functions/https'

// 10분마다 서버에 로그를 출력하는 테스트 함수
export const scheduledSync = onRequest((_, res) => {
  console.log('데이터 동기화 작업을 시작합니다')

  res.status(200).send('데이터를 동기화 완료합니다')
})

// // firebase 요청시 보안 설정
// const functions = require("firebase-functions");

// exports.myScheduledTask = functions.https.onRequest((req, res) => {
//   // 1. 헤더에서 'authorization' 값을 가져옵니다.
//   const clientToken = req.headers['authorization'];

//   // 2. 미리 설정한 비밀 키 (환경 변수 등에 저장 권장)
//   const serverToken = "Bearer MY_SECRET_CRON_TOKEN";

//   // 3. 토큰이 없거나 일치하지 않으면 403(Forbidden) 반환
//   if (!clientToken || clientToken !== serverToken) {
//     console.error("Unauthorized attempt to run cron job.");
//     return res.status(403).send("Unauthorized: Invalid API Key");
//   }

//   // 4. 검증 통과 후 실제 로직 실행
//   try {
//     console.log("Cron job logic starting...");
//     // ... 실제 작업 수행 ...
//     res.status(200).send("Cron Job Successfully Executed");
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
// });

// https://scheduledsync-ntic65va6q-uc.a.run.app
