import React, { useEffect, useState } from 'react'
import './HomeComponent.css'
import { Card, colors } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Link } from "react-router-dom"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getUsersFavorites, userDeletesFav, userSetsFavorite } from '../../../Services/favoriteService'

const HomeComponent = ({event}) => {


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
    <div className='events-container'>
     {event.map((em, i) => (
     <Card
     key={em.id}
     sx={{
       backgroundColor: '#131313',
       margin: '2vw',
       width: '13vw',
       height: '40vh', 
       alignItems: 'center',
       justifyContent: 'space-between',
       display: 'flex',
       flexDirection: 'column',
       borderRadius: '12px',
       textAlign: 'center',
       overflow: 'auto',
       color: 'white',
   
       '@media (min-width: 600px) and (max-width: 1080px)': {
         width: '18vw',
         height: '40vh', 
       },
   
       '@media (max-width: 600px)': {
         width: '40vw',
         height: '40vh', 
       }
     }}
   >
          <FavoriteIcon sx={{display: localStorage.getItem('token') ? 'initial' : 'none'}} className= {sames.includes(em.id) ? 'favIcon' : 'noFavIcon'}
          onClick={sames.includes(em.id) ? () => deleteFav(em.id) : () => setUsersFavorite(em.id)}
            ></FavoriteIcon>
          <h3 key={em.id}>{em.title}</h3>
          <img className='event' key={i} src={(em.image === null) ? 'https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg' : (em.image)}></img>
          <h4>{em.genre}</h4>
          <h4>{em.address}</h4>
       
          <Link to={`/event/${em.id}`}><p className='moreInfo'>Ver más</p></Link>
     </Card>
      ))}
    </div>
  )
}

export default HomeComponent