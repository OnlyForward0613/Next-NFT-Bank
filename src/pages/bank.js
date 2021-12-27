import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useNFTBalances } from 'react-moralis'
import NFTMap from '../components/NFTMap'
import TotalList from '../components/TotalList'
var _ = require('lodash')

let allNFT = []

export default function Bank({
  startLoading,
  closeLoading,
  contract,
  connected,
  signer,
  contract_20,
  address,
  ...props
}) {

  const useForceUpdate = () => {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }

  const router = useRouter()
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
  const setStakedNFTs = async () => {
    const total = await contract.staked()
    if (parseInt(total.toString()) !== 0) {
      for (var i = 0; i < total; i++) {
        const nftData = await contract.activities(address, i)
        if (nftData.action !== 0) {
          allNFT.push({
            cid: i,
            name: nftData.name,
            token_address: nftData.NFTAddress,
            token_id: nftData.NFTId.toString(),
            token_uri: nftData.hash,
            reward: nftData.reward.toString(),
            action: nftData.action,
            percent: nftData.percent.toString(),
            timestamp: nftData.timestamp.toString()
          })
        }
      }
      setNFTArray(allNFT)
    }
  }

  useEffect(() => {
    allNFT = []
    startLoading()
    if (NFTBalances && NFTBalances.result.length !== 0) {
      if (contract !== undefined) {
        for (var i = 0; i < NFTBalances.result.length; i++) {
          allNFT.push({
            cid: -1,
            name: NFTBalances.result[i].name,
            action: 0,
            token_address: NFTBalances.result[i].token_address,
            token_id: NFTBalances.result[i].token_id,
            percent: 0,
            timestamp: "0",
            token_uri: NFTBalances.result[i].token_uri,
          })
        }
        setStakedNFTs()
      }
      closeLoading()
    } else if (NFTBalances && NFTBalances.result.length === 0) {
      closeLoading()
    }
    // eslint-disable-next-line
  }, [contract, NFTBalances])

  // useEffect(() => {
  //   if (!connected) {
  //     router.push("/")
  //   }
  //   // eslint-disable-next-line
  // }, [connected])
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
        useForceUpdate={useForceUpdate}
      />
    </>
  )
}
