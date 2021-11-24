import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { roomApiController } from '../../../utils/roomApiController'

export default withApiAuthRequired(async function user(req, res) {
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ['openid', 'profile'],
  })
  const { id } = req.query
  if (typeof id === 'string') {
    roomApiController({ req, res, accessToken, id })
  }
})
