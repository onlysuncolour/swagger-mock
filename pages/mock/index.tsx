import Layout from "@/components/layout";
import PathService from "@/services/path";
import Head from "next/head";
import { FC, useMemo } from "react";
import styles from './index.module.less'
import _ from 'lodash'
import { IPath } from "@/common/index.interface";
import { Tag } from "antd";
import Link from "next/link";
type Props = {
  pathsCount: number;
  pathList: IPath[]
}
export async function getStaticProps() {
  let pathsCount = 0,
    pathList:any[] = []
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
  const tags:string[] = useMemo(() => {
    return _.uniq(pathList.flatMap(pathData => (_.isEmpty(pathData.tags) ? ['_undefined'] : pathData.tags))).sort()
  }, [pathList])
  const tagGroups = useMemo(() => {
    const result: {[name:string]: IPath[]} = {'_undefined': []};
    tags.forEach(tag => result[tag] = [])
    pathList.forEach(pathData => {
      if (_.isEmpty(pathData.tags)) {
        result['_undefined'].push(pathData)
      } else {
        (pathData.tags as string[]).forEach(tag => {
          result[tag].push(pathData)
        })
      }
    })
    return result
  }, [tags, pathList])
  return (
  <Layout>
    <Head>
      <title>heywagger</title>
    </Head>
    <div className={styles.root}>
      <div className={styles.head}>
        当前共有 {pathsCount} 个接口
      </div>
      <div className={styles.content}>
        {
          tags.map(tag => 
            <div className={styles.block}>
              <div className={styles.tag}>
                {tag}
              </div>
              <div className={styles.pathList}>
                {
                  tagGroups[tag].map(path => <div className={styles.path}>
                    <div className={styles.pathContent}>
                      <Tag>{path.method}</Tag>
                      <Link href={`/mock/detail?path=${path.url}&method=${path.method}`}>{path.url}</Link>
                    </div>
                    {
                      path.summary && <div className={styles.pathDesc}>{path.summary}</div>
                    }
                  </div>)
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  </Layout>)
}

export default Mock