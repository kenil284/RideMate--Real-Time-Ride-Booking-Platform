import { FaCar, FaWallet, FaClock } from "react-icons/fa";
import EarningCard from "./EarningCard";

const LookingForRide = ({ dashboard, isOnline }) => {
    return (
        <div>
            {isOnline && (
                <div className="flex flex-col items-center text-center pt-6 pb-7">
                    <div className="relative w-36 h-32 flex items-center justify-center mb-5">
                        <span className="absolute inset-4 rounded-full bg-blue-400/30 animate-ping [animation-duration:1.8s]" />

                        <span className="absolute inset-8 rounded-full bg-blue-300/30 animate-ping [animation-duration:1.8s] [animation-delay:0.4s]" />

                        <img
                            // src="/MotorcycleOrange-249-0.png"
                            src ="/Auto.png"
                            // src="/car_3d.png"
                            alt="captain vehicle"
                            className="relative z-10 w-32 h-32 object-contain drop-shadow-xl"
                        />
                    </div>

                    <h2 className="text-2xl font-bold text-black">
                        Looking for rides
                    </h2>

                    <p className="text-sm text-gray-500 mt-2 max-w-[260px]">
                        You are online. New ride requests will appear here.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <EarningCard
                    icon={<FaWallet />}
                    title="Today’s earnings"
                    value={`₹${dashboard.todayEarning}`}
                    subtitle="vs yesterday"
                />

                <EarningCard
                    icon={<FaCar />}
                    title="Total rides"
                    value={dashboard.totalRides}
                    subtitle="Today"
                />
            </div>
        </div>
    );
};

export default LookingForRide;