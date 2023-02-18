import { IDefinitionFile, IDefinitionProperty } from '@/common/index.interface';

export const getPropDefChain = (prop: IDefinitionProperty, allDefs: IDefinitionFile):IDefinitionProperty => {
  if (prop.ref) {
    const def = allDefs[prop.ref]
    return {
      ...getDefChain(prop.ref, allDefs),
      ...prop,
      refDescription: def?.description
    }
  } else if (prop.children) {
    return {
      ...prop,
      children: getPropDefChain(prop.children, allDefs)
    }
  } else if (prop.unstableProperties) {
    return {
      ...prop,
      unstableProperties: getPropDefChain(prop.unstableProperties, allDefs)
    }
  } else {
    return prop
  }
}

export const getDefChain = (ref: string, allDefs: IDefinitionFile):IDefinitionProperty => {
  const def = allDefs[ref];
  if (!def) {
    return {}
  }
  const result = {...def}
  if (result.properties) {
    Object.keys(result.properties).forEach(propKey => {
      if (result?.properties?.[propKey]) {
        const prop = result.properties[propKey]
        result.properties[propKey] = getPropDefChain(prop, allDefs)
      }
    })
  }
  return result
}
