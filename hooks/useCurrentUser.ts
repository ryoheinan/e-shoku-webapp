import { useRecoilValue } from 'recoil'
import { currentUserState } from '../states/currentUser'

export function useCurrentUser() {
  const currentUser = useRecoilValue(currentUserState)
  const userChecking = currentUser === undefined
  return {
    currentUser,
    userChecking,
  }
}
