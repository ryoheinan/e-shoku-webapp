import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import axios from '../../utils/commonAxios'

export default withApiAuthRequired(async function user(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['openid', 'profile'],
    })
    const data = req.body
    let resData: object
    if (req.method === 'POST') {
      const response = await axios.post(`/room/`, data, {
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
      res.setHeader('Allow', 'POST')
      res.status(405).json(resData)
    }
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message })
  }
})
