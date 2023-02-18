import { IDataPathFile, IDataPathMethod, IDefinitionFile, IDefinitionProperty, IMethodStandard, IMockFile, IMockPathMethod, IPath, IPathDetailResp } from "@/common/index.interface"
import readFile from "../file/read-file"
import MockService from "../mock";
import { getDefChain } from '../utils';

class PathService {
  static getPathCount():Promise<number> {
    return new Promise((res, rej) => {
      readFile('../../data/paths.json', 'json').then((data:any) => {
        const count = Object.keys(data).length
        res(count)
      }, err => rej(err))
    })
  }
  static getPathList():Promise<IPath[]> {
    return new Promise((res, rej) => {
      readFile('../../data/paths.json', 'json').then((data:IDataPathFile) => {
        const result:IPath[] = []
        Object.keys(data).forEach(key => {
          const path = data[key]
          if (path.get) {
            result.push({
              url: key,
              method: 'get',
              ...path.get
            })
          }
          if (path.post) {
            result.push({
              url: key,
              method: 'post',
              ...path.post
            })
          }
        })
        res(result)
      }, err => rej(err))
    })
  }
  static getPathDetail(url: string, method: IMethodStandard): Promise<IPathDetailResp> {
    if (!url || !method) {
      return Promise.reject('参数不合法')
    }
    return new Promise((res, rej) => {
      Promise.all([
        readFile('../../data/paths.json', 'json') as Promise<IDataPathFile>,
        MockService.getMockDataByPath(url, method),
        readFile('../../data/definitions.json', 'json') as Promise<IDefinitionFile>
      ]).then(([paths, mocks, definitions]) => {
        const pathData = paths?.[url]?.[method];
        if (!pathData) {
          rej('未找到相应接口')
        }
        const path: IPath = {
          url: url,
          method: method,
          ...(pathData as IDataPathMethod),
        }
        let def:IDefinitionProperty = {}
        if (pathData?.responses?.schema?.ref && definitions[pathData?.responses?.schema?.ref]) {
          def = getDefChain(pathData?.responses?.schema?.ref, definitions)
        } else if (pathData?.responses?.schema) {
          def = pathData?.responses?.schema
        }
        res({
          path,
          mocks,
          def,
        })
      }, err => {
        rej(err)
      })
    })
  }
}

export default PathService