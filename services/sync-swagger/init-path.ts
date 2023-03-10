import writeFile from '../file/write-file';
import { IPathRespBody } from '../../common/index.interface'
import { getPathData } from './utils';
const basePath = './data'

const initPath = (paths: IPathRespBody) => {
  const result = {}
  Object.keys(paths).forEach(_key => {
    const path = paths[_key]
    result[_key] = getPathData(path)
  })
  writeFile(`${basePath}/paths.json`, result)
}

export default initPath