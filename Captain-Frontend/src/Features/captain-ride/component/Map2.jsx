import React, { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

const Map2 = ({
  routeCoordinates = [],
  currentLocation,
  pickup,
  vehicleType = "bike",
}) => {
  const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY

  const mapContainer = useRef(null)
  const mapRef = useRef(null)
  const captainMarkerRef = useRef(null)
  const pickupMarkerRef = useRef(null)

  const defaultPosition = {
    lat: 21.1702,
    lng: 72.8311,
  }

  const [position, setPosition] = useState(defaultPosition)

  // Change this only if image direction is opposite
  // Try 180 if vehicle faces wrong side
  // Try 90 or -90 if image is side-wise wrong
  const VEHICLE_IMAGE_ROTATION_OFFSET = 0

  const getVehicleImage = () => {
    if (vehicleType === "car") return "/car_3d.png"
    if (vehicleType === "auto") return "/Auto.png"
    return "/MotorcycleOrange-249-0.png"
  }

  const getLngLat = (location) => {
    if (!location) return null

    if (location.lat && location.lng) {
      return [Number(location.lng), Number(location.lat)]
    }

    if (location.type === "Point" && location.coordinates) {
      return [Number(location.coordinates[0]), Number(location.coordinates[1])]
    }

    return null
  }

  const formatRouteCoordinates = (coordinates) => {
    if (!Array.isArray(coordinates)) return []

    const finalCoordinates = Array.isArray(coordinates[0]?.[0])
      ? coordinates.flat()
      : coordinates

    return finalCoordinates
      .map((item) => [Number(item[0]), Number(item[1])])
      .filter(([lng, lat]) => {
        return (
          !isNaN(lng) &&
          !isNaN(lat) &&
          lng >= -180 &&
          lng <= 180 &&
          lat >= -90 &&
          lat <= 90
        )
      })
  }

  const getPointToSegmentDistance = (point, start, end) => {
    const dx = end.x - start.x
    const dy = end.y - start.y

    if (dx === 0 && dy === 0) {
      return Math.hypot(point.x - start.x, point.y - start.y)
    }

    const t = Math.max(
      0,
      Math.min(
        1,
        ((point.x - start.x) * dx + (point.y - start.y) * dy) /
          (dx * dx + dy * dy)
      )
    )

    const nearestX = start.x + t * dx
    const nearestY = start.y + t * dy

    return Math.hypot(point.x - nearestX, point.y - nearestY)
  }

  const getDistance = (point1, point2) => {
    return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1])
  }

  const getVehicleRotation = (map) => {
    const route = formatRouteCoordinates(routeCoordinates)

    if (!map || route.length < 2) return 0

    const captainLngLat = [position.lng, position.lat]
    const captainPixel = map.project(captainLngLat)

    let bestStart = route[0]
    let bestEnd = route[1]
    let minDistance = Infinity

    for (let i = 0; i < route.length - 1; i++) {
      const start = route[i]
      const end = route[i + 1]

      const startPixel = map.project(start)
      const endPixel = map.project(end)

      const distance = getPointToSegmentDistance(
        captainPixel,
        startPixel,
        endPixel
      )

      if (distance < minDistance) {
        minDistance = distance
        bestStart = start
        bestEnd = end
      }
    }

    const pickupLngLat = getLngLat(pickup)

    if (pickupLngLat) {
      const startDistance = getDistance(bestStart, pickupLngLat)
      const endDistance = getDistance(bestEnd, pickupLngLat)

      if (startDistance < endDistance) {
        const temp = bestStart
        bestStart = bestEnd
        bestEnd = temp
      }
    }

    const startPixel = map.project(bestStart)
    const endPixel = map.project(bestEnd)

    const angle =
      Math.atan2(endPixel.y - startPixel.y, endPixel.x - startPixel.x) *
      180 /
      Math.PI

    return angle + VEHICLE_IMAGE_ROTATION_OFFSET
  }

  const updateCaptainMarkerStyle = () => {
    if (!mapRef.current || !captainMarkerRef.current) return

    captainMarkerRef.current.setLngLat([position.lng, position.lat])

    const img = captainMarkerRef.current
      .getElement()
      .querySelector(".captain-vehicle-img")

    if (!img) return

    img.src = getVehicleImage()
    img.style.transform = `rotateZ(${getVehicleRotation(mapRef.current)}deg)`
  }

  const add3DBuildings = (map) => {
    const layers = map.getStyle().layers

    const labelLayerId = layers.find(
      (layer) =>
        layer.type === "symbol" &&
        layer.layout &&
        layer.layout["text-field"]
    )?.id

    if (!map.getSource("openmaptiles")) return
    if (map.getLayer("3d-buildings")) return

    map.addLayer(
      {
        id: "3d-buildings",
        source: "openmaptiles",
        "source-layer": "building",
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#d6dde6",
          "fill-extrusion-opacity": 0.7,
          "fill-extrusion-height": [
            "coalesce",
            ["get", "render_height"],
            ["get", "height"],
            12,
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
    )
  }

  const createCaptainMarker = (map, location) => {
    const lngLat = getLngLat(location)

    if (!lngLat) return

    const markerElement = document.createElement("div")

    markerElement.innerHTML = `
      <div style="
        width: 82px;
        height: 82px;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        transform: translateY(-6px);
      ">
        <img 
          class="captain-vehicle-img"
          src="${getVehicleImage()}" 
          style="
            width: 76px;
            height: 76px;
            object-fit: contain;
            transform: rotateZ(${getVehicleRotation(map)}deg);
            transform-origin: 50% 55%;
            transition: transform 0.25s ease;
            filter: drop-shadow(0 14px 12px rgba(0,0,0,0.35));
          "
        />
      </div>
    `

    captainMarkerRef.current = new maplibregl.Marker({
      element: markerElement,
      anchor: "center",
      rotationAlignment: "viewport",
      pitchAlignment: "viewport",
    })
      .setLngLat(lngLat)
      .addTo(map)
  }

  const createPickupMarker = (map, pickupLocation) => {
    const lngLat = getLngLat(pickupLocation)

    if (!lngLat) return

    const markerElement = document.createElement("div")

    markerElement.innerHTML = `
      <div style="
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #22c55e;
        border: 4px solid white;
        box-shadow: 0 8px 20px rgba(0,0,0,0.25);
      "></div>
    `

    pickupMarkerRef.current = new maplibregl.Marker({
      element: markerElement,
      anchor: "center",
    })
      .setLngLat(lngLat)
      .addTo(map)
  }

  const drawRoute = (map) => {
    const finalRoute = formatRouteCoordinates(routeCoordinates)

    if (finalRoute.length < 2) return

    const routeData = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: finalRoute,
      },
    }

    if (map.getSource("route-source")) {
      map.getSource("route-source").setData(routeData)
      return
    }

    map.addSource("route-source", {
      type: "geojson",
      data: routeData,
    })

    map.addLayer({
      id: "route-line",
      type: "line",
      source: "route-source",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#111827",
        "line-width": 4,
        "line-opacity": 0.95,
      },
    })
  }

  useEffect(() => {
    const captainLngLat = getLngLat(currentLocation)

    if (!captainLngLat) return

    setPosition({
      lng: captainLngLat[0],
      lat: captainLngLat[1],
    })
  }, [currentLocation])

  useEffect(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (currentLocation) return

        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      },
      (err) => {
        console.log("Location error:", err.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    )
  }, [])

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    const mapStyle = mapTilerKey
      ? `https://api.maptiler.com/maps/streets-v2/style.json?key=${mapTilerKey}`
      : "https://tiles.openfreemap.org/styles/liberty"

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [position.lng, position.lat],
      zoom: 16.5,
      pitch: 55,
      bearing: -20,
      antialias: true,
      attributionControl: false,
    })

    mapRef.current = map

    map.on("load", () => {
      add3DBuildings(map)
      createCaptainMarker(map, position)
      createPickupMarker(map, pickup)
      drawRoute(map)
      updateCaptainMarkerStyle()
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    mapRef.current.flyTo({
      center: [position.lng, position.lat],
      zoom: 16.5,
      pitch: 55,
      bearing: -20,
      speed: 1.2,
    })

    updateCaptainMarkerStyle()
  }, [position])

  useEffect(() => {
    if (!mapRef.current || !pickup) return

    const pickupLngLat = getLngLat(pickup)

    if (!pickupLngLat) return

    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.setLngLat(pickupLngLat)
    } else {
      createPickupMarker(mapRef.current, pickup)
    }

    updateCaptainMarkerStyle()
  }, [pickup])

  useEffect(() => {
    updateCaptainMarkerStyle()
  }, [vehicleType])

  useEffect(() => {
    if (!mapRef.current) return

    if (mapRef.current.loaded()) {
      drawRoute(mapRef.current)
      updateCaptainMarkerStyle()
    }
  }, [routeCoordinates])

  useEffect(() => {
    if (!mapRef.current) return

    const map = mapRef.current

    const handleMapMove = () => {
      updateCaptainMarkerStyle()
    }

    map.on("move", handleMapMove)
    map.on("rotate", handleMapMove)
    map.on("pitch", handleMapMove)

    return () => {
      map.off("move", handleMapMove)
      map.off("rotate", handleMapMove)
      map.off("pitch", handleMapMove)
    }
  }, [routeCoordinates, position, vehicleType, pickup])

  return <div ref={mapContainer} className="w-full h-full" />
}

export default Map2