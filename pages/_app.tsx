import type { AppProps } from 'next/app'
import type { UserData } from '../types/UserInfo'
import { useEffect } from 'react'
import { useSetRecoilState, RecoilRoot } from 'recoil'
import { currentUserState } from '../states/currentUser'
import { UserProvider } from '@auth0/nextjs-auth0'
import axios from 'axios'
import '../styles/globals.scss'

function AppInit() {
  const setCurrentUser = useSetRecoilState(currentUserState)

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const res = await axios.get<UserData>('/api/user')
        const currentUser: UserData = res.data
        if (currentUser.is_info_filled === false) {
          setCurrentUser(null)
        } else {
          setCurrentUser(currentUser)
        }
      } catch {
        setCurrentUser(null)
      }
    }
    checkUserInfo()
  })

  return null
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <RecoilRoot>
        <Component {...pageProps} />
        <AppInit />
      </RecoilRoot>
    </UserProvider>
  )
}
export default MyApp
