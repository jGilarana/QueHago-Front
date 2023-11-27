import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./ClubsEventsComponent.css"
import { Box, Card, Modal, Button, TextField } from "@mui/material"
import { blue } from "@mui/material/colors"
import UploadWidget from "../../../Components/UploadWidget/UploadWidget"

const ClubsEventsComponent = ({
  setTitle,
  setGenre,
  setAddress,
  setRooms,
  setDate,
  setMinimumAge,
  setImage,
  events,
  updateEvent,
}) => {
  const [eventImg, setEventImg] = useState(
    "https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg"
  )
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  return (
    <div className="clubsEventsContainer">
      <div
        style={{
          width: "100vw",
          height: "200vh",
          position: "fixed",
          backgroundColor: "black",
          opacity: "70%",
          zIndex: "1",
          display: open ? "block" : "none",
        }}
      ></div>
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
            width: "30vw",
            height: "60vh",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "12px",
            backgroundColor: "#9294ff",
            opacity: "85%",
            backdropFilter: "blur(800px)",
            zIndex: "2",
          }}
        >
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            label="title"
            variant="filled"
            color="success"
            sx={{ marginBottom: "20px", width: "80%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setGenre(e.target.value)}
            label="genre"
            variant="filled"
            color="success"
            sx={{ marginBottom: "20px", width: "80%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setAddress(e.target.value)}
            label="address"
            variant="filled"
            color="success"
            sx={{ marginBottom: "20px", width: "80%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setDate(e.target.value)}
            variant="filled"
            type="date"
            color="success"
            sx={{ marginBottom: "20px", width: "80%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setRooms(e.target.value)}
            label="Rooms"
            variant="filled"
            color="success"
            type="number"
            sx={{ marginBottom: "20px", width: "80%", alignSelf: "center" }}
          ></TextField>
             <TextField
            onChange={(e) => setMinimumAge(e.target.value)}
            label="Minimum Age"
            variant="filled"
            color="success"
            type="number"
            sx={{ marginBottom: "20px", width: "80%", alignSelf: "center" }}
          ></TextField>
          <TextField
            onChange={(e) => setImage(e.target.value)}
            label="Image"
            variant="filled"
            color="success"
            sx={{ marginBottom: "20px", width: "80%", alignSelf: "center" }}
          ></TextField>
          <UploadWidget setUrl={setImage}></UploadWidget>
          <Button
            onClick={updateEvent}
            sx={{
              alignSelf: "center",
              backgroundColor: blue[300],
              "&:hover": { backgroundColor: blue[500] }  
            }}
          >
            Upload
          </Button>
        </Box>
      </Modal>
      <Card onClick={handleOpen} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="hoverCard"
        sx={{
          backgroundColor: "#131313",
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
        <div>
          
        </div>
        <img onClick={handleOpen} className={hovered ? "newEvent" : "clubsEvent"} src={hovered ? 'https://res.cloudinary.com/djpdopxfy/image/upload/v1701078519/Dise%C3%B1o_sin_t%C3%ADtulo_1_pdvujw.png' : eventImg}></img>
        <p onClick={handleOpen}>Haz Click para crear nuevo evento</p>
      </Card>
      {events.map((em, i) => (
        <Card key={em.id}
          sx={{
            backgroundColor: "#131313",
            margin: "2vw",
            width: "14vw",
            height: "50vh",
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            borderRadius: "12px",
            textAlign: "center",
            overflow: "hidden",
            color: "white",

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
          <h3>{em.title}</h3>
          <img
            className="event"
            src={
              em.image === null
                ? "https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg"
                : em.image
            }
          ></img>
          <Link to={`/event/${em.id}`}>
            <p className="moreInfo">Ver más</p>
          </Link>
        </Card>
      ))}
    </div>
  )
}


// CONSEGUIR QUE LOS EVENTOS EN BUSSINESS APAREZCAN 9 POR PÁGINA
export default ClubsEventsComponent
