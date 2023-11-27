import React, { useEffect, useState } from 'react'
import './Header.css'
import UploadWidget from '../UploadWidget/UploadWidget'
import { getProfile, postPhoto, postProfile } from '../../Services/accountService'
import { Link, Navigate, redirect, useNavigate } from "react-router-dom"
import { Box, Button, MenuItem, Modal, TextField } from '@mui/material'
import { blueGrey, green } from '@mui/material/colors'


const Header = () => {
  const navigation = useNavigate()

  const [password, setPassword] = useState()
  const [email, setEmail] = useState()
  const [telephone, setTelephone] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [birthDate, setBirthDate] = useState()
  const [photo, setPhoto] = useState("https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg")
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const location = window.location.pathname
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const getPhoto = async () => {
    if (localStorage.getItem('token') === null) {
      console.log('You are not logged in')
      return null
    } else {
      const { data } = await getProfile()
    setPhoto(data.image)
    return data
    }
  }

  const updatePhoto = async(newPhoto) => {
    const data = await postPhoto(newPhoto)
    console.log('photo uploaded')
    return data
  }

  const updateProfile = async() => {
    try {
      const updateResponse = await postProfile({email,
      password,
      telephone,
      firstName,
      lastName,
      birthDate
    })
    } catch (error) {
      console.log(signupResponse.data)
      console.error("Error al actualizar usuario:", error)
    } 
  }

useEffect(() => {
  getPhoto()
}, [])


function onLogout() {
  localStorage.removeItem('token')
  if(location === '/') {
    window.location.reload()
  }
  console.log('You are logged out')
}

  return (
    <Box className='header-container'>
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
            onChange={(e) => setFirstName(e.target.value)}
            label="Nombre"
            variant="filled"
            fullWidth={true}
            sx={{ marginBottom: "20px", color: "white" }}
          />
          <TextField
            onChange={(e) => setLastName(e.target.value)}
            label="Apellidos"
            variant="filled"
            fullWidth={true}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
          color="success"
            onChange={(e) => setEmail(e.target.value)}
            label="Tu mejor email"
            variant="filled"
            fullWidth={true}
            sx={{ marginBottom: "20px", color: '#500041' }}
          />
          <TextField
            onChange={(e) => setTelephone(e.target.value)}
            label="Teléfono"
            variant="filled"
            fullWidth={true}
            type="number"
            sx={{ marginBottom: "20px" }}
          />
          <p>Fecha de nacimiento :</p>
          <TextField
            onChange={(e) => setBirthDate(e.target.value)}
            variant="filled"
            type="date"
            fullWidth={true}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="Contraseña"
            variant="filled"
            type="password"
            fullWidth={true}
          />
          <Button onClick={() => updateProfile()}>Update</Button>
        </Box>
      </Modal>
    <Link to={'/'}><img className='logo' src='https://res.cloudinary.com/djpdopxfy/image/upload/v1700734298/QueHago_logo_1_dlxtrk.png'></img></Link>
    <Link to={"/login"}><Button sx={{margin:'20px', backgroundColor:'#792350', color:'white' }} color="primary">
                   Login
        </Button></Link>
        <Link to={"/signup"}><Button sx={{margin:'20px', backgroundColor: green[600], color:'white' }} color="success">
          Sign Up
        </Button></Link>
        <Link to={"/bussiness/login"}><Button sx={{margin:'20px', backgroundColor: '#792350', color:'white' }} color="success">
                   Login Bussiness
        </Button></Link>
        <Link to={"/bussiness/signup"}><Button sx={{margin:'20px', backgroundColor: green[600], color:'white' }} color="success">
                   SignUp Bussiness
        </Button></Link>
        <Link><Button onClick={() => onLogout()}>Logout</Button></Link>

        <div>
         <img onClick={() => (localStorage.getItem('token')) ? handleOpen() : navigation('/login')}
          className="profilePhoto" src={(localStorage.getItem('token') === null) ? 'https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg' : photo}></img>
         <UploadWidget setUrl={setPhoto} updatePhoto={updatePhoto}/>
        </div>
      
    </Box>
  )
}

export default Header