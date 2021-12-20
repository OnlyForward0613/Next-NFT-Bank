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
      <ConnectButton onClick={connectWallet} disabled={connected}>
        {connected ?
          signerAddress.slice(0, 4) + "..." + signerAddress.slice(39, 42) :
          "Connect"
        }
      </ConnectButton>
    </header>
  )
}