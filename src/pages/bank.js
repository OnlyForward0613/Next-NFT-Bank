import Head from 'next/head'
import NFTMap from '../components/NFTMap'
import TotalList from '../components/TotalList'

export default function Bank() {
  return (
    <>
      <Head>
        <title>NFT Bank | Bank</title>
        <meta name="description" content="NFT Bank" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TotalList />
      <NFTMap />
    </>
  )
}
