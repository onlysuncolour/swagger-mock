import httpGet from "../http-get"
import { IApiResp } from "../../common/index.interface"
import mockConfig from '../../mock.config'
import initDef from "./init-def";
import readFile from "../file/read-file";
import initPath from "./init-path";

class SyncSwaggerService {
  static syncSwagger() {
    const {
      swaggerUrl: url,
      localSwaggerData: useLocal
    } = mockConfig;
    let fetchDataPromise:Promise<any>;
    if (useLocal) {
      fetchDataPromise = readFile('../../data/swagger.json', 'json')
    } else {
      fetchDataPromise = httpGet(url)
    }
    return new Promise((res, rej) => {
      fetchDataPromise.then((response:IApiResp) => {
        const {definitions, paths} = response;
        initDef(definitions)
        initPath(paths)
        res({ok: true})
      }, err => rej(err))
    })
  }
}

export default SyncSwaggerService
