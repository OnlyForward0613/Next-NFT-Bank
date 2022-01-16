import { useEffect, useState } from "react"
import { DoActionButton, UnstakeButton } from "./styleHook"
import Countdown from 'react-countdown'
import ClipLoader from "react-spinners/ClipLoader"
import { errorAlert, successAlert, warningAlert } from './toastGroup'
import { ethers } from "ethers"
import { SMARCONTRACT_INI_ABI, SMARTCONTRACT_ABI, SMARTCONTRACT_ABI_ERC20, SMARTCONTRACT_ADDRESS, SMARTCONTRACT_ADDRESS_ERC20 } from "../../config"
import Swal from 'sweetalert2'
import CardModal from "./CardModal"
import Web3Modal from "web3modal"
import { Skeleton } from "@mui/material"

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
  const [reward, setReward] = useState(0)
  const [percent, setPercent] = useState(0)
  const [stakedTime, setStakedTime] = useState("")
  const [tokenAddress, setTokenAddress] = useState("")
  const [tokenId, setTokenId] = useState("")
  const [hash, setHash] = useState("")
  const [action, setAction] = useState(0)
  const [balance, setBalance] = useState(0)
  const [realName, setRealName] = useState("")
  const [indiContract, setIndiContract] = useState([])
  const [unloading, setUnloading] = useState(false)

  const alertBox = (err) => {
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
    setReward(data.reward)
    setPercent(data.percent)
    setStakedTime(data.timestamp)
    setName(data.name + " #" + data.token_id)
    setRealName(data.name)
    setTokenAddress(data.token_address)
    setTokenId(data.token_id)
    setHash(data.token_uri)

    let urdd = data.token_uri.split("://")
    let uri = ''
    let ipfsIssue = 0

    if (urdd[0] === "ipfs") {
      uri = "https://ipfs.io/ipfs/" + urdd[urdd.length - 1]
      ipfsIssue = 1
    } else {
      uri = data.token_uri
    }
    if (ipfsIssue === 0) {
      urdd = data.token_uri.split('ipfs/')
      if (urdd[0] === "https://ipfs.moralis.io:2053/") {
        uri = "https://ipfs.io/ipfs/" + urdd[urdd.length - 1]
      } else {
        uri = data.token_uri
      }
    }
    if (uri !== undefined) {
      fetch(uri)
        .then(resp =>
          resp.json()
        ).then((json) => {
          let img = json.image
          if (img !== "") {
            const imgString = img.split("://")
            if (imgString[0] === "ipfs") {
              img = "https://ipfs.io/ipfs/" + imgString[imgString.length - 1]
            } else {
              img = json.image
            }
            setImage(img)
          }
          setDescription(json.description)
        })

    }
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract_20 = new ethers.Contract(
      SMARTCONTRACT_ADDRESS_ERC20,
      SMARTCONTRACT_ABI_ERC20,
      signer
    )
    const contractTmp = new ethers.Contract(
      data.token_address,
      SMARCONTRACT_INI_ABI,
      signer
    )
    setIndiContract(contractTmp)

    const bal = await contract_20.balanceOf(address)
    setBalance(parseFloat(ethers.utils.formatEther(bal.toString())).toFixed(2))

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
      title: 'Do you really want to remove this NFT from the vault? You will lose all $Dusty associated with it',
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
    const now = new Date()
    if (action === 1 && new Date(parseInt(stakedTime) * 1000 + 365 * 24 * 3600 * 1000 + 7000) >= now) {
      autoClaim()
    }
    // eslint-disable-next-line
  }, [])
  return (
    <>
      {(filterState === action || filterState === 2) &&
        <div className={action !== 1 ? "nft-card" : "nft-card nft-card-active"}>
          {image === "" ?
            <Skeleton sx={{ bgcolor: '#ffffff20' }} style={{ width: "100%", height: "240px", borderRadius: 6, backgroundColor: "ffffff3d" }} variant="retangle" />
            :
            <>
              {/* eslint-disable-next-line */}
              <img
                alt=""
                src={image}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </>
          }
          <p className="name">{name}</p>
          {action === 1 &&
            <>
              <div className="cost-ribbon">
                <p>{parseFloat(ethers.utils.formatEther(reward)).toFixed(1)}</p>
                {percent > 42 &&
                  // eslint-disable-next-line
                  <img
                    src="./gold-reward.png"
                    alt=""
                  />
                }
                {percent > 20 && percent <= 42 &&
                  // eslint-disable-next-line
                  <img
                    src="./silver-reward.png"
                    alt=""
                  />
                }
                {percent <= 20 &&
                  // eslint-disable-next-line
                  <img
                    src="./bronze-reward.png"
                    alt=""
                  />
                }
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
