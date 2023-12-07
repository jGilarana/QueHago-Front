import "./Home.css"
import { React, useEffect, useState } from "react"
import { getAllEvents } from "../../Services/eventService"
import { Box, Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { blue, green, grey, red, yellow } from "@mui/material/colors"
import { Link, useNavigate } from "react-router-dom"
import { getProfile, postPhoto } from "../../Services/accountService"
import UploadWidget from "../../Components/UploadWidget/UploadWidget.jsx"
import HomeComponent from "./HomeComponent/HomeComponent.jsx"
import Map from "../../Components/Map/Map.jsx"
import dayjs from "dayjs"

const Home = () => {
  const navigate = useNavigate()
  const [genre, setGenre] = useState("")
  const [event, setEvent] = useState([])
  const [filteredEvent, setFilteredEvent] = useState({})
  const [today, setToday] = useState(dayjs())
  const [openNotoken, setOpenNotoken] = useState(false)
  const [openDay, setOpenDay] = useState(false)
  const [hideButton, setHideButton] = useState(1)

  const getAllTheEvents = async () => {
    const data = await getAllEvents()
    setEvent(data.sort((a, b) => dayjs(b.date).diff(dayjs(a.date))))
    setHideButton(1)
  }

  const getEvents = async () => {
    const data = await getAllEvents()
    const filteredData = data
      .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))
      .filter((em) => dayjs(em.date).isAfter(dayjs().subtract(1, 'day'), 'day'))
      setEvent(filteredData)
    setHideButton(2)
  }

  const filterEvent = async () => {
    const data = await getAllEvents()
    const filteredData = data.filter((em) =>
      dayjs(em.date).isSame(dayjs(today), "day")
    )
    setEvent(filteredData)
    setHideButton(3)
  }

  const addDay = () => {
    setOpenDay(true)
    setToday((today) => today.add(1, "day"))
  }

  const oneDayLess = () => {
    setOpenDay(true)
    setToday((today) => today.add(-1, "day"))
  }

  const resetToday = () => {
    setToday(dayjs())
  }

  useEffect(() => {
    filterEvent()
  }, [today])

  useEffect(() => {
    getEvents()
    const timeoutId = setTimeout(getEvents, 50)
    return () => clearTimeout(timeoutId)
  }, [])

  return (

    <div className="home">

      <Button
        sx={{
          display: localStorage.getItem("token") ? "initial" : "none",
          color:'white',
          backgroundColor: hideButton === 1 ? 'transparent' : grey[800] ,
          border: "2px solid white",
          borderRadius: "12px",
          height: "5vh",
          width: "10vw",
          fontSize: "11px",
          position: "absolute",
          top: "11vh",
          right: "32vw"
        }}
        onClick={() => getEvents() && setOpenDay(false)}
      >
      PRÓXIMOS EVENTOS
      </Button>

      <Button
        sx={{
          display: localStorage.getItem("token") ? "initial" : "none",
          backgroundColor: hideButton === 1 ? grey[800] : "transparent",
          color: 'white',
          border: "2px solid white",
          borderRadius: "12px",
          height: "5vh",
          width: "10vw",
          fontSize: "11px",
          position: "absolute",
          top: "11vh",
          right: "19vw",
          ":hover": {

          },
        }}
        onClick={() => getAllTheEvents() && setOpenDay(false)}
      >
      TODOS LOS EVENTOS
      </Button>
      
      <Button
        sx={{
          color:'white',
          display: localStorage.getItem("role") ? "initial" : "none",
          border: "2px solid red",
          borderRadius: "12px",
          height: "5vh",
          width: "8vw",
          position: "absolute",
          top: "11vh",
          right: "3vw",
          fontSize: "11px",

          ':hover' : {
            backgroundColor: red[900],
            color: 'white'
          }
        }}
        onClick={() => navigate("/favorites")}
      >
        IR A FAVORITOS ❤️
      </Button>

      <Button
        sx={{
          color:'white',
          display: localStorage.getItem("token") ? "initial" : "none",
          border: "2px solid grey",
          borderRadius: "12px",
          height: "5vh",
          width: "10vw",
          position: "absolute",
          top: "11vh",
          left: "3vw",
          fontSize: "11px",
          ":hover": {
            backgroundColor: blue[600],
            color: "white",
          },
        }}
        onClick={() => oneDayLess()}
      >
        DIA ANTERIOR
      </Button>

      <Button
        sx={{
          color:'white',
          display: localStorage.getItem("token") ? "initial" : "none",
          border: "2px solid grey",
          borderRadius: "12px",
          height: "5vh",
          width: "10vw",
          position: "absolute",
          top: "11vh",
          left: "16vw",
          fontSize: "11px",
          ":hover": {
            backgroundColor: blue[800],
            color: "white",
          },
        }}
        onClick={() => resetToday()}
      >
          EVENTOS DE HOY
      </Button>
      
      <Button
        sx={{
          color:'white',
          display: localStorage.getItem("token") ? "initial" : "none",
          border: "2px solid grey",
          borderRadius: "12px",
          height: "5vh",
          width: "10vw",
          position: "absolute",
          top: "11vh",
          left: "29vw",
          fontSize: "11px",
          ":hover": {
            backgroundColor: blue[600],
            color: "white",
          },
        }}
        onClick={() => addDay()}
      >
        SIGUIENTE DIA
      </Button>

      <Map />
      <div className="selector">
      <FormGroup>
        <FormControlLabel control={<Checkbox  />} label="Reggaeton" />
        <FormControlLabel control={<Checkbox  />} label="Tech House" />
        <FormControlLabel control={<Checkbox  />} label="R&B" />
        <FormControlLabel control={<Checkbox  />} label="Jazz" />
        <FormControlLabel control={<Checkbox  />} label="Rock" />
        <FormControlLabel control={<Checkbox  />} label="DanceHall" />
        <FormControlLabel control={<Checkbox  />} label="Trap" />

      </FormGroup>

      </div>
      <HomeComponent
        event={event}
        dayWeek={openDay === true ? today.format("dddd, DD/MM/YYYY") : null}
      />
    </div>
  )
}

export default Home
