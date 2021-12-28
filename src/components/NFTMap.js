import { useEffect, useState } from "react"
import NFTCard from "./NFTCard"
import ItemFilter from "./ItemFilter"

export default function NFTMap({
  nfts,
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
  totalDusty,
  getNFTLIST,
  ...props
}) {
  const [pageRerender, setPageRerender] = useState("")
  const [all, setAll] = useState(0)
  const [unstaked, setUnstaked] = useState(0)
  const [staked, setStaked] = useState(0)
  useEffect(() => {
    let allN = 0
    let unstakedN = 0
    let stakedN = 0
    for (var i = 0; i < nfts.length; i++) {
      allN++
      if (nfts[i].action === 0) unstakedN++
      if (nfts[i].action === 1) stakedN++
    }
    setAll(allN)
    setUnstaked(unstakedN)
    setStaked(stakedN)
  }, [nfts])
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
        {nfts.length !== 0 ? nfts.reverse().map((item, key) => (
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
        )) :
          <h3 className="empty-text">
            You don&apos;t have any NFTs on this Wallet
          </h3>
        }
      </div>
    </div>
  )
}
