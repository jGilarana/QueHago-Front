import { Card } from "@mui/material"
import { React, useEffect, useState } from "react"
import "./SingleEvent.css"
import { useParams } from "react-router-dom"
import { getOneEvent } from "../../Services/eventService"

const SingleEvent = () => {
  const { eventId } = useParams()
  const [event, setEvent] = useState({})
 

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
          backgroundColor: "white",
          width: "50vw",
          height: "50vh",
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px",
          textAlign: "center",
          overflow: "hidden",
        }}
      > {event && <h1>{event.title}</h1>}
        <img src={event.image === null ? "https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg" : event.image}></img>
      </Card>
    </div>
  )
}

export default SingleEvent
