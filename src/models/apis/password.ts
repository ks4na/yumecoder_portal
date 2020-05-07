import axios, { AxiosResponse } from 'axios'

// handle pwdReset email validation
export interface EmailValidationParams {
  email: string
  captcha: string
}

export interface EmailValidationErrorReturnType {
  code: number
  msg: string
}

export type EmailValidationReturnType = true | EmailValidationErrorReturnType

export async function handleEmailValidation({
  email,
  captcha,
}: EmailValidationParams): Promise<AxiosResponse<EmailValidationReturnType>> {
  return await axios.post('/api/pwd/resetValidate', {
    email,
    captcha,
  })
}

// handle pwd reset
export interface PwdResetParams {
  email: string
  password: string
  validationCode: string
}

export interface PwdResetErrorReturnType {
  code: number
  msg: string
}

export type PwdResetReturnType = true | PwdResetErrorReturnType

export async function handlePwdReset({
  email,
  password,
  validationCode,
}: PwdResetParams): Promise<AxiosResponse<PwdResetReturnType>> {
  return await axios.post('/api/pwd/reset', {
    email,
    password,
    activeCode: validationCode,
  })
}
