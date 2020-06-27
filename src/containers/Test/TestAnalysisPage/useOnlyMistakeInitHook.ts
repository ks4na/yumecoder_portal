import React from 'react'
import { useLocation } from 'react-router-dom'
import useShownQuestionsHook from './useShownQuestionsHook'
import { toggleOnlyShowMistakeState } from '../../../models/actions'
import { useDispatch } from 'react-redux'

export default function useOnlyMistakeHook(): void {
  const location = useLocation()
  const dispatch = useDispatch()
  // 获取需要展示的 questions
  const { shownQuestions } = useShownQuestionsHook()

  // 获取查询参数，并设置 onlyShowMistake
  React.useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search)
    const onlyMistake = urlSearchParams.get('onlyMistake')

    if (onlyMistake === 'true') {
      dispatch(toggleOnlyShowMistakeState(true))
    }
  }, [dispatch, location.search, shownQuestions.length])
}
