import type { NextPage } from 'next'
import Link from 'next/link'
import axios from 'axios'
import useSWR from 'swr'
import Nav from '../components/nav'
import RoomCard from '../components/roomCard'
import ButtonCard from '../components/buttonCard'
import { RoomData } from '../types/RoomInfo'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { NextSeo } from 'next-seo'

const Home: NextPage = () => {
  const { currentUser } = useCurrentUser()
  const fetcher = async (url: string) => {
    try {
      const res = await axios.get<RoomData[]>(url)
      return res.data
    } catch (err: unknown) {
      // Axiosに関するエラーの場合
      if (axios.isAxiosError(err) && err.response) {
        throw new Error(
          `${err.response.status}エラー: あなたの予定が取得できませんでした`
        )
      } else {
        throw new Error('あなたの予定が取得できませんでした')
      }
    }
  }
  const { data: roomDataset, error: fetchErr } = useSWR(
    currentUser ? `/api/rooms/?guests=${currentUser.id}` : null,
    fetcher
  )
  return (
    <Nav category="home">
      <NextSeo title="e-Shoku" openGraph={{ title: 'e-Shoku' }} />
      {roomDataset && roomDataset?.length !== 0 && currentUser && !fetchErr && (
        <section className={'container mb-4'}>
          <h2 className="title">あなたの予定</h2>
          <Link href={`/rooms/${roomDataset[0].id}`}>
            <a>
              <RoomCard
                title={roomDataset[0].room_name}
                date={roomDataset[0].datetime}
                imageUrl="/images/foods.jpg"
              />
            </a>
          </Link>
        </section>
      )}
      {fetchErr && <p className="py-5 text-center">{fetchErr.message}</p>}
      <section className={'container mb-4'}>
        <h2 className="title">ルームの作成</h2>
        <ButtonCard
          title="作成する"
          color="#FF9E1F"
          fontSize="1.5rem"
          shadow={true}
          link={{ to: '/rooms/create' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 0 24 24"
            width="36px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
          </svg>{' '}
        </ButtonCard>
      </section>
      <section>
        <div className="container">
          <h2 className="title">インフォメーション</h2>
        </div>
        <ul className={'scrollable container'}>
          <li>
            <ButtonCard
              title="COVID-19"
              color="#6fd8a3"
              fontSize="1.5rem"
              shadow={true}
              link={{
                to: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000164708_00001.html',
                useAnchorOnly: true,
                target: '_blank',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="36px"
                viewBox="0 0 24 24"
                width="36px"
                fill="#000000"
              >
                <rect fill="none" height="24" width="24" />
                <path d="M19.5,6c-1.31,0-2.37,1.01-2.48,2.3C15.14,7.8,14.18,6.5,12,6.5c-2.19,0-3.14,1.3-5.02,1.8C6.87,7.02,5.81,6,4.5,6 C3.12,6,2,7.12,2,8.5V9c0,6,3.6,7.81,6.52,7.98C9.53,17.62,10.72,18,12,18s2.47-0.38,3.48-1.02C18.4,16.81,22,15,22,9V8.5 C22,7.12,20.88,6,19.5,6z M3.5,9V8.5c0-0.55,0.45-1,1-1s1,0.45,1,1v3c0,1.28,0.38,2.47,1.01,3.48C4.99,14.27,3.5,12.65,3.5,9z M7,11.5V9.85c1.12-0.23,1.95-0.69,2.66-1.08C10.48,8.33,11.07,8,12,8c0.93,0,1.52,0.33,2.34,0.78c0.71,0.39,1.54,0.84,2.66,1.08 v1.65c0,2.76-2.24,5-5,5S7,14.26,7,11.5z M20.5,9c0,3.65-1.49,5.27-3.01,5.98c0.64-1.01,1.01-2.2,1.01-3.48v-3c0-0.55,0.45-1,1-1 s1,0.45,1,1V9z M10.69,10.48c-0.44,0.26-0.96,0.56-1.69,0.76V10.2c0.48-0.17,0.84-0.38,1.18-0.58C10.72,9.3,11.23,9,12,9 s1.27,0.3,1.8,0.62c0.34,0.2,0.71,0.42,1.2,0.59v1.04c-0.75-0.21-1.26-0.51-1.71-0.78C12.83,10.2,12.49,10,12,10 C11.51,10,11.16,10.2,10.69,10.48z" />
              </svg>
            </ButtonCard>
          </li>
          <li>
            <ButtonCard
              title="マナー"
              color="#ff8484"
              fontSize="1.5rem"
              shadow={true}
              link={{ to: '/' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 0 24 24"
                width="36px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </ButtonCard>
          </li>
          <li>
            <ButtonCard
              title="ヘルプ・使い方"
              color="#3bb4ff"
              fontSize="1.5rem"
              shadow={true}
              link={{ to: '/' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 0 24 24"
                width="36px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z" />
              </svg>
            </ButtonCard>
          </li>
        </ul>
      </section>
    </Nav>
  )
}

export default Home
