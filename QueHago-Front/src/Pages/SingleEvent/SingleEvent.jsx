import { Card, Divider } from "@mui/material"
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
    getEvent(), window.scrollTo(0, 0);
  }, [])    

  return (
    <div className="singleEventContainer">
      <Card
        sx={{
          background : 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(6,6,201,1) 34%)',
          width: "90vw",
          height: "80vh",
          minHeight:'70vh',
          maxHeight:'80vh',
          marginTop : '12vh',
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          overflow: "hidden",
          position: 'relative',
          border: "2px solid white",
          borderRadius: "12px",
          color: "white",
          transition: "0.5s",
        }}
      > 
      <div className="titleImg">
        {event && <h1>{event.title}</h1>}
        <img className="singleEventImage" src={event && event.image === null ? "https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg" : event.image}></img>
      </div>
      <div className={event.latitude === null || event.longitude === null ? "infoContainer" : "infoContainerWithMap"}>

      <div className={event.latitude === null || event.longitude === null ? 'infoText' : 'infoTextWithMap'}><h3>¿Dónde es la fiesta?  </h3> <h4>{event.address}</h4></div>
      <div className={event.latitude === null || event.longitude === null ? 'infoText' : 'infoTextWithMap'}><h3>¿Cuántas salas tiene? </h3> <h4> {event.rooms}</h4></div>
      <div className={event.latitude === null || event.longitude === null ? 'infoText' : 'infoTextWithMap'}><h3>¿Cuál es la edad mínima?  </h3> <h4>{event.minimumAge}</h4></div>
      <div className={event.latitude === null || event.longitude === null ? 'infoText' : 'infoTextWithMap'}><h3> ¿Cuando podré ir a partir la pana?  <br></br><br></br> </h3> <h4>{capitalize(date.format("dddd , D [de] MMMM [de] YYYY", event.date))}</h4></div>
      <div className={event.latitude === null || event.longitude === null ? 'infoText' : 'infoTextWithMap'}><h3>¿Qué generos de música escucharé?  <br></br><br></br></h3> <h4>{event.genre}</h4></div>
      
      </div>
       <div className={event.latitude ? "map" : "none"}>{event?.latitude && <EventMap pos={{lat:event.latitude, lng:event.longitude}}/>}</div>
      </Card> 
      <Divider></Divider>
      <h2 className="description">{event.description}</h2>
          
    </div>
  )
}
// GENRE ADDRESS DATE ROOMS MINIMUMAGE
export default SingleEvent
