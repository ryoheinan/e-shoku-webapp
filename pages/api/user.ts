import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from '../../utils/commonAxios'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['openid', 'profile'],
    })
    const data = req.body
    let resData: object
    if (req.method === 'POST') {
      const response = await axios.post(`/users/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      resData = await response.data
      res.status(201).json(resData)
    } else if (req.method === 'GET') {
      const response = await axios.get(`/users/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      resData = await response.data
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

export default withApiAuthRequired(handler)
