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

  return response
}


export async function postPhoto(image) {
    const response = await api.put('users/post-main-profile', {
      headers: {
        'Cache-Control' : 'no-cache',
        'Authorization' : localStorage.getItem('token')
      },
      body: JSON.stringify({
        image : image
      })
    })
   
    return response
}