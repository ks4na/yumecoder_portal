import axios, { AxiosResponse } from 'axios'

// common login
export async function handleUserLogin(
  loginInfo: LoginInfoType
): Promise<AxiosResponse<UserLoginReturnType>> {
  return await axios.post('/api/login', {
    account: loginInfo.account,
    password: loginInfo.password,
  })
}

export interface LoginInfoType {
  account: string
  password: string
}

export interface UserLoginReturnType {
  code: number
  msg?: string
  access_token?: string
  refresh_token?: string
}

// github login
export async function handleGithubLogin(
  code: string
): Promise<AxiosResponse<GithubLoginReturnType>> {
  return await axios.post('/api/login/github', {
    code,
  })
}

export interface GithubLoginReturnType {
  code: number
  msg?: string
  access_token?: string
  refresh_token?: string
}
