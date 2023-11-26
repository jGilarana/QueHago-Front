import React, { useEffect, useState } from "react"
import "./Map.css"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Box } from "@mui/material"
import { blue } from "@mui/material/colors"

const Map = () => {
  const [myPos, setMyPos] = useState([28.141401524287414, -15.43008879603786])

  const getMyPos = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMyPos({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }

  useEffect(() => {
    getMyPos()
  }, [])

  return (
    <Box sx={{ width: "25vw", height: "35vh", backgroundColor: blue[300], display: "flex", justifyContent: "center", alignItems: "center", margin:'20px', zIndex:'1' }}>
      <MapContainer center={myPos && myPos} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={myPos && myPos} />
      </MapContainer>
    </Box>
  )
}

export default Map
