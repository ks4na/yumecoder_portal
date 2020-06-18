import axios, { AxiosResponse } from 'axios'

// handle request logout
export type RequestLogoutReturnType = true

export async function handleRequestLogout(): Promise<
  AxiosResponse<RequestLogoutReturnType>
> {
  return await axios.put('/api/users/logout')
}
