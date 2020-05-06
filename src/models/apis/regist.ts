import axios, { AxiosResponse } from 'axios'

// regist
export interface RegistParams {
  email: string
  password: string
  captcha: string
}

export interface RegistErrorReturnType {
  code: number
  msg: string
}
export type RegistReturnType = true | RegistErrorReturnType

export async function handleRegist({
  email,
  password,
  captcha,
}: RegistParams): Promise<AxiosResponse<RegistReturnType>> {
  return await axios.post('/api/regist/validate', {
    email,
    password,
    captcha,
  })
}

// handle regist email check
export async function handleRegistEmailCheck(
  email: string
): Promise<AxiosResponse<boolean>> {
  return await axios.get('/api/regist/isUsedEmail', {
    params: {
      email,
    },
  })
}

// handle activate
export interface ActivateParams {
  email: string
  activeCode: string
}
export interface ActivateErrorReturnType {
  code: number
  msg: string
}

export type ActivateReturnType = true | ActivateErrorReturnType

export async function handleActivate({
  email,
  activeCode,
}: ActivateParams): Promise<AxiosResponse<ActivateReturnType>> {
  return await axios.post('/api/regist/active', {
    email,
    activeCode,
  })
}
