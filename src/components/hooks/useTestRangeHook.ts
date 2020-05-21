import React from 'react'
import { useIntl } from 'react-intl'

export enum TestRange {
  OnlyNew = 0,
  OnlyMistakes = 1,
  NewAndMistakes = 2,
  All = 3,
}

export default function useTestRangeHook(): TestRangeHookReturnType {
  const intl = useIntl()
  const txtOnlyNew = intl.formatMessage({
    id: 'home.settings.txtOnlyNew',
    defaultMessage: '只出新题',
  })
  const txtOnlyMistakes = intl.formatMessage({
    id: 'home.settings.txtOnlyMistakes',
    defaultMessage: '只出错题',
  })
  const txtNewAndMistakes = intl.formatMessage({
    id: 'home.settings.txtNewAndMistakes',
    defaultMessage: '新题加错题',
  })
  const txtAll = intl.formatMessage({
    id: 'home.settings.txtAll',
    defaultMessage: '全部题目',
  })

  const getTestRangeTxt = React.useCallback(
    (testRange: TestRange): string => {
      switch (testRange) {
        case TestRange.OnlyNew:
          return txtOnlyNew
        case TestRange.OnlyMistakes:
          return txtOnlyMistakes
        case TestRange.NewAndMistakes:
          return txtNewAndMistakes
        case TestRange.All:
          return txtAll
        default:
          return txtOnlyNew
      }
    },
    [txtAll, txtNewAndMistakes, txtOnlyMistakes, txtOnlyNew]
  )

  return {
    getTestRangeTxt,
  }
}

export interface TestRangeHookReturnType {
  getTestRangeTxt: (testRange: TestRange) => string
}
