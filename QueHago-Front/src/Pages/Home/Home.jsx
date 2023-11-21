import  { React, useEffect, useState } from 'react'
import { getAllEvents } from '../../Services/eventService'
import { Button } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { Link } from 'react-router-dom'

const Home = () => {

const [event, setEvent] = useState([])

const getEvents = async() => {
  const data = await getAllEvents()
  setEvent(data)
}

useEffect(() => {
  getEvents()
},[])


  return (
    <>
     <Link to={'/login'}><Button sx={{backgroundColor: green[600]}} color="success">
              Login
            </Button></Link>
            {event.map((em, i) => (<><h1 key={i}>{em.title}</h1><img src={em.image}></img></>))}
            
            <Link to={'/signup'}><Button sx={{backgroundColor: red[600]}} color="success">
              SignUp
            </Button></Link>
     
     
    </>
  )
}

export default Home
