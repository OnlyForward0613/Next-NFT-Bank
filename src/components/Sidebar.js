import { useRouter } from "next/router";
import { SidebarButton } from "./styleHook";

export default function Sidebar() {
  const router = useRouter()
  const goto = (url) => {
    router.push(url)
  }
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <ul>
          <li>
            <SidebarButton fullWidth onClick={() => goto("/")}>
              Home
            </SidebarButton>
          </li>
          <li>
            <SidebarButton fullWidth onClick={() => goto("/nfts-list")}>
              My NFTs
            </SidebarButton>
          </li>
          <li>
            <SidebarButton fullWidth onClick={() => goto("/faq")}>
              F.A.Q
            </SidebarButton>
          </li>
        </ul>
        <div className="token-info">
          <h5>$Dusty Token Price</h5>
          <p>$ 1</p>
        </div>
      </div>
    </div>
  )
}