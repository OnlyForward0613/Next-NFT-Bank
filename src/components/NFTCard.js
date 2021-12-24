import { useEffect, useState } from "react"
import { DoActionButton, UnstakeButton, BigStakeButton } from "./styleHook"
import Countdown from 'react-countdown'
import { Modal, Box, Checkbox, IconButton } from "@mui/material"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CostSlider from "./CostSlider"
import { styled } from '@mui/material/styles'
import ClipLoader from "react-spinners/ClipLoader"
import { errorAlert, successAlert, warningAlert } from './toastGroup'
import { ethers } from "ethers"
import { SMARCONTRACT_INI_ABI, SMARTCONTRACT_ABI_ERC20, SMARTCONTRACT_ADDRESS, SMARTCONTRACT_ADDRESS_ERC20 } from "../../config"
import Swal from 'sweetalert2'

export default function NFTCard({ state, data, contract, contract_20, filterState, signer, address, reRender, ...props }) {
  const [days, setDays] = useState(0)
  const [cid, setCid] = useState(-1)
  const [hours, setHours] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [percent, setPercent] = useState(0)
  const [stakedTime, setStakedTime] = useState("")
  const [tokenAddress, setTokenAddress] = useState("")
  const [tokenId, setTokenId] = useState("")
  const [hash, setHash] = useState("")
  const [action, setAction] = useState(0)
  const [balance, setBalance] = useState(0)
  const [realName, setRealName] = useState("")
  const [indiContract, setIndiContract] = useState([])
  const [contract20, setContract20] = useState([])

  const [unloading, setUnloading] = useState(false)

  const alertBox = (err) => {
    console.log(err)
    setUnloading(false)
    if (err.code === 4001) {
      warningAlert("You denied the Action!")
    } else if (err.data !== undefined) {
      errorAlert(err.data.message)
    } else if (err.message !== undefined) {
      errorAlert(err.message)
    } else {
      errorAlert("We found the error. Please try again!")
    }
  }

  const setDetail = async (data) => {
    setCid(data.cid)
    setAction(data.action)
    setPercent(data.percent)
    setStakedTime(data.timestamp)
    setName(data.name + " #" + data.token_id)
    setRealName(data.name)
    setTokenAddress(data.token_address)
    setTokenId(data.token_id)
    setHash(data.token_uri)
    const bal = await contract_20.balanceOf(address)
    setBalance(parseFloat(ethers.utils.formatEther(bal.toString())).toFixed(2))
    const contractTmp = new ethers.Contract(
      data.token_address,
      SMARCONTRACT_INI_ABI,
      signer
    )
    setIndiContract(contractTmp)

    const contractE20 = new ethers.Contract(
      SMARTCONTRACT_ADDRESS_ERC20,
      SMARTCONTRACT_ABI_ERC20,
      signer
    )

    setContract20(contractE20)

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

  const unstake = async () => {
    setUnloading(true)
    try {
      const res = await contract.unStake(address, cid)
      await res.wait()
      successAlert("You unstaked successfully!")
    } catch (err) {
      alertBox(err)
    }
    setUnloading(false)
  }

  const autoClaim = async () => {
    setUnloading(true)
    try {
      const res = await contract.autoClaim(address, cid)
      await res.wait()
      successAlert("You won! You received the Reward!", true)
    } catch (err) {
      alertBox(err)
    }
    setUnloading(false)
  }

  const openUnstake = () => {
    Swal.fire({
      title: 'Do you really unstake this NFT?',
      showCancelButton: true,
      confirmButtonText: 'Unstake',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        unstake()
      }
    })
  }

  useEffect(() => {
    setDetail(data)
    // eslint-disable-next-line
  }, [])
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
            <p>{percent}<span>%</span></p>
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
          <UnstakeButton onClick={() => openUnstake()} disabled={unloading}>
            {unloading ?
              <ClipLoader loading={unloading} size={12} color="#fff" />
              :
              "Unstake"
            }
          </UnstakeButton>
        }
      </div>
      {action === 1 &&
        <div style={{ display: "none" }}>
          <Countdown date={new Date(parseInt(stakedTime) * 1000 + 365 * 24 * 3600 * 1000 + 7000)} onTick={(e) => handleTime(e)} onComplete={() => autoClaim()} />
        </div>
      }
      <CardModal
        name={name}
        realName={realName}
        description={description}
        image={image}
        contract={contract}
        indiContract={indiContract}
        tokenAddress={tokenAddress}
        contract20={contract20}
        tokenId={tokenId}
        hash={hash}
        balance={balance}
        address={address}
        alertBox={(e) => alertBox(e)}
        open={open}
        reRender={reRender}
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
  indiContract,
  contract,
  contract20,
  tokenAddress,
  tokenId,
  balance,
  address,
  hash,
  realName,
  reRender,
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
    // console.log(parseFloat(balance), parseFloat(amount))
    if (parseFloat(balance) > parseFloat(amount)) {
      if (agree) {
        setLoading(true)
        try {
          const indiApprove = await indiContract.approve(SMARTCONTRACT_ADDRESS, tokenId)
          await indiApprove.wait()
          try {
            const erc20Approve = await contract20.approve(SMARTCONTRACT_ADDRESS, (amount * Math.pow(10, 18)).toString())
            await erc20Approve.wait()
            try {
              const nftApprove = await contract.stakebyHash(hash, realName, tokenAddress, tokenId, (amount * Math.pow(10, 18)).toString())
              await nftApprove.wait()
              successAlert("Congratulation! You staked successfully.")
              reRender("stake")
              close()
            } catch (err) {
              alertBox(err)
            }
          } catch (err) {
            alertBox(err)
          }
        } catch (err) {
          alertBox(err)
        }
        setLoading(false)
      } else {
        setAgreeVali(true)
      }
    } else {
      errorAlert("You don't have enough Dusty!")
    }
  }

  const alertBox = (err) => {
    console.log(err)
    setLoading(false)
    if (err.code === 4001) {
      warningAlert("You denied the Action!")
    } else if (err.data !== undefined) {
      errorAlert(err.data.message)
    } else if (err.message !== undefined) {
      errorAlert(err.message)
    } else {
      errorAlert("We found the error. Please try again!")
    }
  }
  return (
    <Modal
      open={open}
      onClose={close}
    >
      <Box sx={style}>
        <div className="stake-modal">
          <div className="modal-close">
            <IconButton onClick={() => close()}>
              <CloseRoundedIcon style={{ fill: "#fff" }} />
            </IconButton>
          </div>
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
              balance={balance}
              disabled={loading}
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
                I understand this is a 12 monthly storage option and that if I wish to withdraw my NFTs
                prior to that I will not receive my initial fire or earned fees.
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
