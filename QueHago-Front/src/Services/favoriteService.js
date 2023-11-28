import api from './index.js'

export const getUsersFavorites = async() => {

    const { data } = await api.get('/users/getfav', {
        headers : {
            'Cache-Control' : 'no-cache',
            'Authorization' : localStorage.getItem('token')
        }
    })
    console.log(data)
    return data
}

export const userSetsFavorite = async(id) => {
    const {response} = await api.post('/users/addfav',  {
        headers : {
            'Cache-Control' : 'no-cache',
            'Authorization' : localStorage.getItem('token')
        }
    })
    console.log(response)
    return response
}