import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { roomApiController } from '../../../utils/roomApiController'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ['openid', 'profile'],
  })
  const { id } = req.query
  if (typeof id === 'string') {
    roomApiController({ req, res, accessToken, id })
  }
}

export default withApiAuthRequired(handler)
