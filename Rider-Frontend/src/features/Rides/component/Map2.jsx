import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Map2 = () => {
  // we are doing like limit of maptiler Exceeds then swith to open free map
  const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY;

  const MAP_STYLES = {
    maptiler: `https://api.maptiler.com/maps/streets-v2/style.json?key=${mapTilerKey}`,
    free: "https://tiles.openfreemap.org/styles/liberty",
  };

  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const fallbackDoneRef = useRef(false);

  const defaultPosition = {
    lat: 21.1702,
    lng: 72.8311,
  };

  const [position, setPosition] = useState(defaultPosition);

  const createMarker = (map, currentPosition) => {
    const markerElement = document.createElement("div");

    markerElement.innerHTML = `
      <div style="
        width: 44px;
        height: 44px;
        border-radius: 50% 50% 50% 0;
        background: linear-gradient(135deg, #2563eb, #60a5fa);
        transform: rotate(-45deg);
        border: 4px solid white;
        box-shadow: 0 12px 28px rgba(37, 99, 235, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
        "></div>
      </div>
    `;

    markerRef.current = new maplibregl.Marker({
      element: markerElement,
      anchor: "bottom",
    })
      .setLngLat([currentPosition.lng, currentPosition.lat])
      .addTo(map);
  };

  const add3DBuildings = (map) => {
    const layers = map.getStyle().layers;

    const labelLayerId = layers.find(
      (layer) =>
        layer.type === "symbol" &&
        layer.layout &&
        layer.layout["text-field"]
    )?.id;

    if (!map.getSource("openmaptiles")) return;

    if (!map.getLayer("3d-buildings")) {
      map.addLayer(
        {
          id: "3d-buildings",
          source: "openmaptiles",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#d6dde6",
            "fill-extrusion-opacity": 0.75,

            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              16,
              ["coalesce", ["get", "render_height"], ["get", "height"], 12],
            ],

            "fill-extrusion-base": [
              "coalesce",
              ["get", "render_min_height"],
              ["get", "min_height"],
              0,
            ],
          },
        },
        labelLayerId
      );
    }
  };

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const createMap = (provider) => {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        // style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${mapTilerKey}`,
        style: MAP_STYLES[provider],
        center: [position.lng, position.lat],
        zoom: 16.3,
        pitch: 42,
        bearing: -15,
        antialias: true,
        attributionControl: false,
      });

      mapRef.current = map;

      createMarker(map, position);

      map.on("load", () => {
        add3DBuildings(map);
      });

      map.on("error", (e) => {
        const message = e?.error?.message || "";

        const isMapTilerError =
          provider === "maptiler" &&
          !fallbackDoneRef.current &&
          (message.includes("401") ||
            message.includes("403") ||
            message.includes("429") ||
            message.toLowerCase().includes("limit") ||
            message.toLowerCase().includes("quota") ||
            message.toLowerCase().includes("key") ||
            message.toLowerCase().includes("unauthorized"));

        if (isMapTilerError) {
          fallbackDoneRef.current = true;

          localStorage.setItem(
            "maptilerBlockedTill",
            String(Date.now() + 24 * 60 * 60 * 1000)
          );

          if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
            markerRef.current = null;
          }

          createMap("free");
        }
      });
    };

    const blockedTill = Number(localStorage.getItem("maptilerBlockedTill") || 0);

    if (Date.now() < blockedTill) {
      createMap("free");
    } else {
      createMap("maptiler");
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
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

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.flyTo({
      center: [position.lng, position.lat],
      zoom: 16.3,
      pitch: 42,
      bearing: -15,
      speed: 1.2,
      curve: 1,
    });

    if (markerRef.current) {
      markerRef.current.setLngLat([position.lng, position.lat]);
    }
  }, [position]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default Map2;