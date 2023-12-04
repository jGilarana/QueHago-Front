import React, { useEffect, useState } from 'react'
import './HomeComponent.css'
import { Box, Button, Card, Modal, colors } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Link, useNavigate } from "react-router-dom"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getUsersFavorites, userDeletesFav, userSetsFavorite } from '../../../Services/favoriteService'
import dayjs from 'dayjs'
import { FavoriteBorder } from '@mui/icons-material'

const HomeComponent = ({event, dayWeek}) => {


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
      <h2 className='day'>{dayWeek}</h2>
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
            color:'white',
            textAlign:'center',
            overflow: "auto",
            width: "30vw",
            height: "80%",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "12px",
            background : 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(6,6,201,1) 34%)',
            opacity: "90%",
            backdropFilter: "blur(800px)",
            zIndex: "2",
          }}
        >
          <div className='noTokenInfo'> 
           <h1>No podemos mostrarte la información adicional de este evento porque no has iniciado sesión</h1>
           <div className='noTokenInfoButtons'> 
          <Button sx={{backgroundColor:'white', margin:'1vw', ':hover' : {backgroundColor: '#587FCC', color:'white'}}} onClick={() => navigation('/login')}>Iniciar sesión</Button>
          <Button sx={{backgroundColor:'white', margin:'1vw', ':hover' : {backgroundColor: '#587FCC', color:'white'}}} onClick={() => navigation('/signup')}>Crear cuenta</Button>
          </div>
          </div>
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
       width: '13vw',
       height: '50vh', 
       alignItems: 'center',
       display: 'flex',
       flexDirection: 'column',
       borderRadius: '12px',
       textAlign: 'center',
       color: 'white',
       justifyContent:'space-between',
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
         opacity:'80%',
         cursor: 'pointer',
         border:'2px solid',
        
         
       },
     }}
   >
          <div className='cardInfo'>
       
           <FavoriteBorder color='transparent' sx={{ position:'absolute', top:'10px', right:'42%', display: localStorage.getItem('role') ? 'flex' : 'none'}} className= {sames.includes(em.id) ? 'favIcon' : 'noFavIcon'}
            onClick={sames.includes(em.id) ? () => deleteFav(em.id) : () => setUsersFavorite(em.id)}
            ></FavoriteBorder>
           
          <div className='noHeaderCard' onClick={localStorage.getItem('token') ? () => navigation(`/event/${em.id}`) : handleOpen} >
          <h2 style={{fontSize:'1.3rem'}} className='eventTitle' key={em.id}>{em.title}</h2>
          <img className='event' key={i} 
          src={(em.image === null) ? 'https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg' : (em.image)}>
          </img>
          <h3 style={{fontSize:'0.8rem'}}>{dayjs(em.date).format("dddd , D [de] MMMM [de] YYYY")}</h3> 
          {em?.openTime && <h4>{em.openTime.slice(0, -3)} - {em.closeTime.slice(0, -3)}</h4>}
          <p className='address'>Click para ver más</p>
          </div></div>
     </Card>
      ))}
    </div>
  )
}

export default HomeComponent