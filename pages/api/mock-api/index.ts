import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    url, method, query
  } = req
  console.log(url, method, query)
  res.send({ok: true})
}
