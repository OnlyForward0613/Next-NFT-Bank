import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

const marks = [
  {
    value: 0,
    label: '$10',
  },
  {
    value: 5,
    label: '$20',
  },
  {
    value: 10,
    label: '$30',
  },
  {
    value: 15,
    label: '$50',
  },
  {
    value: 22,
    label: '$100',
  },

  {
    value: 32,
    label: '$500',
  },

  {
    value: 42,
    label: '$800',
  },
  {
    value: 50,
    label: '$1000',
  },
]

function calculateValue(value) {
  return value
}

function valueLabelFormat(value) {
  let label = ""
  if (value >= 0 && value < 5) {
    label = "10%"
  } else if (value >= 5 && value < 10) {
    label = "12%"
  } else if (value >= 10 && value < 15) {
    label = "15%"
  } else if (value >= 15 && value < 22) {
    label = "20%"
  } else if (value >= 22 && value < 32) {
    label = "25%"
  } else if (value >= 32 && value < 42) {
    label = "35%"
  } else if (value >= 42 && value < 50) {
    label = "42%"
  } else if (value == 50) {
    label = "50%"
  }

  return label
}

export default function CostSlider({
  setAmount,
  balance,
  ...props
}) {
  const [real, setReal] = React.useState(10)
  const [step, setStep] = React.useState(0)
  const steps = [0.1, 0.12, 0.15, 0.2, 0.25, 0.35, 0.42, 0.5]

  const handleChange = (event, newValue) => {
    if (newValue < 5) {
      setData(10 + newValue * 2, 0)
    } else if (newValue >= 5 && newValue < 10) {
      setData(20 + (newValue - 5) * 2, 1)
    } else if (newValue >= 10 && newValue < 15) {
      setData(30 + (newValue - 10) * 4, 2)
    } else if (newValue >= 15 && newValue < 22) {
      setData(50 + (newValue - 15) * 7, 3)
    } else if (newValue >= 22 && newValue < 32) {
      setData(100 + (newValue - 22) * 40, 4)
    } else if (newValue >= 32 && newValue < 42) {
      setData(500 + (newValue - 32), 5)
    } else if (newValue >= 42 && newValue < 50) {
      setData(800 + (newValue - 42) * 25, 6)
    } else if (newValue === 50) {
      setData(1000, 7)
    }
  }
  const setData = (count, step) => {
    setReal(count.toFixed(2))
    setStep(step)
    setAmount(count.toFixed(2))
  }
  return (
    <Box style={{ paddingTop: 40 }}>
      <PrettoSlider
        defaultValue={1}
        scale={calculateValue}
        step={0.1}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        valueLabelDisplay="on"
        marks={marks}
        max={50}
        onChange={handleChange}
      />
      <div className="balence-info">
        <p className="reward-value">Value:&nbsp;$&nbsp;<span>{real}</span></p>
        <p className="reward-value">Your balance:&nbsp;$&nbsp;<span>{balance}</span></p>
      </div>
      <p className="reward-value">You can earn&nbsp;$&nbsp;<span>{(real * steps[step]).toFixed(2)}</span> after 12 months.</p>
    </Box>
  )
}

const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-markLabel': {
    color: "#fff",
    fontSize: 10
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
})