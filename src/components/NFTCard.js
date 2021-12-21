import { useState } from "react"
import { DoActionButton, UnstakeButton, ClaimButton } from "./styleHook"
import Countdown from 'react-countdown'

export default function NFTCard({ image, name, description, state, reward, stakedTime, ...props }) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)

  const handleTime = (e) => {
    setDays(e.days < 10 ? `0${e.days}` : e.days)
    setHours(e.hours < 10 ? `0${e.hours}` : e.hours)
    setMinute(e.minutes < 10 ? `0${e.minutes}` : e.minutes)
    setSecond(e.seconds < 10 ? `0${e.seconds}` : e.seconds)
  }
  return (
    <div className={state === 0 ? "nft-card" : "nft-card staked"}>
      {/* eslint-disable-next-line */}
      <img
        alt=""
        src={image}
      />
      <p className="name">{name}</p>
      <p></p>
      {state !== 0 &&
        <>
          <div className="cost-ribbon">
            <p>{reward}<span>%</span></p>
            <p className="reward">reward</p>
          </div>
          {state === 1 &&
            <p className="left-days">
              <span>{days}</span> day: <span>{hours}</span> hour : <span>{minute}</span> min : <span>{second}</span> sec
            </p>
          }
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

      <div style={{ display: "none" }}>
        <Countdown date="2022-12-20" onTick={(e) => handleTime(e)} />
      </div>
    </div >
  )
}