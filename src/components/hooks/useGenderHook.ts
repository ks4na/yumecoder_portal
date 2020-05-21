import React from 'react'
import { useIntl } from 'react-intl'

// useGenderHook
export enum Gender {
  Male = 1,
  Female = 2,
  Unknown = 0,
}

export default function useGenderHook(): GetGenderHookReturnType {
  const intl = useIntl()

  const getGenderEntries = React.useCallback((): [number, string][] => {
    const entries: [number, string][] = []
    for (const key in Gender) {
      if (!isNaN(Number(key))) {
        entries.push([Number(key), Gender[key]])
      }
    }
    return entries
  }, [])

  const txtGenderMale = intl.formatMessage({
    id: 'home.profile.txtGenderMale',
    defaultMessage: '男',
  })
  const txtGenderFemale = intl.formatMessage({
    id: 'home.profile.txtGenderFemale',
    defaultMessage: '女',
  })
  const txtGenderUnknown = intl.formatMessage({
    id: 'home.profile.txtGenderUnknown',
    defaultMessage: '未选择',
  })

  const getGenderTxt = React.useCallback(
    (gender = Gender.Unknown): string => {
      switch (gender) {
        case Gender.Unknown:
          return txtGenderUnknown
        case Gender.Male:
          return txtGenderMale
        case Gender.Female:
          return txtGenderFemale
        default:
          return txtGenderUnknown
      }
    },
    [txtGenderFemale, txtGenderMale, txtGenderUnknown]
  )

  return {
    getGenderEntries,
    getGenderTxt,
  }
}

export interface GetGenderHookReturnType {
  getGenderEntries: () => [number, string][]
  getGenderTxt: (gender?: number) => string
}
