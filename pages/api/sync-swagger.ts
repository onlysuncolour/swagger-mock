// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import SyncSwaggerService from '@/services/sync-swagger'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  SyncSwaggerService().then((resp:any) => {
    res.send(resp)
    res.status(200)
  })
}
