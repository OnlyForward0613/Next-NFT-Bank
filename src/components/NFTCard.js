import { DoActionButton, UnstakeButton, ClaimButton } from "./styleHook";
import Countdown from 'react-countdown';

export default function NFTCard({ image, name, description, state, ...props }) {
  return (
    <div className="nft-card">
      {/* eslint-disable-next-line */}
      <img
        alt=""
        src={image}
      />
      <p className="name">{name}</p>
      <p></p>
      {state === 1 &&
        <>
          <div className="cost-ribbon">
            <p>35<span>%</span></p>
            <p className="reward">reward</p>
          </div>
          <p className="left-days">
            <span>354</span> day: <span>11</span> hour : <span>34</span> min : <span>13</span> sec
          </p>
        </>
      }
      <div className="card-action">
        {state === 0 &&
          <DoActionButton>
            Stake
          </DoActionButton>
        }
        {state === 1 &&
          <UnstakeButton>
            Unstake
          </UnstakeButton>
        }
        {state === 2 &&
          <ClaimButton>
            Claim
          </ClaimButton>
        }
      </div>
    </div >
  )
}