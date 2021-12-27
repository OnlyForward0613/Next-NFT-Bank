import { useEffect, useState } from 'react'
import '../styles/style.scss'
import Web3Modal from "web3modal"
import { ToastContainer } from 'react-toastify'
import Loading from '../components/Loading'
import Header from '../components/Header'
import Web3 from 'web3'
import { ethers } from 'ethers'
import { errorAlert } from '../components/toastGroup'
import { MoralisProvider } from "react-moralis"
import { APP_ID, CHAIN_ID, SERVER_URL, SMARTCONTRACT_ABI, SMARTCONTRACT_ABI_ERC20, SMARTCONTRACT_ADDRESS, SMARTCONTRACT_ADDRESS_ERC20 } from '../../config'

let provider = undefined
let contract = undefined
let contract_20 = undefined
let signer = undefined

const error = [
  "The wrong network, please switch to the Binance Smart Chain network."
]
function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false)
  const [connected, setConnected] = useState(false)
  const [signerAddress, setSignerAddress] = useState("")

  const connectWallet = async () => {
    if (await checkNetwork()) {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      setConnected(true)
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
    }
  }
  useEffect(() => {
    if (ethereum) {
      ethereum.on('accountsChanged', function (accounts) {
        if (accounts.length !== 0) {
          setSignerAddress(accounts[0])
          connectWallet()
        } else {
          setConnected(false)
        }
      })
      if (ethereum.selectedAddress !== null) {
        setSignerAddress(ethereum.selectedAddress)
        setConnected(true)
      }
      connectWallet()

      ethereum.on('chainChanged', (chainId) => {
        if (parseInt(chainId) === CHAIN_ID) {
          connectWallet()
        } else {
          setConnected(false)
          errorAlert(error)
        }
      })
    } else {
      errorAlert("Please install Metamask!")
    }
    // eslint-disable-next-line
  }, [])

  const checkNetwork = async () => {
    const web3 = new Web3(Web3.givenProvider)
    const chainId = await web3.eth.getChainId()
    if (chainId === CHAIN_ID) {
      return true
    } else {
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
      />
      <Component {...pageProps}
        connected={connected}
        startLoading={() => setPageLoading(true)}
        closeLoading={() => setPageLoading(false)}
        address={signerAddress}
        signer={signer}
      />
      <ToastContainer style={{ fontSize: 14, padding: '5px !important', lineHeight: '15px' }} />
      <Loading loading={pageLoading} />
    </MoralisProvider>
  )
}

export default MyApp
