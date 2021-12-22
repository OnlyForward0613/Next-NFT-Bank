import { Container } from "@mui/material";

export default function TotalList({
  total,
  groupNFT,
  ...props
}) {
  return (
    <div className="total-list">
      <Container>
        <p className="total-nft">Total NFTs:<span>{total}</span></p>
        <div className="total-list-content">
          {Object.keys(groupNFT).map((item, key) => (
            <div className="list-item" key={key}>
              <p>{item}:<span>{groupNFT[Object.keys(groupNFT)[key]].length}</span></p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}