import { useEffect } from "react"
import { getCaptainActiveRideService } from "../services/captainRide.service"


const getStageFromRideStatus = (status) => {
    if (status === "accepted") {
        return "accepted"
    }

    if (status === "arrived") {
        return "otp"
    }

    if (status === "started") {
        return "navigating"
    }

    return "looking"
}

export const useCaptainActiveRide = ({ setCurrentRide, setStage }) => {
    useEffect(() => {
        const checkCaptainActiveRide = async () => {
            try {
                const activeRide = await getCaptainActiveRideService()

                if (!activeRide) {
                    setStage("looking")
                    return
                }

                setCurrentRide(activeRide)
                setStage(getStageFromRideStatus(activeRide.status))
            } catch (error) {
                console.log(
                    error.response?.data?.message || error.message
                )
            }
        }

        checkCaptainActiveRide()
    }, [])
}