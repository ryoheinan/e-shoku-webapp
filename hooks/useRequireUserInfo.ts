import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCurrentUser } from './useCurrentUser'

export function useRequireUserInfo() {
  const { userChecking, currentUser } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (userChecking) return
    if (!currentUser) router.push('/signup')
  }, [userChecking, currentUser, router])
}
