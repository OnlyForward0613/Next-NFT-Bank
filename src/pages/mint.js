import Head from 'next/head'

export default function Home({
  connected,
  ...props
}) {
  return (
    <>
      <Head>
        <title>NFT Bank | Mint</title>
        <meta name="description" content="NFT Bank" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
