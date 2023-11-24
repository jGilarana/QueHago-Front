import api from '.'


export const getClubsEvents = async () => {
    const { data } = await api.get('/clubs/events', {
        headers: {
            'Cache-Control' : 'no-cache',
            'Authorization' : localStorage.getItem('token')
        },
    })
    return data
}

export const createClubsEvents = async(eventData) => {
 try {
   const data = await api.post('clubs/create', eventData, {
    headers: {
        'Cache-Control' : 'no-cache',
        'Authorization' : localStorage.getItem('token')
    },
} )
   console.log(data)
   return data
 } catch (error) {
   console.log(error.message)
 }
}
// NO OLVIDARSE DEL CHECK ROLE