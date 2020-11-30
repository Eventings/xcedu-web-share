import webStorage from './webStorage'

const TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refreshToken'

const getItem = key => (webStorage.getItem(key) || '')
const setItem = (key, value) => webStorage.setItem(key, value)

const getToken = () => {
  const token = getItem(TOKEN_KEY)

  return token ? 'Bearer '+ token : ''
}
const setToken = token => setItem(TOKEN_KEY, token)
const getRefreshToken = () => getItem(REFRESH_TOKEN_KEY)
const setRefreshToken = refreshToken => setItem(REFRESH_TOKEN_KEY, refreshToken)
const clearToken = () => {
  webStorage.removeItem(TOKEN_KEY)
  webStorage.removeItem(REFRESH_TOKEN_KEY)
}

export { getToken, setToken, getRefreshToken, setRefreshToken, clearToken }
