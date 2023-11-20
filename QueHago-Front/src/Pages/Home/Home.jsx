import  { React, useEffect, useState } from 'react'
import { getAllEvents } from '../../Services/eventService'

const Home = () => {

const [event, setEvent] = useState([])

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
     {event.map((em, i) => (<h1 key={i}>{em.title}</h1>))}
    </>
  )
}

export default Home
