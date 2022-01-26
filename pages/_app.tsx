import type { AppProps } from 'next/app'
import { UserData } from '../types/UserInfo'
import { useEffect } from 'react'
import { useSetRecoilState, RecoilRoot } from 'recoil'
import { useRouter } from 'next/router'
import { UserProvider } from '@auth0/nextjs-auth0'
import axios from 'axios'
import { DefaultSeo } from 'next-seo'
import { currentUserState } from '../states/currentUser'
import '../styles/globals.scss'

const AppInit = () => {
  const setCurrentUser = useSetRecoilState(currentUserState)
  const router = useRouter()
  let tryCount = 0

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const res = await axios.get<UserData>('/api/users', { timeout: 6000 })
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
      } catch (error: unknown) {
        setCurrentUser(null)
        // Axiosに関するエラーの場合
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 500) {
            if (tryCount >= 3) {
              setTimeout(checkUserInfo, 600)
              tryCount++
            } else {
              router.replace('/500')
            }
          }
        }
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
        <DefaultSeo
          dangerouslySetAllPagesToNoIndex={true}
          description="オンライン食事会のニューノーマル"
          openGraph={{
            title: 'e-Shoku',
            type: 'website',
            url: 'https://e-shoku.netlify.app',
            locale: 'ja_JP',
            site_name: 'e-Shoku',
            images: [
              {
                url: 'https://e-shoku.netlify.app/images/static_ogp.png',
                width: 2048,
                height: 1170,
                alt: 'オンライン食事会のニューノーマル',
              },
            ],
          }}
          twitter={{
            cardType: 'summary_large_image',
          }}
        />
        <Component {...pageProps} />
        <AppInit />
      </RecoilRoot>
    </UserProvider>
  )
}
export default MyApp
