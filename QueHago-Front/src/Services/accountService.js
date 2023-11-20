import api from "."

export async function login(loginData) {
  const response = await authApi.post('/auth/login', loginData)
  return response
}

export async function signup(signupData) {
  const response = await authApi.post('/auth/signup', signupData)
  return response
}