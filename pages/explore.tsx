import type { NextPage } from 'next'
import Link from 'next/link'
import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NextSeo } from 'next-seo'
import { useUser } from '@auth0/nextjs-auth0'
import dayjs from 'dayjs'
import Nav from '../components/nav'
import { RoomData } from '../types/RoomInfo'
import styles from '../styles/explore.module.scss'
import ButtonCard from '../components/buttonCard'
import { useCurrentUser } from '../hooks/useCurrentUser'

interface SearchInput {
  keyword: string | undefined
}

const fetcher = async (url: string) => {
  const res = await axios.get<RoomData[]>(url)
  return res.data
}

const Explore: NextPage = () => {
  const { user, error, isLoading } = useUser()
  const { currentUser } = useCurrentUser()
  const router = useRouter()
  const keyword = router.query.q
    ? decodeURI(router.query.q as string)
    : undefined
  const { register, handleSubmit } = useForm<SearchInput>({
    defaultValues: { keyword: keyword ? keyword : '' },
  })

  /**
   * 送信時の処理
   * @param {SearchInput} data
   */
  const onSubmit: SubmitHandler<SearchInput> = (data: SearchInput) => {
    if (data.keyword) {
      router.push({
        pathname: '/explore',
        query: { q: encodeURI(data.keyword) },
      })
    }
  }

  const { data: roomDataset, error: fetchErr } = useSWR(
    keyword ? `/api/rooms/?q=${keyword}` : null,
    fetcher
  )

  return (
    <Nav category="explore">
      <NextSeo title="検索 | e-Shoku" openGraph={{ title: '検索 | e-Shoku' }} />
      {user && currentUser && (
        // ログイン状態の処理
        <section className={'container pb-1'}>
          <h2 className="title">検索</h2>
          <form onSubmit={handleSubmit(onSubmit)} action="/">
            <label htmlFor="keywordId">検索フィールド</label>
            <input
              {...register('keyword', {
                required: true,
              })}
              type="search"
              className="form-control"
              id="keywordId"
              placeholder="例）忘年会"
            />
          </form>
        </section>
      )}
      {keyword && roomDataset && user && currentUser && (
        // ログイン状態かつ、検索ワードがある場合の処理
        <section className="container">
          <p className="text-muted mt-1 mb-3">
            &quot;{keyword}&quot;の検索結果（{roomDataset?.length}件）
          </p>
          {roomDataset?.length !== 0 &&
            keyword &&
            !fetchErr &&
            roomDataset.map((room: RoomData) => (
              <div key={room.id} className="card mb-4">
                <div className="card-body">
                  <h3 className="h5 card-title">{room.room_title}</h3>
                  <p className={styles.description}>{room.description}</p>
                  <p className="mb-0 text-muted">
                    {dayjs(room.datetime).format('YYYY/MM/DD')}
                  </p>
                  <p>
                    {room.hosts.map((host) => (
                      <Link key={host.id} href={`/users/${host.id}`}>
                        <a className="me-1">@{host.username}</a>
                      </Link>
                    ))}
                  </p>
                  <div className="text-end">
                    <Link href={`/rooms/${room.id}`}>
                      <a className="btn btn-form">詳細</a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </section>
      )}
      {fetchErr && (
        // データ取得時にエラーが発生した場合の処理
        <p className={`py-5 text-center ${styles.centerInfo}`}>
          {fetchErr.message}
        </p>
      )}
      {roomDataset?.length === 0 && !fetchErr && (
        <section className={'container'}>
          <p className={styles.centerInfo}>ルーム情報が見つかりませんでした</p>
        </section>
      )}
      {!isLoading && !error && !user && !currentUser && (
        // Userがない状態(ログアウト状態の処理)
        <section className="container">
          <h2 className="title">はじめる</h2>
          <div className={styles.elementCenter}>
            <div>
              <div className={styles.startWithLogin}>
                ログインをして
                <br />
                始めましょう！
              </div>
              <ButtonCard
                title="ログイン"
                color="#f3ae56"
                fontSize="1.3rem"
                shadow={true}
                link={{ to: '/api/auth/login', useAnchorOnly: true }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="25px"
                  viewBox="0 0 24 24"
                  width="25px"
                  fill="#000000"
                >
                  <rect fill="none" height="24" width="24" />
                  <path d="M 11 7 L 9.6 8.4 l 2.6 2.6 H 2 v 2 h 10.2 l -2.6 2.6 L 11 17 l 5 -5 L 11 7 Z M 20 19 h -8 v 2 h 8 c 1.1 0 2 -0.9 2 -2 V 5 c 0 -1.1 -0.9 -2 -2 -2 h -8 v 2 h 8 V 19 Z" />
                </svg>
              </ButtonCard>
            </div>
          </div>
        </section>
      )}
    </Nav>
  )
}

export default Explore
