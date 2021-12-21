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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    state: 0,
  },
  {
    img: "/s2.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    state: 1,
    reward: 25,
    stakedTime: "2022-12-20 21:24:36",
  },
  {
    img: "/s3.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    reward: 32,
    state: 1,
    stakedTime: "2022-12-20 09:56:21",
  },
  {
    img: "/s1.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    state: 0,
  },
  {
    img: "/s2.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    state: 0,
  },
  {
    img: "/s3.png",
    name: "NFT #23",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    state: 0,
  },
]