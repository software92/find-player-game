// firebase axios 인스턴스
import axios from 'axios'

const FIREBASE_API_CONFIG = {
  FIREBASE_API_BASE_URL:
    'https://real-time-db--find-player-default-rtdb.firebaseio.com',
  FIREBASE_API_HEADERS: { 'Content-Type': 'application/json' },
} as const

export const firebaseApiInstance = axios.create({
  baseURL: FIREBASE_API_CONFIG.FIREBASE_API_BASE_URL,
  headers: FIREBASE_API_CONFIG.FIREBASE_API_HEADERS,
})

// react query options
export const REACT_QUERY_OPTIONS = {
  staleTime: 1000 * 60 * 30, // 30분
  gcTime: 1000 * 60 * 30, // staleTime보다 같거나 길게 설정
  refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
  refetchOnMount: false, // 컴포넌트 마운트 시 재요청 방지
  refetchOnReconnect: false, // 네트워크 재연결 시 재요청 방지
}
