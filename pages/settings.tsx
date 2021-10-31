import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import Nav from '../components/nav'
import styles from '../styles/settings.module.scss'
import Image from 'next/image'

const Settings: NextPage = () => {
  const { user, error, isLoading } = useUser()

  return (
    <Nav category="settings">
      <Head>
        <title>プロフィール | e-Shoku</title>
      </Head>
      <div className="container">
        {isLoading && (
          //ロード状態
          <p>Loading login info...</p>
        )}
        {error && (
          //エラー発生の処理
          <>
            <h4>Error</h4>
            <pre>{error.message}</pre>
          </>
        )}
        {user && (
          //Userがいる状態(ログイン状態の処理)
          <div>
            <h2 className={styles.title}>プロフィール</h2>
            <div className="container">
              <div className={styles.image}>
                <Image
                  src="/images/default_icon.jpg"
                  alt="default_icon"
                  width={75}
                  height={75}
                />
              </div>{' '}
              <div className={styles.username}>{user.name}</div>
            </div>
            <br></br>
            <div className="container">
              <div className={styles.text}>
                Hello World! Happy coding! Nice to meet you!
              </div>
            </div>
            <br></br>

            <div className="container">
              <div className={styles.usersettings}>
                <a className={styles.a} href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25px"
                    viewBox="2 2 24 24"
                    width="25px"
                    fill="#000000"
                  >
                    <path d="M 12 2 C 6.48 2 2 6.48 2 12 s 4.48 10 10 10 s 10 -4.48 10 -10 S 17.52 2 12 2 Z m 0 3 c 1.66 0 3 1.34 3 3 s -1.34 3 -3 3 s -3 -1.34 -3 -3 s 1.34 -3 3 -3 Z m 0 14.2 c -2.5 0 -4.71 -1.28 -6 -3.22 c 0.03 -1.99 4 -3.08 6 -3.08 c 1.99 0 5.97 1.09 6 3.08 c -1.29 1.94 -3.5 3.22 -6 3.22 Z" />
                  </svg>{' '}
                  User Settings
                </a>
              </div>
              <div className={styles.History}>
                <a className={styles.a} href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25px"
                    viewBox="2 2 24 24"
                    width="25px"
                    fill="#000000"
                  >
                    <path d="M 21 5 c -1.11 -0.35 -2.33 -0.5 -3.5 -0.5 c -1.95 0 -4.05 0.4 -5.5 1.5 c -1.45 -1.1 -3.55 -1.5 -5.5 -1.5 S 2.45 4.9 1 6 v 14.65 c 0 0.25 0.25 0.5 0.5 0.5 c 0.1 0 0.15 -0.05 0.25 -0.05 C 3.1 20.45 5.05 20 6.5 20 c 1.95 0 4.05 0.4 5.5 1.5 c 1.35 -0.85 3.8 -1.5 5.5 -1.5 c 1.65 0 3.35 0.3 4.75 1.05 c 0.1 0.05 0.15 0.05 0.25 0.05 c 0.25 0 0.5 -0.25 0.5 -0.5 V 6 C 22.4 5.55 21.75 5.25 21 5 Z M 21 18.5 c -1.1 -0.35 -2.3 -0.5 -3.5 -0.5 c -1.7 0 -4.15 0.65 -5.5 1.5 V 8 c 1.35 -0.85 3.8 -1.5 5.5 -1.5 c 1.2 0 2.4 0.15 3.5 0.5 V 18.5 Z" />
                  </svg>{' '}
                  History
                </a>
              </div>
              <div className={styles.covid}>
                <a className={styles.a} href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25px"
                    viewBox="2 2 24 24"
                    width="25px"
                    fill="#000000"
                  >
                    <path d="M 19.5 6 c -1.31 0 -2.37 1.01 -2.48 2.3 C 15.14 7.8 14.18 6.5 12 6.5 c -2.19 0 -3.14 1.3 -5.02 1.8 C 6.87 7.02 5.81 6 4.5 6 C 3.12 6 2 7.12 2 8.5 V 9 c 0 6 3.6 7.81 6.52 7.98 C 9.53 17.62 10.72 18 12 18 s 2.47 -0.38 3.48 -1.02 C 18.4 16.81 22 15 22 9 V 8.5 C 22 7.12 20.88 6 19.5 6 Z M 3.5 9 V 8.5 c 0 -0.55 0.45 -1 1 -1 s 1 0.45 1 1 v 3 c 0 1.28 0.38 2.47 1.01 3.48 C 4.99 14.27 3.5 12.65 3.5 9 Z M 20.5 9 c 0 3.65 -1.49 5.27 -3.01 5.98 c 0.64 -1.01 1.01 -2.2 1.01 -3.48 v -3 c 0 -0.55 0.45 -1 1 -1 s 1 0.45 1 1 V 9 Z M 10.69 10.48 c -0.44 0.26 -0.96 0.56 -1.69 0.76 V 10.2 c 0.48 -0.17 0.84 -0.38 1.18 -0.58 C 10.72 9.3 11.23 9 12 9 s 1.27 0.3 1.8 0.62 c 0.34 0.2 0.71 0.42 1.2 0.59 v 1.04 c -0.75 -0.21 -1.26 -0.51 -1.71 -0.78 C 12.83 10.2 12.49 10 12 10 C 11.51 10 11.16 10.2 10.69 10.48 Z" />
                  </svg>{' '}
                  About COVID-19
                </a>
              </div>
              <div className={styles.login}>
                <a className={styles.a} href="/api/auth/logout">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25px"
                    viewBox="2 2 24 24"
                    width="25px"
                    fill="#000000"
                  >
                    <path d="M 17 7 l -1.41 1.41 L 18.17 11 H 8 v 2 h 10.17 l -2.58 2.58 L 17 17 l 5 -5 Z M 4 5 h 8 V 3 H 4 c -1.1 0 -2 0.9 -2 2 v 14 c 0 1.1 0.9 2 2 2 h 8 v -2 H 4 V 5 Z" />
                  </svg>{' '}
                  Logout
                </a>
              </div>
            </div>
          </div>
        )}
        {!isLoading && !error && !user && (
          //Userがない状態(ログアウト状態の処理)
          <div>
            <h2>ログイン</h2>
            <div className="container">
              <a className={styles.a} href="/api/auth/login">
                Login
              </a>
            </div>
          </div>
        )}
      </div>
    </Nav>
  )
}

export default Settings
