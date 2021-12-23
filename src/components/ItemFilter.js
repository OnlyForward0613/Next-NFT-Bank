export default function ItemFitler({ setFilterState, ...props }) {
  const filterSet = (state) => {
    setFilterState(state)
  }
  return (
    <div className="item-filter">
      <div className="filter-item active">
        <button onClick={filterSet('all')}>
          All
        </button>
      </div>
      <div className="filter-item">
        <button onClick={filterSet('unstk')}>
          Unstaked
        </button>
      </div>
      <div className="filter-item">
        <button onClick={filterSet('stk')}>
          Staked
        </button>
      </div>
    </div>
  )
}