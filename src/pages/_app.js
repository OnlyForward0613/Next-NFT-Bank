import { useEffect, useState } from 'react'
import '../styles/style.scss'
import Web3Modal from "web3modal"
import { ToastContainer } from 'react-toastify'
import Loading from '../components/Loading'
import Header from '../components/Header'

let provider = undefined

function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false)
  const [connected, setConnected] = useState(false)
  const [signerAddress, setSignerAddress] = useState("")

  const connectWallet = async () => {
    const providerOptions = {
      /* See Provider Options Section */
    }
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
  useEffect(() => {
    ethereum.on('accountsChanged', function (accounts) {
      if (accounts.length !== 0) {
        setSignerAddress(accounts[0])
        setConnected(true)
      } else {
        setConnected(false)
      }
    });
    if (ethereum.selectedAddress !== null) {
      setConnected(true)
      setSignerAddress(ethereum.selectedAddress)
    }
    connectWallet()
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <Header
        signerAddress={signerAddress}
        connectWallet={connectWallet}
        connected={connected}
      />
      <Component {...pageProps} />
      <ToastContainer style={{ fontSize: 14, padding: '5px !important', lineHeight: '15px' }} />
      <Loading loading={pageLoading} />
    </>
  )
}

export default MyApp
