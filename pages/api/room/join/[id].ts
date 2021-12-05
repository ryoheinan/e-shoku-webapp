import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { roomActionController } from '../../../../utils/roomActionController'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ['openid', 'profile'],
  })
  const { id } = req.query
  if (typeof id === 'string' && accessToken) {
    const mode = 'join'
    await roomActionController({ req, res, accessToken, mode, id })
  }
}

export default withApiAuthRequired(handler)
