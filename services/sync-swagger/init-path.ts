import writeFile from '../file/write-file';
import { IPathRespBody } from '../index.interface'
import { getPathData } from './utils';
const basePath = './data'

const initPath = (paths: IPathRespBody) => {
  const result = {}
  Object.keys(paths).forEach(_key => {
    const path = paths[_key]
    result[_key] = getPathData(path)
  })
  writeFile(`${basePath}/paths.json`, JSON.stringify(result))
}

export default initPath