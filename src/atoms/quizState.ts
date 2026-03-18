import { atom } from 'recoil'
import type { IFirebasePlayer } from '@/types'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'quiz',
  storage: sessionStorage,
})
export const quizState = atom<IFirebasePlayer | null>({
  key: 'player',
  default: null,
  effects_UNSTABLE: [persistAtom],
})

export const inputState = atom<string>({
  key: 'answer',
  default: '',
})
