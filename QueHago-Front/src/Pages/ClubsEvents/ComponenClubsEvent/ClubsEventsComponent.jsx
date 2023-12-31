import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./ClubsEventsComponent.css"
import { Box, Card, Modal, Button, TextField } from "@mui/material"
import { blue } from "@mui/material/colors"
import UploadWidget from "../../../Components/UploadWidget/UploadWidget"
import dayjs from "dayjs"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { DeleteOutline } from "@mui/icons-material"
const ClubsEventsComponent = ({
  setTitle,
  setGenre,
  setAddress,
  setRooms,
  setDate,
  setLatitude,
  setLongitude,
  setMinimumAge,
  setImage,
  events,
  createEvent,
  updateEvent,
  openUpdate,
  open,
  handleOpen,
  handleClose,
  handleOpenUpdate,
  handleCloseUpdate,
  setOpenTime,
  setCloseTime,
  clubDeletesEvent,
  setDescription
}) => {

  const navigate = useNavigate()
  
  const [eventImg, setEventImg] = useState(
    "https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg"
  )

  const [eventId, setEventId] = useState()
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  return (
    <div className="clubsEventsContainer">
      {/* //////////////////////////////////////////// CREATE CLUB MODAL /////////////////////////////////////////////////
       */}{" "}
      <Modal
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            overflow: "auto",
            width: "60vw",
            height: "80%",
            display: "flex",
            flexWrap:'wrap',
            alignContent: "center",
            justifyContent: "space-evenly",
            flexDirection: "row",
            borderRadius: "12px",
            backgroundColor: "#1E1E5D",
            backdropFilter: "blur(800px)",
            zIndex: "2",
            position:'relative'

          }}
        >
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            label="¿Cómo se llamará el evento?"
            variant="filled"
            color="primary"
            sx={{ backgroundColor: 'white' ,marginBottom: "35px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setGenre(e.target.value)}
            label="¿Qué género/s de música se reproducirá?"
            variant="filled"
            color="primary"
            sx={{ backgroundColor: 'white' ,marginBottom: "35px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setAddress(e.target.value)}
            label="¿Cuál es su dirección?"
            variant="filled"
            color="primary"
            sx={{ backgroundColor: 'white' ,marginBottom: "35px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setLatitude(e.target.value)}
            label="En caso de querer situarla en el mapa, indica su latitud"
            variant="filled"
            color="primary"
            sx={{ backgroundColor: 'white' ,marginBottom: "35px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setLongitude(e.target.value)}
            label="En caso de querer situarla en el mapa, indica su longitud"
            variant="filled"
            color="primary"
            sx={{ backgroundColor: 'white' ,marginBottom: "35px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setDate(e.target.value)}
            variant='outlined'
            type="date"
            color="primary"
            sx={{ backgroundColor: 'white' ,marginBottom: "35px", width: "40%", alignSelf: "center" }}
          ></TextField>
            <TextField
            onChange={(e) => setOpenTime(e.target.value)}
            label="¿A qué hora abre el evento?"
            variant="filled"
            color="primary"
            type="time"
            sx={{ backgroundColor: 'white' ,marginBottom: "35px", width: "40%", alignSelf: "center" }}
          ></TextField>
           <TextField
            onChange={(e) => setCloseTime(e.target.value)}
            label="¿A qué hora cierra el evento?"
            variant="filled"
            color="primary"
            type="time"
            sx={{ backgroundColor: 'white' ,marginBottom: "35px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setRooms(e.target.value)}
            label="Cuántas salas tiene el evento?"
            variant="filled"
            color="primary"
            type="number"
            sx={{ backgroundColor: 'white' ,marginBottom: "35px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setMinimumAge(e.target.value)}
            label="Indica la edad mínima para asistir"
            variant="filled"
            color="primary"
            type="number"
            sx={{ backgroundColor: 'white' ,marginBottom: "35px", width: "40%", alignSelf: "center" }}
          ></TextField>         
          <TextField
            onChange={(e) => setImage(e.target.value)}
            label="¿Quieres subir una imagen para el evento?"
            variant="filled"
            color="primary"
            sx={{ backgroundColor: 'white' ,marginBottom: "35px", width: "60%", alignSelf: "left" }}
          ></TextField>
          <UploadWidget setUrl={setImage}></UploadWidget>
          <TextField
             sx={{ backgroundColor: 'white' ,marginBottom: "35px", width: "90%", alignSelf: "left" }}  
              label="Descripción"
              multiline
              rows={4} // Puedes ajustar la altura según tus necesidades
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            onClick={createEvent}
            sx={{
              position:'absolute',
              bottom:'10px',
              alignSelf: "center",
              color:'black',
              backgroundColor: 'white',
              "&:hover": { backgroundColor: blue[500] },
           
            }}
          >
            CREAR EVENTO
          </Button>
        </Box>
      </Modal>
      {/* //////////////////////////////////////////// UPDATE EVENT MODAL /////////////////////////////////////////////////
       */}
      <Modal
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            overflow: "auto",
            width: "60vw",
            height: "80vh",
            display: "flex",
            flexWrap:'wrap',
            alignContent: "center",
            justifyContent: "space-evenly",
            flexDirection: "row",
            borderRadius: "12px",
            backgroundColor: "#9294ff",
            backdropFilter: "blur(800px)",
            zIndex: "2",
            position:'relative'
          }}
        >
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            label="¿Se ha cambiado el nombre del evento?"
            variant="filled"
            color="primary"
            defaultValue={events.title}
            sx={{ marginBottom: "20px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setGenre(e.target.value)}
            label="¿Qué género/s de música se reproducirá?"
            variant="filled"
            color="primary"
            sx={{ marginBottom: "20px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setAddress(e.target.value)}
            label="Indica la nueva dirección si ha sido modificada"
            variant="filled"
            color="primary"
            sx={{ marginBottom: "20px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setLatitude(e.target.value)}
            label="En caso de querer situarla en el mapa, indica su latitud"
            variant="filled"
            color="primary"
            sx={{ marginBottom: "20px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setLongitude(e.target.value)}
            label="En caso de querer situarla en el mapa, indica su longitud"
            variant="filled"
            color="primary"
            sx={{ marginBottom: "20px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setDate(e.target.value)}
            variant='outlined'
            type="date"
            color="primary"
            sx={{ marginBottom: "20px", width: "40%", alignSelf: "center" }}
          ></TextField>
              <TextField
            onChange={(e) => setOpenTime(e.target.value)}
            label="¿A qué hora abre el evento?"
            variant="filled"
            color="primary"
            type="time"
            sx={{ marginBottom: "20px", width: "40%", alignSelf: "center" }}
          ></TextField>
           <TextField
            onChange={(e) => setCloseTime(e.target.value)}
            label="¿A qué hora cierra el evento?"
            variant="filled"
            color="primary"
            type="time"
            sx={{ marginBottom: "20px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setRooms(e.target.value)}
            label="¿Se han añadido o reducido salas al evento?"
            variant="filled"
            color="primary"
            type="number"
            sx={{ marginBottom: "20px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setMinimumAge(e.target.value)}
            label="Indica la edad mínima para asistir"
            variant="filled"
            color="primary"
            type="number"
            sx={{ marginBottom: "20px", width: "40%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setImage(e.target.value)}
            label="¿Quieres subir una imagen?"
            variant="filled"
            color="primary"
            sx={{ marginBottom: "20px", width: "80%", alignSelf: "center" }}
          ></TextField>
          <UploadWidget setUrl={setImage}></UploadWidget>
          <TextField
             sx={{ backgroundColor: 'white' ,marginBottom: "35px", width: "95%", alignSelf: "left" }}  
              label="Descripción"
              multiline
              rows={4} // Puedes ajustar la altura según tus necesidades
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            onClick={() => updateEvent(eventId)}
            sx={{
              alignSelf: "center",
              backgroundColor: blue[300],
              "&:hover": { backgroundColor: blue[500] },
            }}
          >
            ACTUALIZAR
          </Button>
        </Box>
      </Modal>
      { /* ///////////////////////////HACER DISPLAY GRID Y AÑADIR DESCRIPCION AL MODAL //////////////////////////// */ }


      <Card
        onClick={handleOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="hoverCard"
        sx={{
          background:'linear-gradient(13deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 39%, rgba(53,0,255,1) 100%)',
          margin: "2vw",
          width: "14vw",
          height: "50vh",
          alignItems: "center",
          justifyContent: "space-around",
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px",
          textAlign: "center",
          overflow: "hidden",
          color: "white",
          transition: "0.5s",

          "@media (min-width: 600px) and (max-width: 1080px)": {
            width: "30vw",
            height: "30vh",
          },

          "@media (max-width: 600px)": {
            width: "42vw",
            height: "30vh",
          },
        }}
      >
        <h3>Crear nuevo evento</h3>
        <div></div>
        <img
          onClick={handleOpen}
          className={hovered ? "newEvent" : "clubsEvent"}
          src={
            hovered
              ? "https://res.cloudinary.com/djpdopxfy/image/upload/v1701078519/Dise%C3%B1o_sin_t%C3%ADtulo_1_pdvujw.png"
              : eventImg
          }
        ></img>
        <p onClick={handleOpen}>Haz Click para crear nuevo evento</p>
      </Card>
      {events.sort((a, b) => dayjs(a.date).diff(dayjs(b.date))).map((em, i) => (
        <Card
          key={em.id}
          sx={{
            background:'linear-gradient(13deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 39%, rgba(53,0,255,1) 100%)',
            margin: "2vw",
            width: "14vw",
            height: "55vh",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            borderRadius: "12px",
            textAlign: "center",
            overflow: "hidden",
            color: "white",
            justifyContent: "space-around",
            boxSizing: "border-box",
            transition: "0.2s",
            position:'relative',
            padding:'0.5rem',

            "@media (min-width: 600px) and (max-width: 1080px)": {
              width: "18vw",
              height: "40vh",
            },
            "@media (max-width: 600px)": {
              width: "40vw",
              height: "40vh",
            }
          }}
        >
          {em?.openTime && <h4 className='eventHour' >{em.openTime.slice(0, -3)} - {em.closeTime.slice(0, -3)}</h4>}
          <ModeEditIcon onClick={() => {
            handleOpenUpdate()
            setEventId(em.id)
          }}
           sx={{position:'absolute', left:'10px', bottom: '10px', color:'grey', width:'40px', ':hover' : {color:'white', cursor:'pointer'}}}></ModeEditIcon>
          <h2 className="clubEventTitle" key={em.id}>{em.title}</h2>
          <h3>{em.genre}</h3>
          <img
            onClick={() => navigate(`/event/${em.id}`)}  
            className="clubsEventImg"
            key={i}
            src={
              em.image === null
                ? "https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg"
                : em.image
            }
          ></img>
          <p>Click en la imagen para ver más</p>
          <DeleteOutline onClick={() => clubDeletesEvent(em.id)} sx={{position:'absolute', right:'10px', top: '10px', color:'white', width:'40px', ':hover' : {cursor:'pointer',color:'red'}}} ></DeleteOutline>
          <h3>{em.address}</h3>
        </Card>       
      ))}
    </div>
  )
}

// CONSEGUIR QUE LOS EVENTOS EN BUSSINESS APAREZCAN 9 POR PÁGINA
export default ClubsEventsComponent
