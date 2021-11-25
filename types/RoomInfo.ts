/**
 * ルーム情報の共通型
 */
export interface RoomDataCommon {
  room_name: string
  description: string
  datetime: string
  topic?: string // 後日実装
  invite_code?: string // 後日実装
}

/**
 * ルーム情報のフォームの型
 */
export interface RoomForm extends RoomDataCommon {
  date: string
  time: string
  hosts: string[]
}

/**
 * ルーム情報をbackendとやりとりするための型
 */
export interface RoomData extends RoomDataCommon {
  readonly id: string
  hosts: {
    id: string
    username?: string
  }[]
  guests?: {
    id: string
    username?: string
  }[]
  readonly created_at: string
  readonly capacity: number
}
