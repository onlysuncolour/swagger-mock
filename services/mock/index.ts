import { IMethodStandard, IMockFile, IMockPathMethod, IMockPathData } from "@/common/index.interface"
import readFile from "../file/read-file"
import _ from 'lodash'
import { formatSearchToObj } from "@/common/utils"
import writeFile from "../file/write-file"

const mockFilePath = './data/mock.json'
const mockFileReadPath = '../../data/mock.json'

class MockService {
  static async getTotalMockData():Promise<IMockFile> {
    let mocks: IMockFile = {}
    try {
      const mockDatas = await (readFile(mockFileReadPath, 'json') as Promise<IMockFile>)  
      mocks = mockDatas || {}
    } finally {
      return mocks
    }
  }
  static async getMockDataByPath(path, method: IMethodStandard):Promise<IMockPathMethod> {
    let mocks: IMockPathMethod = {}
    try {
      const mockDatas = await (readFile(mockFileReadPath, 'json') as Promise<IMockFile>)  
      mocks = mockDatas?.[path]?.[method] || {}
    } finally {
      return mocks
    }
  }
  static async removeMockData(path: string, method: IMethodStandard, param: string) {
    const mocks = await this.getTotalMockData();
    const pathMethods = mocks?.[path]?.[method]
    if (pathMethods && pathMethods[param]) {
      delete pathMethods[param]
    }
    try {
      await writeFile(mockFilePath, mocks)
    } catch (error) {
      return error
    }
    return {ok: true}
  }
  static async saveMockData(path: string, method: IMethodStandard, param: string, data: IMockPathData) {
    const mocks = await this.getTotalMockData();
    const pathMethods = mocks?.[path]?.[method]
    if (pathMethods && data.param !== param && pathMethods[param]) {
      delete pathMethods[param]
    }
    if (!mocks[path]) {
      mocks[path] = {}
    }
    if (!mocks[path]?.[method]) {
      mocks[path][method] = {}
    }
    (mocks[path][method] as {})[data.param] = data
    try {
      await writeFile(mockFilePath, mocks)
    } catch (err) {
      return err
    }
    return {ok: true}
  }
  static async getMockData(path, method, search) {
    const mocks = await this.getMockDataByPath(path, method);
    let result:any = mocks.default?.data ? JSON.parse(mocks.default?.data) : {}
    if (_.isEmpty(search) || _.isEmpty(mocks)) {
      return result
    }
    const searchObj = formatSearchToObj(search)
    const paramKey = Object.keys(mocks).find(_key => {
      if (_key === 'default') {
        return false
      }
      const mockSearch = formatSearchToObj(_key)
      if (_.isEqual(mockSearch, searchObj)) {
        return true
      }
      return false
    }) || 'default'
    return mocks[paramKey]?.data || {}
  }
}

export default MockService