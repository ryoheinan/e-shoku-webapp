import type { GetServerSideProps } from 'next'
import { UserData } from '../../types/UserInfo'
import { useUser } from '@auth0/nextjs-auth0'
import Error from '../_error'
import Nav from '../../components/nav'
import Loading from '../../components/loading'
import { Params } from 'next/dist/server/router'
import axios, { isAxiosError } from '../../utils/commonAxios'
import UserProfile from '../../components/userProfile'
import { NextSeo } from 'next-seo'

type Props = {
  userData: UserData | null
  error?: {
    statusCode: number
    message?: string
  }
}

const UserProfilePage = ({ userData, error }: Props) => {
  const { error: errAuth, isLoading } = useUser()
  if (userData === null) {
    if (error) {
      return <Error statusCode={error.statusCode} />
    }
  } else {
    if (errAuth) {
      return <Error statusCode={400} title={errAuth.message} />
    } else if (isLoading) {
      return <Loading />
    }
    return (
      <Nav>
        <NextSeo
          title={`${userData.display_name} | e-Shoku`}
          openGraph={{ title: `${userData.display_name} | e-Shoku` }}
        />
        <div className="container">
          <h2 className="title">プロフィール</h2>
          <UserProfile
            data={userData}
            profileIcon={userData.image_url}
            isShortDescription={false}
          />
        </div>
      </Nav>
    )
  }
}

export default UserProfilePage

/**
 * サーバーサイドでidに基づくUser情報を取得してuserDataに渡す
 * @param context
 */
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.params as Params
  const targetUrl = `/users/${id}/`

  // idがUUIDの形式でない場合はエラー（404）
  const reUuid = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
  if (!reUuid.test(id)) {
    return { props: { userData: null, error: { statusCode: 404 } } }
  }

  try {
    const response = await axios.get<UserData>(targetUrl)
    const userData = response.data
    return { props: { userData } }
  } catch (error: unknown) {
    // Axiosに関するエラーの場合
    if (isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        context.res.statusCode = 404
        return { props: { userData: null, error: { statusCode: 404 } } }
      } else {
        return {
          props: {
            userData: null,
            error: { statusCode: error.response.status },
          },
        }
      }
    } else {
      return { props: { userData: null, error: { statusCode: 500 } } }
    }
  }
}
