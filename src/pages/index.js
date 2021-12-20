import Head from 'next/head'
import HeroBanner from '../components/HeroBanner'
import HomePage from '../components/HomePage/HomePage'

export default function Home() {
  return (
    <>
      <Head>
        <title>NFT Bank</title>
        <meta name="description" content="NFT Bank | Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroBanner />
    </>
  )
}
