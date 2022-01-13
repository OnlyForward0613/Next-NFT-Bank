import { useState } from "react"
import Link from 'next/link'
import { ConnectButton } from "./styleHook"
import { Skeleton } from "@mui/material"

export default function Header({
  signerAddress,
  connectWallet,
  connected,
  signerBalance,
  loading,
  headerAlert,
  closeAlert,
  ...props
}) {

  const [open, setOpen] = useState(false)

  return (
    <header>
      {headerAlert &&
        <div className="header-alert">
          <p>Currently on Binance. More Chains coming....</p>
          <button onClick={() => closeAlert()}>
            <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_7_12)">
                <path d="M15.5667 1.42462L9.20279 7.78859L2.83883 1.42463C2.13172 0.717514 0.717507 2.13173 1.42461 2.83884L7.78857 9.2028L1.42461 15.5668C0.717509 16.2739 2.13172 17.6881 2.83883 16.981L9.20279 10.617L15.5667 16.981C16.2739 17.6881 17.6881 16.2739 16.981 15.5668L10.617 9.2028L16.981 2.83884C17.6881 2.13173 16.2739 0.717515 15.5667 1.42462Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_7_12">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      }
      <div className="header-main">
        <div className="logo">
          <Link href="/">
            <a className="header-logo">
              {/* eslint-disable-next-line */}
              <img
                src="./logo.png"
                alt="Dusty Vaults"
              />
              <i>Dusty Vaults</i>
            </a>
          </Link>
        </div>

        <div className="nav">
          <ul>
            {connected &&
              <li>
                <p className="signer-balance"><span>Your $Dusty:</span>&nbsp;
                  {loading ?
                    <Skeleton width={90} sx={{ bgcolor: '#ffffff20' }} height={32} style={{ backgroundColor: "ffffff3d" }} />
                    :
                    <span>{new Intl.NumberFormat().format(parseFloat(signerBalance).toFixed(2))}</span>
                  }
                </p>
              </li>
            }
            <li className="connect-button">
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
                    <Link href="/nfts-list">
                      <a onClick={() => setOpen(false)}>MY NFTs</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq">
                      <a onClick={() => setOpen(false)}>FAQ</a>
                    </Link>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </div>
    </header >
  )
}