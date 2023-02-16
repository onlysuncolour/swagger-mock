import { IDataPathFile, IPath } from "@/common/index.interface"
import readFile from "../file/read-file"

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
  static getPathDetail(url: string, method: string): Promise<any> {
    return new Promise((res, rej) => {
      Promise.all([
        readFile('../../data/paths.json', 'json'),
        readFile('../../data/mock.json', 'json'),
        readFile('../../data/definitions.json', 'json')
      ]).then(([paths, mockDatas, definitions]) => {
        
      }, err => {
        rej(err)
      })
    })
  }
}

export default PathService