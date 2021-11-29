import { NextApiRequest, NextApiResponse } from 'next'
import { UserData } from '../types/UserInfo'
import axios, { isAxiosError } from './commonAxios'

interface Params {
  req: NextApiRequest
  res: NextApiResponse<UserData | ErrorMessage>
  accessToken?: string
  id?: string
}

interface ErrorMessage {
  detail: string
}

/**
 * ルームに関するREST APIの呼び出し
 * @param {Params} { req, res, accessToken, id }
 */
export const roomApiController = async ({
  req,
  res,
  accessToken,
  id,
}: Params) => {
  try {
    const data = req.body
    let resData: UserData | ErrorMessage
    const targetUrl = id ? `/rooms/${id}/` : '/rooms/'

    // ルーム作成時に用いる
    if (req.method === 'POST' && !id && accessToken) {
      const response = await axios.post<UserData>(targetUrl, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      resData = response.data
      res.status(201).json(resData)
    }
    // ルーム情報取得時に用いる（アクセストークン無し）
    else if (req.method === 'GET') {
      const response = await axios.get<UserData>(targetUrl)
      resData = response.data
      res.status(200).json(resData)
    }
    // ルーム情報更新時に用いる
    else if (req.method === 'PUT' && accessToken) {
      const response = await axios.put<UserData>(targetUrl, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      resData = response.data
      res.status(200).json(resData)
    }
    // ルーム削除時に用いる
    else if (req.method === 'DELETE' && accessToken) {
      const response = await axios.delete<UserData>(targetUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      resData = response.data
      res.status(204).json(resData)
    }
    // アクセストークンがない場合（GETメソッド以外）
    else if (!accessToken) {
      resData = {
        detail: `Need access token to access.`,
      }
      res.status(401).json(resData)
    }
    // 対応しないメソッドが呼ばれた場合
    else {
      resData = {
        detail: `"${req.method}" method is not allowed.`,
      }
      res.setHeader('Allow', 'GET, POST, PUT, DELETE')
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
