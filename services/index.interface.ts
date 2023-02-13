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