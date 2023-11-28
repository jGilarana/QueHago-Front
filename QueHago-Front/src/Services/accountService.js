import api from "."

export async function login(loginData) {
  const response = await api.post('/auth/login', loginData)
  return response
}

export async function signup(signupData) {
  const response = await api.post('/auth/signup', signupData)
  return response
}

export async function getProfile() {
  const response = await api.get('/users/profile', {
    headers: {
        'Cache-Control' : 'no-cache',
        'Authorization' : localStorage.getItem('token')
    },
})
  if (!localStorage.getItem('token')) {
    console.log('You must be logged in to see your own profile')
  }
  return response
}


export async function postPhoto(image) {
  try {
    const response = await api.put('users/postprofile', {
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

export async function postProfile(data) {
  try {
    const response = await api.put('users/postprofile', data, {
      headers: {
        
        'Cache-Control': 'no-cache',
        'Authorization': localStorage.getItem('token')
      }
    });
    const token = (localStorage.getItem('token'));
    console.log('Token:', token);
    return response.data;
  } catch (error) {
    const token = (localStorage.getItem('token'));
    console.log('Token:', token);
    console.error('Error al actualizar Usuario', error);
    if (error.response) {
      // El servidor devolvió una respuesta de error
      console.error('Respuesta de error del servidor:', error.response.data);
      console.error('Código de estado:', error.response.status);
    } else if (error.request) {
      // La solicitud fue realizada pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor');
    } else {
      // Ocurrió un error antes de enviar la solicitud
      console.error('Error al procesar la solicitud:', error.message);
    }
    throw error;
  }
}