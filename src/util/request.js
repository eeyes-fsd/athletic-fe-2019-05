import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || ''
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const config = {
  baseURL: process.env.baseURL || process.env.apiUrl || '/'
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

// Add a response interceptor
_axios.interceptors.response.use(
  function({ data }) {
    if (data !== undefined && data) {
      // 正确响应
      return data
    } else {
      // 状态码200，但是没有ret说明后端框架加载失败
      return Promise.reject(new Error('服务器异常，请检查网络连接'))
    }
  },
  function({ response: { data }}) {
    if (data !== undefined && data) {
      // 正确响应
      return data
    } else {
      // 状态码200，但是没有ret说明后端框架加载失败
      return Promise.reject(new Error('服务器异常，请检查网络连接'))
    }
  }
)

export default _axios