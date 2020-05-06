declare const __WEBPACK_ENV_BASENAME__: string

// Luosimao captcha
interface Window {
  LUOCAPTCHA?: LUOCAPTCHA.Statics
  handleCaptchaCallback?: (captcha: string) => void
}

declare namespace LUOCAPTCHA {
  interface Statics {
    reset(): void
  }
}
