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
        backgroundColor: blue[400],
        margin: '2vw',
        width: '13vw',
        height: '40vh', 
        alignItems: 'center',
        justifyContent: 'space-around',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        textAlign: 'center'
        }}>
          <h3 key={em.id}>{em.title}</h3>
          <img className='event' key={i} src={em.image}></img>
          <Link to={'/login'}><p>See more info</p></Link>
     </Card>
      ))}
    </div>
  )
}

export default HomeComponent