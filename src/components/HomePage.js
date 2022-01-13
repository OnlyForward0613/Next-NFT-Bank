import { Container, Skeleton } from "@mui/material";
import { ethers } from "ethers";
import GuideBanner from "./GuideBanner";

export default function HomePage({
  totalSupply,
  staked,
  earlyRemoved,
  connected,
  holders,
  address,
  totalDusty,
  stakedCnt,
  unstakedCnt,
  loading,
  totalReward,
  ownerDusty,
  homeLoading,
  ...props
}) {
  return (
    <div className="full-page">
      <div className="homebanner">
        <h1><i>Dusty Vaults</i></h1>
        <p>Safely deposit your NFT&apos;s in our secure vault for the next 12 months and earn up to 50% per annum in $Dusty.  It&apos;s time for your NFT&apos;s to pay you back!</p>
        {/* eslint-disable-next-line */}
        <img
          src="./safe.png"
          data-nsfw-filter-status
          alt=""
        />
      </div>
      <GuideBanner />
      <Container>
        <div className="homepage">
          {connected &&
            <div className="home-row">
              <div className="dashboard-item user-box" style={{ background: "linear-gradient(135deg, #8a00ff, #450a8f" }}>
                <h2>Your Total NFTs&nbsp;({address.slice(0, 4) + "..." + address.slice(39, 42)})</h2>
                <p>
                  {connected ?
                    (!loading ? stakedCnt + unstakedCnt : <Skeleton width={80} height={45} sx={{ bgcolor: '#ffffff20' }} style={{ margin: "5px auto", backgroundColor: "ffffff3d" }} />)
                    : <span>N/A</span>}
                </p>
                <div className="sub-box">
                  <div className="sub-box-item">
                    <h4>STAKED</h4>
                    <p>
                      {!loading ? stakedCnt : <Skeleton width={60} height={33} sx={{ bgcolor: '#ffffff20' }} style={{ margin: "5px auto", backgroundColor: "ffffff3d" }} />}
                    </p>
                  </div>
                  <div className="sub-box-item">
                    <h4>UNSTAKED</h4>
                    <p>
                      {!loading ? unstakedCnt : <Skeleton width={60} sx={{ bgcolor: '#ffffff20' }} height={33} style={{ margin: "5px auto", backgroundColor: "ffffff3d" }} />}
                    </p>
                  </div>
                </div>
              </div>
              <div className="dashboard-item user-box display-center" style={{ background: "linear-gradient(135deg, #4f00ff, #450a8f" }}>
                <h2>Total Reward&nbsp;($Dusty)</h2>
                <p>
                  {!loading ? parseFloat(totalReward).toFixed(2) : <Skeleton width={120} sx={{ bgcolor: '#ffffff20' }} height={45} style={{ margin: "5px auto", backgroundColor: "ffffff3d" }} />}
                </p>
              </div>
            </div>
          }
          <div className="home-row">
            <div className="dashboard-item">
              <h2>How many wallets hold <span>$Dusty</span></h2>
              <p>
                {connected ? (!homeLoading ? new Intl.NumberFormat().format(holders) : <Skeleton width={120} sx={{ bgcolor: '#ffffff20' }} height={50} style={{ marginLeft: "auto", backgroundColor: "ffffff3d" }} />) : <span>N/A</span>}
              </p>
              <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 37.5H77.5V22.5C77.5 21.837 77.2366 21.2011 76.7677 20.7322C76.2989 20.2634 75.663 20 75 20H15C14.408 20.0097 13.8318 19.8089 13.374 19.4335C12.9162 19.0581 12.6065 18.5324 12.5 17.95V17.05C12.6065 16.4676 12.9162 15.9419 13.374 15.5665C13.8318 15.1911 14.408 14.9903 15 15H73.95C74.613 15 75.2489 14.7366 75.7177 14.2678C76.1866 13.7989 76.45 13.163 76.45 12.5C76.45 11.837 76.1866 11.2011 75.7177 10.7322C75.2489 10.2634 74.613 10 73.95 10H15C13.0109 10 11.1032 10.7902 9.69668 12.1967C8.29015 13.6032 7.49998 15.5109 7.49998 17.5C7.48243 17.7997 7.48243 18.1003 7.49998 18.4V69.825C7.50979 71.1711 7.78464 72.502 8.30884 73.7418C8.83304 74.9817 9.59631 76.1061 10.5551 77.051C11.5139 77.9958 12.6493 78.7425 13.8967 79.2485C15.1441 79.7545 16.4789 80.0099 17.825 80H75C75.663 80 76.2989 79.7366 76.7677 79.2678C77.2366 78.7989 77.5 78.163 77.5 77.5V62.5H80C80.663 62.5 81.2989 62.2366 81.7677 61.7678C82.2366 61.2989 82.5 60.663 82.5 60V40C82.5 39.337 82.2366 38.7011 81.7677 38.2322C81.2989 37.7634 80.663 37.5 80 37.5ZM72.5 75H17.825C16.4345 75.0134 15.0949 74.4773 14.0977 73.5081C13.1005 72.539 12.5263 71.2153 12.5 69.825V24.7C13.3115 24.9352 14.1559 25.0365 15 25H72.5V37.5H55C51.6848 37.5 48.5053 38.817 46.1611 41.1612C43.8169 43.5054 42.5 46.6848 42.5 50C42.5 53.3152 43.8169 56.4946 46.1611 58.8388C48.5053 61.183 51.6848 62.5 55 62.5H72.5V75ZM77.5 57.5H55C53.0109 57.5 51.1032 56.7098 49.6967 55.3033C48.2902 53.8968 47.5 51.9891 47.5 50C47.5 48.0109 48.2902 46.1032 49.6967 44.6967C51.1032 43.2902 53.0109 42.5 55 42.5H77.5V57.5Z" fill="white" />
                <path d="M57.525 53.75C59.5961 53.75 61.275 52.0711 61.275 50C61.275 47.9289 59.5961 46.25 57.525 46.25C55.454 46.25 53.775 47.9289 53.775 50C53.775 52.0711 55.454 53.75 57.525 53.75Z" fill="white" />
              </svg>
            </div>
            <div className="dashboard-item">
              <h2>Total number of NFT&apos;s in the vault</h2>
              <p>{connected ? (!homeLoading ? staked : <Skeleton width={120} sx={{ bgcolor: '#ffffff20' }} height={50} style={{ marginLeft: "auto", backgroundColor: "ffffff3d" }} />) : <span>N/A</span>}</p>
              <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_18)">
                  <path d="M77.0625 27.765L67.8555 2.4075C67.176 0.535497 65.178 -0.459003 63.405 0.193497L2.214 22.527C0.440999 23.175 -0.454501 25.2135 0.229499 27.0855L9.9315 53.82V39.4965C9.9315 33.0255 15.0975 27.765 21.4515 27.765H37.62L56.9025 14.229L68.058 27.765H77.0625V27.765ZM86.571 36H21.4515C20.9953 35.9993 20.5435 36.0898 20.1228 36.2661C19.702 36.4424 19.3207 36.701 19.0013 37.0267C18.6818 37.3524 18.4307 37.7387 18.2626 38.1628C18.0946 38.587 18.0129 39.0404 18.0225 39.4965V81.8865C18.027 83.8845 19.566 85.5 21.4515 85.5H86.571C88.461 85.5 90 83.8845 90 81.8865V39.4965C90.0096 39.0404 89.928 38.587 89.7599 38.1628C89.5918 37.7387 89.3407 37.3524 89.0212 37.0267C88.7018 36.701 88.3205 36.4424 87.8997 36.2661C87.479 36.0898 87.0272 35.9993 86.571 36V36ZM81 76.5H27V67.5L35.928 49.419L48.384 64.881L60.075 52.902L75.096 47.4795L81 63V76.5Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_6_18">
                    <rect width="90" height="90" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="home-row">
            <div className="dashboard-item">
              <h2>How many NFT&apos;s have been removed from vault early</h2>
              <p>{connected ? (!homeLoading ? earlyRemoved : <Skeleton width={120} sx={{ bgcolor: '#ffffff20' }} height={50} style={{ marginLeft: "auto", backgroundColor: "ffffff3d" }} />) : <span>N/A</span>}</p>
              <svg width="80" height="80" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M78.75 0H11.25C8.08594 0 5.41992 1.08398 3.25195 3.25195C1.08398 5.41992 0 8.08594 0 11.25V82.4414C0 84.5508 0.732422 86.3379 2.19727 87.8027C3.66211 89.2676 5.44922 90 7.55859 90H82.4414C84.5508 90 86.3379 89.2676 87.8027 87.8027C89.2676 86.3379 90 84.5508 90 82.4414V11.25C90 8.08594 88.916 5.41992 86.748 3.25195C84.5801 1.08398 81.9141 0 78.75 0ZM82.4414 82.4414H7.55859V11.25C7.55859 8.78906 8.78906 7.55859 11.25 7.55859H78.75C81.2109 7.55859 82.4414 8.78906 82.4414 11.25V82.4414ZM67.5 11.25H22.5C20.5078 11.25 18.75 11.9824 17.2266 13.4473C15.7031 14.9121 14.9414 16.6992 14.9414 18.8086V26.1914H11.25V33.75H14.9414V56.25H11.25V63.8086H14.9414V71.1914C14.9414 73.3008 15.7031 75.0879 17.2266 76.5527C18.75 78.0176 20.5078 78.75 22.5 78.75H67.5C70.6641 78.75 73.3301 77.666 75.498 75.498C77.666 73.3301 78.75 70.6641 78.75 67.5V22.5C78.75 19.3359 77.666 16.6699 75.498 14.502C73.3301 12.334 70.6641 11.25 67.5 11.25ZM71.1914 67.5C71.1914 69.9609 69.9609 71.1914 67.5 71.1914H22.5V63.8086H26.1914V56.25H22.5V33.75H26.1914V26.1914H22.5V18.8086H67.5C69.9609 18.8086 71.1914 20.0391 71.1914 22.5V67.5ZM58.8867 49.9219C59.5898 48.3984 59.9414 46.7578 59.9414 45C59.9414 42.6563 59.2383 40.5176 57.832 38.584C56.4258 36.6504 54.668 35.2734 52.5586 34.4531V26.1914C52.5586 25.1367 52.207 24.2578 51.5039 23.5547C50.8008 22.8516 49.8633 22.5 48.6914 22.5C47.6367 22.5 46.7578 22.8516 46.0547 23.5547C45.3516 24.2578 45 25.1367 45 26.1914V34.4531C39.9609 36.2109 37.4414 39.7266 37.4414 45C37.4414 46.7578 37.8516 48.3984 38.6719 49.9219L31.1133 57.3047C29.4727 59.1797 29.4727 60.9375 31.1133 62.5781C31.8164 63.3984 32.6953 63.8086 33.75 63.8086C34.8047 63.8086 35.6836 63.3984 36.3867 62.5781L43.9453 55.1953C45.3516 55.8984 46.9336 56.25 48.6914 56.25C50.5664 56.25 52.207 55.8984 53.6133 55.1953L61.1719 62.5781C61.875 63.3984 62.7539 63.8086 63.8086 63.8086C64.7461 63.8086 65.625 63.3984 66.4453 62.5781C68.0859 60.9375 68.0859 59.1797 66.4453 57.3047L58.8867 49.9219ZM48.6914 48.6914C46.2305 48.6914 45 47.4609 45 45C45 42.5391 46.2305 41.3086 48.6914 41.3086C51.2695 41.3086 52.5586 42.5391 52.5586 45C52.5586 47.4609 51.2695 48.6914 48.6914 48.6914Z" fill="white" />
              </svg>
            </div>
            <div className="dashboard-item">
              <h2>How much $Dusty is currently in the bonus/charity pool</h2>
              <p>{connected ? (!homeLoading ? new Intl.NumberFormat().format(ethers.utils.formatEther(ownerDusty.toString())) : <Skeleton width={120} sx={{ bgcolor: '#ffffff20' }} height={50} style={{ marginLeft: "auto", backgroundColor: "ffffff3d" }} />) : <span>N/A</span>}</p>
              <svg width="80" height="80" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_7_20)">
                  <path d="M88.7766 77.8113L71.2494 60.2877C70.4584 59.4967 69.3861 59.0572 68.2611 59.0572H65.3959C70.2475 52.8521 73.1303 45.0492 73.1303 36.559C73.1303 16.3635 56.7633 0 36.566 0C16.3688 0 0 16.3635 0 36.559C0 56.7545 16.367 73.118 36.566 73.118C45.0563 73.118 52.8627 70.2352 59.0678 65.3836V68.2488C59.0678 69.3738 59.5072 70.4461 60.2982 71.2371L77.8254 88.7607C79.4777 90.4131 82.1496 90.4131 83.7844 88.7607L88.759 83.7861C90.4113 82.1338 90.4113 79.4637 88.7766 77.8113V77.8113ZM36.566 61.868C22.5844 61.868 11.2535 50.5582 11.2535 36.559C11.2535 22.5791 22.565 11.25 36.566 11.25C50.5477 11.25 61.8785 22.5598 61.8785 36.559C61.8785 50.5389 50.567 61.868 36.566 61.868ZM41.3314 35.0543L33.4195 32.6812C32.5125 32.4088 31.8779 31.4895 31.8779 30.4436C31.8779 29.1656 32.8096 28.125 33.9521 28.125H38.8934C39.6949 28.125 40.4684 28.3518 41.1469 28.7789C41.7164 29.1357 42.4406 29.1146 42.9275 28.6506L44.993 26.6801C45.6135 26.0877 45.5783 25.0611 44.8928 24.5461C43.2932 23.3455 41.3631 22.6529 39.3785 22.551V19.6875C39.3785 18.9105 38.7492 18.2812 37.9723 18.2812H35.1598C34.3828 18.2812 33.7535 18.9105 33.7535 19.6875V22.5211C29.5998 22.6318 26.2512 26.1334 26.2512 30.4436C26.2512 33.9539 28.5346 37.0898 31.8023 38.0707L39.7143 40.4438C40.6213 40.7162 41.2559 41.6355 41.2559 42.6814C41.2559 43.9594 40.3242 45 39.1816 45H34.2422C33.4406 45 32.6672 44.7732 31.9887 44.3461C31.4191 43.9893 30.6949 44.0104 30.208 44.4744L28.1426 46.4449C27.5221 47.0373 27.5572 48.0639 28.2428 48.5789C29.8424 49.7795 31.7725 50.4721 33.757 50.574V53.4375C33.757 54.2145 34.3863 54.8438 35.1633 54.8438H37.9758C38.7527 54.8438 39.382 54.2145 39.382 53.4375V50.6039C43.5357 50.4932 46.8844 46.9934 46.8844 42.6814C46.8844 39.1711 44.601 36.0352 41.3314 35.0543V35.0543Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_7_20">
                    <rect width="90" height="90" fill="white" />
                  </clipPath>
                </defs>
              </svg>

            </div>
          </div>
          <div className="home-row">
            <div className="dashboard-item">
              <h2>Total $Dusty Supply</h2>
              <p>{connected ? (!homeLoading ? new Intl.NumberFormat().format(10000000) : <Skeleton width={120} sx={{ bgcolor: '#ffffff20' }} height={50} style={{ marginLeft: "auto", backgroundColor: "ffffff3d" }} />) : <span>N/A</span>}</p>
            </div>
            <div className="dashboard-item">
              <h2>Total $Dusty locked</h2>
              <p>{connected ? (!homeLoading ? new Intl.NumberFormat().format(10000000 - parseFloat(totalSupply) + parseFloat(ethers.utils.formatEther(totalDusty))) : <Skeleton width={120} sx={{ bgcolor: '#ffffff20' }} height={50} style={{ marginLeft: "auto", backgroundColor: "ffffff3d" }} />) : <span>N/A</span>}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}