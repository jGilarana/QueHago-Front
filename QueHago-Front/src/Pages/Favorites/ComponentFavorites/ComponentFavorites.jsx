import React from 'react'
import './ComponentFavorite.css'
import { Card } from '@mui/material'
import { width } from '@mui/system'

const ComponentFavorites = ({fav}) => {

  return (
    <div className='favContainer'>ComponentFavorites
    {fav.map((em, i) => {
      return (
        <Card
        key={em.id}
        sx={{
          backgroundColor: '#131313',
          margin: '2vw',
          width: '10vw',
          height: '40vh',
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '12px',
          textAlign: 'center',
          overflow: 'hidden',
          color: 'white',
      
          '@media (min-width: 600px) and (max-width: 1080px)': {
            width: '20vw',
            height: '40vh', 
          },
      
          '@media (max-width: 600px)': {
            width: '42vw',
            height: '40vh', 
          }
        }}
      >
         <h1 key={em.id}>{em.title} </h1> 
         <img src={em.image}></img>
        </Card>
      )
    })}
    </div>
  )
}

export default ComponentFavorites