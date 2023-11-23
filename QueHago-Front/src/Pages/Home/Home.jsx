import "./Home.css"
import { React, useEffect, useState } from "react"
import { getAllEvents } from "../../Services/eventService"
import { Button } from "@mui/material"
import { green, red } from "@mui/material/colors"
import { Link } from "react-router-dom"
import { getProfile, postPhoto } from "../../Services/accountService"
import UploadWidget from "../../Components/UploadWidget/UploadWidget.jsx"


const Home = () => {
  const [event, setEvent] = useState([])
  const [photo, setPhoto] = useState()
  const [file, setFile] = useState('');
  console.log(photo)




  const getPhoto = async () => {
    const { data } = await getProfile()
    setPhoto(data.image)
    return data
  }

  const getEvents = async () => {
    const data = await getAllEvents()
    setEvent(data)
  }


  const updatePhoto = async() => {
    const data = await postPhoto(photo)
    console.log('photo uploaded')
    return data
  }


  useEffect(() => {
    getEvents(), getPhoto()
  }, [])




  return (
    <>
      <h1>FOTO DE PERFIL</h1>      
      <UploadWidget setUrl={setPhoto} url={photo}/>     
       <button onClick={updatePhoto}>SUBETE Y ACTUALIZA POR FAVOR</button>
      <Link to={"/login"}>
        <Button sx={{margin:'20px', backgroundColor: green[600] }} color="success">
          Login
        </Button>
         <Button sx={{ margin:'20px' ,backgroundColor: red[600] }} color="success">
          SignUp
        </Button>
      </Link>
      {event.map((em, i) => (
        <>
          <h1 key={em}>{em.title}</h1>
          <img key={i} src={em.image}></img>
        </>
      ))}

      <Link to={"/signup"}>
       
      </Link>
    </>
  )
}

export default Home
