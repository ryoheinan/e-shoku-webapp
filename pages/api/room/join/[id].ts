import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import axios, { isAxiosError } from '../../../../utils/commonAxios'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ['openid', 'profile'],
  })
  const { id } = req.query
  const data = req.body
  if (req.method === 'POST' && typeof id === 'string') {
    try {
      const response = await axios.post(`/rooms/join/${id}/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const resData = response.data
      res.status(200).json(resData)
    } catch (error: unknown) {
      // Axiosに関するエラーの場合
      if (isAxiosError(error) && error.response && error.response.data) {
        res.status(error.response.status).json(error.response.data)
      } else {
        res.status(500).json({ detail: 'Internal Server Error' })
      }
    }
  }
  // 対応しないメソッドが呼ばれた場合
  else {
    const resData = {
      detail: `"${req.method}" method is not allowed.`,
    }
    res.setHeader('Allow', 'GET, POST, PUT, DELETE')
    res.status(405).json(resData)
  }
}

export default withApiAuthRequired(handler)
