import api from "."

export const signupClub = async (signUpData) => {
  const response = await api.post("/auth/signup/club", signUpData)
  return response
}

export const getClubsEvents = async () => {
  const { data } = await api.get("/clubs/events", {
    headers: {
      "Cache-Control": "no-cache",
      Authorization: localStorage.getItem("token"),
    },
  })
  return data
}

export const createClubsEvents = async (eventData) => {
  try {
    const data = await api.post("clubs/create", eventData, {
      headers: {
        "Cache-Control": "no-cache",
        Authorization: localStorage.getItem("token"),
      },
    })
    console.log(data)
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const getOwnClub = async () => {

  const data = await api.get("/clubs/ownclub", {
    headers: {
      "Cache-Control": "no-cache",
      'Authorization': localStorage.getItem("token"),
    },
  })
  console.log(data)
  return data
}

export const updateOwnCLub = async (clubData) => {
  try {
    const data = await api.put("clubs/profile", clubData, {
     
      headers: {
        "Cache-Control": "no-cache",
        Authorization: localStorage.getItem("token"),
      },
    })
    return data
  } catch (error) {
    console.log(error.message)
  }
}


export async function postClubPhoto(image) {
  try {
    const response = await api.put('clubs/profile', {
      image: image
    }, {
      headers: {
        'Cache-Control': 'no-cache',
        'Authorization': localStorage.getItem('token')
      }
    });

    return response.data; // Devolvemos solo los datos de la respuesta, no toda la respuesta
  } catch (error) {
    console.error('Error al enviar la foto:', error);
    throw error; // Rechazamos la promesa para que el error se propague
  }
}

// NO OLVIDARSE DEL CHECK ROLE
