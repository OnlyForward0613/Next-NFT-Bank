import { useEffect, useState } from "react"
import NFTCard from "./NFTCard"
import ItemFilter from "./ItemFilter"

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
  ...props
}) {
  const [pageRerender, setPageRerender] = useState("")
  const [all, setAll] = useState(0)
  const [unstaked, setUnstaked] = useState(0)
  const [staked, setStaked] = useState(0)
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
    <div className="map-page">
      <ItemFilter
        filterState={filterState}
        setFilterState={(e) => setFilterState(e)}
        checkAble={checkAble}
        setCheckAble={(e) => setCheckAble(e)}
        all={all}
        unstaked={unstaked}
        staked={staked}
      />
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
