import React, { useEffect, useState } from 'react'
import './Map.css'
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = () => {

    const [myPos, setMyPos] = useState([28.141401524287414, -15.43008879603786])


    const getMyPos = () => {
         navigator.geolocation.getCurrentPosition((position) => {
        setMyPos({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }
   
    useEffect(() => {
      getMyPos()
    }, [])

  return (
    <div className='map'>
         <MapContainer center={myPos && myPos} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={myPos && myPos}>
        
      </Marker>
    </MapContainer>
    </div>
   
  )
}

export default Map