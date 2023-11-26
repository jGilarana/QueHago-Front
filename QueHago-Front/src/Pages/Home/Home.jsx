import "./Home.css"
import { React, useEffect, useState } from "react"
import { getAllEvents } from "../../Services/eventService"
import { Box, Button } from "@mui/material"
import { blue, green, red } from "@mui/material/colors"
import { Link } from "react-router-dom"
import { getProfile, postPhoto } from "../../Services/accountService"
import UploadWidget from "../../Components/UploadWidget/UploadWidget.jsx"
import HomeComponent from "./HomeComponent/HomeComponent.jsx"
import Map from "../../Components/Map/Map.jsx"

const Home = () => {
  const [event, setEvent] = useState([])
  const [filteredEvent, setFilteredEvent] = useState({})

  const getEvents = async () => {
    const data = await getAllEvents()
    setEvent(data)
  }

  const filterEvent = async () => {
    const data = await getAllEvents()
    const filteredData = data.filter((event) => event.genre === ("Concierto"))
    setFilteredEvent(filteredData)
    setEvent(data)
  }

  
  useEffect(() => {
    getEvents()
  }, [])

  return (
    <div className="home">
          <Map/>
      <HomeComponent event={event} />
    </div>
  )
}

export default Home
