import Link from 'next/link'
import Image from 'next/image'
import styles from './nav.module.scss'

const Nav = ({
  children,
  category,
  isRoom,
  bottomNav = true,
}: {
  children: React.ReactNode
  category?: 'home' | 'explore' | 'settings'
  isRoom?: boolean
  bottomNav?: boolean
}) => {
  return (
    <>
      <header
        className={`text-center fixed-top ${styles.header} ${
          !isRoom ? 'mb-3' : ''
        }`}
      >
        <Image
          className={styles.eshoku}
          alt="e-Shokuのロゴ画像"
          src="/images/header_logo.png"
          width={100}
          height={45}
        />
      </header>
      <main className={styles.main}>{children}</main>
      {bottomNav && (
        <nav className={`fixed-bottom bg-light py-2 ${styles.nav}`}>
          <ul
            className={`d-flex justify-content-center list-unstyled ${styles.items}`}
          >
            <li
              className={`col text-center ${
                category === 'home' ? styles.active : ''
              }`}
            >
              <Link href="/">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="36px"
                    viewBox="0 0 24 24"
                    width="36px"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
                  </svg>
                </a>
              </Link>
            </li>
            <li
              className={`col text-center ${
                category === 'explore' ? styles.active : ''
              }`}
            >
              <Link href="/">
                <a className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="36px"
                    viewBox="0 0 24 24"
                    width="36px"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                </a>
              </Link>
            </li>
            <li
              className={`col text-center ${
                category === 'settings' ? styles.active : ''
              }`}
            >
              <Link href="/settings">
                <a className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="36px"
                    viewBox="0 0 24 24"
                    width="36px"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" />
                  </svg>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  )
}

export default Nav
