import { getToken, setToken, getRefreshToken, setRefreshToken, clearToken } from './token'

const instance = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  transformRequest: [function transformRequest (data) {
    return JSON.stringify(data)
  }],
  // transformResponse: [function transformResponse (data) {
  //   alert('data:' + data)
  //   return data.data
  // }],
  responseType: 'json'
})

instance.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = token
  }
  if (config.method == 'post') {
    config.data = {
      ...config.data,
      _t: Date.parse(new Date()) / 1000
    }
  } else if (config.method == 'get') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
  }
  return config
})

const retry = (config) => {
  return instance.post('/sysUserLogin/refreshToken', { refreshToken: getRefreshToken() }).then(res => {
    setToken(res.access_token)
    setRefreshToken(res.refresh_token)
    return instance.request(config)
  })
}

const isTokenExpries = response => {
  return response.status === 401 && response.request.response.code === 403 && getRefreshToken()
}

instance.interceptors.response.use(response => {
  if (response.data) {
    return response.data.data
  }
}, error => {
  if (isTokenExpries(error.response)) {
    return retry(error.config)
  } else {
    if(error.response.status === 401){
      clearToken()
      window.singleSpa.navigateToUrl('/user/login')
    }
    return Promise.reject(error)
  }
})

export default instance
