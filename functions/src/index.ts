// import {setGlobalOptions} from "firebase-functions";
// import * as logger from "firebase-functions/logger";
// setGlobalOptions({ maxInstances: 10 });
import { onRequest } from 'firebase-functions/https'

export const scheduledSync = onRequest((_, res) => {
  console.log('데이터 동기화 작업을 시작합니다')

  res.status(200).send('데이터를 동기화 완료합니다')
})
