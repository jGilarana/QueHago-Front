import React, { useEffect, useState } from "react"
import "./EventMap.css"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Box } from "@mui/material"
import { blue } from "@mui/material/colors"

const EventMap = ({pos}) => {
  
  /* const getMyPos = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMyPos({
        lat: latitude,
        lng: longitude,
      })
    })
  } */

/*   useEffect(() => {
    getMyPos()
  }, []) */

  return (
   
      <MapContainer className="map" center={[pos.lat, pos.lng]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[pos.lat, pos.lng]} ><Popup><h4>My Position</h4></Popup></Marker>
      </MapContainer>
    
  )
}

export default EventMap
