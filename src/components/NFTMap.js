import { Container } from "@mui/material";
import NFTCard from "./NFTCard";

export default function NFTMap({
  nfts,
  groupNFT,
  total,
  contract,
  ...props
}) {
  return (
    <Container>
      <div className="nft-map">
        {nfts.map((item, key) => (
          <NFTCard
            key={key}
            data={item}
            state={0}
            contract={contract}
          />
        ))}
      </div>
    </Container>
  )
}
