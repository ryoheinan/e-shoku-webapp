import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/nav'
import RoomCard from '../components/roomCard'
import InfoCard from '../components/infoCard'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <Nav category="home">
      <Head>
        <title>e-Shoku</title>
      </Head>
      <div className={'container mb-5'}>
        <p>Hello World</p>
        <Link href="/">
          <a>
            <RoomCard
              title="Hello World Party"
              date="2021.08.21"
              imageUrl="/images/foods.jpg"
            ></RoomCard>
          </a>
        </Link>
      </div>
      <ul className={'scrollable container'}>
        <li>
          <InfoCard
            title="Health & Safety"
            color="#6fd8a3"
            fontSize="1.5rem"
            shadow={true}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="35px"
              viewBox="0 0 24 24"
              width="35px"
              fill="#000000"
            >
              <rect fill="none" height="24" width="24" />
              <path d="M10.5,13H8v-3h2.5V7.5h3V10H16v3h-2.5v2.5h-3V13z M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V5L12,2 z M18,11.09c0,4-2.55,7.7-6,8.83c-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25l6,2.25V11.09z" />
            </svg>
          </InfoCard>
        </li>
        <li>
          <InfoCard
            title="Health & Safety"
            color="#6fd8a3"
            fontSize="1.5rem"
            shadow={true}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="35px"
              viewBox="0 0 24 24"
              width="35px"
              fill="#000000"
            >
              <rect fill="none" height="24" width="24" />
              <path d="M10.5,13H8v-3h2.5V7.5h3V10H16v3h-2.5v2.5h-3V13z M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V5L12,2 z M18,11.09c0,4-2.55,7.7-6,8.83c-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25l6,2.25V11.09z" />
            </svg>
          </InfoCard>
        </li>
      </ul>
    </Nav>
  )
}

export default Home
