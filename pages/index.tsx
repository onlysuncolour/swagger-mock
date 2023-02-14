import react, {useState} from 'react'
import Head from 'next/head'
import Layout from '@/components/layout'
import { Button } from 'antd';
import AppContent from '@/components/appContent';
import PathInfoService from '@/services/info/path';

export async function getStaticProps() {
  let pathsCount = 0
  try {
    pathsCount = await PathInfoService.getPathCount();
  } catch (error) {
    // error
  }
  return {
    props: {
      pathsCount
    },
  };
}
export default function Home({
  pathsCount
}) {
  return (
    <Layout>
      <Head>
        <title>heywagger</title>
        <meta name="description" content="hey, welcome to swagger mock" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppContent
        pathsCount={pathsCount}
      ></AppContent>
    </Layout>
  )
}
