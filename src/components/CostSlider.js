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

function valuetext(value) {
  return `${value}%`
}

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

export default function CostSlider() {
  const [value, setValue] = React.useState(1)
  const [real, setReal] = React.useState(10)
  const [step, setStep] = React.useState(0)
  const steps = [0.1, 0.12, 0.15, 0.2, 0.25, 0.35, 0.42, 0.5]

  const handleChange = (event, newValue) => {
    setValue(newValue)
    let temp
    if (newValue < 5) {
      temp = 10 + newValue * 2
      setStep(0)
    } else if (newValue >= 5 && newValue < 10) {
      temp = 20 + (newValue - 5) * 2
      setStep(1)
    } else if (newValue >= 10 && newValue < 15) {
      temp = 30 + (newValue - 10) * 4
      setStep(2)
    } else if (newValue >= 15 && newValue < 22) {
      temp = 50 + (newValue - 15) * 7
      setStep(3)
    } else if (newValue >= 22 && newValue < 32) {
      temp = 100 + (newValue - 22) * 40
      setStep(4)
    } else if (newValue >= 32 && newValue < 42) {
      temp = 500 + (newValue - 32) * 30
      setStep(5)
    } else if (newValue >= 42 && newValue < 50) {
      temp = 800 + (newValue - 42) * 25
      setStep(6)
    } else if (newValue === 50) {
      temp = 1000
      setStep(7)
    }
    setReal(temp.toFixed(2))
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
      <p className="reward-value">Value:&nbsp;$&nbsp;<span>{real}</span></p>
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