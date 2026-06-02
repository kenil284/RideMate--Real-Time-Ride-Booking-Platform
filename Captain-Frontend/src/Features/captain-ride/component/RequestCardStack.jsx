import React from "react";
import { IoCall, IoClose, IoCheckmark } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";

const RequestCardStack = ({ requests, onAccept, onReject, isAccepting }) => {
  const getId = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (value.$oid) return value.$oid;
    return "";
  };

  const getDate = (value) => {
    if (!value) return "";

    const dateValue = value.$date ? value.$date : value;

    return new Date(dateValue).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="pb-2">
      <div className="mb-3 flex items-center justify-between px-1">
        <div>
          <h2 className="text-[18px] font-bold text-black leading-tight">
            Available requests
          </h2>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Swipe to compare rides
          </p>
        </div>

        <div className="h-10 min-w-10 rounded-2xl bg-gray-100 flex flex-col items-center justify-center px-3">
          <span className="text-[10px] text-gray-500 leading-none">Total</span>
          <span className="text-[15px] font-bold text-black leading-none mt-1">
            {requests.length}
          </span>
        </div>
      </div>

      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards]}
        cardsEffect={{
          perSlideOffset: 10,
          perSlideRotate: 2,
          rotate: true,
          slideShadows: false,
        }}
        className="w-full h-[440px] overflow-visible"
      >
        {requests.map((request) => (
          <SwiperSlide key={getId(request._id)}>
            <div className="h-[440px] rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1.5 rounded-lg bg-gray-100 text-black text-[11px] font-bold capitalize">
                    {request.status}
                  </span>

                  <span className="text-[11px] font-semibold text-gray-500">
                    {getDate(request.createdAt)}
                  </span>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-[9px] top-5 bottom-5 w-[2px] border-l-2 border-dashed border-gray-300"></div>

                  <div className="relative mb-5">
                    <span className="absolute -left-8 top-1 w-5 h-5 rounded-full bg-black border-4 border-gray-200"></span>

                    <p className="text-[11px] font-semibold text-gray-500 mb-1">
                      Pickup
                    </p>

                    <h3 className="text-[15px] font-bold text-black leading-tight line-clamp-2">
                      {request.pickup?.address}
                    </h3>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-8 top-1 w-5 h-5 rounded-full bg-gray-500 border-4 border-gray-200"></span>

                    <p className="text-[11px] font-semibold text-gray-500 mb-1">
                      Destination
                    </p>

                    <h3 className="text-[15px] font-bold text-black leading-tight line-clamp-2">
                      {request.destination?.address}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 px-4 py-3 grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-[29px] font-bold text-black leading-none">
                    ₹{request.fare}
                  </h2>

                  <p className="text-sm text-gray-500 mt-2 capitalize">
                    {request.paymentMethod}
                  </p>
                </div>

                <div className="border-l border-gray-100 pl-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-sm font-semibold text-black">
                    <span className="text-gray-400">↝</span>
                    <span>{request.distanceKm} km</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm font-semibold text-black">
                    <span className="text-gray-400">◷</span>
                    <span>{request.durationMin} min</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-black font-bold uppercase">
                    {request.vehicle?.type?.charAt(0)}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-black capitalize">
                      {request.vehicle?.type} Ride
                    </h4>

                    <p className="text-[11px] text-gray-500">
                      Capacity {request.vehicle?.capacity} • Rider #
                      {getId(request.rider).slice(-6)}
                    </p>
                  </div>
                </div>

                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  className="w-10 h-10 rounded-full bg-gray-100 text-black flex items-center justify-center text-lg"
                >
                  <IoCall />
                </button>
              </div>

              <div
                onPointerDown={(e) => e.stopPropagation()}
                className="px-4 pb-4 grid grid-cols-2 gap-3"
              >
                <button
                  onClick={() => onReject(request)}
                  className="h-13 min-h-[52px] rounded-2xl bg-gray-100 text-black font-bold flex items-center justify-center gap-2 active:scale-95 transition"
                >
                  <IoClose className="text-xl" />
                  Reject
                </button>

                <button
                  disabled={isAccepting}
                  onClick={() => onAccept(request)}
                  className="h-13 min-h-[52px] rounded-2xl bg-black text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-black/25 active:scale-95 transition disabled:opacity-60"
                >
                  <IoCheckmark className="text-xl" />
                  {isAccepting ? "Accepting..." : "Accept"}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RequestCardStack;