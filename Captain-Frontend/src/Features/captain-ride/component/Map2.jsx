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
  currentLocation,
  pickup,
  vehicleType = "bike",
}) => {
  const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY

  const mapContainer = useRef(null)
  const mapRef = useRef(null)
  const captainMarkerRef = useRef(null)
  const pickupMarkerRef = useRef(null)
  const routeCoordinatesRef = useRef([])
  const lastVehicleImageRef = useRef("")
  const fallbackDoneRef = useRef(false)
  const realLocationFoundRef = useRef(false)
  const firstRealLocationFlyDoneRef = useRef(false)

  const firstLocationFlyDoneRef = useRef(false)
  const isMapLoadedRef = useRef(false)

  const defaultPosition = {
    lat: 21.1702,
    lng: 72.8311,
  }

  const [position, setPosition] = useState(defaultPosition)

  useEffect(() => {
    routeCoordinatesRef.current = routeCoordinates || []
  }, [routeCoordinates])



  const getVehicleImage = () => {
    if (vehicleType === "bike") return "/Bike/bike-back.webp"
    if (vehicleType === "car") return "/Car/car-back.webp"
    if (vehicleType === "auto") return "/Auto.png"

    return "/Bike/bike-back.webp"
  }

  const preloadVehicleImages = () => {
    const images = [
      BIKE_IMAGES.back,
      "/Car/car-back.webp",
      "/Auto.png",
    ]

    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }

  const getLngLat = (location) => {
    if (!location) return null

    if (location.lat && location.lng) {
      return [Number(location.lng), Number(location.lat)]
    }

    if (location.type === "Point" && location.coordinates?.length === 2) {
      return [Number(location.coordinates[0]), Number(location.coordinates[1])]
    }

    return null
  }

  const isValidLngLat = (lngLat) => {
    if (!lngLat) return false

    const lng = Number(lngLat[0])
    const lat = Number(lngLat[1])

    return (
      !isNaN(lng) &&
      !isNaN(lat) &&
      lng >= -180 &&
      lng <= 180 &&
      lat >= -90 &&
      lat <= 90
    )
  }

  const removePickupMarker = () => {
    if (!pickupMarkerRef.current) return

    pickupMarkerRef.current.remove()
    pickupMarkerRef.current = null
  }

  const clearRoute = (map) => {
    if (!map) return

    if (map.getLayer("route-line")) {
      map.removeLayer("route-line")
    }

    if (map.getSource("route-source")) {
      map.removeSource("route-source")
    }
  }

  const getPointDistance = (point, basePoint) => {
    return Math.abs(point[0] - basePoint[0]) + Math.abs(point[1] - basePoint[1])
  }

  const formatRouteCoordinates = (coordinates) => {
    if (!Array.isArray(coordinates)) return []

    const finalCoordinates = Array.isArray(coordinates[0]?.[0])
      ? coordinates.flat()
      : coordinates

    const cleanedCoordinates = finalCoordinates
      .filter((item) => Array.isArray(item) && item.length >= 2)
      .map((item) => [Number(item[0]), Number(item[1])])
      .filter(([a, b]) => !isNaN(a) && !isNaN(b))

    if (cleanedCoordinates.length < 2) return []

    const basePoints = [[position.lng, position.lat]]

    const pickupLngLat = getLngLat(pickup)

    if (pickupLngLat) {
      basePoints.push(pickupLngLat)
    }

    let normalScore = 0
    let swappedScore = 0

    cleanedCoordinates.slice(0, 8).forEach((point) => {
      const normalPoint = [point[0], point[1]]
      const swappedPoint = [point[1], point[0]]

      basePoints.forEach((basePoint) => {
        normalScore += getPointDistance(normalPoint, basePoint)
        swappedScore += getPointDistance(swappedPoint, basePoint)
      })
    })

    const shouldSwap = swappedScore < normalScore

    return cleanedCoordinates
      .map((point) => {
        if (shouldSwap) {
          return [point[1], point[0]]
        }

        return [point[0], point[1]]
      })
      .filter(isValidLngLat)
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

    if (route.length < 2) {
      const pickupLngLat = getLngLat(pickup)

      if (!pickupLngLat) return 0

      return getBearingBetweenPoints([position.lng, position.lat], pickupLngLat)
    }

    const captainLngLat = [position.lng, position.lat]
    const pickupLngLat = getLngLat(pickup)

    let nearestIndex = 0
    let minDistance = Infinity

    route.forEach((point, index) => {
      const distance = getPointDistance(point, captainLngLat)

      if (distance < minDistance) {
        minDistance = distance
        nearestIndex = index
      }
    })

    const currentPoint = route[nearestIndex]

    const forwardPoint =
      route[nearestIndex + 8] ||
      route[nearestIndex + 7] ||
      route[nearestIndex + 6] ||
      route[nearestIndex + 5] ||
      route[nearestIndex + 4] ||
      route[nearestIndex + 3] ||
      route[nearestIndex + 2] ||
      route[nearestIndex + 1]

    const backwardPoint =
      route[nearestIndex - 8] ||
      route[nearestIndex - 7] ||
      route[nearestIndex - 6] ||
      route[nearestIndex - 5] ||
      route[nearestIndex - 4] ||
      route[nearestIndex - 3] ||
      route[nearestIndex - 2] ||
      route[nearestIndex - 1]

    let nextPoint = forwardPoint || backwardPoint

    if (pickupLngLat && forwardPoint && backwardPoint) {
      const forwardDistanceToPickup = getPointDistance(forwardPoint, pickupLngLat)
      const backwardDistanceToPickup = getPointDistance(backwardPoint, pickupLngLat)

      nextPoint =
        forwardDistanceToPickup < backwardDistanceToPickup
          ? forwardPoint
          : backwardPoint
    }

    if (!currentPoint || !nextPoint) return 0

    return getBearingBetweenPoints(currentPoint, nextPoint)
  }

  const addTransparentMissingImage = (map, id) => {
    if (id === undefined || id === null) return

    try {
      if (map.hasImage(id)) return

      map.addImage(id, {
        width: 1,
        height: 1,
        data: new Uint8Array([0, 0, 0, 0]),
      })
    } catch (error) {
      // ignore duplicate missing image error
    }
  }

  const handleMissingStyleImages = (map) => {
    addTransparentMissingImage(map, " ")

    map.on("styleimagemissing", (e) => {
      addTransparentMissingImage(map, e.id)
    })
  }

  const add3DBuildings = (map) => {
    const layers = map.getStyle()?.layers || []

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
          class="captain-vehicle-img"
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

    const image = markerElement.querySelector(".captain-vehicle-img")

    if (image) {
      image.onerror = () => {
        const fallbackIcon =
          vehicleType === "car"
            ? "🚗"
            : vehicleType === "auto"
              ? "🛺"
              : "🏍️"

        markerElement.innerHTML = `
          <div style="
            width: 58px;
            height: 58px;
            border-radius: 50%;
            background: white;
            box-shadow: 0 12px 30px rgba(0,0,0,0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 26px;
          ">
            ${fallbackIcon}
          </div>
        `
      }
    }

    captainMarkerRef.current = new maplibregl.Marker({
      element: markerElement,
      anchor: "center",
      rotationAlignment: "viewport",
      pitchAlignment: "viewport",
    })
      .setLngLat(lngLat)
      .addTo(map)
  }

  const updateCaptainMarkerStyle = () => {
    if (!mapRef.current) return

    if (!captainMarkerRef.current) {
      createCaptainMarker(mapRef.current, {
        lat: position.lat,
        lng: position.lng,
      })
    }

    if (!captainMarkerRef.current) return

    captainMarkerRef.current.setLngLat([position.lng, position.lat])

    const img = captainMarkerRef.current
      .getElement()
      .querySelector(".captain-vehicle-img")

    if (!img) return

    const vehicleImage = getVehicleImage()

    if (lastVehicleImageRef.current !== vehicleImage) {
      img.src = vehicleImage
      lastVehicleImageRef.current = vehicleImage
    }
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

  const syncPickupMarker = () => {
    if (!mapRef.current) return

    const pickupLngLat = getLngLat(pickup)

    if (!pickupLngLat) {
      removePickupMarker()
      return
    }

    if (!pickupMarkerRef.current) {
      createPickupMarker(mapRef.current, pickup)
    }

    if (!pickupMarkerRef.current) return

    pickupMarkerRef.current.setLngLat(pickupLngLat)
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

      if (map.getLayer("route-line")) {
        map.moveLayer("route-line")
      }

      if (map.getLayer("route-line")) {
        map.moveLayer("route-line")
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

  const getInitialProvider = () => {
    const blockedTill = Number(localStorage.getItem("maptilerBlockedTill") || 0)

    if (!mapTilerKey) return "free"

    if (Date.now() < blockedTill) {
      return "free"
    }

    return "maptiler"
  }

  const moveCameraToCaptain = ({ isFirstRealMove = false } = {}) => {
    if (!mapRef.current) return

    const cameraOptions = {
      center: [position.lng, position.lat],
      zoom: 17,
      pitch: 58,
      bearing: getNavigationBearing(),
      offset: [0, 120],
      essential: true,
    }

    if (isFirstRealMove) {
      mapRef.current.flyTo({
        ...cameraOptions,
        duration: 2600,
        speed: 0.55,
        curve: 1.6,
      })

      return
    }

    mapRef.current.easeTo({
      ...cameraOptions,
      duration: 900,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })
  }

  useEffect(() => {
    preloadVehicleImages()
  }, [])

  useEffect(() => {
    const captainLngLat = getLngLat(currentLocation)

    if (!captainLngLat) return

    realLocationFoundRef.current = true

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

        realLocationFoundRef.current = true

        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      },
      (err) => {

      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    )
  }, [])

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    const MAP_STYLES = {
      // Primary map style.
      // This uses your MapTiler key and gives a more polished modern map.
      maptiler: `https://api.maptiler.com/maps/streets-v2/style.json?key=${mapTilerKey}`,

      // Backup free map style.
      // If MapTiler key is missing, limit is reached, or API gives 401/403/429,
      // we automatically switch to this OpenFreeMap style.
      free: "https://tiles.openfreemap.org/styles/liberty",
    }

    const createMap = (provider) => {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: MAP_STYLES[provider],
        center: [position.lng, position.lat],
        zoom: 17,
        pitch: 58,
        bearing: getNavigationBearing(),
        dragRotate: false,
        touchPitch: false,
        antialias: true,
        attributionControl: false,
      })

      mapRef.current = map

      map.dragRotate.disable()
      map.touchZoomRotate.disableRotation()

      handleMissingStyleImages(map)

      map.on("load", () => {
        isMapLoadedRef.current = true

        add3DBuildings(map)
        updateCaptainMarkerStyle()
        syncPickupMarker()
        drawRoute(map, routeCoordinatesRef.current)
      })

      map.on("error", (e) => {
        const message = e?.error?.message || ""

        const shouldFallback =
          provider === "maptiler" &&
          !fallbackDoneRef.current &&
          (
            message.includes("401") ||
            message.includes("403") ||
            message.includes("429") ||
            message.toLowerCase().includes("quota") ||
            message.toLowerCase().includes("limit") ||
            message.toLowerCase().includes("key") ||
            message.toLowerCase().includes("unauthorized")
          )

        if (!shouldFallback) return

        fallbackDoneRef.current = true

        // MapTiler failed, so block MapTiler for 24 hours.
        // This avoids repeated failed requests on every reload.
        localStorage.setItem(
          "maptilerBlockedTill",
          String(Date.now() + 24 * 60 * 60 * 1000)
        )

        isMapLoadedRef.current = false

        map.remove()
        mapRef.current = null
        captainMarkerRef.current = null
        pickupMarkerRef.current = null

        createMap("free")
      })
    }

    createMap(getInitialProvider())

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        captainMarkerRef.current = null
        pickupMarkerRef.current = null
        isMapLoadedRef.current = false
      }
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    mapRef.current.flyTo({
      center: [position.lng, position.lat],
      zoom: 17,
      pitch: 60,
      bearing: getNavigationBearing(),
      offset: [0, 120],
      speed: 1.2,
      curve: 1,
    })

    updateCaptainMarkerStyle()
  }, [position])

  useEffect(() => {
    if (!mapRef.current) return

    syncPickupMarker()
    updateCaptainMarkerStyle()
  }, [pickup])

  useEffect(() => {
    updateCaptainMarkerStyle()
  }, [vehicleType])

  useEffect(() => {
    if (!mapRef.current) return

    const map = mapRef.current

    const updateRouteOnMap = () => {
      drawRoute(map, routeCoordinatesRef.current)

      if (firstLocationFlyDoneRef.current) {
        moveCameraToCaptain()
      }

      updateCaptainMarkerStyle()
      syncPickupMarker()
    }

    if (map.isStyleLoaded()) {
      updateRouteOnMap()
    } else {
      map.once("load", updateRouteOnMap)
    }
  }, [routeCoordinates])

  return <div ref={mapContainer} className="w-full h-full" />
}

export default Map2