import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RecenterMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [position, map]);

  return null;
};

const Map = () => {
  const defaultPosition = [21.1702, 72.8311]; // Surat
  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition([lat, lng]);
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
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap position={position} />

        <Marker position={position}>
          <Popup>Your current location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;