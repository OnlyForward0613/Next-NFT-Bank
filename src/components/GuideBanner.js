import { ReactSVG } from 'react-svg'
export default function GuideBanner() {
  return (
    <div className="guide-hero">
      <div className="guide-item">
        <p>Select your NFTs</p>
        {/* eslint-disable-next-line */}
        <img
          src='./help-1.svg'
          alt=''
        />
        <div className='step-arrow'>
          <svg width="40" height="40" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M70 40L46.6667 10V26.6333L10 26.6667V53.3333H46.6667V70L70 40Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="guide-item">
        <p>Decide how much you want to spend to earn</p>
        {/* eslint-disable-next-line */}
        <img
          src='./help-2.svg'
          alt=''
        />
        <div className='step-arrow'>
          <svg width="40" height="40" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M70 40L46.6667 10V26.6333L10 26.6667V53.3333H46.6667V70L70 40Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="guide-item">
        <p>Come back in 12 months to Claim</p>
        {/* eslint-disable-next-line */}
        <img
          src='./help-3.svg'
          alt=''
        />
      </div>
    </div>
  )
}