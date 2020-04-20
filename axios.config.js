import axios from 'axios'

const baseUrls = {
  development: '',
  unittest: '',
  sit: '//testserver.com',
  production: '//prodserver.com',
}

// 配置 axios 的 baseURL
axios.defaults.baseURL =
  baseUrls[process.env.NODE_ENV || 'development'] || baseUrls.development

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 发送请求时，携带 locale 信息
    const locale = localStorage.getItem('locale')
    if (locale) {
      if (config.method === 'get') {
        config.params.locale = locale
      } else {
        config.url += `?locale=${locale}`
      }
    }
    return config
  },
  function(error) {
    throw error
  }
)
