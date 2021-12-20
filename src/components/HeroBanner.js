import { Button, Container } from "@mui/material";
import { MintButton } from "./styleHook";

export default function HeroBanner() {
  return (
    <div className="hero-banner">
      <Container>
        <h1>Welcome to NFT Bank</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <MintButton>
          Goto Staking
        </MintButton>
      </Container>
    </div>
  )
}