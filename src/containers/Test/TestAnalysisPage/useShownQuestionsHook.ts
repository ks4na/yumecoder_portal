import React from 'react'
import { useSelector } from 'react-redux'
import { AnalysisDataQuestion } from '../../../models/reducers/tests/testAnalysis'

export default function useShownQuestionsHook(): ShownQuestionsHookReturnType {
  const { data, onlyShowMistake } = useSelector(
    ({ testAnalysisState }) => testAnalysisState
  )

  // 计算需要展示的 question 数组，并缓存
  const shownQuestions: AnalysisDataQuestion[] = React.useMemo(() => {
    if (!data) {
      return []
    } else {
      if (!onlyShowMistake) {
        return data.questions
      } else {
        // 找出答错的题目
        return data.questions.filter(question => {
          const { answer, userAnswer } = question
          const isWrongAnswer =
            answer.length !== userAnswer.length ||
            new Set([...answer, ...userAnswer]).size !== answer.length
          return isWrongAnswer && question
        })
      }
    }
  }, [data, onlyShowMistake])

  return {
    shownQuestions,
  }
}

export interface ShownQuestionsHookReturnType {
  shownQuestions: AnalysisDataQuestion[]
}
