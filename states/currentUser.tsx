import { UserData } from '../types/UserInfo'
import { atom } from 'recoil'

export const currentUserState = atom<undefined | null | UserData>({
  key: 'CurrentUser',
  default: undefined,
})
