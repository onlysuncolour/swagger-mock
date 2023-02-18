import { rejects } from "assert";

type TRequestParam = {
  path: string;
  method: 'GET' | 'POST',
  payload?: any;
  body?: any
}
const request = ({
  path, method, payload, body
}: TRequestParam):Promise<any> => {
  return new Promise((res, rej) => {
    const url = payload ? `${path}?${new URLSearchParams(payload).toString()}` : path
    fetch(
      url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: body && JSON.stringify(body)
      }
    ).then(resp => {
      res(resp)
    }, err => {
      rej(err)
    })
  })
}

export const fetchSyncSwagger = () => {
  return request({
    path: '/api/sync-swagger',
    method: 'GET'
  })
}

export const fetchRemoveMock = ({
  path, method, param
}) => {
  return request({
    path: '/api/mock/remove',
    method: 'POST',
    body: {
      path, method, param
    }
  })
}
export const fetchSaveMock = ({
  path, method, param, data
}) => {
  return request({
    path: '/api/mock/save',
    method: 'POST',
    body: {
      path, method, param, data
    }
  })
}