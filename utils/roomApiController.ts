import { NextApiRequest, NextApiResponse } from 'next'
import axios from './commonAxios'

interface Params {
  req: NextApiRequest
  res: NextApiResponse<any>
  accessToken?: string
  id?: string
}

/**
 * ルームに関するREST APIの呼び出し
 * @param {Params} { req, res, accessToken, id }
 */
export const roomApiController = async ({ req, res, accessToken, id }: Params) => {
  try {
    const data = req.body
    let resData: object
    const targetUrl = id ? `/rooms/${id}/` : '/rooms/'

    // ルーム作成時に用いる
    if (req.method === 'POST' && !id) {
      const response = await axios.post(targetUrl, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      resData = response.data
      res.status(200).json(resData)
    }
    // ルーム情報取得時に用いる
    else if (req.method === 'GET') {
      const response = await axios.get(targetUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 必要なくなる予定
        },
      })
      resData = response.data
      res.status(200).json(resData)
    } else {
      resData = {
        detail: `"${req.method}" method is not allowed.`,
      }
      res.setHeader('Allow', 'GET, POST')
      res.status(405).json(resData)
    }
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message })
  }
}
