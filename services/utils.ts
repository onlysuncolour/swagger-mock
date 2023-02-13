const definitionMap = {}

export interface IApiResp {
  definitions: IDefinitionRespBody;
  paths: IPathRespBody;
  [propsName: string]: any;
}

export interface IDefinitionRespBody {
  [propsName: string]: IDefinitionResp
}
export interface IDefinitionResp {
  type: string;
  title: string;
  additionalProperties?: IDefinitionProperty;
  properties: {
    [propsName: string]: IDefinitionProperty;
  }
}

export interface IDefinitionProperty {
  description?: string;
  type: "string" | "integer" | "object" | "array" | "file" | "number" | "boolean" | undefined;
  format?: string;
  originalRef?: string;
  '$ref'?: string
  enum: string[];
  items: IDefinitionProperty;
  minimum: number
  maximum: number
  additionalProperties: IDefinitionProperty
  properties: {
    [propsName: string]: IDefinitionProperty;
  }
}

export interface IPayloads {
  [propsName: string]: IPayloadContent;
}

export interface IPayloadContent {
  body?: boolean;
  query?: boolean;
  formdata?: boolean;
}
export interface IPathRespBody {
  [propsName: string]: IPathResp
}
export interface IPathResp {
  get?: IPathMethodResp;
  post?: IPathMethodResp
}

export interface IPathMethodResp {
  parameters: IStandardReqParam[]
  responses: IStandardRespBody;
  [propsName: string]: any;
}

export interface IStandardModule {
  payloads: string[];
  responses: string[];
  schemaArr: string[];
}

export interface IStandardModuleObj {
  [propsName: string]: IStandardModule;
}

export interface IStandardReqParam {
  in: string; //: "body"
  name: string; //: "request"
  required: boolean; //: true
  type?: string;
  schema?: ISchema | any; //: {$ref: "#/definitions/OpenUserClusterSaveRequestDTO"}
  [propsName: string]: any;
}

export interface ISchema {
  ['$ref']?: string;
}

export interface IStandardRespBody {
  [200]: IStandardResp;
  [propsName: string]: any;
  [propsName: number]: any;
}
export interface IStandardResp {
  schema?: ISchema | any;
  [propsName: string]: any;
}

export const mapUrlToInterfaceName = function(url:string):string {
  if (url.startsWith('/v1/ta')) {
    url = url.split('/v1/ta')[1]
  } else if (url.startsWith('/v1')) {
    url = url.split('/v1')[1]
  } else {
    url = '/ta' + url
  }
  if (url.includes('-')) {
    url = url.split('-').map(s => s ? s.replace(s[0], s[0].toLocaleUpperCase()) : '').join('')
  }
  if (url.includes('/')) {
    url = url.split('/').map(s => s ? s.replace(s[0], s[0].toLocaleUpperCase()) : '').join('')
  }
  return url
}
export const mapUrlToInterfacePayload = function (url:string, method:string):string {
  const interfaceBaseName = mapUrlToInterfaceName(url)
  return `IBE${interfaceBaseName}${method.toLocaleUpperCase()}Payload`
}
export const mapUrlToInterfaceResponse = function (url:string, method:string):string {
  const interfaceBaseName = mapUrlToInterfaceName(url)
  return `IBE${interfaceBaseName}${method.toLocaleUpperCase()}Response`
}


export const getModule = function(url:string):string {
  if (url.startsWith('/v1/ta')) {
    url = url.split('/v1/ta')[1]
  } else if (url.startsWith('/v1')) {
    url = url.split('/v1')[1]
  } else {
    url = '/ta' + url
  }
  return url.split('/')[1]
}

export const mapSchemaToInterface = function(schema:ISchema):string {
  const _schema = schema['$ref']
  // @ts-ignore
  const definitionKey = _schema.split('definitions/')[1]
  const definition = definitionMap[definitionKey];
  return `IBE${definition}`
}

export const findInterfaceType = function(type, schema, arrayItem, info, schemaArr?: string[]) {
  if (type === 'string') {
    return `string`
  }
  if (type === 'integer' || type === 'number') {
    return `number`
  }
  if (type === 'boolean') {
    return `boolean`
  }
  if (type === 'schema') {
    if (!schema['$ref']) {
      if (schema.type) {
        return findInterfaceType(schema.type, null, schema.items, info, schemaArr)
      }
      return 'any'
    }
    const curSchema = mapSchemaToInterface(schema)
    // @ts-ignore
    schemaArr.push(curSchema)
    return `${curSchema}`
  }
  if (type === 'array') {
    if (!arrayItem) {
      console.log(arrayItem, info)
    }
    return `${findInterfaceType(arrayItem.type || 'schema', arrayItem, arrayItem.items, info, schemaArr)}[]`
  }
  if (type === 'file') {
    // @ts-ignore
    schemaArr.push('IFile')
    return 'IFile'
  }
  return type
}

