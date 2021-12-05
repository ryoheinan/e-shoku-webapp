import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import Link from 'next/link'
import Error from './_error'
import Nav from '../components/nav'
import ButtonCard from '../components/buttonCard'
import Loading from '../components/loading'
import styles from '../styles/settings.module.scss'
import { useCurrentUser } from '../hooks/useCurrentUser'
import UserProfile from '../components/userProfile'

const Settings: NextPage = () => {
  const { user, error, isLoading } = useUser()
  const { currentUser } = useCurrentUser()

  if (!user && !currentUser && !isLoading) {
    return <Error statusCode={400} />
  }
  return (
    <Nav category="settings">
      <Head>
        <title>設定 | e-Shoku</title>
      </Head>
      <div className="container">
        {isLoading && (
          //ロード状態
          <Loading />
        )}
        {user && currentUser && (
          //Userがいる状態(ログイン状態の処理)
          <>
            <h2 className="title">設定</h2>
            <UserProfile data={currentUser} profileIcon={user?.picture} />
            <div className={styles.settingsItem}>
              <Link href="/userinfo">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25px"
                    viewBox="0 0 25 25"
                    width="25px"
                    fill="#000000"
                  >
                    <path d="M 12 2 C 6.48 2 2 6.48 2 12 s 4.48 10 10 10 s 10 -4.48 10 -10 S 17.52 2 12 2 Z m 0 3 c 1.66 0 3 1.34 3 3 s -1.34 3 -3 3 s -3 -1.34 -3 -3 s 1.34 -3 3 -3 Z m 0 14.2 c -2.5 0 -4.71 -1.28 -6 -3.22 c 0.03 -1.99 4 -3.08 6 -3.08 c 1.99 0 5.97 1.09 6 3.08 c -1.29 1.94 -3.5 3.22 -6 3.22 Z" />
                  </svg>{' '}
                  ユーザー設定
                </a>
              </Link>
            </div>
            <div className={styles.settingsItem}>
              <Link href={`/user/${currentUser.id}`}>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="25px"
                    viewBox="0 0 25 25"
                    width="25px"
                    fill="#000000"
                  >
                    <g>
                      <rect fill="none" height="24" width="24" y="0" />
                    </g>
                    <g>
                      <g>
                        <rect height="1.5" width="4" x="14" y="12" />
                        <rect height="1.5" width="4" x="14" y="15" />
                        <path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M11,7V4h2v3v2h-2V7z M20,20H4V9h5c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2h5V20z" />
                        <circle cx="9" cy="13.5" r="1.5" />
                        <path d="M11.08,16.18C10.44,15.9,9.74,15.75,9,15.75s-1.44,0.15-2.08,0.43C6.36,16.42,6,16.96,6,17.57V18h6v-0.43 C12,16.96,11.64,16.42,11.08,16.18z" />
                      </g>
                    </g>
                  </svg>{' '}
                  マイプロフィール
                </a>
              </Link>
            </div>
            <div className={styles.settingsItem}>
              <Link href="#">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25px"
                    viewBox="0 0 25 25"
                    width="25px"
                    fill="#000000"
                  >
                    <path d="M 21 5 c -1.11 -0.35 -2.33 -0.5 -3.5 -0.5 c -1.95 0 -4.05 0.4 -5.5 1.5 c -1.45 -1.1 -3.55 -1.5 -5.5 -1.5 S 2.45 4.9 1 6 v 14.65 c 0 0.25 0.25 0.5 0.5 0.5 c 0.1 0 0.15 -0.05 0.25 -0.05 C 3.1 20.45 5.05 20 6.5 20 c 1.95 0 4.05 0.4 5.5 1.5 c 1.35 -0.85 3.8 -1.5 5.5 -1.5 c 1.65 0 3.35 0.3 4.75 1.05 c 0.1 0.05 0.15 0.05 0.25 0.05 c 0.25 0 0.5 -0.25 0.5 -0.5 V 6 C 22.4 5.55 21.75 5.25 21 5 Z M 21 18.5 c -1.1 -0.35 -2.3 -0.5 -3.5 -0.5 c -1.7 0 -4.15 0.65 -5.5 1.5 V 8 c 1.35 -0.85 3.8 -1.5 5.5 -1.5 c 1.2 0 2.4 0.15 3.5 0.5 V 18.5 Z" />
                  </svg>{' '}
                  履歴
                </a>
              </Link>
            </div>
            <div className={styles.settingsItem}>
              <a
                href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000164708_00001.html"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 25 25"
                  height="25px"
                  viewBox="0 0 25 25"
                  width="25px"
                  fill="#000000"
                >
                  <rect fill="none" height="24" width="24" />
                  <path d="M19.5,6c-1.31,0-2.37,1.01-2.48,2.3C15.14,7.8,14.18,6.5,12,6.5c-2.19,0-3.14,1.3-5.02,1.8C6.87,7.02,5.81,6,4.5,6 C3.12,6,2,7.12,2,8.5V9c0,6,3.6,7.81,6.52,7.98C9.53,17.62,10.72,18,12,18s2.47-0.38,3.48-1.02C18.4,16.81,22,15,22,9V8.5 C22,7.12,20.88,6,19.5,6z M3.5,9V8.5c0-0.55,0.45-1,1-1s1,0.45,1,1v3c0,1.28,0.38,2.47,1.01,3.48C4.99,14.27,3.5,12.65,3.5,9z M7,11.5V9.85c1.12-0.23,1.95-0.69,2.66-1.08C10.48,8.33,11.07,8,12,8c0.93,0,1.52,0.33,2.34,0.78c0.71,0.39,1.54,0.84,2.66,1.08 v1.65c0,2.76-2.24,5-5,5S7,14.26,7,11.5z M20.5,9c0,3.65-1.49,5.27-3.01,5.98c0.64-1.01,1.01-2.2,1.01-3.48v-3c0-0.55,0.45-1,1-1 s1,0.45,1,1V9z M10.69,10.48c-0.44,0.26-0.96,0.56-1.69,0.76V10.2c0.48-0.17,0.84-0.38,1.18-0.58C10.72,9.3,11.23,9,12,9 s1.27,0.3,1.8,0.62c0.34,0.2,0.71,0.42,1.2,0.59v1.04c-0.75-0.21-1.26-0.51-1.71-0.78C12.83,10.2,12.49,10,12,10 C11.51,10,11.16,10.2,10.69,10.48z" />
                </svg>{' '}
                COVID-19について
              </a>
            </div>
            <div className={styles.settingsItem}>
              <a href="/api/auth/logout">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25px"
                  viewBox="0 0 25 25"
                  width="25px"
                  fill="#000000"
                >
                  <path d="M 17 7 l -1.41 1.41 L 18.17 11 H 8 v 2 h 10.17 l -2.58 2.58 L 17 17 l 5 -5 Z M 4 5 h 8 V 3 H 4 c -1.1 0 -2 0.9 -2 2 v 14 c 0 1.1 0.9 2 2 2 h 8 v -2 H 4 V 5 Z" />
                </svg>{' '}
                ログアウト
              </a>
            </div>
          </>
        )}
        {!isLoading && !error && !user && (
          //Userがない状態(ログアウト状態の処理)
          <>
            <h2 className="title">はじめる</h2>
            <div className={styles.elementCenter}>
              <div>
                <div className={styles.startWithLogin}>
                  ログインをして
                  <br />
                  始めましょう！
                </div>
                <ButtonCard
                  title="ログイン"
                  color="#f3ae56"
                  fontSize="1.3rem"
                  shadow={true}
                  link={{ to: '/api/auth/login', useAnchorOnly: true }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="25px"
                    viewBox="0 0 24 24"
                    width="25px"
                    fill="#000000"
                  >
                    <rect fill="none" height="24" width="24" />
                    <path d="M 11 7 L 9.6 8.4 l 2.6 2.6 H 2 v 2 h 10.2 l -2.6 2.6 L 11 17 l 5 -5 L 11 7 Z M 20 19 h -8 v 2 h 8 c 1.1 0 2 -0.9 2 -2 V 5 c 0 -1.1 -0.9 -2 -2 -2 h -8 v 2 h 8 V 19 Z" />
                  </svg>
                </ButtonCard>
              </div>
            </div>
          </>
        )}
      </div>
    </Nav>
  )
}

export default Settings
