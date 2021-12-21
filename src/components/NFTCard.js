import { DoActionButton } from "./styleHook";

export default function NFTCard({ image, name, description, ...props }) {
  return (
    <div className="nft-card">
      {/* eslint-disable-next-line */}
      <img
        alt=""
        src={image}
      />
      <p className="name">{name}</p>
      <div className="card-action">
        <DoActionButton>
          Stake
        </DoActionButton>
      </div>
    </div>
  )
}