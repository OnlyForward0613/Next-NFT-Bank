import { useRouter } from "next/router"
import { DoActionButton } from "../components/styleHook"

export default function NoMached() {
    const router = useRouter()
    const goHome = () => {
        router.push("/")
    }
    return (
        <div className="no-mached">
            <h1>404</h1>
            <p>Oops! We can&apos;t find this page.</p>
            <DoActionButton onClick={() => goHome()}>
                Go to Home
            </DoActionButton>
        </div>
    )
}