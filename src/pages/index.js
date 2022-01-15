import { useState, useEffect } from 'react'
import Head from 'next/head'
import HomePage from '../components/HomePage'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import { CHAIN_ID, SITE_ERROR, SMARTCONTRACT_ABI, SMARTCONTRACT_ABI_ERC20, SMARTCONTRACT_ADDRESS, SMARTCONTRACT_ADDRESS_ERC20 } from '../../config'
import Sidebar from '../components/Sidebar'
import MainContent from '../components/MainContent'
import Header from '../components/Header'
import { ethers, providers } from 'ethers'
import { errorAlert, errorAlertCenter } from '../components/toastGroup'
import Moralis from 'moralis'
import MobileFooter from '../components/MobileFooter'
import { providerOptions } from '../hook/connectWallet'
import { checkNetwork } from '../hook/ethereum'

let web3Modal = undefined

export default function Home({ headerAlert, closeAlert }) {

  const [totalReward, setTotalReward] = useState(0)
  const [loading, setLoading] = useState(false)

  const [stakedCnt, setStakedCnt] = useState(0)
  const [unstakedCnt, setUnstakedCnt] = useState(0)

  const [connected, setConnected] = useState(false)
  const [signerAddress, setSignerAddress] = useState("")
  const [signerBalance, setSignerBalance] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const [totalDusty, setTotalDusty] = useState(0)
  const [staked, setStaked] = useState(0)
  const [earlyRemoved, setEarlyRemoved] = useState(0)
  const [dbalance, setdBalance] = useState(0)
  const [holders, setHolders] = useState(0)
  const [homeLoading, setHomeloading] = useState(false)
  const [ownerDusty, setTotalOwnerDusty] = useState(false)

  const connectWallet = async () => {
    if (await checkNetwork()) {
      web3Modal = new Web3Modal({
        network: 'mainnet', // optional
        cacheProvider: true,
        providerOptions, // required
      })
      setHomeloading(true) //loading start

      const provider = await web3Modal.connect()
      const web3Provider = new providers.Web3Provider(provider)

      const signer = web3Provider.getSigner()
      const address = await signer.getAddress()

      setConnected(true)
      setSignerAddress(address)

      contract = new ethers.Contract(
        SMARTCONTRACT_ADDRESS,
        SMARTCONTRACT_ABI,
        signer
      )
      contract_20 = new ethers.Contract(
        SMARTCONTRACT_ADDRESS_ERC20,
        SMARTCONTRACT_ABI_ERC20,
        signer
      )
      const bal = await contract_20.balanceOf(address)
      setSignerBalance(ethers.utils.formatEther(bal))

      const totalS = await contract_20.totalSupply()
      setTotalSupply(ethers.utils.formatEther(totalS))

      const totlass = await contract_20.holders()
      setHolders(totlass.toString())

      const early = await contract.earlyRemoved()
      setEarlyRemoved(early.toString())

      const totalN = await contract_20.balanceOf(SMARTCONTRACT_ADDRESS)
      setTotalDusty(totalN.toString())

      const Obal = await contract.bonusPool()
      setTotalOwnerDusty(parseFloat(Obal.toString()) + parseFloat(1114))

      const sta = await contract.totalStaked()
      setStaked(sta.toString())

      setHomeloading(false) //loading off

      // Subscribe to accounts change
      provider.on("accountsChanged", (accounts) => {
        setSignerAddress(accounts[0])
      });

      // Subscribe to chainId change
      provider.on("chainChanged", (chainId) => {
        window.location.reload()
      });
    }
  }

  const setStakedNFTs = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    contract = new ethers.Contract(
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

  const setPastNFTs = async () => {
    setLoading(true)
    const web3 = new Web3(Web3.givenProvider)
    const accounts = await web3.eth.getAccounts()
    const userNFTs = await Moralis.Web3API.account.getNFTs({ chain: 'bsc', address: accounts[0] })
    setUnstakedCnt(userNFTs.total)
    setLoading(false)
  }
  const getNFTLIST = () => {
    setPastNFTs()
    setStakedNFTs()
  }

  useEffect(() => {
    async function fetchData() {
      if (typeof window.ethereum !== 'undefined') {
        if (await checkNetwork("no-alert")) {
          // setLoading(true)
          await connectWallet()
          getNFTLIST()
          ethereum.on('accountsChanged', function (accounts) {
            window.location.reload()
          })
          if (ethereum.selectedAddress !== null) {
            setSignerAddress(ethereum.selectedAddress)
            setConnected(true)
          }
          ethereum.on('chainChanged', (chainId) => {
            if (parseInt(chainId) === CHAIN_ID) {
              connectWallet()
            } else {
              setConnected(false)
              errorAlert(SITE_ERROR[0])
            }
          })
        }
      } else {
        errorAlertCenter(SITE_ERROR[1])
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header
        signerAddress={signerAddress}
        connectWallet={connectWallet}
        connected={connected}
        signerBalance={signerBalance}
        loading={homeLoading}
        headerAlert={headerAlert}
        closeAlert={closeAlert}
      />
      <MainContent>
        <Sidebar
          connected={connected}
          headerAlert={headerAlert}
        />
        <div className="page-content">
          <Head>
            <title>Dusty Vaults | Home</title>
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
            address={signerAddress}
            totalDusty={totalDusty}
            ownerDusty={ownerDusty}
            holders={holders}
            stakedCnt={stakedCnt}
            totalReward={totalReward}
            loading={loading}
            unstakedCnt={unstakedCnt}
          />
        </div>
      </MainContent>
      <MobileFooter connected={connected} />
    </>
  )
}
