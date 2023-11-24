import React from 'react'
import { Link } from "react-router-dom"
import './ClubsEventsComponent.css'
import { Card } from '@mui/material'



const ClubsEventsComponent = ({events}) => {



  return (


    
    <div className='clubsEventsContainer'>
       <Card sx={{ 
        backgroundColor: '#131313',
        margin: '2vw',
        width: '14vw',
        height: '50vh', 
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        textAlign: 'center',
        overflow:'hidden',
        color: 'white',

        '@media (min-width: 600px) and (max-width: 1080px)': {
          width: '30vw',
          height: '30vh',
        },

        '@media (max-width: 600px)': {
          width: '42vw',
          height: '30vh',}
        }}>
          <h3>Crear evento</h3>
          <img className='event' src={ 'https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg'}></img>
          <Link to={'/login'}><p className='moreInfo'>Ver más</p></Link>
     </Card>
     {events.map((em, i) => (
     <Card sx={{ 
        backgroundColor: '#131313',
        margin: '2vw',
        width: '14vw',
        height: '50vh', 
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        textAlign: 'center',
        overflow:'hidden',

        '@media (min-width: 600px) and (max-width: 1080px)': {
          width: '30vw',
          height: '30vh',
        },

        '@media (max-width: 600px)': {
          width: '42vw',
          height: '30vh',}
        }}>
          <h3 key={em.id}>{em.title}</h3>
          <img className='event' key={i} src={(em.image === null) ? 'https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg' : (em.image)}></img>
          <Link to={'/login'}><p className='moreInfo'>Ver más</p></Link>
     </Card>
      ))} 
        
    </div>
  )
}

export default ClubsEventsComponent