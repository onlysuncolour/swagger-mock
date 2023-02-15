import Layout from "@/components/layout";
import PathService from "@/services/path";
import Head from "next/head";
import { FC } from "react";
import styles from './index.module.less'
type Props = {
  pathsCount: number;
  pathList: any[]
}
export async function getStaticProps() {
  let pathsCount = 0,
    pathList = {}
  try {
    [pathsCount, pathList] = await Promise.all([PathService.getPathCount(), PathService.getPathList()])
  } catch (error) {
    // error
  }
  return {
    props: {
      pathsCount,
      pathList,
    },
  };
}
const Mock:FC<Props> = ({
  pathsCount,
  pathList
}) => {
  return (
  <Layout>
    <Head>
      <title>heywagger</title>
    </Head>
    <div className={styles.root}>
      <div className={styles.head}>
        当前共有 {pathsCount} 个接口
      </div>
      
    </div>
  </Layout>)
}

export default Mock