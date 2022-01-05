import { useEffect, useState } from 'react'
import '../styles/style.scss'
import Web3Modal from "web3modal"
import { ToastContainer } from 'react-toastify'
import Loading from '../components/Loading'
import Header from '../components/Header'
import Web3 from 'web3'
import { ethers } from 'ethers'
import { errorAlert, errorAlertCenter } from '../components/toastGroup'
import { MoralisProvider } from "react-moralis"
import { APP_ID, CHAIN_ID, SERVER_URL, SMARTCONTRACT_ABI, SMARTCONTRACT_ABI_ERC20, SMARTCONTRACT_ADDRESS, SMARTCONTRACT_ADDRESS_ERC20 } from '../../config'
import MainContent from '../components/MainContent'

let provider = undefined
let contract = undefined
let contract_20 = undefined
let signer = undefined

const error = [
  "The wrong network, please switch to the Binance Smart Chain network.",
  "You need MetaMask to interact with this site!"
]
function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false)
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
      setHomeloading(true) //loading start
      const web3 = new Web3(Web3.givenProvider)
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const accounts = await web3.eth.getAccounts()
      setConnected(true)
      setSignerAddress(accounts[0])
      provider = new ethers.providers.Web3Provider(connection)
      signer = provider.getSigner()
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
      const bal = await contract_20.balanceOf(accounts[0])
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

    }
  }
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      connectWallet()

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
          errorAlert(error)
        }
      })
    } else {
      errorAlertCenter(error[1])
    }
    // eslint-disable-next-line
  }, [])

  const checkNetwork = async (alert) => {
    const web3 = new Web3(Web3.givenProvider)
    const chainId = await web3.eth.getChainId()
    if (chainId === CHAIN_ID) {
      return true
    } else {
      if (alert !== "no-alert")
        errorAlert(error[0])
      return false
    }
  }

  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <Header
        signerAddress={signerAddress}
        connectWallet={connectWallet}
        connected={connected}
        signerBalance={signerBalance}
      />
      <MainContent>
        <Component {...pageProps}
          connected={connected}
          checkNetwork={checkNetwork}
          startLoading={() => setPageLoading(true)}
          closeLoading={() => setPageLoading(false)}
          address={signerAddress}
          signer={signer}
          signerBalance={signerBalance}
          totalSupply={totalSupply}
          staked={staked}
          dbalance={dbalance}
          holders={holders}
          ownerDusty={ownerDusty}
          earlyRemoved={earlyRemoved}
          totalDusty={totalDusty}
          contractcontract={contract}
          homeLoading={homeLoading}
        />
      </MainContent>
      <ToastContainer style={{ fontSize: 14, padding: '5px !important', lineHeight: '15px' }} />
      <Loading loading={pageLoading} />
    </MoralisProvider>
  )
}

export default MyApp
