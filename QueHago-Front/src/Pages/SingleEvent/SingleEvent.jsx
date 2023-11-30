import { Card } from "@mui/material"
import { React, useEffect, useState } from "react"
import "./SingleEvent.css"
import { useParams } from "react-router-dom"
import { getOneEvent } from "../../Services/eventService"
import Map from "../../Components/Map/Map"
import EventMap from "../../Components/Map/EventMap/EventMap"
import dayjs from 'dayjs'
import 'dayjs/locale/es'; 
dayjs.locale('es')

const SingleEvent = () => {
  const { eventId } = useParams()
  const [event, setEvent] = useState({})
  const [latitude, setLatitude] = useState(28.141401524287414)
  const [longitude,setLongitude] = useState(-15.43008879603786)


  const date = dayjs(event.date)
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  const getEvent = async () => {
    const data = await getOneEvent(eventId)
    setEvent(data)
  }

  useEffect(() => {
    getEvent()
  }, [])    

  return (
    <div className="singleEventContainer">
      <Card
        sx={{
          backgroundColor: "black",
          border:'2px solid white',
          width: "80vw",
          height: "80vh",
          marginTop : '5vh',
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
          borderRadius: "12px",
          textAlign: "center",
          overflow: "hidden",
          color:'white'
        }}
      > 
      <div className="titleImg">
        {event && <h1>{event.title}</h1>}
        <img className="singleEventImage" src={event && event.image === null ? "https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg" : event.image}></img>
      </div>
      <div className= {event.latitude === null || event.longitude === null ? "infoContainer" : "infoContainerWithMap"}>
      <h2>¿Dónde es la fiesta? : {event.address}</h2>
      <h2>¿Cuántas salas tiene? : {event.rooms}</h2>
      <h2>¿Cuál es la edad mínima? : {event.minimumAge}</h2>
      <h2> ¿Cuando podré ir a partir la pana? : <br></br><br></br>  {capitalize(date.format("dddd , D [de] MMMM [de] YYYY", event.date))}</h2>
      <h2>¿Qué generos de música escucharé? : <br></br><br></br>{event.genre}</h2>
      </div>
      
      <div className={event.latitude ? "map" : "none"}>{event?.latitude && <EventMap pos={{lat:event.latitude, lng:event.longitude}}/>}</div>
      </Card>
    </div>
  )
}
// GENRE ADDRESS DATE ROOMS MINIMUMAGE
export default SingleEvent
