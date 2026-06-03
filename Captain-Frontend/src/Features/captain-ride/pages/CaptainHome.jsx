import { useState } from "react";
import BottomSheet from "../component/BottomSheet";
import CaptainHeader from "../component/CaptainHeader";
import LookingForRide from "../component/LookingForRide";
import Map from "../component/Map";
import { useCaptainDashboard } from "../hooks/useCaptainDashboard";
import { useCaptainSocket } from "../hooks/useCaptainSocket";



const CaptainHome = () => {

    const { dashboard } = useCaptainDashboard();

    const [isOnline, setIsOnline] = useState(false);

    const [stage, setStage] = useState("looking");

    const { socketstate } = useCaptainSocket();

    console.log(socketstate);



    return (
        <div className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-white">
            <div className="absolute inset-0 z-0 bg-[#eef1f4]">
                <Map />
            </div>

            <CaptainHeader
                isOnline={isOnline}
                onToggle={() => setIsOnline((prev) => !prev)}
            />
            <BottomSheet stage={stage} contentKey={isOnline}>
                {stage === "looking" && (
                    <LookingForRide
                        dashboard={dashboard}
                        isOnline={isOnline}
                    />
                )}
            </BottomSheet>
        </div>
    );
};

export default CaptainHome;