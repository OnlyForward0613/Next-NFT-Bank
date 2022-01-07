import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

const marks = [
  {
    value: 0,
    label: '$1',
  },
  {
    value: 3,
    label: '$10',
  },
  {
    value: 7,
    label: '$20',
  },
  {
    value: 12,
    label: '$30',
  },
  {
    value: 18,
    label: '$50',
  },
  {
    value: 24,
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
  if (value >= 0 && value < 3) {
    label = "1%"
  } else if (value >= 3 && value < 7) {
    label = "10%"
  } else if (value >= 7 && value < 12) {
    label = "12%"
  } else if (value >= 12 && value < 18) {
    label = "15%"
  } else if (value >= 18 && value < 24) {
    label = "20%"
  } else if (value >= 24 && value < 32) {
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
  disabled,
  ...props
}) {
  const [real, setReal] = React.useState(1)
  const [step, setStep] = React.useState(0)
  const steps = [0.01, 0.1, 0.12, 0.15, 0.2, 0.25, 0.35, 0.42, 0.5]

  const handleChange = (event, newValue) => {
    if (newValue < 3) {
      setData(1 + newValue * 3.33, 0)
    } else if (newValue >= 3 && newValue < 7) {
      setData(10 + (newValue - 3) * 2.5, 1)
    } else if (newValue >= 7 && newValue < 12) {
      setData(20 + (newValue - 7) * 2.5, 2)
    } else if (newValue >= 12 && newValue < 18) {
      setData(30 + (newValue - 12) * 4.67, 3)
    } else if (newValue >= 18 && newValue < 24) {
      setData(50 + (newValue - 18) * 8.33, 4)
    } else if (newValue >= 24 && newValue < 32) {
      setData(100 + (newValue - 24) * 30, 5)
    } else if (newValue >= 32 && newValue < 42) {
      setData(500 + (newValue - 32) * 30, 6)
    } else if (newValue >= 42 && newValue < 50) {
      setData(800 + (newValue - 42) * 25, 7)
    } else if (newValue === 50) {
      setData(1000, 8)
    }
  }
  const setData = (count, step) => {
    setReal(count.toFixed(2))
    setStep(step)
    setAmount(count.toFixed(2))
  }
  return (
    <Box>
      <p className="your-balance">Your balance:&nbsp;$Dusty&nbsp;
        <span>{new Intl.NumberFormat().format(parseFloat(balance).toFixed(2))}</span>
      </p>
      <PrettoSlider
        defaultValue={1}
        scale={calculateValue}
        step={0.1}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        valueLabelDisplay="on"
        marks={marks}
        max={50}
        disabled={disabled}
        onChange={handleChange}
      />
      <div className="balence-info">
        <p className="reward-value">Value:&nbsp;$Dusty&nbsp;<span>{real}</span></p>
      </div>
      <p className="reward-value">You can earn&nbsp;$Dusty&nbsp;<span>{(real * steps[step]).toFixed(2)}</span> after 12 months.</p>
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