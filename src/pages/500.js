import { useRouter } from "next/router"
import { DoActionButton } from "../components/styleHook"

export default function ServerError() {
    const router = useRouter()
    const goHome = () => {
        router.push("/")
    }
    return (
        <div className="no-mached">
            <h1>500</h1>
            <p>Oops! We found the error.</p>
            <DoActionButton onClick={() => goHome()}>
                Go to Home
            </DoActionButton>
        </div>
    )
}