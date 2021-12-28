import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useNFTBalances } from 'react-moralis'
// import HeroBanner from '../components/HeroBanner'
import HomePage from '../components/HomePage'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import { ethers } from 'ethers'
import { SMARTCONTRACT_ABI, SMARTCONTRACT_ADDRESS } from '../../config'

export default function Home({
  connected,
  checkNetwork,
  totalSupply,
  staked,
  address,
  earlyRemoved,
  totalDusty,
  dbalance,
  ...props
}) {
  let allNFT = []
  const { data: NFTBalances } = useNFTBalances()
  const [totalNFTs, setTotalNFTs] = useState(0)
  const [userStaked, setUserStaked] = useState(0)
  const [totalReward, setTotalReward] = useState(0)
  const [loading, setLoading] = useState(false)

  const setStakedNFTs = async () => {
    setLoading(true)
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
    const total = await contract.staked(accounts[0])
    if (parseInt(total.toString()) !== 0) {
      let dd = 0
      let mmm = 0
      for (var i = 0; i < total; i++) {
        const nftData = await contract.activities(accounts[0], i)
        if (nftData.action === 1) {
          dd++
          allNFT.push({
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
          mmm = mmm + parseFloat(ethers.utils.formatEther(nftData.reward.toString()))
        }
      }
      setUserStaked(dd)
      setTotalReward(mmm)
    }
    setTotalNFTs(allNFT.length)
  }

  const setPastNFTs = () => {
    setLoading(true)
    if (NFTBalances && NFTBalances.result.length !== 0) {
      for (var i = 0; i < NFTBalances.result.length; i++) {
        allNFT.push({
          cid: -1,
          name: NFTBalances.result[i].name,
          action: 0,
          token_address: NFTBalances.result[i].token_address,
          token_id: NFTBalances.result[i].token_id,
          reward: 0,
          timestamp: "0",
          percent: 0,
          token_uri: NFTBalances.result[i].token_uri,
        })
      }
      setLoading(false)
    } else if (NFTBalances && NFTBalances.result.length === 0) {
      setLoading(false)
    }
  }
  const getNFTLIST = () => {
    setLoading(true)
    setStakedNFTs()
    setPastNFTs()
  }
  useEffect(() => {
    getNFTLIST()
    // eslint-disable-next-line
  }, [NFTBalances])
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
        totalNFTs={totalNFTs}
        userStaked={userStaked}
        totalReward={totalReward}
        loading={loading}
      />
      {/* <HeroBanner connected={connected} checkNetwork={checkNetwork} closeLoading={closeLoading} /> */}
    </div>
  )
}
