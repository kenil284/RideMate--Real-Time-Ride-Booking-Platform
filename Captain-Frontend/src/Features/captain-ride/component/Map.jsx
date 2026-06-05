import React, { useEffect, useMemo, useState } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"

const RecenterMap = ({ pickupPosition, destinationPosition, routeCoordinates }) => {
  const map = useMap()

  useEffect(() => {
    if (routeCoordinates.length > 0) {
      map.fitBounds(routeCoordinates, {
        padding: [60, 60],
      })
      return
    }

    if (pickupPosition && destinationPosition) {
      map.fitBounds([pickupPosition, destinationPosition], {
        padding: [60, 60],
      })
      return
    }

    if (pickupPosition) {
      map.setView(pickupPosition, 15)
      return
    }
  }, [pickupPosition, destinationPosition, routeCoordinates, map])

  return null
}

const Map = ({ pickup, destination, routeCoordinates = [] }) => {
  console.log(
    "Map pickup:",
    pickup,
    "destination:",
    destination,
    "routeCoordinates:",
    routeCoordinates
  )

  const defaultPosition = [21.1702, 72.8311]
  const [position, setPosition] = useState(defaultPosition)

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude])
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

  const pickupPosition =
    pickup?.lat != null && pickup?.lng != null
      ? [Number(pickup.lat), Number(pickup.lng)]
      : null

  const destinationPosition =
    destination?.lat != null && destination?.lng != null
      ? [Number(destination.lat), Number(destination.lng)]
      : null

  const formattedRouteCoordinates = useMemo(() => {
    if (!Array.isArray(routeCoordinates)) {
      return []
    }

    return routeCoordinates
      .map((coord) => {
        if (Array.isArray(coord)) {
          return [Number(coord[0]), Number(coord[1])]
        }

        if (coord?.lat != null && coord?.lng != null) {
          return [Number(coord.lat), Number(coord.lng)]
        }

        return null
      })
      .filter((coord) => {
        if (!coord) return false

        const [lat, lng] = coord

        return (
          !isNaN(lat) &&
          !isNaN(lng) &&
          lat >= -90 &&
          lat <= 90 &&
          lng >= -180 &&
          lng <= 180
        )
      })
  }, [routeCoordinates])

  const mapCenter = pickupPosition || position

  return (
    <MapContainer
      center={mapCenter}
      zoom={15}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <RecenterMap
        pickupPosition={pickupPosition}
        destinationPosition={destinationPosition}
        routeCoordinates={formattedRouteCoordinates}
      />

      {formattedRouteCoordinates.length > 0 && (
        <Polyline
          positions={formattedRouteCoordinates}
          pathOptions={{
            color: "black",
            weight: 5,
            opacity: 0.85,
          }}
        />
      )}

      {pickupPosition && (
        <Marker position={pickupPosition}>
          <Popup>Pickup</Popup>
        </Marker>
      )}

      {destinationPosition && (
        <Marker position={destinationPosition}>
          <Popup>Destination</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default Map