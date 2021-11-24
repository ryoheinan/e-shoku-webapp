import type { NextApiRequest, NextApiResponse } from 'next'

import { roomApiController } from '../../../utils/roomApiController'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  if (typeof id === 'string') {
    roomApiController({ req, res, id })
  }
}

export default handler
