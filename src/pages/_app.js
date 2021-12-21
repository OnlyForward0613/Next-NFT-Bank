import { useEffect, useState } from 'react'
import '../styles/style.scss'
import Web3Modal from "web3modal"
import { ToastContainer } from 'react-toastify'
import Loading from '../components/Loading'
import Header from '../components/Header'
import Web3 from 'web3'
import { errorAlert } from '../components/toastGroup'

let provider = undefined
const error = [
  "The wrong network, please switch to the Binance Smart Chain network."
]
function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false)
  const [connected, setConnected] = useState(false)
  const [signerAddress, setSignerAddress] = useState("")

  const connectWallet = async () => {

    if (await checkNetwork()) {
      const providerOptions = {
        /* See Provider Options Section */
      }
      setConnected(true)
      const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
      })
      provider = await web3Modal.connect()
      provider.on("accountsChanged", (accounts) => {
        console.log(accounts)
        if (accounts.length === 0) {
          setConnected(false)
        } else {
          setConnected(true)
          setSignerAddress(accounts[0])
        }
      });
    }
  }
  useEffect(() => {
    ethereum.on('accountsChanged', function (accounts) {
      if (accounts.length !== 0) {
        setSignerAddress(accounts[0])
        connectWallet()
      } else {
        setConnected(false)
      }
    });
    if (ethereum.selectedAddress !== null) {
      setConnected(true)
      setSignerAddress(ethereum.selectedAddress)
    }
    connectWallet()

    ethereum.on('chainChanged', (chainId) => {
      if (parseInt(chainId) === 56 || parseInt(chainId) === 97) {
        connectWallet()
      } else {
        setConnected(false)
        errorAlert(error)
      }
    })
    // eslint-disable-next-line
  }, [])

  const checkNetwork = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const chainId = await web3.eth.getChainId()
    if (chainId === 56 || chainId === 97) {
      return true
    } else {
      errorAlert(error[0])
      return false
    }
  }

  return (
    <>
      <Header
        signerAddress={signerAddress}
        connectWallet={connectWallet}
        connected={connected}
      />
      <Component {...pageProps}
        connected={connected}
      />
      <ToastContainer style={{ fontSize: 14, padding: '5px !important', lineHeight: '15px' }} />
      <Loading loading={pageLoading} />
    </>
  )
}

export default MyApp
