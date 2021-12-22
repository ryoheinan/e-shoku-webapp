import type { NextPage } from 'next'
import Link from 'next/link'
import axios from 'axios'
import useSWR from 'swr'
import Nav from '../components/nav'
import RoomCard from '../components/roomCard'
import { RoomData } from '../types/RoomInfo'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { NextSeo } from 'next-seo'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Loading from '../components/loading'
import Error from './_error'

const History: NextPage = () => {
  const { currentUser } = useCurrentUser()
  const fetcher = async (url: string) => {
    try {
      const res = await axios.get<RoomData[]>(url)
      return res.data
    } catch (err: unknown) {
      // Axiosに関するエラーの場合
      /*
      if (axios.isAxiosError(err) && err.response) {
        throw new Error(
          `${err.response.status}エラー: あなたの予定が取得できませんでした`
        )
      } else {
        throw new Error('あなたの予定が取得できませんでした')
      }
      */
    }
  }
  const { data: roomDataset, error: fetchErr } = useSWR(
    currentUser ? `/api/rooms/?related_user=${currentUser.id}` : null,
    fetcher
  )
  return (
    <Nav category="home">
      <NextSeo
        title="履歴ページ | e-Shoku"
        openGraph={{ title: '履歴ページ | e-Shoku' }}
      />
      <section className={'container mb-5'}>
        <h2 className="title">履歴</h2>
        {roomDataset &&
          roomDataset?.length !== 0 &&
          currentUser &&
          !fetchErr &&
          roomDataset.map((room: RoomData) => (
            <div key={room.id} className="mb-4 mx-2">
              <Link href={`/rooms/${room.id}`}>
                <a>
                  <RoomCard
                    title={room.room_name}
                    date={room.datetime}
                    imageUrl="/images/foods.jpg"
                  />
                </a>
              </Link>
            </div>
          ))}
      </section>
      {fetchErr && <p className="py-5 text-center">{fetchErr.message}</p>}
      {!roomDataset && !fetchErr && <Loading />}
      {roomDataset?.length === 0 && !fetchErr && (
        <section className={'container'}>
          <p className="elementCenter">ルーム情報が見つかりませんでした</p>
        </section>
      )}
    </Nav>
  )
}

// ログイン必須にする処理
export default withPageAuthRequired(History, {
  onRedirecting: () => <Loading />,
  onError: (error) => <Error statusCode={400} title={error.message} />,
})
