// import { Checkbox } from "@mui/material"

export default function ItemFitler({ setFilterState, filterState, all, unstaked, staked, ...props }) {

  const setFilter = (e) => {
    setFilterState(e)
  }

  const handleCheck = () => {

  }

  return (
    <div className="item-filter">
      <div className={filterState === 2 ? "filter-item active" : "filter-item"}>
        <button onClick={() => setFilter(2)}>
          All&nbsp;(<span>{all}</span>)
        </button>
      </div>
      <div className={filterState === 1 ? "filter-item active" : "filter-item"}>
        <button onClick={() => setFilter(1)} disabled={staked === 0}>
          Staked&nbsp;(<span>{staked}</span>)
        </button>
      </div>
      <div className={filterState === 0 ? "filter-item active" : "filter-item"}>
        <button onClick={() => setFilter(0)} disabled={unstaked === 0}>
          Unstaked&nbsp;(<span>{unstaked}</span>)
        </button>
      </div>
      {/* <div className="multi-check">
        <Checkbox
          checked={true}
          onChange={handleCheck}
        />
        Multi action
      </div> */}
    </div>
  )
}