import React, { useEffect, useState } from 'react'
import './Header.css'
import UploadWidget from '../UploadWidget/UploadWidget'
import { getProfile, postPhoto } from '../../Services/accountService'
import { Link, Navigate } from "react-router-dom"
import { Box, Button, MenuItem } from '@mui/material'
import { blueGrey, green } from '@mui/material/colors'


const Header = () => {

  const [photo, setPhoto] = useState("https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg")
  const getPhoto = async () => {
    const { data } = await getProfile()
    setPhoto(data.image)
    return data
  }

  const updatePhoto = async(newPhoto) => {
    const data = await postPhoto(newPhoto)
    console.log('photo uploaded')
    return data
  }
useEffect(() => {
  getPhoto()
}, [])


function onLogout() {
  localStorage.removeItem('token')
}

  return (
    <Box className='header-container'>
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
        <Link to={"/bussiness/login"}><Button sx={{margin:'20px', backgroundColor: green[600], color:'white' }} color="success">
                   SignUp Bussiness
        </Button></Link>
        <Link><Button onClick={() => onLogout()}>Logout</Button></Link>
 

        <div>
         <img className="profilePhoto" src={photo}></img>
         <UploadWidget setUrl={setPhoto} updatePhoto={updatePhoto}/>
        </div>
      
    </Box>
  )
}

export default Header