import React, { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

const BIKE_IMAGES = {
  right: "/Bike/bike-right.webp",
  left: "/Bike/bike-left.webp",
  front: "/Bike/bike-front.webp",
  back: "/Bike/bike-back.webp",
}

const Map2 = ({
  routeCoordinates = [],
  currentLocation = null,
  pickup = null,
  vehicleType = "bike",
  showVehicleMarker = false,
}) => {
  const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY

  const mapContainer = useRef(null)
  const mapRef = useRef(null)
  const vehicleMarkerRef = useRef(null)
  const userMarkerRef = useRef(null)
  const pickupMarkerRef = useRef(null)
  const routeCoordinatesRef = useRef([])
  const lastVehicleImageRef = useRef("")

  const defaultPosition = {
    lat: 21.1702,
    lng: 72.8311,
  }

  const [position, setPosition] = useState(defaultPosition)

  useEffect(() => {
    routeCoordinatesRef.current = routeCoordinates || []
  }, [routeCoordinates])

  const preloadVehicleImages = () => {
    Object.values(BIKE_IMAGES).forEach((src) => {
      const img = new Image()
      img.src = src
    })

    const car = new Image()
    car.src = "/Home_Page/car_3d.png"

    const auto = new Image()
    auto.src = "/Auto.png"
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

  const getBearingBetweenPoints = (start, end) => {
    const startLng = (start[0] * Math.PI) / 180
    const startLat = (start[1] * Math.PI) / 180
    const endLng = (end[0] * Math.PI) / 180
    const endLat = (end[1] * Math.PI) / 180

    const dLng = endLng - startLng

    const y = Math.sin(dLng) * Math.cos(endLat)

    const x =
      Math.cos(startLat) * Math.sin(endLat) -
      Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng)

    const bearing = (Math.atan2(y, x) * 180) / Math.PI

    return (bearing + 360) % 360
  }

  const getNavigationBearing = () => {
    const route = formatRouteCoordinates(routeCoordinatesRef.current)

    if (route.length < 2) return 0

    const captainLngLat = [position.lng, position.lat]
    const pickupLngLat = getLngLat(pickup)

    let nearestIndex = 0
    let minDistance = Infinity

    route.forEach((point, index) => {
      const distance =
        Math.abs(point[0] - captainLngLat[0]) +
        Math.abs(point[1] - captainLngLat[1])

      if (distance < minDistance) {
        minDistance = distance
        nearestIndex = index
      }
    })

    const currentPoint = route[nearestIndex]

    const forwardPoint =
      route[nearestIndex + 6] ||
      route[nearestIndex + 5] ||
      route[nearestIndex + 4] ||
      route[nearestIndex + 3] ||
      route[nearestIndex + 2] ||
      route[nearestIndex + 1]

    const backwardPoint =
      route[nearestIndex - 6] ||
      route[nearestIndex - 5] ||
      route[nearestIndex - 4] ||
      route[nearestIndex - 3] ||
      route[nearestIndex - 2] ||
      route[nearestIndex - 1]

    let nextPoint = forwardPoint || backwardPoint

    if (pickupLngLat && forwardPoint && backwardPoint) {
      const forwardDistanceToPickup =
        Math.abs(forwardPoint[0] - pickupLngLat[0]) +
        Math.abs(forwardPoint[1] - pickupLngLat[1])

      const backwardDistanceToPickup =
        Math.abs(backwardPoint[0] - pickupLngLat[0]) +
        Math.abs(backwardPoint[1] - pickupLngLat[1])

      nextPoint =
        forwardDistanceToPickup < backwardDistanceToPickup
          ? forwardPoint
          : backwardPoint
    }

    if (!currentPoint || !nextPoint) return 0

    return getBearingBetweenPoints(currentPoint, nextPoint)
  }

  const getBikeImageByBearing = () => {
    const bearing = getNavigationBearing()

    if (bearing >= 45 && bearing < 135) return BIKE_IMAGES.right
    if (bearing >= 135 && bearing < 225) return BIKE_IMAGES.back
    if (bearing >= 225 && bearing < 315) return BIKE_IMAGES.left

    return BIKE_IMAGES.front
  }

  const getVehicleImage = () => {
    if (vehicleType === "bike") return getBikeImageByBearing()
    if (vehicleType === "car") return "/car_3d.png"
    if (vehicleType === "auto") return "/Auto.png"

    return getBikeImageByBearing()
  }

  const createVehicleMarker = (map, location) => {
    const lngLat = getLngLat(location)

    if (!lngLat) return

    const vehicleImage = getVehicleImage()

    lastVehicleImageRef.current = vehicleImage

    const markerElement = document.createElement("div")

    markerElement.innerHTML = `
      <div style="
        width: 86px;
        height: 86px;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        transform: translateY(-8px);
        filter: drop-shadow(0 16px 14px rgba(0,0,0,0.35));
      ">
        <img 
          class="vehicle-img"
          src="${vehicleImage}" 
          draggable="false"
          style="
            width: 80px;
            height: 80px;
            object-fit: contain;
            transition: opacity 0.2s ease;
            will-change: opacity;
          "
        />
      </div>
    `

    vehicleMarkerRef.current = new maplibregl.Marker({
      element: markerElement,
      anchor: "center",
      rotationAlignment: "viewport",
      pitchAlignment: "viewport",
    })
      .setLngLat(lngLat)
      .addTo(map)
  }

  const createUserMarker = (map, location) => {
    const lngLat = getLngLat(location)

    if (!lngLat) return

    const markerElement = document.createElement("div")

    markerElement.innerHTML = `
      <div style="
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(37,99,235,0.18);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 10px 24px rgba(0,0,0,0.24);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #2563eb;
          "></div>
        </div>
      </div>
    `

    userMarkerRef.current = new maplibregl.Marker({
      element: markerElement,
      anchor: "center",
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
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: rgba(34,197,94,0.16);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 10px 24px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #22c55e;
          "></div>
        </div>
      </div>
    `

    pickupMarkerRef.current = new maplibregl.Marker({
      element: markerElement,
      anchor: "center",
    })
      .setLngLat(lngLat)
      .addTo(map)
  }

  const removeVehicleMarker = () => {
    if (!vehicleMarkerRef.current) return

    vehicleMarkerRef.current.remove()
    vehicleMarkerRef.current = null
  }

  const removeUserMarker = () => {
    if (!userMarkerRef.current) return

    userMarkerRef.current.remove()
    userMarkerRef.current = null
  }

  const updateVehicleMarkerStyle = () => {
    if (!mapRef.current || !vehicleMarkerRef.current) return

    vehicleMarkerRef.current.setLngLat([position.lng, position.lat])

    const img = vehicleMarkerRef.current
      .getElement()
      .querySelector(".vehicle-img")

    if (!img) return

    const vehicleImage = getVehicleImage()

    if (lastVehicleImageRef.current !== vehicleImage) {
      img.src = vehicleImage
      lastVehicleImageRef.current = vehicleImage
    }
  }

  const updateUserMarkerStyle = () => {
    if (!mapRef.current || !userMarkerRef.current) return

    userMarkerRef.current.setLngLat([position.lng, position.lat])
  }

  const updateMainMarker = () => {
    if (!mapRef.current) return

    if (showVehicleMarker) {
      removeUserMarker()

      if (!vehicleMarkerRef.current) {
        createVehicleMarker(mapRef.current, position)
      }

      updateVehicleMarkerStyle()
    } else {
      removeVehicleMarker()

      if (!userMarkerRef.current) {
        createUserMarker(mapRef.current, position)
      }

      updateUserMarkerStyle()
    }
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

  const clearRoute = (map) => {
    if (map.getLayer("route-line")) {
      map.removeLayer("route-line")
    }

    if (map.getSource("route-source")) {
      map.removeSource("route-source")
    }
  }

  const drawRoute = (map, coordinates = routeCoordinatesRef.current) => {
    const finalRoute = formatRouteCoordinates(coordinates)

    if (finalRoute.length < 2) {
      clearRoute(map)
      return
    }

    const routeData = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: finalRoute,
      },
    }

    if (map.getSource("route-source")) {
      map.getSource("route-source").setData(routeData)

      if (!map.getLayer("route-line")) {
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
    preloadVehicleImages()
  }, [])

  useEffect(() => {
    const locationLngLat = getLngLat(currentLocation)

    if (!locationLngLat) return

    setPosition({
      lng: locationLngLat[0],
      lat: locationLngLat[1],
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
      zoom: 16.3,
      pitch: showVehicleMarker ? 50 : 35,
      bearing: 0,
      dragRotate: false,
      touchPitch: false,
      antialias: true,
      attributionControl: false,
    })

    mapRef.current = map

    map.dragRotate.disable()
    map.touchZoomRotate.disableRotation()

    map.on("load", () => {
      add3DBuildings(map)
      updateMainMarker()

      if (showVehicleMarker) {
        createPickupMarker(map, pickup)
        drawRoute(map, routeCoordinatesRef.current)
      }
    })

    return () => {
      map.remove()
      mapRef.current = null
      vehicleMarkerRef.current = null
      userMarkerRef.current = null
      pickupMarkerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    mapRef.current.flyTo({
      center: [position.lng, position.lat],
      zoom: showVehicleMarker ? 16.8 : 15.8,
      pitch: showVehicleMarker ? 50 : 35,
      bearing: showVehicleMarker ? 0 : 0,
      offset: showVehicleMarker ? [0, 70] : [0, 0],
      speed: 1.2,
    })

    updateMainMarker()
  }, [position, showVehicleMarker])

  useEffect(() => {
    if (!mapRef.current) return

    if (!showVehicleMarker) {
      if (pickupMarkerRef.current) {
        pickupMarkerRef.current.remove()
        pickupMarkerRef.current = null
      }

      clearRoute(mapRef.current)
      return
    }

    const pickupLngLat = getLngLat(pickup)

    if (!pickupLngLat) return

    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.setLngLat(pickupLngLat)
    } else {
      createPickupMarker(mapRef.current, pickup)
    }

    updateMainMarker()
  }, [pickup, showVehicleMarker])

  useEffect(() => {
    updateMainMarker()
  }, [vehicleType, showVehicleMarker, routeCoordinates])

  useEffect(() => {
    if (!mapRef.current) return

    const map = mapRef.current

    const updateRouteOnMap = () => {
      if (!showVehicleMarker) {
        clearRoute(map)
        return
      }

      drawRoute(map, routeCoordinatesRef.current)
      updateMainMarker()
    }

    if (map.isStyleLoaded()) {
      updateRouteOnMap()
    } else {
      map.once("load", updateRouteOnMap)
    }
  }, [routeCoordinates, showVehicleMarker])

  return <div ref={mapContainer} className="w-full h-full" />
}

export default Map2