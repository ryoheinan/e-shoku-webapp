export type UserForm = {
  username: string
  display_name: string
  date_of_birth: string
  gender: 'MALE' | 'FEMALE' | 'PNTS' | 'OTHERS'
}

export type UserData = UserForm & {
  id: string
  internal_id: string
}
