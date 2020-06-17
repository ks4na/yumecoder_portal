import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeCurrentTabPanel,
  updateUserAnswers,
  toggleAnswerCard,
} from '../../../../models/actions'
import { Status } from '../../../../models/reducers/status'
import {
  QuestionType,
  Type,
  UserAnswerType,
} from '../../../../models/reducers/tests/testPage'
import useTempTestInfoHook from './useTempTestInfoHook'

export default function useQuestionPanelsHook(): QuestionPanelsHookReturnType {
  const dispatch = useDispatch()
  const {
    currentTabPanelIndex,
    paperData,
    paperFetchingStatus,
    userAnswers,
  } = useSelector(({ testPageState }) => testPageState)

  const { saveTempTestInfoToLocal } = useTempTestInfoHook()

  // 是否禁用 “上一题”， “下一题” 按钮
  const disableBtnToPrevious = currentTabPanelIndex <= 0
  const disableBtnToNext =
    !paperData || currentTabPanelIndex >= paperData.questionAmount - 1

  // 是否是最后一题，区分显示 “下一题”/“提交答案” 按钮
  const isLastQuestion =
    (paperData && currentTabPanelIndex === paperData.questionAmount - 1) ||
    false

  const isLoading = paperFetchingStatus === Status.PROGRESSING
  const questions = (paperData && paperData.questions) || []

  /**
   * 更改当前 question panel
   */
  const handleChangeQuestionPanel = React.useCallback(
    (index: number) => {
      dispatch(changeCurrentTabPanel(index))
      // 备份考试临时信息到本地
      saveTempTestInfoToLocal()

      // 页面滚动到顶部
      window.scrollTo(0, 0)
    },
    [dispatch, saveTempTestInfoToLocal]
  )

  /**
   * 跳转到上一个 question panel
   */
  const handleToPreviousQuestionPanel = React.useCallback(() => {
    handleChangeQuestionPanel(currentTabPanelIndex - 1)
  }, [currentTabPanelIndex, handleChangeQuestionPanel])

  /**
   * 跳转到下一个 question panel
   */
  const handleToNextQuestionPanel = React.useCallback(() => {
    handleChangeQuestionPanel(currentTabPanelIndex + 1)
  }, [currentTabPanelIndex, handleChangeQuestionPanel])

  /**
   * 更新题目答案
   */
  const handleUpdateAnswer = React.useCallback(
    (questionId: number, questionType: Type, answer: string) => {
      dispatch(updateUserAnswers(questionId, questionType, answer))
      // 备份考试临时信息到本地
      saveTempTestInfoToLocal()
    },
    [dispatch, saveTempTestInfoToLocal]
  )

  /**
   * 显示答题卡
   */
  const handleOpenAnswerCard = React.useCallback(() => {
    dispatch(toggleAnswerCard(true))
  }, [dispatch])

  return {
    currentTabPanelIndex,
    handleChangeQuestionPanel,
    handleToPreviousQuestionPanel,
    handleToNextQuestionPanel,
    disableBtnToPrevious,
    disableBtnToNext,
    isLastQuestion,
    isLoading,
    questions,
    handleUpdateAnswer,
    userAnswers,
    handleOpenAnswerCard,
  }
}

export interface QuestionPanelsHookReturnType {
  currentTabPanelIndex: number
  disableBtnToPrevious: boolean
  disableBtnToNext: boolean
  isLastQuestion: boolean
  handleChangeQuestionPanel: (index: number) => void
  handleToPreviousQuestionPanel: () => void
  handleToNextQuestionPanel: () => void
  isLoading: boolean
  questions: QuestionType[]
  handleUpdateAnswer: (
    questionId: number,
    questionType: Type,
    answer: string
  ) => void
  userAnswers: UserAnswerType[]
  handleOpenAnswerCard: () => void
}
