import { useState } from "react"
import Link from 'next/link'
import { ConnectButton } from "./styleHook"

export default function Header({
  signerAddress,
  connectWallet,
  connected,
  signerBalance,
  ...props
}) {

  const [open, setOpen] = useState(false)

  return (
    <header>
      <div className="logo">
        <Link href="/">
          <a className="header-logo">
            <svg width="27" height="31" viewBox="0 0 27 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5341 7.00907L15.2602 0.895827C14.33 0.34234 13.1738 0.332839 12.2347 0.870967L1.50851 7.01699C0.575516 7.55159 0 8.54466 0 9.61996V21.38C0 22.4553 0.575517 23.4484 1.50851 23.983L12.2347 30.129C13.1738 30.6672 14.33 30.6577 15.2602 30.1042L25.5341 23.9909C26.443 23.4501 27 22.4705 27 21.4128V9.58719C27 8.52948 26.443 7.54993 25.5341 7.00907Z" fill="#30E5E5" />
              <path d="M22.4809 8.9852L15.1515 4.82494C14.2479 4.31208 13.1434 4.30322 12.2317 4.80152L4.56115 8.99415C3.59865 9.52025 3 10.5297 3 11.6266V19.3734C3 20.4703 3.59865 21.4798 4.56115 22.0058L12.2317 26.1985C13.1434 26.6968 14.2479 26.6879 15.1515 26.1751L22.4809 22.0148C23.4199 21.4818 24 20.4855 24 19.4058V11.5942C24 10.5145 23.4198 9.51816 22.4809 8.9852Z" fill="#1584E8" />
              <path d="M10.8271 19H9.29346L7.02588 15.0186V19H5.4834V12.6016H7.02588L9.28906 16.583V12.6016H10.8271V19ZM16.0125 16.4512H13.5252V19H11.9827V12.6016H16.263V13.7925H13.5252V15.2646H16.0125V16.4512ZM22.1954 13.7925H20.275V19H18.7326V13.7925H16.8473V12.6016H22.1954V13.7925Z" fill="white" />
            </svg>
            <i>Dusty Vaults</i>
          </a>
        </Link>
      </div>
      <div className="nav">
        <ul>
          {/* <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {connected &&
            <>
              <li>
                <Link href="/bank">
                  <a>BANK</a>
                </Link>
              </li>
            </>
          } */}
          {connected &&
            <li>
              <p className="signer-balance">Your $Dusty: <span>{signerBalance}</span></p>
            </li>
          }
          <li>
            <ConnectButton onClick={connectWallet} disabled={connected}>
              {connected ?
                signerAddress.slice(0, 4) + "..." + signerAddress.slice(39, 42) :
                "Connect"
              }
            </ConnectButton>
          </li>
        </ul>
      </div>
      <div className="mobile-nav">
        <div className="mobile-action">
          <ConnectButton onClick={connectWallet} disabled={connected} style={{ marginRight: 50 }}>
            {connected ?
              signerAddress.slice(0, 4) + "..." + signerAddress.slice(39, 42) :
              "Connect"
            }
          </ConnectButton>
          <div className="hamburger" style={{ position: !open ? "absolute" : "fixed" }}>
            <button onClick={() => setOpen(!open)} className="ham" style={{ right: !open ? 10 : 25, top: !open ? 10 : 25 }}>
              {!open ?
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="2" width="16" height="2" rx="1" fill="#fff" />
                  <rect x="1" y="8" width="16" height="2" rx="1" fill="#fff" />
                  <rect x="1" y="14" width="16" height="2" rx="1" fill="#fff" />
                </svg>
                :
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_7_12)">
                    <path d="M15.5668 1.42462L9.20279 7.78859L2.83883 1.42463C2.13173 0.717514 0.717513 2.13173 1.42462 2.83884L7.78858 9.2028L1.42462 15.5668C0.717514 16.2739 2.13173 17.6881 2.83883 16.981L9.20279 10.617L15.5668 16.981C16.2739 17.6881 17.6881 16.2739 16.981 15.5668L10.617 9.2028L16.981 2.83884C17.6881 2.13173 16.2739 0.717515 15.5668 1.42462Z" fill="#fff" />
                  </g>
                  <defs>
                    <clipPath id="clip0_7_12">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
            </button>
          </div>
        </div>
        <div className={!open ? "mobile-dropdown" : "mobile-dropdown active"}>
          <ul>
            <li>
              <Link href="/">
                <a onClick={() => setOpen(false)}>Home</a>
              </Link>
            </li>
            {connected &&
              <>
                <li>
                  <Link href="/bank">
                    <a onClick={() => setOpen(false)}>BANK</a>
                  </Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </header >
  )
}