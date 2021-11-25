/**
 * ルーム情報の共通型
 */
export interface RoomDataCommon {
  room_name: string
  description: string
  topic?: string // 後日実装
  invite_code?: string // 後日実装
}

/**
 * ルーム情報のフォームの型
 */
export interface RoomForm extends RoomDataCommon {
  date: string
  time: string
}

/**
 * ルーム情報をbackendとやりとりするための型
 */
export interface RoomData extends RoomDataCommon {
  id: string
  hosts?: {
    id: string
    username?: string
  }[]
  guests?: {
    id: string
    username?: string
  }[]
  created_at: string
  capacity: number
  datetime: string
}
