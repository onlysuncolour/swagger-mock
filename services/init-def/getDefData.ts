import { IDefinitionProperty } from "../index.interface";

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
        ref: def['$ref'].split('/').pop(),
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