import Head from 'next/head'
import { useEffect, useState } from 'react'
import NFTMap from '../components/NFTMap'
import Web3Modal from "web3modal"
import Web3 from 'web3'
import { CHAIN_ID, SITE_ERROR, SMARTCONTRACT_ABI, SMARTCONTRACT_ABI_ERC20, SMARTCONTRACT_ADDRESS, SMARTCONTRACT_ADDRESS_ERC20 } from '../../config'
import { ethers, providers } from 'ethers'
import Sidebar from '../components/Sidebar'
import MainContent from '../components/MainContent'
import Header from '../components/Header'
import Moralis from 'moralis'
import MobileFooter from '../components/MobileFooter'
import { errorAlert, errorAlertCenter } from '../components/toastGroup'
import { providerOptions } from '../hook/connectWallet'
import { checkNetwork } from '../hook/ethereum'

export default function NFTLIST({
  startLoading,
  closeLoading,
  headerAlert,
  closeAlert,
  ...props
}) {

  let stakedNfts = []
  let unStakedNfts = []
  const [filterState, setFilterState] = useState(2)

  const [stakedList, setStakedList] = useState([])
  const [unstakedList, setUnstakedList] = useState([])
  const [checkAble, setCheckAble] = useState(false)
  const [connected, setConnected] = useState(false)
  const [signerAddress, setSignerAddress] = useState("")
  const [currentSigner, setCurrentSigner] = useState()
  const [signerBalance, setSignerBalance] = useState(0)
  const [loading, setLoading] = useState(false)

  const connectWallet = async () => {
    setLoading(true)
    if (await checkNetwork()) {
      const web3Modal = new Web3Modal({
        network: 'mainnet', // optional
        cacheProvider: true,
        providerOptions, // required
      })
      const provider = await web3Modal.connect()
      const web3Provider = new providers.Web3Provider(provider)
      const signer = web3Provider.getSigner()
      setCurrentSigner(signer)
      const address = await signer.getAddress()

      setConnected(true)
      setSignerAddress(address)

      const contract_20 = new ethers.Contract(
        SMARTCONTRACT_ADDRESS_ERC20,
        SMARTCONTRACT_ABI_ERC20,
        signer
      )
      const bal = await contract_20.balanceOf(address)
      setSignerBalance(ethers.utils.formatEther(bal))
      setLoading(false)
      provider.on("accountsChanged", (accounts) => {
        setSignerAddress(accounts[0])
      });
      provider.on("chainChanged", (chainId) => {
        window.location.reload()
      });
    }
  }

  const setStakedNFTs = async () => {
    stakedNfts = []
    startLoading()
    const web3 = new Web3(Web3.givenProvider)
    const accounts = await web3.eth.getAccounts()

    const web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true,
      providerOptions, // required
    })
    const provider = await web3Modal.connect()
    const web3Provider = new providers.Web3Provider(provider)
    const signer = web3Provider.getSigner()
    const contract = new ethers.Contract(
      SMARTCONTRACT_ADDRESS,
      SMARTCONTRACT_ABI,
      signer
    )
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
            image: nftData.imghash,
            description: nftData.description,
            reward: nftData.reward.toString(),
            percent: nftData.percent.toString(),
            timestamp: nftData.timestamp.toString()
          })
        }
      }
    }
    setStakedList(stakedNfts)
    closeLoading()
  }

  const setPastNFTs = async () => {
    startLoading()
    unStakedNfts = []
    const web3 = new Web3(Web3.givenProvider)
    const accounts = await web3.eth.getAccounts()
    const userNFTs = await Moralis.Web3API.account.getNFTs({ chain: 'bsc', address: accounts[0] })
    if (userNFTs.total !== 0) {
      startLoading()
      for (var i = 0; i < userNFTs.result.length; i++) {
        unStakedNfts.push({
          cid: -1,
          name: userNFTs.result[i].name,
          action: 0,
          token_address: userNFTs.result[i].token_address,
          token_id: userNFTs.result[i].token_id,
          reward: 0,
          timestamp: "0",
          percent: 0,
          token_uri: userNFTs.result[i].token_uri,
        })
      }
      closeLoading()
      setUnstakedList(unStakedNfts)
    } else {
      closeLoading()
    }
  }

  const getNFTLIST = () => {
    startLoading()
    setPastNFTs()
    setStakedNFTs()
  }

  useEffect(() => {
    async function fetchData() {
      if (typeof window.ethereum !== 'undefined') {
        if (await checkNetwork("no-alert")) {
          connectWallet()
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
        loading={loading}
        headerAlert={headerAlert}
        closeAlert={closeAlert}
      />
      <MainContent>
        <Sidebar
          connected={connected}
          headerAlert={headerAlert}
        />
        <div className='page-content'>
          <Head>
            <title>Dusty Vaults | NFTs List</title>
            <meta name="description" content="NFT Bank" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <NFTMap
            address={signerAddress}
            signer={currentSigner}
            setForce={(e) => setForceRender(e)}
            filterState={filterState}
            setFilterState={(e) => setFilterState(e)}
            checkAble={checkAble}
            setCheckAble={(e) => setCheckAble(e)}
            getNFTLIST={() => getNFTLIST()}
            stakedList={stakedList}
            unstakedList={unstakedList}
            startLoading={startLoading}
            closeLoading={closeLoading}
            headerAlert={headerAlert}
          />
        </div>
      </MainContent>
      <MobileFooter connected={connected} />
    </>
  )
}
