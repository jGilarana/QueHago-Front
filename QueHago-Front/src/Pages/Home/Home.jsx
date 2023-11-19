import  { React, useEffect, useState } from 'react'
import { getAllEvents } from '../../Services/eventService'

const Home = () => {

const [event, setEvent] = useState()

const getEvents = async() => {

  const data = await getAllEvents()
  console.log(data)
  setEvent(data)
}

useEffect(() => {
  getEvents()
},[])


  return (
    <>
      <h1>Hola, soy el precioso Home</h1>
    </>
  )
}

export default Home
