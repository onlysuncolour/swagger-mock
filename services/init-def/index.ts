import { getDefData } from "./getDefData"
import writeFile from '../file/write-file';
const basePath = './data/'

const initDef = (definitions) => {
  const result = {}
  Object.keys(definitions).forEach(defKey => {
    const data = definitions[defKey], 
      curData:any = {
      type: 'object',
      description: data.title,
    };
    defKey = defKey.split(' ').join('');
    curData.title = data.title;
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
  writeFile(`${basePath}/definitions.json`, JSON.stringify(result))
}

export default initDef
