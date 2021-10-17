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
        <h2>プロフィール</h2>
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
            <div className="container">
              <Image
                src="/images/default_icon.jpg"
                alt="icon"
                width={75}
                height={75}
              />{' '}
              <div className={styles.username}>{user.name}</div>
            </div>
            <br></br>
            <div className="container">
              Hello World! Happy coding! Nice to meet you!
            </div>
            <br></br>
            <br></br>
            <div className="container">
              <div className={styles.usersettings}>User Settings</div>
              <div className={styles.History}>History</div>
              <div className={styles.covid}>About COVID-19</div>
              <div className={styles.login}>
                <a href="/api/auth/logout">Logout</a>
              </div>
            </div>
          </div>
        )}
        {!isLoading && !error && !user && (
          //Userがない状態(ログアウト状態の処理)
          <div>
            <a href="/api/auth/login">Login</a>
          </div>
        )}
      </div>
    </Nav>
  )
}

export default Settings
