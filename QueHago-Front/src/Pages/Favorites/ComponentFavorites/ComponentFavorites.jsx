import React, { useEffect, useState } from "react"
import "./ComponentFavorite.css"
import { Card } from "@mui/material"
import {
  getUsersFavorites,
  userDeletesFav,
  userSetsFavorite,
} from "../../../Services/favoriteService"
import { FavoriteBorder } from "@mui/icons-material"
import dayjs from "dayjs"

const ComponentFavorites = ({ fav }) => {
  const [favorite, setFavorite] = useState([])
  const [refresh, setRefresh] = useState(false)

  const getFavorites = async () => {
    const data = await getUsersFavorites()
    setFavorite(data)
  }

  const sames = favorite.map((em) => em.favorite.eventId)

  useEffect(() => {
    getFavorites()
  }, [refresh])

  const setUsersFavorite = async (id) => {
    const data = await userSetsFavorite(id)
    setRefresh(!refresh)
    return "Favourite added"
  }

  const deleteFav = async (id) => {
    const data = await userDeletesFav(id)
    setRefresh(!refresh)
    return "Favourite deleted"
  }

  return (
    <div className="pageContainer">
      <div className="favContainer">
        {fav.map((em, i) => {
          return (
            <Card
              className="scrollBar"
              onClick={
                localStorage.getItem("token") ? null : () => handleOpen()
              }
              key={em.id}
              sx={{
                background:
                  "linear-gradient(13deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 39%, rgba(53,0,255,1) 100%)",
                margin: "2vw",
                width: "13vw",
                height: "48vh",
                alignItems: "center",
                display: sames.includes(em.id) ? "flex" : "none",
                flexDirection: "column",
                borderRadius: "12px",
                textAlign: "center",
                color: "white",
                justifyContent: "space-evenly",
                boxSizing: "border-box",
                position: "relative",
                padding: "0.3rem",

                "@media (min-width: 600px) and (max-width: 1080px)": {
                  width: "18vw",
                  height: "40vh",
                },

                "@media (max-width: 600px)": {
                  width: "40vw",
                  height: "40vh",
                },
                ":hover": {
                  opacity: "100%",
                  cursor: "pointer",
                  border: "2px solid",
                },
              }}
            >
              {em?.openTime && (
                <p
                  className={
                    localStorage.getItem("token") ? "hour" : "hourNoToken"
                  }
                >
                  {em.openTime.slice(0, -3)} - {em.closeTime.slice(0, -3)}
                </p>
              )}
              <FavoriteBorder
                color="transparent"
                sx={{
                  display: localStorage.getItem("role") ? "flex" : "none",
                  width: "3vw",
                  height: "3vh",
                  position:'absolute',
                  top:'10px'
                }}
                className={sames.includes(em.id) ? "favIcon" : "noFavIcon"}
                onClick={
                  sames.includes(em.id)
                    ? () => deleteFav(em.id)
                    : () => setUsersFavorite(em.id)
                }
              ></FavoriteBorder>
            <div className='noHeaderCard' onClick={localStorage.getItem('token') ? () => navigation(`/event/${em.id}`) : handleOpen} >
          <h2 style={{fontSize:'1.3rem'}} className='eventTitle' key={em.id}>{em.title}</h2>
          <img className='event' key={i} 
          src={(em.image === null) ? 'https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg' : (em.image)}>
          </img>
          <h3 style={{fontSize:'0.8rem'}}>{dayjs(em.date).format("dddd , D [de] MMMM [de] YYYY")}</h3> 
          {em?.openTime && <h4>{em.openTime.slice(0, -3)} - {em.closeTime.slice(0, -3)}</h4>}
          <p className='address'>Click para ver más</p>
          </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default ComponentFavorites
