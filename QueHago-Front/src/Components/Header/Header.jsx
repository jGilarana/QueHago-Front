import React, { useEffect, useState } from 'react'
import './Header.css'
import UploadWidget from '../UploadWidget/UploadWidget'
import { getProfile, postPhoto } from '../../Services/accountService'
import { Link } from "react-router-dom"


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
    <div className='header-container'>
       <Link to={"/login"}></Link>
    <img className='logo' src='https://res.cloudinary.com/djpdopxfy/image/upload/v1700734298/QueHago_logo_1_dlxtrk.png'></img>
    <button onClick={updatePhoto}>SUBETE Y ACTUALIZA POR FAVOR</button>  
    <UploadWidget setUrl={setPhoto} url={photo}/>
    </div>
  )
}

export default Header