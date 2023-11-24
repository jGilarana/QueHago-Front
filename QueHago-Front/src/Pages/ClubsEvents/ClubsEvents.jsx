import React, { useEffect, useState } from 'react'
import ClubsEventsComponent from './ComponenClubsEvent/ClubsEventsComponent.jsx'
import { getClubsEvents } from '../../Services/clubService.js'

const  ClubsEvents = () => {

  const [events, setEvents] = useState()

  const seeEvents = async () => {
    const events = await getClubsEvents()
    setEvents(events)
  }

useEffect(() => {
  seeEvents()
}, [])


  return (

<>
<ClubsEventsComponent/>
</>
   
    
  )
}

export default ClubsEvents