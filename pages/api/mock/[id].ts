import MockService from '@/services/mock'
import type { NextApiRequest, NextApiResponse } from 'next'
import _ from 'lodash'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    url, method, query
  } = req
  const path = url?.split('?')[0].substring(9, url.length)
  const search = url?.split('?')[1]
  MockService.getMockData(path, method?.toLocaleLowerCase(), search).then(resp => {
    res.send(resp)
  }, err => {
    res.send(err);
    res.status(500)
  })
}
