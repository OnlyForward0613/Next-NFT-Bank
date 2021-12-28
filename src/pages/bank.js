import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useNFTBalances } from 'react-moralis'
import NFTMap from '../components/NFTMap'
import TotalList from '../components/TotalList'
import Web3Modal from "web3modal"
import Web3 from 'web3'
import { SMARTCONTRACT_ABI, SMARTCONTRACT_ADDRESS } from '../../config'
import { ethers } from 'ethers'
var _ = require('lodash')


export default function Bank({
  startLoading,
  closeLoading,
  connected,
  signer,
  address,
  ...props
}) {

  let allNFT = []
  const useForceUpdate = () => {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }
  const { data: NFTBalances } = useNFTBalances()
  const [nfts, setNfts] = useState([])
  const [total, setTotal] = useState(0)
  const [groupNFT, setGruopNFT] = useState([])
  const [filterState, setFilterState] = useState(2)

  const [checkAble, setCheckAble] = useState(false)

  const [forceRender, setForceRender] = useState(1)
  const setNFTArray = (nftList) => {
    setNfts(nftList)
    setTotal(nftList.length)
    var grouped = _.mapValues(_.groupBy(nftList, 'name'), clist => clist.map(nft => _.omit(nft, 'name')))
    setGruopNFT(grouped)
  }
  const setStakedNFTs = async () => {
    allNFT = []
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      SMARTCONTRACT_ADDRESS,
      SMARTCONTRACT_ABI,
      signer
    )
    const web3 = new Web3(Web3.givenProvider)
    const accounts = await web3.eth.getAccounts()
    const total = await contract.staked()

    if (parseInt(total.toString()) !== 0) {
      for (var i = 0; i < total; i++) {
        const nftData = await contract.activities(accounts[0], i)
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
    closeLoading()
  }

  useEffect(() => {
    startLoading()
    setStakedNFTs()
    if (NFTBalances && NFTBalances.result.length !== 0) {
      startLoading()
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
    } else if (NFTBalances && NFTBalances.result.length === 0) {
      closeLoading()
    }
    // eslint-disable-next-line
  }, [NFTBalances])

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
      />
      <NFTMap
        nfts={nfts}
        groupNFT={groupNFT}
        total={total}
        address={address}
        signer={signer}
        forceRender={forceRender}
        setForce={(e) => setForceRender(e)}
        filterState={filterState}
        setFilterState={(e) => setFilterState(e)}
        useForceUpdate={useForceUpdate}
        checkAble={checkAble}
        setCheckAble={(e) => setCheckAble(e)}
      />
    </>
  )
}
