import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { roomApiController } from '../../../utils/roomApiController'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ['openid', 'profile'],
  })
  roomApiController({ req, res, accessToken })
}

export default withApiAuthRequired(handler)
