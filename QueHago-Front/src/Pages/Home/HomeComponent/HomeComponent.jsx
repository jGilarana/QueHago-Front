import React from 'react'
import './HomeComponent.css'
import { Card } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Link } from "react-router-dom"

const HomeComponent = ({event}) => {
  return (
    <div className='events-container'>
     {event.map((em, i) => (
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
          height: '30vh',},

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

export default HomeComponent