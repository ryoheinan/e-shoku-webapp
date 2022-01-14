import type { GetServerSideProps } from 'next'
import { RoomData } from '../../../types/RoomInfo'
import { Params } from 'next/dist/server/router'
import Error from '../../_error'
import axios, { isAxiosError } from '../../../utils/commonAxios'
import Nav from '../../../components/nav'
import RoomActionBtn from '../../../components/roomActionBtn'
import { useState } from 'react'
import RoomCard from '../../../components/roomCard'
import styles from '../../../styles/room.module.scss'
import { NextSeo } from 'next-seo'

type Props = {
  roomData: RoomData | null
  error?: {
    statusCode: number
    message?: string
  }
}

const JoinRoom = ({ roomData, error }: Props) => {
  const [isChecked, setIsChecked] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [isChecked3, setIsChecked3] = useState(false)
  const toggleCheckbox1 = () => {
    setIsChecked(!isChecked)
  }
  const toggleCheckbox2 = () => {
    setIsChecked2(!isChecked2)
  }
  const toggleCheckbox3 = () => {
    setIsChecked3(!isChecked3)
  }
  if (roomData === null) {
    if (error) {
      return <Error statusCode={error.statusCode} />
    }
  } else {
    const ogpImageUrl = encodeURI(
      `https://og-image.ryohei.dev/**${roomData.room_title}**.png?textColor=%23000000&md=1&fontSize=125px&marginTop=400px&background=https%3A%2F%2Fe-shoku.netlify.app%2Fimages%2Fdynamic_ogp.png`
    )

    return (
      <Nav isRoom={true}>
        <NextSeo
          title={`${roomData.room_title}に参加する | e-Shoku`}
          description={roomData.description}
          openGraph={{
            url: `https://e-shoku.netlify.app/rooms/${roomData.id}`,
            title: `${roomData.room_title} | e-Shoku`,
            description: roomData.description,
            images: [
              {
                url: ogpImageUrl,
                width: 2048,
                height: 1170,
                alt: roomData.room_title,
              },
            ],
          }}
          twitter={{
            cardType: 'summary_large_image',
          }}
        />
        <div className={'container'}>
          <section className={styles.RoomCard}>
            <RoomCard
              title={roomData.room_title}
              date={roomData.datetime}
              imageUrl="/images/foods.jpg"
            />
          </section>
          <section>
            <label className={styles.check_lb}>
              <input type="checkbox" onChange={() => toggleCheckbox1()} />{' '}
              会話の際には必ずマスクを着用してください。
            </label>
            <label className={styles.check_lb}>
              <input type="checkbox" onChange={() => toggleCheckbox2()} />{' '}
              周りの迷惑になるような大声での会話はお控えください。
            </label>
            <label className={styles.check_lb}>
              <input type="checkbox" onChange={() => toggleCheckbox3()} />{' '}
              こまめな手洗い・消毒を行ってください。
            </label>
          </section>
          <section>
            <RoomActionBtn
              mode="join"
              roomId={roomData.id}
              text="参加する"
              disabled={!isChecked || !isChecked2 || !isChecked3}
              bgColor="#ace84a"
            />
          </section>
        </div>
      </Nav>
    )
  }
}

export default JoinRoom

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
