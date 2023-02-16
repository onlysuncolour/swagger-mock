import Layout from "@/components/layout";
import PathService from "@/services/path";
import Head from "next/head";
import { FC } from "react";
import styles from './index.module.less'
type Props = {
  pathDetail: any;
}
export async function getServerSideProps({query}) {
  const {path, method} = query;
  const pathDetail = PathService.getPathDetail(path, method)
  return {
    pathDetail
  }
}
const MockDetail:FC<Props> = ({
  pathDetail,
}) => {
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