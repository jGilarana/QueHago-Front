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
  const [today, setToday] = useState(dayjs())
  const [openNotoken, setOpenNotoken] = useState(false);
  const [openDay,setOpenDay] = useState(false)
  const [hideButton, setHideButton] = useState(true)
 


  const now = dayjs()
 // console.log(now.format('YYYY-MM-DD'))
  const getAllTheEvents = async () => {
    const data = await getAllEvents()
    setEvent(data.sort((a, b) => dayjs(b.date).diff(dayjs(a.date))))
    setHideButton(true)
  }
 
  const handleChangeGenre= (e) => {
    setGenre(e.target.value);
  };

  const getEvents = async () => {
    const data = await getAllEvents()
    const filteredData = data.sort((a, b) => dayjs(a.date).diff(dayjs(b.date))).filter(em => dayjs(em.date).isAfter(dayjs(), 'day'))
    setEvent(filteredData)
    setHideButton(false)
  }

 
 



  const filterEvent = async () => {
/*     var now = dayjs()
    console.log(now)
    console.log(today)
    if (today != now) {
        resetToday()
    } */
    const data = await getAllEvents()
    const filteredData = data.filter(em => dayjs(em.date).isSame(dayjs(today), 'day'));
    setEvent(filteredData)
  }

   const addDay = () => {  
    setOpenDay(true)
    setToday((today) => today.add(1, 'day'))
   
  }

  const oneDayLess = () => {  
    setOpenDay(true)
    setToday((today) => today.add(-1, 'day'))
   
  }


  const resetToday = () => {  
    setToday(dayjs())
  }


useEffect(() => {
   filterEvent()
  },[today])


  useEffect(() => {
   event && getEvents()
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
          sx={{ display : localStorage.getItem('token') ? 'initial' : 'none', backgroundColor:hideButton === false ? 'yellow' : 'transparent', border:'2px solid white',borderRadius:'12px', height: '5vh', width: '10vw', fontSize:'12px', position:'absolute', top:'11vh', right:'33vw',
          ':hover' : {
            backgroundColor: yellow[600],
            color: 'black'}        
        }}
          onClick={() => getEvents()}>MOSTRAR EVENTOS NO OCURRIDOS</Button>
          <Button 
          sx={{display : localStorage.getItem('token') ? 'initial' : 'none', backgroundColor:hideButton === true ? 'yellow' : 'transparent',border:'2px solid white',borderRadius:'12px', height: '5vh', width: '10vw',fontSize:'12px', position:'absolute', top:'11vh', right:'22vw',
          ':hover' : {
            backgroundColor: yellow[600],
            color: 'black'}        
        }}
          onClick={() => getAllTheEvents()}>MOSTRAR TODOS LOS EVENTOS</Button>
          <Button 
          sx={{display: localStorage.getItem('role') ? 'initial' : 'none',  border:'2px solid red',borderRadius:'12px', height: '5vh', width: '10vw', position:'absolute', top:'11vh', right:'10vw',
          ':hover' : {
            backgroundColor: 'red',
            color: 'white'}        
        }}
          onClick={() => navigate('/favorites')}>IR A FAVORITOS</Button>
          <Button 
          sx={{display: localStorage.getItem('token') ? 'initial' : 'none', border:'2px solid red',borderRadius:'12px', height: '5vh', width: '10vw', position:'absolute', top:'11vh', left:'40px',
          ':hover' : {
            backgroundColor: 'red',
            color: 'white'}        
        }}
          onClick={() => oneDayLess()}>DIA ANTERIOR</Button>
          <Button 
            sx={{display: localStorage.getItem('token') ? 'initial' : 'none',  border:'2px solid red',borderRadius:'12px', height: '5vh', width: '10vw', position:'absolute', top:'11vh', left:'16vw',
            ':hover' : {
              backgroundColor: 'red',
              color: 'white'}        
            }}
            onClick={() => resetToday()}
          >MOSTRAR LOS EVENTOS DE HOY</Button>
          <Button 
          sx={{display: localStorage.getItem('token') ? 'initial' : 'none',border:'2px solid red',borderRadius:'12px', height: '5vh', width: '10vw', position:'absolute', top:'11vh', left:'30vw',
          ':hover' : {
            backgroundColor: 'red',
            color: 'white'}        
        }}
          onClick={() => addDay()}>SIGUIENTE DIA</Button>
          
          <Map/>
      <HomeComponent event={event} dayWeek={openDay === true ? today.format('dddd, DD/MM/YYYY') : null} />
    </div>
  )
}

export default Home
