import api from ".";

export const getAllEvents = async () => {
    const { data } = await api.get('/events', {
        headers: {
            'Cache-Control' : 'no-cache',
        },
    })
    return data
}