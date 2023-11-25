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