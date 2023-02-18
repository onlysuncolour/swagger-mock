import { commonErrHandle } from '@/common/utils'
import MockService from '@/services/mock'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method : reqMethod, body
  } = req
  if (reqMethod === 'POST') {
    const {
      path,
      method,
      param,
    } = body
    MockService.removeMockData(path, method, param).then(resp => {
      res.send(resp)
    }, err => commonErrHandle(req, err))
  }
  res.send({ok: true})
}
