import { Box, Modal } from "@mui/material"
import { useState } from 'react'

export default function HelpModal({ opend, close }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 640,
    bgcolor: '#090F1E',
    boxShadow: 24,
    borderRadius: "12px",
    outline: "none",
    p: 2,
  }
  const [step, setStep] = useState(0)

  const inc = () => {
    if (step >= 0 && step < 2) {
      let s = step + 1
      setStep(s)
    }
  }
  const dec = () => {
    if (step >= 1) {
      let s = step - 1
      setStep(s)
    }
  }
  return (
    <Modal
      open={opend}
      onClose={close}
    >
      <Box sx={style}>
        <div className="help-modal">
          <div className="modal-close">
            <button onClick={() => close()}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_7_12)">
                  <path d="M15.5667 1.42462L9.20279 7.78859L2.83883 1.42463C2.13172 0.717514 0.717507 2.13173 1.42461 2.83884L7.78857 9.2028L1.42461 15.5668C0.717509 16.2739 2.13172 17.6881 2.83883 16.981L9.20279 10.617L15.5667 16.981C16.2739 17.6881 17.6881 16.2739 16.981 15.5668L10.617 9.2028L16.981 2.83884C17.6881 2.13173 16.2739 0.717515 15.5667 1.42462Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_7_12">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          <h3>{steps[step].title}</h3>
          {/* eslint-disable-next-line */}
          <img
            src={steps[step].img}
            alt=""
          />
          <div className="action">
            <button onClick={() => dec()}>
              {step !== 0 &&
                <svg width="35" height="69" viewBox="0 0 35 69" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33.5417 0L35 0.726316L2.1875 34.1368L35 67.5474L34.2708 69L0 34.1368L33.5417 0Z" fill="#C4C4C4" />
                </svg>
              }
            </button>
            <button onClick={() => inc()}>
              {step !== 2 &&
                <svg width="35" height="69" viewBox="0 0 35 69" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.45833 0L0 0.726316L32.8125 34.1368L0 67.5474L0.729167 69L35 34.1368L1.45833 0Z" fill="#C4C4C4" />
                </svg>
              }
            </button>
          </div>
          <div className="slide-steper">
            <button onClick={() => setStep(0)}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="5" fill="white" fillOpacity={step === 0 ? 1 : "0.3"} />
              </svg>
            </button>
            <button onClick={() => setStep(1)}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="5" fill="white" fillOpacity={step === 1 ? 1 : "0.3"} />
              </svg>
            </button>
            <button onClick={() => setStep(2)}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="5" fill="white" fillOpacity={step === 2 ? 1 : "0.3"} />
              </svg>
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

const steps = [
  {
    title: "Select your NFTs",
    img: "./help-1.svg"
  },
  {
    title: "Decide how much you want to spend to earn",
    img: "./help-2.svg"
  },
  {
    title: "Come back in 12 months to Claim",
    img: "./help-3.svg"
  }
]