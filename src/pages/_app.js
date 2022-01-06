import { useState } from 'react'
import '../styles/style.scss'
import { ToastContainer } from 'react-toastify'
import Loading from '../components/Loading'
import Moralis from 'moralis'
import { APP_ID, SERVER_URL } from '../../config'

function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false)

  Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID })
  return (
    <>
      <Component {...pageProps}
        startLoading={() => setPageLoading(true)}
        closeLoading={() => setPageLoading(false)}
      />
      <ToastContainer style={{ fontSize: 14, padding: '5px !important', lineHeight: '15px' }} />
      <Loading loading={pageLoading} />
    </>
  )
}

export default MyApp
