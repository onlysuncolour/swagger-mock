type TRequestParam = {
  path: string;
  method: 'GET' | 'POST',
  payload?: any;
  body?: any
}
const request = ({
  path, method, payload, body
}: TRequestParam) => {
  return new Promise(res => {
    const url = payload ? `${path}?${new URLSearchParams(payload).toString()}` : path
    fetch(
      url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body
      }
    ).then(resp => {
      res(resp)
    }, err => {
      console.log({err})
    })
  })
}

export const fetchSyncSwagger = () => {
  return request({
    path: '/api/sync-swagger',
    method: 'GET'
  })
}