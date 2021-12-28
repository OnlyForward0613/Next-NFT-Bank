import Head from 'next/head'
// import HeroBanner from '../components/HeroBanner'
import HomePage from '../components/HomePage'

export default function Home({
  connected,
  checkNetwork,
  closeLoading,
  totalSupply,
  staked,
  address,
  earlyRemoved,
  totalDusty,
  dbalance,
  ...props
}) {
  return (
    <div className="page-content">
      <Head>
        <title>NFT Bank | Home</title>
        <meta name="description" content="NFT Bank" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage
        connected={connected}
        totalSupply={totalSupply}
        staked={staked}
        earlyRemoved={earlyRemoved}
        dbalance={dbalance}
        address={address}
        totalDusty={totalDusty}
      />
      {/* <HeroBanner connected={connected} checkNetwork={checkNetwork} closeLoading={closeLoading} /> */}
    </div>
  )
}
