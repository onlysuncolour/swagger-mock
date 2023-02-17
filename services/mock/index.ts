import { IMockFile, IMockPathMethod } from "@/common/index.interface"
import readFile from "../file/read-file"
import _ from 'lodash'
import { formatSearchToObj } from "@/common/utils"

class MockService {
  static async getMockDataByPath(path, method):Promise<IMockPathMethod> {
    let mocks: IMockPathMethod = {}
    try {
      const mockDatas = await (readFile('../../data/mock.json', 'json') as Promise<IMockFile>)  
      mocks = mockDatas?.[path]?.[method] || {}
    } finally {
      return mocks
    }
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
    console.log(paramKey, search)
    return JSON.parse(mocks[paramKey]?.data) || {}
  }
}

export default MockService