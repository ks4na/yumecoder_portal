declare module 'check-browser-info' {
  interface BrowserInfoObject {
    name: string
    version: string
    platform: string
  }
  function detectBrowserInfo(): BrowserInfoObject
  export = detectBrowserInfo
}
