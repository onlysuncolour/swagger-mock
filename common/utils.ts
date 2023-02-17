export const formatSearchToObj = (search: string):any => {
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
}

export const commonErrHandle = (res, err) => {
  console.log('err')
  res.send(err)
  res.status(500)
}