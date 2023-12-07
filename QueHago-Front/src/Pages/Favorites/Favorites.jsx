import React, { useEffect, useState } from 'react'
import ComponentFavorites from './ComponentFavorites/ComponentFavorites'
import { getUsersFavorites } from '../../Services/favoriteService'
import dayjs from 'dayjs'

const Favorites = () => {

    const [favorite, setFavorite] = useState([])

    const getFavorites = async() =>  {
        const data = await getUsersFavorites()
        setFavorite(data.sort((a, b) => dayjs(b.date).diff(dayjs(a.date))))
    }
    
    useEffect(() => {
        getFavorites()
    },[])

  return (

    <ComponentFavorites fav={favorite} eventOpenTime={favorite && favorite.openTime} eventCloseTime={favorite && favorite?.closeTime}/>

  )
}

export default Favorites