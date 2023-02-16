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

export interface IDefinition {
  type?: string
  description?: string
  title?: string
  properties?: {
    [propName: string]: IDefinitionProperty
  }
}
export interface IDefinitionProperty {
  
}

export interface ISchema {
  ref?: string;
  [propsName: string]: string | undefined;
}
export interface IDataPathMethod {
  responses: {
    description?: string;
    schema?: any
  }
  summary?: string
  tags?: string[]
}

export interface IPath extends IDataPathMethod {
  url: string;
  method: 'get' | 'post' | 'put';
}
