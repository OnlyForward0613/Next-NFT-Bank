import { useState } from 'react'
import '../styles/style.scss'
import { ToastContainer } from 'react-toastify'
import Loading from '../components/Loading'
import { MoralisProvider } from "react-moralis"
import { APP_ID, SERVER_URL } from '../../config'

function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false)

  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <Component {...pageProps}
        startLoading={() => setPageLoading(true)}
        closeLoading={() => setPageLoading(false)}
      />
      <ToastContainer style={{ fontSize: 14, padding: '5px !important', lineHeight: '15px' }} />
      <Loading loading={pageLoading} />
    </MoralisProvider>
  )
}

export default MyApp
