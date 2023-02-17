import Layout from "@/components/layout";
import PathService from "@/services/path";
import Head from "next/head";
import { FC } from "react";
import styles from './index.module.less'
import { IPathDetailResp } from "@/common/index.interface";
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
  return (
  <Layout>
    <Head>
      <title>heywagger</title>
    </Head>
    <div className={styles.root}>
      
    </div>
  </Layout>)
}

export default MockDetail