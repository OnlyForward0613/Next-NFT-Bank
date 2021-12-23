import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useNFTBalances } from 'react-moralis'
import NFTMap from '../components/NFTMap'
import TotalList from '../components/TotalList'
var _ = require('lodash')

export default function Bank({
  startLoading,
  closeLoading,
  contract,
  signer,
  contract_20,
  address,
  ...props
}) {
  const { data: NFTBalances } = useNFTBalances()
  const [nfts, setNfts] = useState([])
  const [total, setTotal] = useState(0)
  const [groupNFT, setGruopNFT] = useState([])
  const setNFTArray = (nftList) => {
    setNfts(nftList)
    setTotal(nftList.length)
    var grouped = _.mapValues(_.groupBy(nftList, 'name'), clist => clist.map(nft => _.omit(nft, 'name')))
    setGruopNFT(grouped)
  }

  useEffect(() => {
    startLoading()
    if (NFTBalances && NFTBalances.result.length !== 0) {
      setNFTArray(NFTBalances.result)
      closeLoading()
    } else if (NFTBalances && NFTBalances.result.length === 0) {
      setNFTArray([])
      closeLoading()
    }
    // eslint-disable-next-line
  }, [NFTBalances])
  return (
    <>
      <Head>
        <title>NFT Bank | Bank</title>
        <meta name="description" content="NFT Bank" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TotalList
        total={total}
        groupNFT={groupNFT}
        contract_20={contract_20}
      />
      <NFTMap
        nfts={nfts}
        groupNFT={groupNFT}
        total={total}
        address={address}
        contract_20={contract_20}
        signer={signer}
        contract={contract}
      />
    </>
  )
}
