import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.less'
import Link from 'next/link'

export const siteTitle = 'HEYWAGGER'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="heywagger"
          content="hey, welcome to swagger mock"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <Link href="/">总览</Link>
        <Link href="/mock">mock</Link>
        <Link href="/preset">预制</Link>
      </header>
      <main>{children}</main>
    </div>
  )
}
