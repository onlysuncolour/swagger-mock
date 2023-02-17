import MockService from '@/services/mock'
import type { NextApiRequest, NextApiResponse } from 'next'
import _ from 'lodash'
import { commonErrHandle } from '@/common/utils'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    url, method, query
  } = req
  const path = url?.split('?')[0].substring(13, url.length)
  const search = url?.split('?')[1]
  MockService.getMockData(path, method?.toLocaleLowerCase(), search).then(resp => {
    res.send(resp)
  }, err => commonErrHandle(req, err))
}
