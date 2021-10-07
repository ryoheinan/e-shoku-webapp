import type { NextPage } from 'next'
import Head from 'next/head'
import Nav from '../components/nav'

const Error: NextPage = () => {
  return (
    <Nav>
      <Head>
        <title>404 Not found | e-Shoku</title>
      </Head>

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
          404
          <br />
          Not found
        </h2>
        <p className="text-center">お探しのページは見つかりませんでした</p>
      </section>
    </Nav>
  )
}

export default Error
