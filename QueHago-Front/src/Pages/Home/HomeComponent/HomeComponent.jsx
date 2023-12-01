import React, { useEffect, useState } from 'react'
import './HomeComponent.css'
import { Box, Button, Card, Modal, colors } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Link, useNavigate } from "react-router-dom"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getUsersFavorites, userDeletesFav, userSetsFavorite } from '../../../Services/favoriteService'
import dayjs from 'dayjs'
import { FavoriteBorder } from '@mui/icons-material'

const HomeComponent = ({event}) => {



  const now = dayjs()
  
  const navigation = useNavigate();


  const [favorite, setFavorite] = useState([])
  const [refresh, setRefresh] = useState(false)
  
  

  const getFavorites = async() =>  {
      const data = await getUsersFavorites()
      setFavorite(data)
  }
  
  const sames = favorite.map((em) => (em.favorite.eventId))


  useEffect(() => {
      getFavorites()
  },[refresh])



  const setUsersFavorite = async(id) => {
    const data = await userSetsFavorite(id)
    setRefresh(!refresh)
    return 'Favourite added'
  }

  const deleteFav = async(id) => {
    const data = await userDeletesFav(id)
    setRefresh(!refresh)
    return 'Favourite deleted'
  }

  
  const cardStyles = {

    '&:hover': {
      backgroundColor: '#e0e0e0',
      cursor: 'pointer',
    },
  };
  const [openNotoken, setOpenNotoken] = useState(false);

  const handleOpen = () => {
    setOpenNotoken(true);
  };
  const handleClose = () => setOpenNotoken(false);


  return (
    <div className='events-container'>
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "transparent",
          position: "fixed",
        }}
        open={openNotoken}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            overflow: "auto",
            width: "30vw",
            height: "80%",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "12px",
            backgroundColor: "#9294ff",
            opacity: "90%",
            backdropFilter: "blur(800px)",
            zIndex: "2",
          }}
        >
           <h1>No podemos mostrarte la información adicional de este evento porque no has iniciado sesión</h1>
          <Button sx={{backgroundColor:'#4d425f', margin:'1vw'}} onClick={() => navigation('/login')}>Iniciar sesión</Button>
          <Button sx={{backgroundColor:'#4d425f', margin:'1vw'}} onClick={() => navigation('/signup')}>Crear cuenta</Button>
        </Box>
      </Modal>
     {event.map((em, i) => (
     <Card
     className='scrollBar'
     onClick={localStorage.getItem('token') ? null : () => handleOpen()}
     key={em.id}
     sx={{
       background:'linear-gradient(13deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 39%, rgba(53,0,255,1) 100%)',
       margin: '2vw',
       width: '14vw',
       height: '60vh', 
       alignItems: 'center',
       display: 'flex',
       flexDirection: 'column',
       borderRadius: '12px',
       textAlign: 'center',
       overflow: 'auto',
       color: 'white',
       justifyContent:'space-evenly',
       boxSizing:'border-box',
       position:'relative',
   
       '@media (min-width: 600px) and (max-width: 1080px)': {
         width: '18vw',
         height: '40vh', 
       },
   
       '@media (max-width: 600px)': {
         width: '40vw',
         height: '40vh', 
       }, 
       ':hover': {
         backgroundColor: '#000000',
         cursor: 'pointer',
         border:'2px solid'
         
       },
     }}
   >

        
            {em?.openTime && <p className='hour'>{em.openTime.slice(0, -3)} - {em.closeTime.slice(0, -3)}</p>}
           <FavoriteBorder color='transparent' sx={{width:'3vw', height : '3vh'}} className= {sames.includes(em.id) ? 'favIcon' : 'noFavIcon'}
            onClick={sames.includes(em.id) ? () => deleteFav(em.id) : () => setUsersFavorite(em.id)}
            ></FavoriteBorder>
           
          <div className='noHeaderCard' onClick={localStorage.getItem('token') ? () => window.open(`/event/${em.id}`) : handleOpen} >
          <h1 className='eventTitle' key={em.id}>{em.title}</h1>
          <img className='event' key={i} 
          src={(em.image === null) ? 'https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg' : (em.image)}>
          </img>
          <h4>{dayjs(em.date).format("dddd , D [de] MMMM [de] YYYY", em.date)}</h4>
          <p className='address'>{em.address}</p>
          </div>
     </Card>
      ))}
    </div>
  )
}

export default HomeComponent