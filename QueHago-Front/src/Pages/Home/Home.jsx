import './Home.css'
import  { React, useEffect, useState } from 'react'
import { getAllEvents } from '../../Services/eventService'
import { Button } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import { getProfile } from '../../Services/accountService'

const Home = () => {

const [event, setEvent] = useState([])
const [photo, setPhoto] = useState()

const getPhoto = async () => {
  const {data} = await getProfile()
  console.log(data)
  setPhoto(data.image)
  return data
}

const getEvents = async() => {
  const data = await getAllEvents()
  setEvent(data)
}

useEffect(() => {
  getEvents(),
  getPhoto()
},[])


  return (
    <>
    <h1>FOTO DE PERFIL</h1>
    <div>
      Profile 
      <img className='profilePhoto' src={photo}></img>
    </div>
     <Link to={'/login'}><Button sx={{backgroundColor: green[600]}} color="success">
              Login
            </Button></Link>
            {event.map((em, i) => (<><h1 key={em}>{em.title}</h1><img key={i} src={em.image}></img></>))}
            
            <Link to={'/signup'}><Button sx={{backgroundColor: red[600]}} color="success">
              SignUp
            </Button></Link>

     
    </>
  )
}

export default Home
