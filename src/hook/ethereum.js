import { SITE_ERROR, SMARTCONTRACT_ADDRESS_ERC20 } from "../../config"
import { errorAlertCenter, successAlert } from "../components/toastGroup"

export const importToken = () => {

  if (typeof window.ethereum !== 'undefined') {
    ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: SMARTCONTRACT_ADDRESS_ERC20,
          symbol: '$Dusty',
          decimals: 0,
          image: 'https://dusty-vaults.vercel.app/logo32x32.png',
        },
      },
    })
      .then((success) => {
        if (success) {
          successAlert('$Dusty token has been successfully added to your wallet. Please check your wallet.')
        } else {
          throw new Error('Something went wrong.')
        }
      })
      .catch(console.error)
  } else {
    errorAlertCenter(SITE_ERROR[1])
  }
}
