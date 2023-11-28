import React, { useEffect, useState } from 'react'
import ComponentFavorites from './ComponentFavorites/ComponentFavorites'
import { getUsersFavorites } from '../../Services/favoriteService'

const Favorites = () => {

    const [favorite, setFavorite] = useState([])

    const getFavorites = async() =>  {
        const data = await getUsersFavorites()
        console.log(data)
        setFavorite(data)
    }
    
    useEffect(() => {
        getFavorites()
    },[])

  return (

    <ComponentFavorites fav={favorite}/>

  )
}

export default Favorites