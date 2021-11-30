import axios, { AxiosError } from 'axios'

const instance = axios.create()
let url: string
if (process.env.NODE_ENV === 'production') {
  url = 'https://e-shoku.herokuapp.com/api'
} else if (process.env.API_CONNECTION === 'heroku') {
  url = 'https://e-shoku.herokuapp.com/api'
} else {
  const apiPort = process.env.API_PORT || 8000
  url = `http://localhost:${apiPort}/api`
}

instance.interceptors.request.use((config) => {
  config.baseURL = url
  config.headers.common['Accept'] = 'application/json'
  config.headers.common['User-Agent'] = 'e-Shoku Frontend'
  config.headers.post['Content-Type'] = 'application/json'
  config.timeout = 5500
  return config
})

export const isAxiosError = (error: any): error is AxiosError => {
  return axios.isAxiosError(error)
}

export default instance
