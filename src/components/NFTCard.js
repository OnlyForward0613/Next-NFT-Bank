import { useState } from "react"
import { DoActionButton, UnstakeButton, BigStakeButton } from "./styleHook"
import Countdown from 'react-countdown'
import { Modal, Box, Checkbox } from "@mui/material"
import CostSlider from "./CostSlider"
import { styled } from '@mui/material/styles';

export default function NFTCard({ image, name, description, state, reward, stakedTime, ...props }) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)

  const [open, setOpen] = useState(false)

  const handleTime = (e) => {
    setDays(e.days < 10 ? `0${e.days}` : e.days)
    setHours(e.hours < 10 ? `0${e.hours}` : e.hours)
    setMinute(e.minutes < 10 ? `0${e.minutes}` : e.minutes)
    setSecond(e.seconds < 10 ? `0${e.seconds}` : e.seconds)
  }
  return (
    <div className={state !== 1 ? "nft-card" : "nft-card staked"}>
      {/* eslint-disable-next-line */}
      <img
        alt=""
        src={image}
      />
      <p className="name">{name}</p>
      {state === 1 &&
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
        {state !== 1 &&
          <DoActionButton onClick={() => setOpen(true)}>
            Stake
          </DoActionButton>
        }
        {state === 1 &&
          <UnstakeButton>
            Unstake
          </UnstakeButton>
        }
      </div>
      {state === 1 &&
        <div style={{ display: "none" }}>
          <Countdown date={stakedTime} onTick={(e) => handleTime(e)} />
        </div>
      }
      <CardModal name={name} description={description} image={image} open={open} close={() => setOpen(false)} />
    </div>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 640,
  bgcolor: '#333',
  boxShadow: 24,
  borderRadius: "12px",
  p: 4,
};

export function CardModal({ name, image, description, open, close, ...props }) {
  const [agree, setAgree] = useState(false)
  const handleChange = (e) => {
    setAgree(e.target.checked)
  }
  return (
    <Modal
      open={open}
      onClose={close}
    >
      <Box sx={style}>
        <div className="stake-modal">
          <div className="modal-image">
            {/* eslint-disable-next-line */}
            <img
              src={image}
              alt=""
            />
          </div>
          <div className="modal-content">
            <p>Name</p>
            <h5>{name}</h5>
            <p>Description</p>
            <h5>{description}</h5>
            <CostSlider />
            <div className="agree-mode">
              <Checkbox
                checked={agree}
                onChange={handleChange}
                name="jason"
                size="sm"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
              />
              <p>
                I understand this is a 12 monthly storage option and that if I wish to withdraw my NFTs prior to that I will not receive my initial fire or earned fees.
              </p>
            </div>
            <div className="modal-action">
              <BigStakeButton>
                Stake
              </BigStakeButton>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 12,
  height: 12,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#52af77',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 12,
    height: 12,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#52af77',
  },
});