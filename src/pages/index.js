import Head from 'next/head'
import HeroBanner from '../components/HeroBanner'

export default function Home({
  connected,
  checkNetwork,
  closeLoading,
  ...props
}) {
  return (
    <>
      <Head>
        <title>NFT Bank | Home</title>
        <meta name="description" content="NFT Bank" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroBanner connected={connected} checkNetwork={checkNetwork} closeLoading={closeLoading} />
    </>
  )
}
