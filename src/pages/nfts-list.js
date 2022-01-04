import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useNFTBalances } from 'react-moralis'
import NFTMap from '../components/NFTMap'
import Web3Modal from "web3modal"
import Web3 from 'web3'
import { SMARTCONTRACT_ABI, SMARTCONTRACT_ADDRESS } from '../../config'
import { ethers } from 'ethers'
import Sidebar from '../components/Sidebar'
var _ = require('lodash')

export default function NFTLIST({
  startLoading,
  closeLoading,
  connected,
  signer,
  totalDusty,
  address,
  checkNetwork,
  ...props
}) {

  const router = useRouter()
  let stakedNfts = []
  let unStakedNfts = []
  const { data: NFTBalances } = useNFTBalances()
  const [nfts, setNfts] = useState([])
  const [total, setTotal] = useState(0)
  const [groupNFT, setGruopNFT] = useState([])
  const [filterState, setFilterState] = useState(2)

  const [stakedList, setStakedList] = useState([])
  const [unstakedList, setUnstakedList] = useState([])
  const [checkAble, setCheckAble] = useState(false)

  const setStakedNFTs = async () => {
    stakedNfts = []
    startLoading()
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
    const total = await contract.staked(accounts[0])
    if (parseInt(total.toString()) !== 0) {
      for (var i = 0; i < total; i++) {
        const nftData = await contract.activities(accounts[0], i)
        if (nftData.action === 1) {
          stakedNfts.push({
            cid: i,
            name: nftData.name,
            token_address: nftData.NFTAddress,
            token_id: nftData.NFTId.toString(),
            token_uri: nftData.hash,
            reward: nftData.reward.toString(),
            action: nftData.action,
            reward: nftData.reward.toString(),
            percent: nftData.percent.toString(),
            timestamp: nftData.timestamp.toString()
          })
        }
      }
    }
    setStakedList(stakedNfts)
  }

  const setPastNFTs = () => {
    unStakedNfts = []
    if (NFTBalances && NFTBalances.result.length !== 0) {
      startLoading()
      console.log(NFTBalances)
      for (var i = 0; i < NFTBalances.result.length; i++) {
        unStakedNfts.push({
          cid: -1,
          name: NFTBalances.result[i].name,
          action: 0,
          token_address: NFTBalances.result[i].token_address,
          token_id: NFTBalances.result[i].token_id,
          reward: 0,
          image: NFTBalances.result[i].image,
          description: NFTBalances.result[i].description,
          timestamp: "0",
          percent: 0,
          token_uri: NFTBalances.result[i].token_uri,
        })
      }
      setUnstakedList(unStakedNfts)
      closeLoading()
    }
  }
  const getNFTLIST = () => {
    setNfts([])
    setStakedNFTs()
    setPastNFTs()
  }
  useEffect(async () => {
    if (typeof window.ethereum !== 'undefined') {
      if (connected) {
        if (await checkNetwork()) {
          getNFTLIST()
        }
      }
    }
    // eslint-disable-next-line
  }, [NFTBalances])
  return (
    <>
      <Sidebar
        connected={connected}
      />
      <div className='page-content'>
        <Head>
          <title>NFT Bank | NFTs List</title>
          <meta name="description" content="NFT Bank" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NFTMap
          groupNFT={groupNFT}
          total={total}
          address={address}
          signer={signer}
          setForce={(e) => setForceRender(e)}
          filterState={filterState}
          setFilterState={(e) => setFilterState(e)}
          checkAble={checkAble}
          setCheckAble={(e) => setCheckAble(e)}
          totalDusty={totalDusty}
          getNFTLIST={() => getNFTLIST()}
          stakedList={stakedList}
          unstakedList={unstakedList}
        />
      </div>
    </>
  )
}