import Layout from "@/components/layout";
import PathService from "@/services/path";
import Head from "next/head";
import { FC, useState } from "react";
import styles from './index.module.less'
import { IMockPathData, IPathDetailResp } from "@/common/index.interface";
import _ from 'lodash';
import { Button, Tag } from "antd";
import MockContent from "@/components/mockContent";
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
  const { path, defs } = pathDetail
  const [mocks, setMocks] = useState<IMockPathData[]>(() => {
    const _default:IMockPathData = { param: 'default', type: 'json', data: null, uuid: _.uniqueId() }
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
    const newMockData:IMockPathData = { param: '', type: 'json', data: null, uuid: _.uniqueId() }
    setMocks([...mocks, newMockData])
  }
  const handleRemoveMock = (i) => {
    const _mocks = _.cloneDeep(mocks)
    _mocks.splice(i, 1)
    setMocks(_mocks);
    //  api
  }
  const handleSaveMock = (i, v) => {
    // api
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
              onRemoveMock={() => handleRemoveMock(i)}
              onSaveMock = {(v) => handleSaveMock(i, v)}
            />
          </div>
        })}
        <Button onClick={addMock}>添加mock</Button>
      </div>
    </div>
  </Layout>)
}

export default MockDetail