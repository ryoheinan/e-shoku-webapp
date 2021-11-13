import { UserData } from '../types/UserInfo'
import { atom } from 'recoil'

/**
 * ユーザー情報の状態保存（Recoil）
 */
export const currentUserState = atom<undefined | null | UserData>({
  key: 'CurrentUser',
  default: undefined,
})
