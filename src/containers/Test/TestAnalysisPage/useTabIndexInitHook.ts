import React from 'react'
import { useLocation } from 'react-router-dom'
import useShownQuestionsHook from './useShownQuestionsHook'
import { isNonNegativeInteger } from '../../../configs/validation'
import { changeTabIndex } from '../../../models/actions'
import { useDispatch } from 'react-redux'

export default function useTabIndexInitHook(): void {
  const location = useLocation()
  const dispatch = useDispatch()
  // 获取需要展示的 questions
  const { shownQuestions } = useShownQuestionsHook()

  // 获取查询参数，并设置 tabIndex
  React.useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search)
    const tabIndex = urlSearchParams.get('tabIndex')

    // 校验 tabIndex 合法性，合法则切换到 tabIndex 对应的 panel
    if (tabIndex && isNonNegativeInteger(tabIndex)) {
      const tabIndexNumber = Number(tabIndex)

      // tabIndex 在 [0, shownQuestions.length) 范围内的话，
      // 才切换 panel
      const isInRange = tabIndexNumber <= shownQuestions.length - 1

      isInRange && dispatch(changeTabIndex(tabIndexNumber))
    }
  }, [dispatch, location.search, shownQuestions.length])
}
