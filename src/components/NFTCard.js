import { useEffect, useState } from "react"
import { DoActionButton, UnstakeButton, BigStakeButton } from "./styleHook"
import Countdown from 'react-countdown'
import { Modal, Box, Checkbox } from "@mui/material"
import CostSlider from "./CostSlider"
import { styled } from '@mui/material/styles'
import ClipLoader from "react-spinners/ClipLoader"

export default function NFTCard({ state, data, contract, ...props }) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [open, setOpen] = useState(false)

  const [image, setImage] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [reward, setReward] = useState("")
  const [stakedTime, setStakedTime] = useState("")
  const [tokenAddress, setTokenAddress] = useState("")
  const [tokenId, setTokenId] = useState("")
  const [hash, setHash] = useState("")
  const [action, setAction] = useState(0)
  const [balance, setBalance] = useState(0)

  const setDetail = async (data) => {
    setName(data.name + " #" + data.token_id)
    setTokenAddress(data.token_address)
    setTokenId(data.token_id)
    setHash(data.token_uri)
    const sttt = await contract.activities(data.token_uri)
    // const bal = await contract.balanceOf()z
    setAction(sttt.action)
    await fetch(data.token_uri)
      .then(resp =>
        resp.json()
      ).then((json) => {
        setImage(json.image)
        setDescription(json.description)
      })
  }

  const handleTime = (e) => {
    setDays(e.days < 10 ? `0${e.days}` : e.days)
    setHours(e.hours < 10 ? `0${e.hours}` : e.hours)
    setMinute(e.minutes < 10 ? `0${e.minutes}` : e.minutes)
    setSecond(e.seconds < 10 ? `0${e.seconds}` : e.seconds)
  }
  useEffect(() => {
    setDetail(data)
  })
  return (
    <div className={action !== 1 ? "nft-card" : "nft-card staked"}>
      {/* eslint-disable-next-line */}
      <img
        alt=""
        src={image}
      />
      <p className="name">{name}</p>
      {action === 1 &&
        <>
          <div className="cost-ribbon">
            <p>{reward}<span>%</span></p>
            <p className="reward">reward</p>
          </div>
          {action === 1 &&
            <p className="left-days">
              <span>{days}</span> day: <span>{hours}</span> hour : <span>{minute}</span> min : <span>{second}</span> sec
            </p>
          }
        </>
      }
      <div className="card-action">
        {action !== 1 &&
          <DoActionButton onClick={() => setOpen(true)}>
            Stake
          </DoActionButton>
        }
        {action === 1 &&
          <UnstakeButton>
            Unstake
          </UnstakeButton>
        }
      </div>
      {action === 1 &&
        <div style={{ display: "none" }}>
          <Countdown date={stakedTime} onTick={(e) => handleTime(e)} />
        </div>
      }
      <CardModal
        name={name}
        description={description}
        image={image}
        contract={contract}
        tokenAddress={tokenAddress}
        tokenId={tokenId}
        hash={hash}
        open={open}
        close={() => setOpen(false)}
      />
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
}

export function CardModal({
  name,
  image,
  description,
  open,
  close,
  contract,
  tokenAddress,
  tokenId,
  balance,
  hash,
  ...props }) {
  const [agree, setAgree] = useState(false)
  const [amount, setAmount] = useState(10)
  const [loading, setLoading] = useState(false)
  const [agreeVali, setAgreeVali] = useState(false)

  const handleChange = (e) => {
    setAgree(e.target.checked)
    setAgreeVali(false)
  }
  const stake = async () => {
    if (agree) {
      setLoading(true)
      try {
        await contract.stakebyHash(hash, tokenAddress, tokenId, (amount * Math.pow(10, 18)).toString())
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    } else {
      setAgreeVali(true)
    }
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
            <CostSlider
              setAmount={(value) => setAmount(value)}
            />
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
              {agreeVali &&
                <p className="check-validation">This field is required!</p>
              }
            </div>
            <div className="modal-action">
              <BigStakeButton onClick={() => stake()} disabled={loading}>
                {loading ?
                  <ClipLoader loading={loading} size={24} color="#fff" />
                  :
                  "Stake"
                }
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
}))

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