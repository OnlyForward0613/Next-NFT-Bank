import { useEffect, useState } from "react"
import NFTCard from "./NFTCard"
import ItemFilter from "./ItemFilter"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button, IconButton } from "@mui/material"
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { DoActionButton, MoreMenuButton, CancelButton } from "./styleHook"

export default function NFTMap({
  groupNFT,
  total,
  address,
  signer,
  useForceUpdate,
  forceRender,
  setForce,
  filterState,
  setFilterState,
  checkAble,
  setCheckAble,
  getNFTLIST,
  unstakedList,
  stakedList,
  startLoading,
  closeLoading,
  headerAlert,
  ...props
}) {
  const [pageRerender, setPageRerender] = useState("")
  const [all, setAll] = useState(0)
  const [unstaked, setUnstaked] = useState(0)
  const [staked, setStaked] = useState(0)
  const [more, setMore] = useState(false)
  const [multiStakeAble, setMultiStakeAble] = useState(false)
  const [multiUnstakeAble, setMultiUnstakeAble] = useState(false)

  const [selectCount, setSelectCount] = useState(0)

  useEffect(() => {
    setAll(unstakedList.length + stakedList.length)
    setUnstaked(unstakedList.length)
    setStaked(stakedList.length)
    if ((unstakedList.length + stakedList.length) === 0) {
      closeLoading()
    }
    // eslint-disable-next-line
  }, [unstakedList, stakedList])
  return (
    <div className="map-page" style={{ paddingTop: !headerAlert ? 5 : 30 }}>
      <ClickAwayListener onClickAway={() => setMore(false)}>
        <div className="more-option" style={{ paddingTop: !headerAlert ? 90 : 115 }}>
          <IconButton component="span" style={{ border: "1px solid #ccc" }} size="small" onClick={() => setMore(!more)}>
            <MoreVertIcon style={{ color: "#fff" }} />
          </IconButton>
          {more &&
            <div className="more-menu">
              <div className="more-menu-item">
                <MoreMenuButton fullWidth onClick={() => setMultiStakeAble(true)}>Multi Stake</MoreMenuButton>
              </div>
              <div className="more-menu-item">
                <MoreMenuButton fullWidth onClick={() => setMultiUnstakeAble(true)}>Multi Unstake</MoreMenuButton>
              </div>
            </div>
          }
        </div>
      </ClickAwayListener>
      <ItemFilter
        filterState={filterState}
        setFilterState={(e) => setFilterState(e)}
        checkAble={checkAble}
        setCheckAble={(e) => setCheckAble(e)}
        all={all}
        unstaked={unstaked}
        staked={staked}
      />
      <div className="multi-infobox">
        <p><span>{selectCount}</span>Selected</p>
        <div className="infobox-button">
          <DoActionButton>Select All</DoActionButton>
        </div>
        <div className="infobox-button">
          <DoActionButton>stake</DoActionButton>
        </div>
        <div className="infobox-button">
          <CancelButton onClick={() => setMultiStakeAble(false)}>cancel</CancelButton>
        </div>
      </div>
      <div className="nft-map">
        {stakedList.length !== 0 && stakedList.reverse().map((item, key) => (
          <NFTCard
            key={key}
            data={item}
            state={0}
            filterState={filterState}
            address={address}
            pageRerender={pageRerender}
            reRender={(e) => setPageRerender(e)}
            useForceUpdate={useForceUpdate}
            signer={signer}
            forceRender={forceRender}
            setForce={(e) => setForce(e)}
            checkAble={checkAble}
            setCheckAble={(e) => setCheckAble(e)}
            getNFTLIST={() => getNFTLIST()}
          />
        ))}
        {unstakedList.length !== 0 && unstakedList.reverse().map((item, key) => (
          <NFTCard
            key={key}
            data={item}
            state={0}
            filterState={filterState}
            address={address}
            pageRerender={pageRerender}
            reRender={(e) => setPageRerender(e)}
            useForceUpdate={useForceUpdate}
            signer={signer}
            forceRender={forceRender}
            setForce={(e) => setForce(e)}
            checkAble={checkAble}
            setCheckAble={(e) => setCheckAble(e)}
            getNFTLIST={() => getNFTLIST()}
            multiStakeAble={multiStakeAble}
            multiUnstakeAble={multiUnstakeAble}
          />
        ))
        }
        {(stakedList.lenth + unstakedList.length) === 0 &&
          <h3 className="empty-text">
            You don&apos;t have any NFTs on this Wallet
          </h3>
        }
      </div>
    </div>
  )
}
