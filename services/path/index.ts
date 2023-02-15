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
  static getPathList():Promise<any[]> {
    return new Promise((res, rej) => {
      readFile('../../data/paths.json', 'json').then((data:any) => {
        const result:any = []
        Object.keys(data).forEach(key => {
          const path = data[key]
          result.push({
            path: key,
            ...path
          })
        })
        res(result)
      }, err => rej(err))
    })
  }
}

export default PathService