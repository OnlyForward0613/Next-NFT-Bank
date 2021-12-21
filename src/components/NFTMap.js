import { Container } from "@mui/material";
import NFTCard from "./NFTCard";

export default function NFTMap() {
  return (
    <Container>
      <div className="nft-map">
        {nfts.map((item, key) => (
          <NFTCard
            key={key}
            image={item.img}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
    </Container>
  )
}

const nfts = [
  {
    img: "/s1.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    img: "/s2.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    img: "/s3.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    img: "/s1.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    img: "/s2.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    img: "/s3.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
]