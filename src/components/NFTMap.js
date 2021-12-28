import { useState } from "react"
import { Container } from "@mui/material"
import NFTCard from "./NFTCard"
// import ItemFilter from "./ItemFilter"

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
  ...props
}) {
  const [pageRerender, setPageRerender] = useState("")
  return (
    <Container>
      {/* <ItemFilter
        filterState={filterState}
        setFilterState={(e) => setFilterState(e)}
        checkAble={checkAble}
        setCheckAble={(e) => setCheckAble(e)}
      /> */}
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
          />
        )) :
          <h3 className="empty-text">
            You don&apos;t have any NFTs on this Wallet
          </h3>
        }
      </div>
    </Container>
  )
}
