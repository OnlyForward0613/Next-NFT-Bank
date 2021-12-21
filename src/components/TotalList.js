import { Container } from "@mui/material";

export default function TotalList() {
  return (
    <div className="total-list">
      <Container>
        <p className="total-nft">Total NFTs:<span>17</span></p>
        <div className="total-list-content">
          <div className="list-item">
            <p>Owl NFTs:<span>4</span></p>
          </div>
          <div className="list-item">
            <p>PrettyKitty NFTs:<span>5</span></p>
          </div>
          <div className="list-item">
            <p>BoardZilla NFTs:<span>1</span></p>
          </div>
          <div className="list-item">
            <p>OMG NFTs:<span>2</span></p>
          </div>
        </div>
      </Container>
    </div>
  )
}