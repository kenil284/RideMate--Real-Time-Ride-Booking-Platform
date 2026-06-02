import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const RecenterMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 15, {
        animate: true,
      });
    }
  }, [position, map]);

  return null;
};

const Map = () => {
  const defaultPosition = [21.1702, 72.8311];
  const [position, setPosition] = useState(defaultPosition);

  const currentLocationIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        html: `
          <div style="
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 42px;
              height: 42px;
              border-radius: 50% 50% 50% 0;
              background: linear-gradient(135deg, #2563eb, #60a5fa);
              transform: rotate(-45deg);
              box-shadow: 0 10px 25px rgba(37, 99, 235, 0.35);
              border: 4px solid white;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="
                width: 12px;
                height: 12px;
                background: white;
                border-radius: 50%;
              "></div>
            </div>
          </div>
        `,
      }),
    []
  );

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.log("Location error:", err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }, []);

  return (
    <div className="w-full h-full">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />

        <RecenterMap position={position} />

        <Marker position={position} icon={currentLocationIcon} />
      </MapContainer>
    </div>
  );
};

export default Map;