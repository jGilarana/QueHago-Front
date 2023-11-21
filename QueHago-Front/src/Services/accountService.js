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

  console.log(response)
  return response
}