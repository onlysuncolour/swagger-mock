import readFile from "../file/read-file"

class PathInfoService {
  static getPathCount():Promise<number> {
    return new Promise((res, rej) => {
      readFile('../../data/paths.json', 'json').then((data:any) => {
        const count = Object.keys(data).length
        res(count)
      }, err => rej(err))
    })
  }
}

export default PathInfoService