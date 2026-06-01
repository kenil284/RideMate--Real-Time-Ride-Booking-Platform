import React from "react";

const LookingForDriver = ({ rideData }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="shrink-0 text-center border-b pb-4">
        <h2 className="text-lg font-semibold">
          Looking for nearby drivers
        </h2>
      </div>

      <div className="shrink-0 flex justify-center py-5 border-b">
        <div className="w-[170px] h-[100px] bg-[#eeeeee] rounded-xl flex items-center justify-center">
          <img
            src={rideData.vehicle?.image}
            alt={rideData.vehicle?.name}
            className="w-[170px] h-[100px] object-contain"
          />
        </div>
      </div>

      {/* Trip details */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex gap-3 py-3.5 border-b">
          <div className="w-5 flex justify-center pt-1 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path d="M17.0839 15.812C19.6827 13.0691 19.6379 8.73845 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.36205 8.73845 4.31734 13.0691 6.91612 15.812C7.97763 14.1228 9.8577 13 12 13C14.1423 13 16.0224 14.1228 17.0839 15.812ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12Z" />
            </svg>
          </div>

          <div>
            <h3 className="text-base font-semibold leading-tight">
              {rideData.pickup || "562/11-A"}
            </h3>
            <p className="text-sm text-gray-500 leading-snug mt-1">
              Kaikondrahalli, Bengaluru, Karnataka
            </p>
          </div>
        </div>

        <div className="flex gap-3 py-3.5 border-b">
          <div className="w-5 flex justify-center pt-1 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-base font-semibold leading-tight">
              {rideData.destination || "Third Wave Coffee"}
            </h3>
            <p className="text-sm text-gray-500 leading-snug mt-1">
              17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout
            </p>
          </div>
        </div>

        <div className="flex gap-3 py-3.5 border-b">
          <div className="w-5 flex justify-center pt-1 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-base font-semibold leading-tight">
              {rideData.fare || "₹193.20"}
            </h3>
            <p className="text-sm text-gray-500 leading-snug mt-1">Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;