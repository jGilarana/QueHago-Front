import api from './index.js'

export const getUsersFavorites = async() => {

    const { data } = await api.get('/users/getfav', {
        headers : {
            'Cache-Control' : 'no-cache',
            'Authorization' : localStorage.getItem('token')
        }
    })

    return data
    
}

export const userSetsFavorite = async(id) => {
    const {response} = await api.post('/users/addfav', {
        eventId : id
    }, {
        headers : {
            'Cache-Control' : 'no-cache',
            'Authorization' : localStorage.getItem('token')
        }
    })
    return response
}

export const userDeletesFav = async(id) => {
    const {response} = await api.delete(`/users/deletefav/${id}`, {
        headers : {
            'Cache-Control' : 'no-cache',
            'Authorization' : localStorage.getItem('token')
        }
    })
    return response
}