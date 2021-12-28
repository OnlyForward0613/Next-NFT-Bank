import { useEffect, useState } from "react"
import { MulCheckIcon, MulCheckedIcon, DoActionButton, UnstakeButton } from "./styleHook"
import Countdown from 'react-countdown'
import ClipLoader from "react-spinners/ClipLoader"
import { errorAlert, successAlert, warningAlert } from './toastGroup'
import { ethers } from "ethers"
import { SMARCONTRACT_INI_ABI, SMARTCONTRACT_ABI, SMARTCONTRACT_ABI_ERC20, SMARTCONTRACT_ADDRESS, SMARTCONTRACT_ADDRESS_ERC20 } from "../../config"
import Swal from 'sweetalert2'
import CardModal from "./CardModal"
import Web3Modal from "web3modal"
import { Checkbox } from "@mui/material"

export default function NFTCard({
  state,
  data,
  filterState,
  signer,
  address,
  reRender,
  useForceUpdate,
  forceRender,
  setForce,
  ...props
}) {
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

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract_20 = new ethers.Contract(
      SMARTCONTRACT_ADDRESS_ERC20,
      SMARTCONTRACT_ABI_ERC20,
      signer
    )

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
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      SMARTCONTRACT_ADDRESS,
      SMARTCONTRACT_ABI,
      signer
    )
    try {
      const res = await contract.unStake(address, cid)
      await res.wait()
      successAlert("You unstaked successfully!")
      setTimeout(() => {
        location.reload()
      }, 5000);
    } catch (err) {
      alertBox(err)
    }
    setUnloading(false)
  }

  const autoClaim = async () => {
    setUnloading(true)
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      SMARTCONTRACT_ADDRESS,
      SMARTCONTRACT_ABI,
      signer
    )
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
    <>
      {(filterState === action || filterState === 2) &&
        <div className={action !== 1 ? "nft-card" : "nft-card staked"}>
          {/* <div className="check-able">
            <Checkbox
              checked={true}
              // onChange={handleChange}
              size="sm"
              color="success"
              style={{ fontSize: 40 }}
            />
          </div> */}
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
            indiContract={indiContract}
            tokenAddress={tokenAddress}
            tokenId={tokenId}
            hash={hash}
            balance={balance}
            address={address}
            alertBox={(e) => alertBox(e)}
            useForceUpdate={useForceUpdate}
            open={open}
            reRender={reRender}
            close={() => setOpen(false)}
          />
        </div>
      }
    </>
  )
}
