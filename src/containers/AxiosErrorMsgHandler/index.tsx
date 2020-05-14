import React from 'react'
import { AxiosError } from 'axios'
import { FormattedMessage } from 'react-intl'

export interface AxiosErrorMsgHandlerProps {
  error: AxiosError
}

export default function AxiosErrorMsgHandler({
  error,
}: AxiosErrorMsgHandlerProps): JSX.Element {
  // 服务器有响应， 但是状态码不在 2xx 范围内
  if (error.response) {
    return (
      <>
        <FormattedMessage
          id="AxiosErrorMsgHandler.index.txtRequestError"
          defaultMessage="请求发生错误"
        />
        {', '}
        <FormattedMessage
          id="AxiosErrorMsgHandler.index.txtResponseStatusCode"
          defaultMessage="状态码"
        />
        {': '}
        {error.response.status}
      </>
    )
  }
  // 设置 ajax 请求时发生错误
  return (
    <>
      <FormattedMessage
        id="AxiosErrorMsgHandler.index.txtRequestError"
        defaultMessage="请求发生错误"
      />
    </>
  )
}
