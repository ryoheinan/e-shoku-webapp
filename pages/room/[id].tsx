import type { GetServerSideProps } from 'next'
import { RoomData } from '../../types/RoomInfo'
import { Params } from 'next/dist/server/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import Error from '../_error'
import axios, { isAxiosError } from '../../utils/commonAxios'
import Nav from '../../components/nav'
import styles from '../../styles/room.module.scss'
import RoomActionBtn from '../../components/roomActionBtn'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import ButtonCard from '../../components/buttonCard'

type Props = {
  roomData: RoomData | null
  error?: {
    statusCode: number
    message?: string
  }
}

const Room = ({ roomData, error }: Props) => {
  const { currentUser } = useCurrentUser()
  let roomBtnState: 'canJoin' | 'canCancel' | 'canEdit' | 'disabled' =
    'disabled'
  if (roomData === null) {
    if (error) {
      return <Error statusCode={error.statusCode} />
    }
  } else {
    if (currentUser && roomData.guests && roomData.hosts) {
      if (roomData.guests.some((guest) => guest.id === currentUser.id)) {
        roomBtnState = 'canCancel'
      } else if (roomData.hosts.some((host) => host.id === currentUser.id)) {
        roomBtnState = 'canEdit'
      } else {
        roomBtnState = 'canJoin'
      }
    }

    return (
      <Nav isRoom={true}>
        <Head>
          <title>{roomData.room_name} | e-Shoku</title>
          <meta name="description" content={roomData.description} />
          <meta
            property="og:title"
            content={`${roomData.room_name} | e-Shoku`}
          />
          <meta property="og:description" content={roomData.description} />
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
                <div className="text-center small text-muted mb-1">
                  参加人数
                </div>
                <div className="h2 text-center mb-0">
                  {roomData.guests_count}
                </div>
                <div className={styles.denom}>/{roomData.capacity}人</div>
              </div>
            </div>
          </div>
        </div>{' '}
        <section className={`container ${styles.section}`}>
          <div className={styles.title}>
            <h1>{roomData.room_name}</h1>
          </div>
          <p className={styles.schedule}>
            {dayjs(roomData.datetime).format('YYYY/MM/DD HH:mm')}~
          </p>
          <p className={styles.host}>
            主催者:{' '}
            {roomData.hosts?.map((host) => (
              <Link key={host.id} href={`/user/${host.id}`}>
                <a className="me-1">@{host.username}</a>
              </Link>
            ))}
          </p>
          <p>{roomData.description}</p>
        </section>
        <section className={`container ${styles.section}`}>
          {roomBtnState == 'canJoin' && (
            <ButtonCard
              title="参加する"
              color="#ace84a"
              fontSize="1.5rem"
              shadow={true}
              link={{ to: `join/${roomData.id}` }}
            />
          )}
          {roomBtnState == 'canCancel' && (
            <RoomActionBtn
              mode="leave"
              roomId={roomData.id}
              text="キャンセルする"
              bgColor="#77bde2"
            />
          )}
          {roomBtnState == 'disabled' && (
            <RoomActionBtn
              mode="join"
              roomId={roomData.id}
              text="ログインが必要です"
              disabled
            />
          )}
          {roomBtnState == 'canEdit' && (
            <ButtonCard
              title="編集する"
              color="#FCE37E"
              fontSize="1.5rem"
              shadow={true}
              link={{ to: `edit/${roomData.id}` }}
            />
          )}
        </section>
      </Nav>
    )
  }
}

export default Room

/**
 * サーバーサイドでRoom情報を取得してroomDataに渡す
 * @param context
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params
  const targetUrl = `/rooms/${id}/`

  // idがUUIDの形式でない場合はエラー（404）
  const reUuid = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
  if (!reUuid.test(id)) {
    return { props: { roomData: null, error: { statusCode: 404 } } }
  }

  try {
    const response = await axios.get<RoomData>(targetUrl)
    const roomData = response.data
    return { props: { roomData } }
  } catch (error: unknown) {
    // Axiosに関するエラーの場合
    if (isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        context.res.statusCode = 404
        return { props: { roomData: null, error: { statusCode: 404 } } }
      } else {
        return {
          props: {
            roomData: null,
            error: { statusCode: error.response.status },
          },
        }
      }
    } else {
      return { props: { userData: null, error: { statusCode: 500 } } }
    }
  }
}
