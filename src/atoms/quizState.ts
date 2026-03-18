import { atom } from 'recoil'
import type { IFirebasePlayer } from '@/types'

export const quizState = atom<IFirebasePlayer | null>({
  key: 'quiz',
  default: null,
})

export const inputState = atom<string>({
  key: 'answer',
  default: '',
})
