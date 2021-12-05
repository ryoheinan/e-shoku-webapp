import { NextApiRequest, NextApiResponse } from 'next'
import axios, { isAxiosError } from './commonAxios'

interface Props {
  req: NextApiRequest
  res: NextApiResponse
  accessToken: string
  mode: 'join' | 'leave'
  id: string
}

/**
 * ルーム参加に関する APIの呼び出し
 * @param {Props} { req, res, accessToken, mode, id }
 */
export const roomActionController = async ({
  req,
  res,
  accessToken,
  mode,
  id,
}: Props) => {
  try {
    const data = req.body
    const targetUrl = `/rooms/${mode}/${id}/`
    if (req.method === 'POST') {
      const response = await axios.post(targetUrl, data, {
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
      res.setHeader('Allow', 'POST')
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
