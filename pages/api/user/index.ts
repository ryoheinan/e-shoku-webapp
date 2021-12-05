import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { UserData } from '../../../types/UserInfo'
import axios, { isAxiosError } from '../../../utils/commonAxios'

interface ErrorMessage {
  detail: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<UserData | ErrorMessage>
) => {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['openid', 'profile'],
    })
    const data = req.body

    // ユーザー情報登録時に用いる
    if (req.method === 'POST') {
      const response = await axios.post<UserData>(`/users/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const resData = response.data
      res.status(201).json(resData)
    }
    // ユーザー情報取得時に用いる
    else if (req.method === 'GET') {
      const response = await axios.get<UserData>(`/users/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const resData = response.data
      res.status(200).json(resData)
    }
    // 対応しないメソッドが呼ばれた場合
    else {
      const resData = {
        detail: `"${req.method}" method is not allowed.`,
      }
      res.setHeader('Allow', 'GET, POST')
      res.status(405).json(resData)
    }
  } catch (error: unknown) {
    // Axiosに関するエラーの場合
    if (isAxiosError(error) && error.response && error.response.data) {
      res.status(error.response.status).json(error.response.data)
    } else {
      res.status(500).json({ detail: 'Internal Server Error' })
    }
  }
}

export default withApiAuthRequired(handler)
