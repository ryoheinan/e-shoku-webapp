import axios from 'axios'

const instance = axios.create()
let url: string
if (process.env.NODE_ENV === 'production') {
  // production url
} else {
  const apiPort = process.env.API_PORT || 8000
  url = `http://localhost:${apiPort}/api`
}

instance.interceptors.request.use(async (config) => {
  config.baseURL = url
  config.headers.common['Accept'] = 'application/json'
  config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  config.timeout = 2500
  return config
})

export default instance
