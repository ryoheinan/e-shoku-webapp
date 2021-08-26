import styles from './nav.module.scss'
import Link from 'next/link'

const Nav = ({
  children,
  category,
}: {
  children: React.ReactNode
  category?: 'home' | 'search' | 'account'
}) => {
  return (
    <div className="wrapper">
      <header className={`text-center ${styles.header}`}>
        <div className="container">
          <h1 className="my-2">e-Shoku</h1>
        </div>
      </header>
      <main className={'content container'}>{children}</main>
      <nav
        className={
          'navbar fixed-bottom navbar-light bg-light justify-content-center'
        }
      >
        <div
          className={`col text-center ${
            category === 'home' ? styles.active : ''
          }`}
        >
          <Link href="/">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 0 24 24"
                width="30px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
              </svg>
            </a>
          </Link>
        </div>
        <div
          className={`col text-center ${
            category === 'search' ? styles.active : ''
          }`}
        >
          <Link href="/">
            <a className="nav-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 0 24 24"
                width="30px"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </a>
          </Link>
        </div>
        <div
          className={`col text-center ${
            category === 'account' ? styles.active : ''
          }`}
        >
          <Link href="/">
            <a className="nav-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 0 24 24"
                width="30px"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Nav
