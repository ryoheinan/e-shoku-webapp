import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { roomApiController } from '../../../utils/roomApiController'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await roomApiController({ req, res })
  } else {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['openid', 'profile'],
    })
    await roomApiController({ req, res, accessToken })
  }
}

export default withApiAuthRequired(handler)
