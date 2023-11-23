import React, { useEffect, useState } from 'react'
import './Header.css'
import UploadWidget from '../UploadWidget/UploadWidget'
import { getProfile, postPhoto } from '../../Services/accountService'
import { Link } from "react-router-dom"
import { Box, Button } from '@mui/material'
import { blueGrey, green } from '@mui/material/colors'


const Header = () => {

  const [photo, setPhoto] = useState()
  const getPhoto = async () => {
    const { data } = await getProfile()
    setPhoto(data.image)
    return data
  }

  const updatePhoto = async() => {
    const data = await postPhoto(photo)
    console.log('photo uploaded')
    return data
  }
useEffect(() => {
  getPhoto(), updatePhoto()
}, [])


  return (
    <Box className='header-container'>
    <img className='logo' src='https://res.cloudinary.com/djpdopxfy/image/upload/v1700734298/QueHago_logo_1_dlxtrk.png'></img>
    <button onClick={updatePhoto}>SUBETE Y ACTUALIZA POR FAVOR</button>  
    <Link to={"/login"}><Button sx={{margin:'20px', backgroundColor: green[600] }} color="success">
                   Login
        </Button></Link>
        <Link to={"/signup"}><Button sx={{margin:'20px', backgroundColor: blueGrey[600] }} color="secondary">
          Sign Up
        </Button></Link>
    <UploadWidget setUrl={setPhoto} url={photo}/>
    </Box>
  )
}

export default Header