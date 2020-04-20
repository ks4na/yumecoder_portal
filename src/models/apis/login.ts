import axios, { AxiosResponse } from 'axios'

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

export async function handleUserLogin(
  loginInfo: LoginInfoType
): Promise<AxiosResponse<UserLoginReturnType>> {
  return await axios.post('/api/login', {
    account: loginInfo.account,
    password: loginInfo.password,
  })
}
