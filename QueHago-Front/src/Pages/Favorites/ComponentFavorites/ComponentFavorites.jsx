import React, { useEffect, useState } from 'react'
import './ComponentFavorite.css'
import { Card } from '@mui/material'
import { width } from '@mui/system'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { getUsersFavorites, userDeletesFav, userSetsFavorite } from '../../../Services/favoriteService';

const ComponentFavorites = ({fav}) => {

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



  return (


    <div className='pageContainer'> 
    <div className='favContainer'>ComponentFavorites
    {fav.map((em, i) => {
      return (
         <Card
     key={em.id}
     sx={{
       backgroundColor: '#131313',
       margin: '2vw',
       width: '14vw',
       height: '60vh', 
       alignItems: 'center',
       display: sames.includes(em.id) ?  'flex' : 'none',
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

          <div className='headerCard'>
            <p className='hour'>22:00 - 06:00</p>
           <FavoriteIcon sx={{ display: localStorage.getItem('role') ? 'initial' : 'none',
          ':hover' : {
            color: 'black',
          } 
          }} className= {sames.includes(em.id) ? 'favIcon' : 'noFavIcon'}
            onClick={sames.includes(em.id) ? () => deleteFav(em.id) : () => setUsersFavorite(em.id)}
            ></FavoriteIcon>
            </div>
          <div className='noHeaderCard' onClick={localStorage.getItem('token') ? () => window.open(`/event/${em.id}`) : handleOpen} >
          <h1 className='eventTitle' key={em.id}>{em.title}</h1>
          <p className='genre'>{em.genre}</p>
          <img className='event' key={i} 
          src={(em.image === null) ? 'https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg' : (em.image)}>
          </img>
          <h3 className='address'>{em.address}</h3>
          </div>
     </Card>
      )
    })}
    </div>
    </div>
  )
}

export default ComponentFavorites