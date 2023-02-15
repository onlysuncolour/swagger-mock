import { IDefinitionProperty, IPathResp, IStandardRespBody } from "../index.interface";

const baseTypes = [
  "string", "integer", "boolean", "number"
]

const multiTypes = [
  "object", "array", "file"
]

export const getDefData = (def:IDefinitionProperty) => {
  if (baseTypes.includes(def.type as string)) {
    return {
      ...def
    }
  }
  if (!def.type) {
    if (def['$ref']) {
      return {
        ref: formatRefValue(def['$ref']),
        description: def.description
      }
    }
  }
  if (def.type === 'object') {
    if (def.additionalProperties) {
      return {
        type: 'object',
        description: def.description,
        unstableProperties: getDefData(def.additionalProperties)
      }
    } else if (def.properties) {
      const result = {
        properties: {},
        description: def.description
      }
      Object.keys(def.properties || {}).forEach(propKey => {
        const prop = def.properties[propKey]
        result.properties[propKey] = getDefData(prop)
      })
      return result
    } else {
      return {
        type: "object",
        description: def.description
      }
    }
  }
  if (def.type === 'array') {
    return {
      type: "array",
      description: def.description,
      children: getDefData(def.items)
    }
  }
  if (def.type === 'file') {
    return {
      type: "file",
      description: def.description,
    }
  }
}


export const getPathData = (path: IPathResp) => {
  const result:any = {}
  if (path.get) {
    const getResult = {
      responses: getResponseResult(path.get.responses),
      summary: path.get.summary,
      tags: path.get.tags,
    }
    result.get = getResult
  }
  if (path.post) {
    const postResult = {
      responses: getResponseResult(path.post.responses),
      summary: path.post.summary,
      tags: path.post.tags,
    }
    result.post = postResult
  }
  return result
};

function getResponseResult(resp: IStandardRespBody) {
  const result:any = {}
  const respBody = resp["200"]
  if (respBody) {
    result.description = respBody.description
    const { schema } = respBody;
    if (schema) {
      result.schema = getDefData(schema)
    }
  }
  return result
}

function formatRefValue(key:string) {
  return key.split('/').pop()
}