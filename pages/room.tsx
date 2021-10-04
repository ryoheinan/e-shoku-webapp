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
      </div>

      <section>
        <h2 className="container">Hello World Party</h2>
      </section>
    </Nav>
  )
}

export default Room
