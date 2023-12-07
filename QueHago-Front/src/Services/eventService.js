import api from ".";

export const getAllEvents = async () => {
    const { data } = await api.get('/events', {
        headers: {
            'Cache-Control' : 'no-cache',
        },
    })
    return data
}

export const getOneEvent = async (eventId) => {
    const { data } = await api.get(`/events/${eventId}`, {
        headers: {
            'Cache-Control' : 'no-cache',
            'Authorization' : localStorage.getItem('token')
        },
    })
    return data
}

export const updateClubsEvent = async(id, eventData) => {
   
    const response = await api.put(`/events/${id}`, eventData, {
        headers : {
            'Cache-Control' : 'no-cache',
            'Authorization' : localStorage.getItem('token')
        }
    })
    console.log(response)
}

export const deleteEvents = async (id) => {

        const response = await api.delete(`/events/${id}`, {

            headers : {
                'Cache-Control' : 'no-cache',
                'Authorization' : localStorage.getItem('token')
            }
        })         
        return response
}