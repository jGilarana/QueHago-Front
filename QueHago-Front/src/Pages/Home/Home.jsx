import "./Home.css"
import { React, useEffect, useState } from "react"
import { getAllEvents } from "../../Services/eventService"
import { Button } from "@mui/material"
import { green, red } from "@mui/material/colors"
import { Link } from "react-router-dom"
import { getProfile, postPhoto } from "../../Services/accountService"
import UploadWidget from "../../Components/UploadWidget/UploadWidget.jsx"
import HomeComponent from "./HomeComponent/HomeComponent.jsx"


const Home = () => {
  const [event, setEvent] = useState([])
  
  const getEvents = async () => {
    const data = await getAllEvents()
    setEvent(data)
  }


  useEffect(() => {
    getEvents()
  }, [])


  return (
    <div className="home">
        <Link to={"/login"}>
        <Button sx={{margin:'20px', backgroundColor: green[600] }} color="success">
          Login
        </Button>
      </Link>
       <HomeComponent event={event}/>
      <Link to={"/signup"}></Link>
    </div>
  )
}

export default Home
