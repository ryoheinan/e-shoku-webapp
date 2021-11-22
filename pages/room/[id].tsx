import type { GetServerSideProps } from 'next'
import { RoomData } from '../../types/RoomInfo'
import { Params } from 'next/dist/server/router'
import Head from 'next/head'
import Image from 'next/image'
import { getAccessToken } from '@auth0/nextjs-auth0'
import axios from '../../utils/commonAxios'
import Nav from '../../components/nav'
import ButtonCard from '../../components/buttonCard'
import styles from '../../styles/room.module.scss'

type Props = {
  roomData: RoomData
}

const Room = ({ roomData }: Props) => {
  return (
    <Nav isRoom={true}>
      <Head>
        <title>{roomData.room_name} | e-Shoku</title>
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
              <div className="h2 text-center mb-0">{roomData.guests?.length}</div>
              <div className={styles.denom}>/{roomData.capacity}人</div>
            </div>
          </div>
        </div>
      </div>{' '}
      <section className={`container ${styles.section}`}>
        <div className={styles.title}>
          <h1>{roomData.room_name}</h1>
        </div>
        <p className={styles.schedule}>2021.08.20 18:30~</p>
        <p className={styles.host}>
          Host:{' '}
          <a href="#" className={styles.username}>
            @Ken
          </a>
        </p>
        <p>{roomData.description}</p>
      </section>
      <section className={`container ${styles.section}`}>
        <ButtonCard
          title="参加する"
          color="#6fd8a3"
          fontSize="1.5rem"
          shadow={true}
          link={{ to: `/` }} // `join/${roomData.id}`
        />
      </section>
    </Nav>
  )
}

export default Room

/**
 * サーバーサイドでRoom情報を取得してroomDataに渡す
 * @param context
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params
  const { req, res } = context
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ['openid', 'profile'],
  })
  const targetUrl = `/rooms/${id}/`

  const response = await axios.get<RoomData>(targetUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const roomData = response.data
  return { props: { roomData } }
}
