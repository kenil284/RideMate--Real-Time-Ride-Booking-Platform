import React, { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

const BIKE_IMAGES = {
  right: "/Bike/bike-right.webp",
  left: "/Bike/bike-left.webp",
  front: "/Bike/bike-front.webp",
  back: "/Bike/bike-back.webp",
}

const VEHICLE_IMAGES = {
  car: "/Home_Page/car_3d.png",
  auto: "/Home_Page/Auto.png",
}

const Map2 = ({
  routeCoordinates = [],
  currentLocation = null,
  pickup = null,
  vehicleType = "bike",
  showVehicleMarker = true,
}) => {
  const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY

  const mapContainer = useRef(null)
  const mapRef = useRef(null)

  const vehicleMarkerRef = useRef(null)
  const userMarkerRef = useRef(null)
  const targetMarkerRef = useRef(null)

  const routeCoordinatesRef = useRef([])
  const lastVehicleImageRef = useRef("")
  const routeCanvasRef = useRef(null)

  const defaultPosition = {
    lat: 21.1702,
    lng: 72.8311,
  }

  const [position, setPosition] = useState(defaultPosition)

  useEffect(() => {
    routeCoordinatesRef.current = routeCoordinates || []
  }, [routeCoordinates])

  const getFinalVehicleType = () => {
    return vehicleType?.toLowerCase() || "bike"
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

  const getPointScore = (point, basePoints) => {
    if (!basePoints.length) return 0

    let minDistance = Infinity

    basePoints.forEach((base) => {
      const distance =
        Math.abs(point[0] - base[0]) + Math.abs(point[1] - base[1])

      if (distance < minDistance) {
        minDistance = distance
      }
    })

    return minDistance
  }

  const formatRouteCoordinates = (coordinates) => {
    if (!Array.isArray(coordinates)) return []

    const flatCoordinates = Array.isArray(coordinates[0]?.[0])
      ? coordinates.flat()
      : coordinates

    const cleanCoordinates = flatCoordinates
      .filter((item) => Array.isArray(item) && item.length >= 2)
      .map((item) => [Number(item[0]), Number(item[1])])
      .filter((item) => !isNaN(item[0]) && !isNaN(item[1]))

    if (cleanCoordinates.length < 2) return []

    const basePoints = []

    basePoints.push([position.lng, position.lat])

    const targetLngLat = getLngLat(pickup)

    if (targetLngLat) {
      basePoints.push(targetLngLat)
    }

    let normalScore = 0
    let swappedScore = 0

    cleanCoordinates.slice(0, 8).forEach((point) => {
      const normalPoint = [point[0], point[1]]
      const swappedPoint = [point[1], point[0]]

      normalScore += getPointScore(normalPoint, basePoints)
      swappedScore += getPointScore(swappedPoint, basePoints)
    })

    const shouldSwap = swappedScore < normalScore

    return cleanCoordinates
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
      const targetLngLat = getLngLat(pickup)

      if (!targetLngLat) return 0

      return getBearingBetweenPoints([position.lng, position.lat], targetLngLat)
    }

    const currentLngLat = [position.lng, position.lat]
    const targetLngLat = getLngLat(pickup)

    let nearestIndex = 0
    let minDistance = Infinity

    route.forEach((point, index) => {
      const distance =
        Math.abs(point[0] - currentLngLat[0]) +
        Math.abs(point[1] - currentLngLat[1])

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

    if (targetLngLat && forwardPoint && backwardPoint) {
      const forwardDistance =
        Math.abs(forwardPoint[0] - targetLngLat[0]) +
        Math.abs(forwardPoint[1] - targetLngLat[1])

      const backwardDistance =
        Math.abs(backwardPoint[0] - targetLngLat[0]) +
        Math.abs(backwardPoint[1] - targetLngLat[1])

      nextPoint = forwardDistance < backwardDistance ? forwardPoint : backwardPoint
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
    const type = getFinalVehicleType()

    if (type === "car") return VEHICLE_IMAGES.car
    if (type === "auto") return VEHICLE_IMAGES.auto

    return getBikeImageByBearing()
  }

  const preloadImages = () => {
    const images = [
      ...Object.values(BIKE_IMAGES),
      VEHICLE_IMAGES.car,
      VEHICLE_IMAGES.auto,
    ]

    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
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
      // ignore duplicate or invalid style image
    }
  }

  const handleMissingStyleImages = (map) => {
    addTransparentMissingImage(map, " ")

    map.on("styleimagemissing", (e) => {
      addTransparentMissingImage(map, e.id)
    })
  }

  const add3DBuildings = (map) => {
    const style = map.getStyle()

    if (!style?.layers) return

    const labelLayerId = style.layers.find(
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

  const removeTargetMarker = () => {
    if (!targetMarkerRef.current) return

    targetMarkerRef.current.remove()
    targetMarkerRef.current = null
  }

  const clearRouteCanvas = () => {
    const canvas = routeCanvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const createVehicleMarker = (map, location) => {
    const lngLat = getLngLat(location)

    if (!lngLat) return

    const vehicleImage = getVehicleImage()
    const markerElement = document.createElement("div")

    markerElement.style.zIndex = "30"

    lastVehicleImageRef.current = vehicleImage

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
          class="vehicle-marker-img"
          src="${vehicleImage}"
          draggable="false"
          style="
            width: 80px;
            height: 80px;
            object-fit: contain;
            transition: opacity 0.2s ease;
          "
        />
      </div>
    `

    const image = markerElement.querySelector(".vehicle-marker-img")

    if (image) {
      image.onerror = () => {
        const type = getFinalVehicleType()

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
            ${type === "car" ? "🚗" : type === "auto" ? "🛺" : "🏍️"}
          </div>
        `
      }
    }

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

    markerElement.style.zIndex = "30"

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

  const createTargetMarker = (map, location) => {
    const lngLat = getLngLat(location)

    if (!lngLat) return

    const markerElement = document.createElement("div")

    markerElement.style.zIndex = "25"

    markerElement.innerHTML = `
      <div style="
        width: 44px;
        height: 44px;
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

    targetMarkerRef.current = new maplibregl.Marker({
      element: markerElement,
      anchor: "center",
    })
      .setLngLat(lngLat)
      .addTo(map)
  }

  const updateVehicleMarker = () => {
    if (!mapRef.current) return

    if (!showVehicleMarker) {
      removeVehicleMarker()
      return
    }

    const lngLat = [position.lng, position.lat]

    if (!vehicleMarkerRef.current) {
      createVehicleMarker(mapRef.current, {
        lat: position.lat,
        lng: position.lng,
      })
    }

    if (!vehicleMarkerRef.current) return

    vehicleMarkerRef.current.setLngLat(lngLat)

    const img = vehicleMarkerRef.current
      .getElement()
      .querySelector(".vehicle-marker-img")

    if (!img) return

    const vehicleImage = getVehicleImage()

    if (lastVehicleImageRef.current !== vehicleImage) {
      img.src = vehicleImage
      lastVehicleImageRef.current = vehicleImage
    }
  }

  const updateUserMarker = () => {
    if (!mapRef.current) return

    if (showVehicleMarker) {
      removeUserMarker()
      return
    }

    const lngLat = [position.lng, position.lat]

    if (!userMarkerRef.current) {
      createUserMarker(mapRef.current, {
        lat: position.lat,
        lng: position.lng,
      })
    }

    if (!userMarkerRef.current) return

    userMarkerRef.current.setLngLat(lngLat)
  }

  const updateMainMarker = () => {
    if (showVehicleMarker) {
      removeUserMarker()
      updateVehicleMarker()
    } else {
      removeVehicleMarker()
      updateUserMarker()
    }
  }

  const updateTargetMarker = () => {
    if (!mapRef.current) return

    const targetLngLat = getLngLat(pickup)

    if (!targetLngLat) {
      removeTargetMarker()
      return
    }

    if (!targetMarkerRef.current) {
      createTargetMarker(mapRef.current, pickup)
    }

    if (!targetMarkerRef.current) return

    targetMarkerRef.current.setLngLat(targetLngLat)
  }

  const syncMarkers = () => {
    if (!mapRef.current) return

    updateMainMarker()
    updateTargetMarker()
  }

  const getRouteCanvas = (map) => {
    if (!map) return null

    const canvasContainer = map.getCanvasContainer()

    if (!canvasContainer) return null

    if (!routeCanvasRef.current) {
      const canvas = document.createElement("canvas")

      canvas.style.position = "absolute"
      canvas.style.top = "0"
      canvas.style.left = "0"
      canvas.style.width = "100%"
      canvas.style.height = "100%"
      canvas.style.pointerEvents = "none"
      canvas.style.background = "transparent"
      canvas.style.zIndex = "5"

      routeCanvasRef.current = canvas
    }

    if (routeCanvasRef.current.parentElement !== canvasContainer) {
      canvasContainer.appendChild(routeCanvasRef.current)
    }

    return routeCanvasRef.current
  }

  const fitMapToRoute = (map, finalRoute) => {
    if (!map || finalRoute.length < 2) return

    const bounds = new maplibregl.LngLatBounds()

    finalRoute.forEach((coord) => {
      bounds.extend(coord)
    })

    map.fitBounds(bounds, {
      padding: {
        top: 120,
        bottom: 260,
        left: 80,
        right: 80,
      },
      maxZoom: 17,
      duration: 700,
    })
  }

  const drawRouteCanvas = (map, coordinates = routeCoordinatesRef.current) => {
    if (!map) return

    const finalRoute = formatRouteCoordinates(coordinates)
    const canvas = getRouteCanvas(map)

    if (!canvas) return

    const mapCanvas = map.getCanvas()

    const width = mapCanvas.clientWidth
    const height = mapCanvas.clientHeight
    const dpr = window.devicePixelRatio || 1

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext("2d")

    if (!ctx) return

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, width, height)

    if (finalRoute.length < 2) return

    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    ctx.beginPath()

    finalRoute.forEach((coord, index) => {
      const point = map.project(coord)

      if (index === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })

    ctx.strokeStyle = "rgba(255,255,255,0.9)"
    ctx.lineWidth = 6
    ctx.stroke()

    ctx.strokeStyle = "#111827"
    ctx.lineWidth = 3
    ctx.stroke()
  }

  const syncRouteCanvas = (map) => {
    if (!map) return

    drawRouteCanvas(map, routeCoordinatesRef.current)

    requestAnimationFrame(() => {
      drawRouteCanvas(map, routeCoordinatesRef.current)
    })

    setTimeout(() => {
      drawRouteCanvas(map, routeCoordinatesRef.current)
    }, 300)
  }

  useEffect(() => {
    preloadImages()
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

      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    )
  }, [])

  const getInitialProvider = () => {
    if (!mapTilerKey) {
      console.log("MapTiler key missing, using OpenFreeMap")
      return "free"
    }

    console.log("MapTiler key found, using MapTiler")
    return "maptiler"
  }

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    //If Maptiler Limit Rached then we Automatically swich

    const MAP_STYLES = {
      maptiler: `https://api.maptiler.com/maps/streets-v2/style.json?key=${mapTilerKey}`,
      free: "https://tiles.openfreemap.org/styles/liberty",
    }

    let fallbackDone = false

    const createMap = (provider) => {
      console.log("Creating map with provider:", provider)

      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: MAP_STYLES[provider],
        center: [position.lng, position.lat],
        zoom: showVehicleMarker ? 16.8 : 15.8,
        pitch: showVehicleMarker ? 42 : 30,
        bearing: 0,
        dragRotate: true,
        touchPitch: true,
        antialias: true,
        attributionControl: false,
      })

      mapRef.current = map

      setTimeout(() => {
        map.resize()
        syncRouteCanvas(map)
      }, 100)

      handleMissingStyleImages(map)

      map.on("load", () => {
        console.log("Map loaded with provider:", provider)

        map.resize()
        getRouteCanvas(map)
        add3DBuildings(map)
        syncMarkers()

        const finalRoute = formatRouteCoordinates(routeCoordinatesRef.current)

        if (finalRoute.length >= 2) {
          fitMapToRoute(map, finalRoute)
        }

        syncRouteCanvas(map)
      })

      map.on("error", (e) => {
        const message = e?.error?.message || ""

        console.log("Map error provider:", provider)
        console.log("Map error message:", message)

        const shouldFallback =
          provider === "maptiler" &&
          !fallbackDone &&
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

        console.log("Switching to OpenFreeMap because MapTiler failed:", message)

        fallbackDone = true

        map.remove()
        mapRef.current = null
        vehicleMarkerRef.current = null
        userMarkerRef.current = null
        targetMarkerRef.current = null
        routeCanvasRef.current = null

        createMap("free")
      })
    }

    createMap(getInitialProvider())

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        vehicleMarkerRef.current = null
        userMarkerRef.current = null
        targetMarkerRef.current = null
        routeCanvasRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    const bearing = showVehicleMarker ? getNavigationBearing() : 0

    mapRef.current.flyTo({
      center: [position.lng, position.lat],
      zoom: showVehicleMarker ? 17 : 15.8,
      pitch: showVehicleMarker ? 42 : 30,
      bearing,
      offset: showVehicleMarker ? [0, 90] : [0, 0],
      speed: 1.15,
      curve: 1,
    })

    updateMainMarker()
    syncRouteCanvas(mapRef.current)
  }, [position, showVehicleMarker])

  useEffect(() => {
    if (!mapRef.current) return

    updateMainMarker()
    syncRouteCanvas(mapRef.current)
  }, [vehicleType, showVehicleMarker, routeCoordinates])

  useEffect(() => {
    if (!mapRef.current) return

    updateTargetMarker()
  }, [pickup])

  useEffect(() => {
    if (!mapRef.current) return

    const map = mapRef.current

    routeCoordinatesRef.current = routeCoordinates || []

    const finalRoute = formatRouteCoordinates(routeCoordinatesRef.current)

    if (finalRoute.length >= 2) {
      fitMapToRoute(map, finalRoute)
    } else {
      clearRouteCanvas()
    }

    const redrawRoute = () => {
      drawRouteCanvas(map, routeCoordinatesRef.current)
    }

    redrawRoute()

    map.on("move", redrawRoute)
    map.on("resize", redrawRoute)

    setTimeout(redrawRoute, 300)
    setTimeout(redrawRoute, 700)

    return () => {
      map.off("move", redrawRoute)
      map.off("resize", redrawRoute)
    }
  }, [routeCoordinates])

  return <div ref={mapContainer} className="w-full h-full" />
}

export default Map2