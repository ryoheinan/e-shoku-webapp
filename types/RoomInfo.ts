import { UserData } from './UserInfo'
/**
 * ルーム情報のフォームの型
 */
export interface RoomForm {
  roomName: string
  description: string
  date: string
  time: string
  topic?: string // 後日実装
  inviteCode?: string // 後日実装
}
/**
 * ルーム情報の型
 */
export interface RoomData extends RoomForm {
  id: string
  hosts?: UserData[]
  guests?: UserData[]
  createdAt: string
}
