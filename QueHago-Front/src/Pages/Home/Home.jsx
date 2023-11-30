import "./Home.css"
import { React, useEffect, useState } from "react"
import { getAllEvents } from "../../Services/eventService"
import { Box, Button } from "@mui/material"
import { blue, green, red } from "@mui/material/colors"
import { Link, useNavigate } from "react-router-dom"
import { getProfile, postPhoto } from "../../Services/accountService"
import UploadWidget from "../../Components/UploadWidget/UploadWidget.jsx"
import HomeComponent from "./HomeComponent/HomeComponent.jsx"
import Map from "../../Components/Map/Map.jsx"
import { getUsersFavorites, userSetsFavorite } from "../../Services/favoriteService.js"

const Home = () => {

  const navigate = useNavigate()
  const [genre,setGenre] = useState('')
  const [event, setEvent] = useState([])
  const [filteredEvent, setFilteredEvent] = useState({})
 
  const handleChangeGenre= (e) => {
    setGenre(e.target.value);
  };

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
  }, [event])

  return (
    <div className="home">

{/* <label>
            AQUI PONES EL TITULO DE LO QUE SE VA A BUSCAR POR EJEMPLO
            <select value={genre} onChange={handleChangeGenre}>
              <option value="">eurobeat</option>
              <option value="">tecno</option>
              <option value="">house</option>
</select>
</label> */}
          <Button 
          sx={{display: localStorage.getItem('role') ? 'initial' : 'none', backgroundColor: red[600], height: '5vh', width: '10vw', position:'absolute', top:'11vh', right:'10vw' }}
          onClick={() => navigate('/favorites')}>Go to Favorites</Button>
          <Map/>
      <HomeComponent event={event} />
    </div>
  )
}

export default Home
