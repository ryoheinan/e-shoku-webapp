/**
 * ユーザー情報フォームの型
 */
export interface UserForm {
  username: string
  display_name: string
  date_of_birth: string
  gender: 'MALE' | 'FEMALE' | 'PNTS' | 'OTHERS'
  description?: string
  image_url?: string
}

/**
 * APIでやりとりするユーザー情報の型
 */
export interface UserData extends UserForm {
  readonly id: string
  readonly internal_id: string
  readonly created_at: string
  is_info_filled: boolean
}
