import { Checkbox } from "@mui/material"

export default function ItemFitler({ setFilterState, filterState, ...props }) {

  const setFilter = (e) => {
    setFilterState(e)
  }

  const handleCheck = () => {

  }

  return (
    <div className="item-filter">
      <div className={filterState === 2 ? "filter-item active" : "filter-item"}>
        <button onClick={() => setFilter(2)}>
          All
        </button>
      </div>
      <div className={filterState === 0 ? "filter-item active" : "filter-item"}>
        <button onClick={() => setFilter(0)}>
          Unstaked
        </button>
      </div>
      <div className={filterState === 1 ? "filter-item active" : "filter-item"}>
        <button onClick={() => setFilter(1)}>
          Staked
        </button>
      </div>
      <div className="multi-check">
        <Checkbox
          checked={true}
          onChange={handleCheck}
        />
        Multi action
      </div>
    </div>
  )
}