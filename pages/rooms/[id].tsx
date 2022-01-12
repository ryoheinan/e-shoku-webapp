import type { GetServerSideProps } from 'next'
import { RoomData } from '../../types/RoomInfo'
import { Params } from 'next/dist/server/router'
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
import { useEffect, useState } from 'react'
import { NextSeo } from 'next-seo'
import { AccessTokenError, getAccessToken } from '@auth0/nextjs-auth0'

type Props = {
  roomData: RoomData | null
  error?: {
    statusCode: number
    message?: string
  }
}

const Room = ({ roomData, error }: Props) => {
  const { currentUser } = useCurrentUser()
  const [canWebShare, setCanWebShare] = useState(true)

  let roomBtnState: 'canJoin' | 'canCancel' | 'canEdit' | 'disabled' =
    'disabled'
  let shareText = ''

  useEffect(() => {
    if (process.browser && !window.navigator.share) {
      setCanWebShare(false)
    }
  }, [])

  if (roomData === null) {
    if (error) {
      return <Error statusCode={error.statusCode} />
    }
  } else {
    if (currentUser && roomData.guests && roomData.hosts) {
      if (roomData.guests.some((guest) => guest.id === currentUser.id)) {
        roomBtnState = 'canCancel'
        shareText = `${roomData.room_name} に参加します!`
      } else if (roomData.hosts.some((host) => host.id === currentUser.id)) {
        roomBtnState = 'canEdit'
        shareText = `${roomData.room_name} に参加しませんか?`
      } else {
        roomBtnState = 'canJoin'
        shareText =
          roomData.description.slice(0, 15) +
          (roomData.description.length > 15 ? '...' : '')
      }
    }

    const handleShare = async () => {
      try {
        await navigator.share({
          title: `${roomData.room_name} | e-Shoku`,
          text: shareText,
          url: `https://e-shoku.netlify.app/rooms/${roomData.id}`,
        })
      } catch (ignore) {}
    }

    const shareUrlTwitter = encodeURI(
      `https://twitter.com/share?url=https://e-shoku.netlify.app/rooms/${roomData.id}&text=${shareText}&hashtags=オンライン食事会,eshoku`
    )
    const shareUrlLine = encodeURI(
      `https://social-plugins.line.me/lineit/share?url=https://e-shoku.netlify.app/rooms/${roomData.id}&text=${shareText}`
    )
    const ogpImageUrl = encodeURI(
      `https://og-image.ryohei.dev/**${roomData.room_name}**.png?textColor=%23000000&md=1&fontSize=125px&marginTop=400px&background=https%3A%2F%2Fe-shoku.netlify.app%2Fimages%2Fdynamic_ogp.png`
    )

    return (
      <Nav isRoom={true}>
        <NextSeo
          title={`${roomData.room_name} | e-Shoku`}
          description={roomData.description}
          openGraph={{
            url: `https://e-shoku.netlify.app/rooms/${roomData.id}`,
            title: `${roomData.room_name} | e-Shoku`,
            description: roomData.description,
            images: [
              {
                url: ogpImageUrl,
                width: 2048,
                height: 1170,
                alt: roomData.room_name,
              },
            ],
          }}
          twitter={{
            cardType: 'summary_large_image',
          }}
        />
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
          <div className={styles.roomInfo}>
            主催者:{' '}
            {roomData.hosts?.map((host) => (
              <Link key={host.id} href={`/users/${host.id}`}>
                <a className="me-1">@{host.username}</a>
              </Link>
            ))}
            {roomData.meeting_url !== undefined && (
              <div>
                ミーティングURL:{' '}
                {roomData.meeting_url ? (
                  <a
                    href={roomData.meeting_url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    {roomData.meeting_url}
                  </a>
                ) : (
                  <span className="text-muted">設定されていません</span>
                )}
              </div>
            )}
          </div>

          <p className={styles.roomDescription}>{roomData.description}</p>
        </section>
        <div className={`container ${styles.section} mb-4`}>
          {roomBtnState === 'canJoin' && (
            <ButtonCard
              title="参加する"
              color="#ace84a"
              fontSize="1.3rem"
              shadow={true}
              link={{ to: `join/${roomData.id}` }}
            />
          )}
          {roomBtnState === 'canCancel' && (
            <RoomActionBtn
              mode="leave"
              roomId={roomData.id}
              text="キャンセルする"
              bgColor="#dc3545"
              textColor="#ffffff"
            />
          )}
          {roomBtnState === 'disabled' && (
            <ButtonCard
              title="ログインが必要です"
              color="#ace84a"
              fontSize="1.3rem"
              shadow={true}
              disabled
            />
          )}
          {roomBtnState === 'canEdit' && (
            <ButtonCard
              title="編集する"
              color="#FCE37E"
              fontSize="1.3rem"
              shadow={true}
              link={{ to: `edit/${roomData.id}` }}
            />
          )}
        </div>
        <section className={`container ${styles.section}`}>
          <div className="d-flex justify-content-between mb-2">
            <a
              className={`btn ${styles.btnShareTwitter}`}
              href={shareUrlTwitter}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Twitterで共有
            </a>
            <a
              className={`btn ${styles.btnShareLine}`}
              href={shareUrlLine}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              LINEで共有
            </a>
          </div>
          {canWebShare && (
            <button className={`btn ${styles.btnShare}`} onClick={handleShare}>
              その他で共有
            </button>
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

  let token: string | undefined
  try {
    // ログインしている場合はtokenを取得
    const { accessToken } = await getAccessToken(context.req, context.res, {
      scopes: ['openid', 'profile'],
    })
    token = accessToken
  } catch (error: unknown) {
    if (!(error instanceof AccessTokenError)) {
      return { props: { userData: null, error: { statusCode: 500 } } }
    }
  }

  try {
    const response = await axios.get<RoomData>(
      targetUrl,
      token ? { headers: { Authorization: `Bearer ${token}` } } : {}
    )
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
