import { commonErrHandle } from '@/common/utils'
import MockService from '@/services/mock'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    url, method : reqMethod, query, body
  } = req
  console.log({
    reqMethod, body
  })
  if (reqMethod === 'POST') {
    const {
      path,
      method,
      param,
      data
    } = body
    MockService.saveMockData(path, method, param, data).then(resp => {
      res.send(resp)
      res.status(200)
    }, err => commonErrHandle(req, err))
  }
  res.send({ok: true})
}
