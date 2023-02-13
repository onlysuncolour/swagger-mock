import react, {useState} from 'react'
import Head from 'next/head'
import Layout from '@/components/layout'
import { Button } from 'antd';
import AppContent from '@/components/appContent';

export async function getStaticProps() {
  return {
    props: {
    },
  };
}
export default function Home({

}) {
  const [updateLoading, setUpdateLoading] = useState(false)
  const updateSwagger = () => {

  }
  return (
    <Layout>
      <Head>
        <title>heywagger</title>
        <meta name="description" content="hey, welcome to swagger mock" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppContent
        updateSwagger={updateSwagger}
        updateLoading={updateLoading}
      ></AppContent>
    </Layout>
  )
}
