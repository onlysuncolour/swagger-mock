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
  additionalProperties?: IDefinitionPropertyResp;
  properties: {
    [propsName: string]: IDefinitionPropertyResp;
  }
}

export interface IDefinitionPropertyResp {
  description?: string;
  type: "string" | "integer" | "object" | "array" | "file" | "number" | "boolean" | undefined;
  format?: string;
  originalRef?: string;
  '$ref'?: string
  enum: string[];
  items: IDefinitionPropertyResp;
  minimum: number
  maximum: number
  additionalProperties: IDefinitionPropertyResp
  properties: {
    [propsName: string]: IDefinitionPropertyResp;
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
  summary?: string;
  tags?: string[];
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
  schema?: ISchemaResp | any; //: {$ref: "#/definitions/OpenUserClusterSaveRequestDTO"}
  [propsName: string]: any;
}

export interface ISchemaResp {
  ['$ref']?: string;
  [propsName: string]: any
}

export interface IStandardRespBody {
  [200]: IStandardResp;
  [propsName: string]: any;
  [propsName: number]: any;
}
export interface IStandardResp {
  schema?: ISchemaResp | any;
  description?: string;
  [propsName: string]: any;
}

export interface IDataPathFile {
  [propsName: string]: IDataPath;
}

export interface IDataPath {
  get?: IDataPathMethod;
  post?: IDataPathMethod
}

export interface IDefinitionFile {
  [definition: string]: IDefinition;
}

export interface IDefinition {
  type?: "string" | "integer" | "object" | "array" | "file" | "number" | "boolean" | undefined;
  description?: string
  properties?: {
    [propName: string]: IDefinitionProperty
  }
}
export interface IDefinitionProperty {
  description?: string;
  type?: "string" | "integer" | "object" | "array" | "file" | "number" | "boolean" | undefined;
  format?: string;
  ref?: string;
  refDescription?: string;
  enum?: string[];
  children?: IDefinitionProperty;
  minimum?: number
  maximum?: number
  unstableProperties?: IDefinitionProperty
  properties?: {
    [propsName: string]: IDefinitionProperty;
  }
}

export interface ISchema {
  ref?: string;
  type?: string;
  [propsName: string]: string | undefined;
}
export interface IDataPathMethod {
  responses: {
    description?: string;
    schema?: IDefinitionProperty
  }
  summary?: string
  tags?: string[]
}

export interface IPath extends IDataPathMethod {
  url: string;
  method: IMethodStandard;
}

export interface IMockFile {
  [path:string]: IMockPathDatas
}

export interface IMockPathDatas {
  get?: IMockPathMethod;
  post?: IMockPathMethod;
}

export interface IMockPathMethod {
  [param: string]: IMockPathData
}
export interface IMockPathData {
  type: 'schema' | 'json';
  param: string;
  data: string;
  uuid?: string
}

export interface IPathDetailResp {
  path: IPath;
  mocks: IMockPathMethod;
  def: IDefinitionProperty
}

export type IMethodStandard = 'get' | 'post'

export interface ISimpleResp {
  ok: boolean
}

export interface IEditorRefCurrent {
  getResult: () => any
}

export type TEditorRefCurrent = null | IEditorRefCurrent

export interface IUuidRef {
  [uuid: TUuid]: {
    current: TEditorRefCurrent
  }
}

export type TUuid = string