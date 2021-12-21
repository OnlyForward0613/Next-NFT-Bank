import { Container } from "@mui/material";
import { MintButton } from "./styleHook";
import { useRouter } from 'next/router'
import { errorAlert } from "./toastGroup";

export default function HeroBanner({
  connected,
  ...props
}) {
  const router = useRouter()
  const goto = () => {
    if (connected) {
      router.push("/bank")
    } else {
      errorAlert("Please connect wallet!")
    }
  }
  return (
    <div className="hero-banner">
      <Container>
        <h1>Welcome to NFT Bank</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <MintButton onClick={goto}>
          Goto Staking
        </MintButton>
      </Container>
    </div>
  )
}