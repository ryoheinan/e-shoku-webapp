import type { AppProps } from 'next/app'
import { UserData } from '../types/UserInfo'
import { useEffect } from 'react'
import { useSetRecoilState, RecoilRoot } from 'recoil'
import { useRouter } from 'next/router'
import { UserProvider } from '@auth0/nextjs-auth0'
import axios from 'axios'
import { currentUserState } from '../states/currentUser'
import '../styles/globals.scss'

const AppInit = () => {
  const setCurrentUser = useSetRecoilState(currentUserState)
  const router = useRouter()

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const res = await axios.get<UserData>('/api/user')
        const currentUser = res.data
        if (
          currentUser.is_info_filled === false &&
          router.pathname !== '/signup'
        ) {
          setCurrentUser(null)
          router.push('/signup')
        } else {
          setCurrentUser(currentUser)
        }
      } catch {
        setCurrentUser(null)
      }
    }
    checkUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  return null
}

const MyApp = ({ Component, pageProps }: AppProps) => {
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