// @ts-ignore
export const buildInterface = function(key, type, schema, required, arrayItem, info:IPathResp|undefined, schemaArr, description) {
  let resultInterface = key
  if (required) {
    resultInterface = `${resultInterface} : `
  } else {
    resultInterface = `${resultInterface} ?: `
  }
  resultInterface = `${resultInterface}${findInterfaceType(type, schema, arrayItem, info, schemaArr)};`
  if (description) {
    resultInterface += ` // ${description}`
  }
  return resultInterface
}
export const buildReqParams = function(name, params: IStandardReqParam[], info: IPathResp, schemaArr, reqPayloads: any) {
  const req:any = {}
  if (params) {
    params.forEach(p => {
      if (p.in === 'query') {
        const pInterface = buildReqSingleParam(p,undefined, info, schemaArr)
        req.query = [...(req.query || []), pInterface]
        reqPayloads.query = true
      }
      if (p.in === 'body') {
        const pInterface = buildReqSingleParam(p, 'body', info, schemaArr)
        req.body = pInterface
        reqPayloads.body = true
      }
      if (p.in === 'formData') {
        const pInterface = buildReqSingleParam(p, undefined, info, schemaArr)
        req.formData = [...(req.formData || []), pInterface]
        reqPayloads.formData = true
      }
    })
  }
  let result = `export interface ${name} extends IPayload {\n`
  if (req.query) {
    result += `  query: {\n`
    result += req.query.map(q => `    ${q}\n`).join('')
    result += `  }\n`
  }
  if (req.body ) {
    result += `  ${req.body}\n`
  }
  if (req.formData && !req.body) {
    result += `  body: {\n`
    result += req.formData.map(q => `    ${q}\n`)
    result += `  }\n`
  }
  result += `}\n\n`
  return result;
}
export const buildReqSingleParam = function(param, name, info: IPathResp, schemaArr) {
  return buildInterface(name || param.name, param.type || 'schema', param.schema, param.required, param.items, info, schemaArr, param.description)
}
export const buildResponse = function(name, response, info: IPathResp, schemaArr) {
  if (!response.schema && !response.type) {
    return `export interface ${name} {}\n\n`
  }
  if (response.schema && !response.type) {
    if (response.schema.type) {
      return `export type ${name} = ${findInterfaceType(response.type||'schema', response.schema, response.items, info, schemaArr)}; \n\n`
    }
    return `export interface ${name} extends ${findInterfaceType(response.type||'schema', response.schema, response.items, info, schemaArr)} {}; \n\n`
  }
  console.log(response)
  return `export interface ${name}: ${findInterfaceType(response.type||'schema', response.schema, response.items, info, schemaArr)} \n\n`
}
export const buildDefinition = function(definition, key) {
  const keys = Object.keys(definition.properties || {})
  const ds = [];
  keys.forEach(k => {
    let d = definition.properties[k];
    ds.push(
      // @ts-ignore
      buildInterface(k, d.type || 'schema', d, false, d.items, null, [], d.description)
    )
  })
  let result = `export interface IBE${definitionMap[key]} {\n`
  ds.forEach(d => {
    result += `  ${d}\n`
  })
  result += `}\n\n`
  return result
}
export const indexSuffix = function() {
  let suffix = '\n\n'
  suffix += `export type IBELocalDate = any; \n\n`
  suffix += `export type IFile = any; \n\n`
  suffix += `export interface IPayload {\n`
  suffix += `  query?: any;\n`
  suffix += `  body?: any;\n`
  suffix += `}\n\n`
  suffix += `export type IBEAuthManageCreateCompanyPOSTPayload = any; \n\n`
  suffix += `export type IBEAuthManageCreateCompanyPOSTResponse = any; \n\n`
  suffix += `export interface ClusterDataCleanDetail {\n`
  suffix += `  primaryKeySet: number[];\n`
  suffix += `  deletedResource: number[];\n`
  suffix += `  resourceName: string;\n`
  suffix += `  primaryColumnName: string;\n`
  suffix += `}\n\n`
  return suffix
}
export const definitionPrefix = function() {
  return `import {IBELocalDate} from '.'\n\n`
}
export const typePrefix = function() {
  return `import {IPayload} from '.'\n`
}

export const initPayloadContent = function(payloads: IPayloads) {
  let content = `export const payloadContents = {\n`
  Object.keys(payloads).forEach(key => {
    const payload = payloads[key];
    content += `  ${key}: {\n`
    if(payload.query) content += `    query: true,\n`
    if(payload.body) content += `    body: true,\n`
    if(payload.formdata) content += `    formdata: true,\n`
    content += `  },\n\n`
  })
  content += `}`
  return content;
}

export const getClusterDataCleanReq = (p) => {
  return `// ${p}\n` +
  `export interface IBEClusterMetaSyncDataCleanInitPOSTPayload extends IPayload {\n` +
  `  query: {\n` +
  `    details?: ClusterDataCleanDetail[];\n` +
  `    taskId ?: string;\n` +
  `  }\n` +
  `}\n\n`
}