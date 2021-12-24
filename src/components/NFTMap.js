import { useState } from "react";
import { Container } from "@mui/material";
import NFTCard from "./NFTCard";

export default function NFTMap({
  nfts,
  groupNFT,
  total,
  contract,
  contract_20,
  address,
  signer,
  ...props
}) {
  const [pageRerender, setPageRerender] = useState("")
  return (
    <Container>
      <div className="nft-map">
        {nfts.length !== 0 ? nfts.reverse().map((item, key) => (
          <NFTCard
            key={key}
            data={item}
            state={0}
            contract={contract}
            address={address}
            pageRerender={pageRerender}
            reRender={(e) => setPageRerender(e)}
            signer={signer}
            contract_20={contract_20}
          />
        )) :
          <h3 className="empty-text">
            You don&apos;t have any NFTs on this Wallet adderss
          </h3>
        }
      </div>
    </Container>
  )
}
