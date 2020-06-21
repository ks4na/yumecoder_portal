import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import history from './history'
import store from './reduxStore'
import { addSnackbarItem } from '../models/actions'
import { FormattedMessage } from 'react-intl'
import { defaultLocale } from '../locales'

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

//////////////////////////
// 请求拦截器
//////////////////////////

// add locale field
function addLocale(config: AxiosRequestConfig): AxiosRequestConfig {
  // 发送请求时，携带 locale 信息
  let locale = localStorage.getItem('locale')
  if (!locale) {
    locale = defaultLocale
  }
  if (config.method === 'get' || config.method === 'GET') {
    config.params = { locale, ...config.params }
  } else {
    // 非 GET 请求
    if (config.url) {
      if (!config.url.includes('?')) {
        config.url += `?locale=${locale}`
      } else {
        const searchString = config.url.substring(config.url.search(/\?/))
        const urlSearchParams = new URLSearchParams(searchString)
        const hasExistedLocale = urlSearchParams.get('locale') !== null
        if (!hasExistedLocale) {
          urlSearchParams.append('locale', locale)
          config.url =
            config.url.substring(0, config.url.search(/\?/) + 1) +
            urlSearchParams.toString()
        }
      }
    }
  }
  return config
}

// add Authorization
function addAuthorization(config: AxiosRequestConfig): AxiosRequestConfig {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: accessToken,
    }
  }
  return config
}

function handleRequestError(error: unknown): Promise<unknown> {
  console.log(error)
  return Promise.reject(error)
}

// 请求错误处理器
axios.interceptors.request.use(undefined, handleRequestError)
// 添加 locale 字段，后台根据 locale 判断语言
axios.interceptors.request.use(addLocale)
// 添加 Authorizaiton 字段，携带 accessToken
axios.interceptors.request.use(addAuthorization)

//////////////////////////
// 响应拦截器
//////////////////////////

let requestQueue: ((newAccessToken: string) => void)[] = []
let isRefreshing = false
// 创建专门用于 refreshToken 的 axios 实例来发送请求
const refreshTokenInstance = axios.create()

// 校验使用的 accessToken 与本地保存的 accessToken 是否一致
function hasAccessTokenBeenUpdated(accessToken?: string): boolean {
  const localAccessToken = localStorage.getItem('accessToken')
  if (!localAccessToken && !accessToken) {
    return false
  } else if (localAccessToken === accessToken) {
    return false
  }
  return true
}

// 使用新的 accessToken 重新请求
function newRequestWithLatestAccessToken(
  odlConfig: AxiosRequestConfig
): Promise<AxiosResponse<unknown>> {
  const config: AxiosRequestConfig = {
    ...odlConfig,
    headers: {
      ...odlConfig.headers,
      Authorization: localStorage.getItem('accessToken'),
    },
  }
  return refreshTokenInstance.request(config)
}

// 处理 refreshToken 失败
function handleRefreshTokenFailed(err: Error): void {
  console.log('auto refresh token failed: ', err)
  // 添加 snackbar 提示消息
  store.dispatch(
    addSnackbarItem({
      messageComponent: FormattedMessage,
      messageComponentProps: {
        id: 'axios.config.interceptors.response.autoRefreshToken.failed',
        defaultMessage: 'token 授权信息失效，请重新登录',
      },
    })
  )
  // 跳转到 login 页面
  history.push('/login', {
    from: history.location.pathname,
  })
}

// 处理 refreshToken
async function handleRefreshToken(): Promise<void> {
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      throw new Error('no refresh_token')
    }

    const refreshTokenResponse = await refreshTokenInstance.post(
      '/api/refreshToken',
      {
        // eslint-disable-next-line @typescript-eslint/camelcase
        refresh_token: refreshToken,
      }
    )

    const {
      code,
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    } = refreshTokenResponse.data
    if (code !== 0) {
      // 接口返回的错误信息
      throw new Error('invalid refresh_token: ' + refreshTokenResponse.data.msg)
    } else {
      // 保存 newAccessToken / newRefreshToken （如果有的话） 到本地
      if (!newAccessToken) {
        // 接口返回值如果发生异常不存在 access_token 字段，抛出错误
        // 避免继续调用下面的逻辑导致死循环
        throw new Error('no "access_token" field from server')
      }
      localStorage.setItem('accessToken', newAccessToken)
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken)
      }

      // 重新调用请求队列中的请求
      requestQueue.forEach(item => item(newAccessToken))
    }
  } catch (err) {
    handleRefreshTokenFailed(err)
  } finally {
    // 重置 isRefreshing 状态
    isRefreshing = false
    requestQueue = []
  }
}

// 无痛刷新 accessToken 和 refreshToken (如果接口有返回 refresh_token 的话)
function autoRefreshToken(error: unknown): Promise<unknown> {
  const response = (error as AxiosError).response

  // 拦截 401 错误的请求
  if (response && response.status === 401) {
    // 验证该请求使用的 accessToken 与本地保存的 accessToken 是否一致，
    // 如果不一致，则表明已经重新获取过 token 了， 直接使用新 accessToken
    // 重新请求即可
    const accessToken = response.config.headers.Authorization
    if (hasAccessTokenBeenUpdated(accessToken)) {
      return newRequestWithLatestAccessToken(response.config)
    }
    // 判断是否已经在 refreshing 中，
    // 限制同一时间只存在一个 refreshing 的请求
    if (!isRefreshing) {
      isRefreshing = true
      handleRefreshToken()
    }

    // 返回 Promise, Pormise 的 reslove 被包裹在函数中 push 到 requestQueue 数组，
    // 等待 refresh 完成后调用数组中每一项使 Promise 变成 fullfilled 状态
    return new Promise(resolve => {
      requestQueue.push((newAccessToken: string) => {
        const config: AxiosRequestConfig = {
          ...response.config,
          headers: {
            ...response.config.headers,
            Authorization: newAccessToken,
          },
        }
        resolve(refreshTokenInstance.request(config))
      })
    })
  }

  // 其它非 401 错误
  return Promise.reject(error)
}

function handleResponseError(error: unknown): Promise<unknown> {
  return Promise.reject(error)
}

// 无痛刷新 accessToken 和 refreshToken (如果有返回 refresh_token 的话)
axios.interceptors.response.use(undefined, autoRefreshToken)
// 响应错误处理器
axios.interceptors.response.use(undefined, handleResponseError)
