import type { GetServerSideProps } from 'next'
import { RoomData } from '../../../types/RoomInfo'
import { Params } from 'next/dist/server/router'
import Head from 'next/head'
import Error from '../../_error'
import axios, { isAxiosError } from '../../../utils/commonAxios'
import Nav from '../../../components/nav'
import RoomActionBtn from '../../../components/roomActionBtn'
import { useState } from 'react'
import RoomCard from '../../../components/roomCard'
import styles from '../../../styles/room.module.scss'

type Props = {
  roomData: RoomData | null
  error?: {
    statusCode: number
    message?: string
  }
}

const Room = ({ roomData, error }: Props) => {
  const [isChecked, setIsChecked] = useState(false)
  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
  }
  if (roomData === null) {
    if (error) {
      return <Error statusCode={error.statusCode} />
    }
  } else {
    return (
      <Nav isRoom={true}>
        <Head>
          <title>{roomData.room_name} | e-Shoku</title>
        </Head>
        <div className={'container'}>
          <section>
            <RoomCard
              title={roomData.room_name}
              date={roomData.datetime}
              imageUrl="/images/foods.jpg"
            />
          </section>
          <section>
            <label className={styles.check_lb}>
              <input type="checkbox" onChange={() => toggleCheckbox()} />
              text
            </label>
            <label className={styles.check_lb}>
              <input type="checkbox" onChange={() => toggleCheckbox()} />
              text
            </label>
            <label className={styles.check_lb}>
              <input type="checkbox" onChange={() => toggleCheckbox()} />
              text
            </label>
          </section>
          <section>
            <RoomActionBtn
              mode="join"
              roomId={roomData.id}
              text="参加する"
              disabled={!isChecked}
            />
          </section>
        </div>
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
