import writeFile from '../file/write-file';
import { IDefinitionRespBody } from '../../common/index.interface';
import { getDefData } from './utils';
const basePath = './data'

const initDef = (definitions: IDefinitionRespBody) => {
  const result = {}
  Object.keys(definitions).forEach(defKey => {
    const data = definitions[defKey], 
      curData:any = {
      type: 'object',
      description: data.title,
    };
    if (data.properties) {
      curData.properties = {}
      Object.keys(data.properties || {}).forEach(propKey => {
        const prop = data.properties[propKey]
        curData.properties[propKey] = getDefData(prop)
      })
    }
    if (data.additionalProperties) {
      curData.unstableProperties = getDefData(data.additionalProperties)
    }
    result[defKey] = curData
  })
  writeFile(`${basePath}/definitions.json`, result)
}

export default initDef
