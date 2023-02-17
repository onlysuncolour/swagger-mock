import { IDefinition, IDefinitionFile, IDefinitionProperty } from '@/common/index.interface';

const getDefChain = (ref: string, result: IDefinitionFile, allDefs: IDefinitionFile) => {
  if (!result[ref] && allDefs[ref]) {
    result[ref] = allDefs[ref]
    getDefResult(allDefs[ref], result, allDefs);
    return
  }
}

const getPropDefChain = (property: IDefinitionProperty, result: IDefinitionFile, allDefs: IDefinitionFile) => {
  if (property.ref) {
    getDefChain(property.ref, result, allDefs)
  } else if (property.children) {
    getPropDefChain(property.children, result, allDefs)
  } else if (property.unstableProperties) {
    getPropDefChain(property.unstableProperties, result, allDefs)
  } else if (property.properties) {
    Object.keys(property.properties).forEach(k => {
      if (!property.properties) {
        return
      }
      const prop = property?.properties[k];
      return getPropDefChain(prop, result, allDefs)
    })
  }
}

export const getDefResult = (schema:IDefinition, result: IDefinitionFile, allDefs: IDefinitionFile) => {
  if (!schema || !schema.properties) {
    return
  }
  Object.keys(schema.properties).forEach(k => {
    if (!schema.properties) {
      return
    }
    const prop = schema?.properties[k];
    return getPropDefChain(prop, result, allDefs)
  })
}