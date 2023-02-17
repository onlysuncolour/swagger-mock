import Layout from "@/components/layout";
import PathService from "@/services/path";
import Head from "next/head";
import { FC, useState } from "react";
import styles from './index.module.less'
import { IMockPathData, IPathDetailResp, ISimpleResp } from "@/common/index.interface";
import _ from 'lodash';
import { Button, message, Tag } from "antd";
import MockContent from "@/components/mockContent";
import { fetchRemoveMock, fetchSaveMock } from "@/common/request";
type Props = {
  pathDetail: IPathDetailResp;
}
export async function getServerSideProps({query}) {
  const {path, method} = query;
  const pathDetail = await PathService.getPathDetail(path, method)
  return {
    props: {
      pathDetail
    }
  }
}
const MockDetail:FC<Props> = ({
  pathDetail,
}) => {
  console.log({
    pathDetail
  })
  const { path, defs } = pathDetail
  const [mocks, setMocks] = useState<IMockPathData[]>(() => {
    const _default:IMockPathData = { param: 'default', type: 'json', data: "", uuid: _.uniqueId() }
    if (_.isEmpty(pathDetail.mocks)) {
      return [_default]
    }
    const result:IMockPathData[] = Object.keys(pathDetail.mocks).map(key => ({...pathDetail.mocks[key], uuid: _.uniqueId()}));
    if (pathDetail.mocks.default) {
      result.splice(result.findIndex(d => d === pathDetail.mocks.default))
      result.unshift(pathDetail.mocks.default)
    } else {
      result.unshift(_default)
    }
    return result
  })
  const addMock = () => {
    const newMockData:IMockPathData = { param: '', type: 'json', data: "", uuid: _.uniqueId() }
    setMocks([...mocks, newMockData])
  }
  const handleRemoveMock = (i, cb) => {
    const _mocks = _.cloneDeep(mocks)
    const _mock = mocks[i]
    if (_mock.param && pathDetail.mocks?.[_mock.param]) {
      fetchRemoveMock({
        path: path.url,
        method: path.method,
        param: _mock.param
      }).then((resp: ISimpleResp) => {
        if (resp.ok) {
          message.success('删除成功')
          _mocks.splice(i, 1)
          setMocks(_mocks);
        }
      }, err => {
        message.error(err)
        cb()
      })
    }
    //  api
  }
  const handleSaveMock = (i, v, cb) => {
    const _mocks = _.cloneDeep(mocks)
    const _mock = mocks[i]
    // api
    fetchSaveMock({
      path: path.url,
      method: path.method,
      param: _mock.param,
      data: v
    }).then((resp:ISimpleResp) => {
      if (resp.ok) {
        message.success('更新成功')
        _mocks.splice(i, v)
        if (_mocks.param && _mocks.param !== 'default') {
          delete pathDetail.mocks[_mocks.param]
        }
        pathDetail.mocks[v.param] = _.cloneDeep(v)
      }
    }, err => {
      message.error(err)
    }).finally(() => {
      cb()
    })
  }
  return (
  <Layout>
    <Head>
      <title>heywagger</title>
    </Head>
    <div className={styles.root}>
      <div className={styles.header}>
        <div>
          <Tag>{path.method}</Tag>
          <span>{path.url}</span>
        </div>
        {path.summary && <div>{path.summary}</div>}
      </div>
      <div className={styles.content}>
        {mocks.map((mock, i)=> {
          return <div key={mock.uuid}>
            <MockContent
              mock={mock}
              defs={defs}
              path={path}
              onRemoveMock={(cb) => handleRemoveMock(i, cb)}
              onSaveMock = {(v, cb) => handleSaveMock(i, v, cb)}
            />
          </div>
        })}
        <Button onClick={addMock}>添加mock</Button>
      </div>
    </div>
  </Layout>)
}

export default MockDetail