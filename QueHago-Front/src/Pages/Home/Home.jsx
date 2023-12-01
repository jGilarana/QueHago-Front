import "./Home.css"
import { React, useEffect, useState } from "react"
import { getAllEvents } from "../../Services/eventService"
import { Box, Button } from "@mui/material"
import { blue, green, red, yellow } from "@mui/material/colors"
import { Link, useNavigate } from "react-router-dom"
import { getProfile, postPhoto } from "../../Services/accountService"
import UploadWidget from "../../Components/UploadWidget/UploadWidget.jsx"
import HomeComponent from "./HomeComponent/HomeComponent.jsx"
import Map from "../../Components/Map/Map.jsx"
import dayjs from "dayjs"


const Home = () => {

  const navigate = useNavigate()
  const [genre,setGenre] = useState('')
  const [event, setEvent] = useState([])
  const [filteredEvent, setFilteredEvent] = useState({})

  const getAllTheEvents = async () => {
    const data = await getAllEvents()
    setEvent(data.sort((a, b) => dayjs(b.date).diff(dayjs(a.date))))
  }
 
  const handleChangeGenre= (e) => {
    setGenre(e.target.value);
  };

  const getEvents = async () => {
    const data = await getAllEvents()
    const filteredData = data.sort((a, b) => dayjs(a.date).diff(dayjs(b.date))).filter(em => dayjs(em.date).isAfter(dayjs(), 'day'))
    setEvent(filteredData)
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

{/* <label>
            AQUI PONES EL TITULO DE LO QUE SE VA A BUSCAR POR EJEMPLO
            <select value={genre} onChange={handleChangeGenre}>
              <option value="">eurobeat</option>
              <option value="">tecno</option>
              <option value="">house</option>
</select>
</label> */}


<Button 
          sx={{ display : localStorage.getItem('token') ? 'initial' : 'none', border:'2px solid white',borderRadius:'12px', height: '5vh', width: '10vw', fontSize:'12px', position:'absolute', top:'11vh', right:'33vw',
          ':hover' : {
            backgroundColor: yellow[600],
            color: 'black'}        
        }}
          onClick={() => getEvents()}>MOSTRAR EVENTOS NO OCURRIDOS</Button>
          <Button 
          sx={{display : localStorage.getItem('token') ? 'initial' : 'none', border:'2px solid white',borderRadius:'12px', height: '5vh', width: '10vw',fontSize:'12px', position:'absolute', top:'11vh', right:'22vw',
          ':hover' : {
            backgroundColor: yellow[600],
            color: 'black'}        
        }}
          onClick={() => getAllTheEvents()}>MOSTRAR TODOS LOS EVENTOS</Button>
          <Button 
          sx={{display: localStorage.getItem('role') ? 'initial' : 'none',border:'2px solid red',borderRadius:'12px', height: '5vh', width: '10vw', position:'absolute', top:'11vh', right:'10vw',
          ':hover' : {
            backgroundColor: 'red',
            color: 'white'}        
        }}
          onClick={() => navigate('/favorites')}>IR A FAVORITOS</Button>
          <Map/>
      <HomeComponent event={event} />
    </div>
  )
}

export default Home
