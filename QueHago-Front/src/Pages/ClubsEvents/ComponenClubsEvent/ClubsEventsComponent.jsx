import React from 'react'
import { Link } from "react-router-dom"
import { Card } from '@mui/material'
import './ClubsEventsComponent.css'


const ClubsEventsComponent = ({events}) => {


  return (
    
    <div className='clubsEventsContainer'>
         <Card sx={{ 
        backgroundColor: 'white',
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
          </Card>
    </div>
  )
}

export default ClubsEventsComponent