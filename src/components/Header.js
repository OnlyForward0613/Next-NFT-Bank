import { Button } from "@mui/material";
import Link from 'next/link'
import { ConnectButton } from "./styleHook";

export default function Header({
  signerAddress,
  connectWallet,
  connected,
  ...props
}) {
  return (
    <header>
      <div className="logo">
        NFT Bank
      </div>
      <div className="nav">
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {connected &&
            <li>
              <Link href="/bank">
                <a>BANK</a>
              </Link>
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
    </header>
  )
}