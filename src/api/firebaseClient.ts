// firebase axios 인스턴스
import axios from 'axios'

const FIREBASE_API_CONFIG = {
  FIREBASE_API_BASE_URL: import.meta.env.VITE_FIREBASE_API_BASE_URL,
  FIREBASE_DB_NAME: '/football-squads',
}

export const routes = {
  PL_TABLE: '/league/pl',
} as const

export const getURLPath = (route: (typeof routes)[keyof typeof routes]) =>
  route + '.json'

export const firebaseApiInstance = axios.create({
  baseURL: `${FIREBASE_API_CONFIG.FIREBASE_API_BASE_URL}${FIREBASE_API_CONFIG.FIREBASE_DB_NAME}`,
  headers: { 'Content-Type': 'application/json' },
})
