import type { AppProps } from 'next/app'
import { UserData } from '../types/UserInfo'
import { useCallback, useEffect, useState } from 'react'
import { useSetRecoilState, RecoilRoot } from 'recoil'
import { currentUserState } from '../states/currentUser'
import { UserProvider } from '@auth0/nextjs-auth0'
import axios from 'axios'
import '../styles/globals.scss'
import { useRouter } from 'next/router'

const AppInit = () => {
  const setCurrentUser = useSetRecoilState(currentUserState)
  const router = useRouter()

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const res = await axios.get<UserData>('/api/user')
        const currentUser: UserData = res.data
        console.log(currentUser)
        if (currentUser.is_info_filled === false) {
          setCurrentUser(null)
          console.log('user info is not filled')
          router.push('/signup')
        } else {
          setCurrentUser(currentUser)
        }
      } catch {
        setCurrentUser(null)
      }
    }
    checkUserInfo()
  }, [setCurrentUser])

  return null
}

const MyApp = ({ Component, pageProps, router }: AppProps) => {
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
