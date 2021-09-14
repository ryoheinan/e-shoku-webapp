import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import Nav from '../components/nav'

const Settings: NextPage = () => {
  const { user, error, isLoading } = useUser()

  return (
    <Nav category="settings">
      <Head>
        <title>設定 | e-Shoku</title>
      </Head>
      <div className="container">
        <h2>設定</h2>
        {isLoading && <p>Loading login info...</p>}
        {error && (
          <>
            <h4>Error</h4>
            <pre>{error.message}</pre>
          </>
        )}
        {user && (
          <div>
            Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
          </div>
        )}
        {!isLoading && !error && !user && (
          <div>
            <a href="/api/auth/login">Login</a>
          </div>
        )}
      </div>
    </Nav>
  )
}

export default Settings
