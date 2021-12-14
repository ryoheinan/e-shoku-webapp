import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Nav from '../components/nav'

const Error500: NextPage = () => {
  return (
    <div style={styles.error}>
      <Nav>
        <NextSeo
          title="500 Internal Server Error | e-Shoku"
          openGraph={{ title: '500 Internal Server Error | e-Shoku' }}
        />

        <section className="text-center mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="72px"
            viewBox="0 0 24 24"
            width="72px"
            fill="#e05d5d"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>

          <h2>
            500
            <br />
            Internal Server Error
          </h2>
        </section>
      </Nav>
    </div>
  )
}

export default Error500

const styles: { [k: string]: React.CSSProperties } = {
  error: {
    color: '#000',
    background: '#fff',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
