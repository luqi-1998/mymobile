const setToken = (token, KEY = 'token') => {
  localStorage.setItem(KEY, token)
}
const getToken = (KEY = 'token') => {
  return localStorage.getItem(KEY)
}
const removeToken = (KEY = 'token') => {
  return localStorage.removeItem(KEY)
}

export { setToken, getToken, removeToken }
