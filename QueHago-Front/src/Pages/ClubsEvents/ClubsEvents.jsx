import React, { useEffect, useState } from 'react'
import ClubsEventsComponent from './ComponenClubsEvent/ClubsEventsComponent.jsx'
import { createClubsEvents, getClubsEvents } from '../../Services/clubService.js'

const  ClubsEvents = () => {

  const [events, setEvents] = useState([])

  const [title, setTitle] = useState()
  const [genre, setGenre] = useState()
  const [address, setAddress] = useState()
  const [rooms, setRooms] = useState()
  const [date, setDate] = useState()
  const [minimumAge, setMinimumAge] = useState()
  const [image, setImage] = useState()
  

  const seeEvents = async () => {
    const events = await getClubsEvents()
    setEvents(events)
  }

  const postEvents = async() =>  {
    const data = await createClubsEvents({title, genre, address, rooms, date, minimumAge, image})
    console.log(data)
  }

useEffect(() => {
  seeEvents()
}, [])


  return (

<>
<ClubsEventsComponent setTitle={setTitle} setGenre={setGenre} setAddress={setAddress} setRooms={setRooms} setDate={setDate} setMinimumAge={setMinimumAge} setImage={setImage} updateEvent={postEvents} events={events}/>
</>
  )
}

export default ClubsEvents