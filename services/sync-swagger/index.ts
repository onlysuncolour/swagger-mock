import httpGet from "../http-get"
import { IApiResp } from "../index.interface"
import mockConfig from '../../mock.config'
import initDef from "../init-def";
const url = mockConfig.swaggerUrl;

function index() {
  httpGet(url).then((response:IApiResp) => {
    const definitions = response.definitions;
    initDef(definitions)
  })
};

export default index
