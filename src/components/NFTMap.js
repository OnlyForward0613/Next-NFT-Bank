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
            state={item.state}
            description={item.description}
            reward={item.reward}
            stakedTime={item.stakedTime}
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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    state: 0,
  },
  {
    img: "/s2.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    state: 1,
    reward: 25,
    stakedTime: 1640053026,
  },
  {
    img: "/s3.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    reward: 32,
    state: 2,
  },
  {
    img: "/s1.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    state: 0,
  },
  {
    img: "/s2.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    state: 0,
  },
  {
    img: "/s3.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    state: 0,
  },
]