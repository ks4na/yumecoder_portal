interface Window {
  QC?: QC.QC
}

declare namespace QC {
  interface QC {
    Login: QCLogin
    api: Function
    [props: string]: unknown
  }

  interface QCLogin {
    (
      options?: QCLoginOptions,
      loginCb?: Function,
      logoutCb?: Function,
      outCb?: Function
    ): void
    showPopup(options: ShowPropUpOptions): void
    check(): boolean
    getMe(cb: (openId: string, accessToken: string) => void): void
    signOut(): void
    [props: string]: unknown
  }

  interface QCLoginOptions {
    btnId?: string
    showModal?: boolean
    scope?: string
    size?: string
  }

  interface ShowPropUpOptions {
    appId?: string
    redirectURI?: string
  }

  interface QCApiResponse {
    code: number
    ret: number
    status: string
    data: {
      gender: string
      nickname: string
      figureurl_qq_1: string
      [props: string]: string | number
    }
    fmt: 'json' | 'xml'
    seq: string
  }
}
