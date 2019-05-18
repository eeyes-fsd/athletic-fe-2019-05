import axios from 'axios'
import store from '@/store'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || ''
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const config = {
  baseURL: '/api'
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

// Add a request interceptor
_axios.interceptors.request.use(function(config) {
  const password = store.state.password
  // 已经保存下密码，并且没有指定密码时，添加header
  if (password && !config.headers['password']) {
    config.headers['password'] = password
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

// Add a response interceptor
_axios.interceptors.response.use(
  function({ data }) {
    return data
  },
  function({ response: { data }}) {
    if (data !== undefined && data) {
      if (data.message) {
        return Promise.reject(new Error(data.message))
      } else {
        return Promise.reject(new Error('服务器异常，严重错误'))
      }
    } else {
      // 状态码200，但是没有message说明后端框架加载失败
      return Promise.reject(new Error('服务器异常，请检查网络连接'))
    }
  }
)

export default _axios
