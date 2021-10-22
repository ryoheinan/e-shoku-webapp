import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '../components/nav'
import ButtonCard from '../components/buttonCard'
import styles from '../styles/room.module.scss'

const Room: NextPage = () => {
  return (
    <Nav isRoom={true}>
      <Head>
        <title>e-Shoku</title>
      </Head>
      <div className={`mb-4 ${styles.topImage}`}>
        <Image
          alt="Foods"
          src="/images/foods.jpg"
          layout="fill"
          quality={100}
          objectFit="cover"
        />
        <div
          className={`container d-flex justify-content-end ${styles.circleArea}`}
        >
          <div
            className={`d-flex justify-content-center align-items-center ${styles.circle}`}
          >
            <div>
              <div className="text-center small text-muted mb-1">参加人数</div>
              <div className="h2 text-center mb-0">500</div>
              <div className={styles.denom}>/1000人</div>
            </div>
          </div>
        </div>
      </div>{' '}
      <section className={`container ${styles.section}`}>
        <div className={styles.title}>
          <h1>Online dinner</h1>
        </div>
        <p className={styles.schedule}>2021.08.20 18:30~</p>
        <p className={styles.host}>
          Host:{' '}
          <a href="#" className={styles.username}>
            @Ken
          </a>
        </p>
        <p>
          This is an online dinner. Lets enjoy! I like sushi. I ll play
          baseball. This is a pen. He is a pen. Oh my god.
        </p>
      </section>
      <section className={`container ${styles.section}`}>
        <Link href="/">
          <a className={styles.tag}>
            <ButtonCard
              title="参加する"
              color="#6fd8a3"
              fontSize="1.5rem"
              shadow={true}
              link={{ to: '/' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="0px"
                viewBox="0 0 24 24"
                width="0px"
                fill="#000000"
              >
                <rect fill="none" height="24" width="24" />
                <path d="M10.5,13H8v-3h2.5V7.5h3V10H16v3h-2.5v2.5h-3V13z M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V5L12,2 z M18,11.09c0,4-2.55,7.7-6,8.83c-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25l6,2.25V11.09z" />
              </svg>
            </ButtonCard>
          </a>
        </Link>
      </section>
    </Nav>
  )
}

export default Room
