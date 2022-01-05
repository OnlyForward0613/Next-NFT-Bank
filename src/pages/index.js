import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useNFTBalances } from 'react-moralis'
import HomePage from '../components/HomePage'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import { ethers } from 'ethers'
import { SMARTCONTRACT_ABI, SMARTCONTRACT_ADDRESS } from '../../config'
import Sidebar from '../components/Sidebar'

export default function Home({
  connected,
  checkNetwork,
  totalSupply,
  staked,
  address,
  holders,
  earlyRemoved,
  contractcontract,
  ownerDusty,
  totalDusty,
  dbalance,
  homeLoading,
  ...props
}) {
  const { data: NFTBalances } = useNFTBalances()
  const [totalReward, setTotalReward] = useState(0)
  const [loading, setLoading] = useState(false)

  const [stakedCnt, setStakedCnt] = useState(0)
  const [unstakedCnt, setUnstakedCnt] = useState(0)

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
    const total = await contract.staked(accounts[0])
    if (parseInt(total.toString()) !== 0) {
      let dd = 0
      let mmm = 0
      for (var i = 0; i < total; i++) {
        const nftData = await contract.activities(accounts[0], i)
        if (nftData.action === 1) {
          dd++
          mmm = mmm + parseFloat(ethers.utils.formatEther(nftData.reward.toString()))
        }
      }
      setStakedCnt(dd)
      setTotalReward(mmm)
    }
    setLoading(false)
  }

  const setPastNFTs = () => {
    setLoading(true)
    if (NFTBalances && NFTBalances.result.length !== 0) {
      setUnstakedCnt(NFTBalances.total)
    } else if (NFTBalances && NFTBalances.result.length === 0) {
      // setLoading(false)
    }
  }
  const getNFTLIST = () => {
    setPastNFTs()
    setStakedNFTs()
  }

  useEffect(async () => {
    setLoading(true)
    if (typeof window.ethereum !== 'undefined') {
      if (await checkNetwork("no-alert")) {
        getNFTLIST()
      }
    }
    // eslint-disable-next-line
  }, [NFTBalances])

  return (
    <>
      <Sidebar
        connected={connected}
      />
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
          homeLoading={homeLoading}
          address={address}
          totalDusty={totalDusty}
          ownerDusty={ownerDusty}
          holders={holders}
          stakedCnt={stakedCnt}
          totalReward={totalReward}
          loading={loading}
          unstakedCnt={unstakedCnt}
        />
      </div>
    </>
  )
}
