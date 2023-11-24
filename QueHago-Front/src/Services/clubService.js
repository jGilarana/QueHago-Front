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

export const createClubsEvents = async() => {
    const { data } = await api.post('/clubs/create', {
        headers: {
            'Cache-Control' : 'no-cache',
            'Authorization' : localStorage.getItem('token')
        },
    })
    return data
}

// NO OLVIDARSE DEL CHECK ROLE