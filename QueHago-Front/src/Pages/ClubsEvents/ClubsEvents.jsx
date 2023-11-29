import React, { useEffect, useState } from 'react'
import ClubsEventsComponent from './ComponenClubsEvent/ClubsEventsComponent.jsx'
import { createClubsEvents, getClubsEvents } from '../../Services/clubService.js'
import { updateClubsEvent } from '../../Services/eventService.js'

const  ClubsEvents = () => {

  const [events, setEvents] = useState([])
  const [title, setTitle] = useState()
  const [genre, setGenre] = useState()
  const [address, setAddress] = useState()
  const [rooms, setRooms] = useState()
  const [date, setDate] = useState()
  const [minimumAge, setMinimumAge] = useState()
  const [image, setImage] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude,setLongitude] = useState()
  
  const updateEvent = async(id) => {
    const response = await updateClubsEvent(id, {title, genre, address, latitude, longitude, rooms, date, minimumAge, image})
  }
  const seeEvents = async () => {
    if (localStorage.getItem('subscriptionStatus') === null) {
      console.log('You are not logged in')
      return null
    } else {
    const events = await getClubsEvents()
    setEvents(events)
    }
  }

  const postEvents = async() =>  {
    const data = await createClubsEvents({title, genre, address, latitude, longitude, rooms, date, minimumAge, image})
    console.log(data)
  }

useEffect(() => {
  seeEvents()
}, [])


  return (

<>
<ClubsEventsComponent setTitle={setTitle} setGenre={setGenre} setAddress={setAddress} setLatitude={setLatitude} setLongitude={setLongitude} setRooms={setRooms} setDate={setDate} setMinimumAge={setMinimumAge} setImage={setImage} createEvent={postEvents} updateEvent={updateEvent} events={events}/>
</>
  )
}

export default ClubsEvents