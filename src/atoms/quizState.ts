import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import type { IFirebasePlayer } from 'shared/api.types'

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
