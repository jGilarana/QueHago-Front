import api from "."

export async function login(loginData) {
  const response = await api.post('/auth/login', loginData)
  return response
}

export async function signup(signupData) {
  const response = await api.post('/auth/signup', signupData)
  return response
}