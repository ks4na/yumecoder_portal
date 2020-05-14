import enUS from './en-US'
import jaJP from './ja-JP'
import zhCN from './zh-CN'

type LocaleInfoValueMsgType<MsgObj extends {}> = {
  [P in keyof MsgObj]: string
}

interface LocaleInfoValueType<DefaultLocaleType> {
  locale: string
  msgs: LocaleInfoValueMsgType<DefaultLocaleType>
}

export type LocaleInfosType<K extends string, DefaultLocaleType> = {
  [P in K]: LocaleInfoValueType<DefaultLocaleType>
}

export type LocaleKey = 'zh-cn' | 'en-us' | 'ja-jp'

// 声明 “默认的 locale” 和 “默认的 locale 对应的msgs的类型”
const defaultLocale: LocaleKey = 'zh-cn'
type DefaultLocaleMsgsType = typeof zhCN

const localeInfos: LocaleInfosType<LocaleKey, DefaultLocaleMsgsType> = {
  'zh-cn': { locale: 'zh-cn', msgs: zhCN },
  'en-us': { locale: 'en', msgs: enUS },
  'ja-jp': {
    locale: 'ja',
    msgs: jaJP as LocaleInfoValueMsgType<DefaultLocaleMsgsType>,
  },
}

export function getLocale(str?: string): LocaleKey {
  const localeFromStorage =
    window.localStorage && window.localStorage.getItem('locale')
  const navigatorLang =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.navigator.language || (window.navigator as any).browserLanguage
  const locale = str || localeFromStorage || navigatorLang || defaultLocale

  const lowerCaseLocale = locale.toLowerCase()

  const item = (Object.keys(localeInfos) as LocaleKey[]).find(
    item => item.indexOf(lowerCaseLocale) !== -1
  )
  if (item) {
    return item
  }
  return defaultLocale
}

export function getLocaleMessages(
  locale = defaultLocale
): LocaleInfoValueMsgType<DefaultLocaleMsgsType> {
  let localeMessages
  const lowerCaseLocale = locale.toLowerCase()
  const key = (Object.keys(localeInfos) as LocaleKey[]).find(
    item => item.indexOf(lowerCaseLocale) !== -1
  )
  if (key) {
    localeMessages = localeInfos[key].msgs
  } else {
    localeMessages = localeInfos[defaultLocale].msgs
  }
  return localeMessages
}

export function saveLocaleToLocalStorage(locale: LocaleKey): boolean {
  window.localStorage.setItem('locale', locale)
  return true
}
