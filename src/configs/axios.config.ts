import axios from 'axios'

interface BaseUrls {
  [propName: string]: string
}

const baseUrls: BaseUrls = {
  development: '',
  unittest: '',
  sit: '//api.yumecoder.top/sit',
  production: '//api.yumecoder.top/prod',
}

// 配置 axios 的 baseURL
axios.defaults.baseURL =
  baseUrls[process.env.AXIOS_ENV || process.env.NODE_ENV || 'development'] ||
  baseUrls.development

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 发送请求时，携带 locale 信息
    const locale = localStorage.getItem('locale')
    if (locale) {
      if (config.method === 'get') {
        config.params = { locale, ...config.params }
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
