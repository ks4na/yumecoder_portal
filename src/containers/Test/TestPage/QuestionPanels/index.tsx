import React from 'react'
import QuestionPanel, { QuestionPanelProps } from './QuestionPanel'
import useQuestionPanelsHook from './useQuestionPanelsHook'
import QuestionPanelSkeleton from './QuestionPanelSkeleton'
import { BoxProps, Box } from '@material-ui/core'
import BottomOperationButtons, {
  BottomOperationButtonsProps,
} from '../BottomOperationButtons'

// 定义 底部按钮的高度
const BOTTOM_OPERATION_BUTTON_HEIGHT = '45px'

/**
 * 字母映射为从 0 开始的数字
 * @param letter 从 A 开始的字母
 */
const mapLetterToIndex = function(letter: string): number {
  return letter.charCodeAt(0) - 65
}

export default function QuestionPanels(props: BoxProps): JSX.Element {
  const {
    currentTabPanelIndex,
    isLoading,
    questions,
    handleUpdateAnswer,
    userAnswers,
    handleToPreviousQuestionPanel,
    handleToNextQuestionPanel,
    disableBtnToPrevious,
    disableBtnToNext,
    isLastQuestion,
    handleOpenAnswerCard,
  } = useQuestionPanelsHook()

  const bottomOperationButtonsProps: BottomOperationButtonsProps = {
    disableBtnToPrevious,
    disableBtnToNext,
    displaySubmitBtn: isLastQuestion,
    onToPreviousBtnClick: handleToPreviousQuestionPanel,
    onToNextbtnClick: handleToNextQuestionPanel,
    onSubmitBtnClick: handleOpenAnswerCard,
    height: BOTTOM_OPERATION_BUTTON_HEIGHT,
  }

  return (
    <Box paddingBottom={BOTTOM_OPERATION_BUTTON_HEIGHT} {...props}>
      {isLoading ? (
        <QuestionPanelSkeleton />
      ) : (
        <>
          {questions.map((item, index) => {
            let selectedOptions: number[] = []
            const target = userAnswers.find(
              userAnswer => userAnswer.questionId === item.id
            )
            if (target) {
              selectedOptions = target.answer.map(answer =>
                mapLetterToIndex(answer)
              )
            }
            const questionPanelProps: QuestionPanelProps = {
              index,
              value: currentTabPanelIndex,
              question: item,
              total: questions.length,
              handleOptionClick: (answer: string) => {
                handleUpdateAnswer(item.id, item.type, answer)
              },
              selectedOptions,
            }

            return <QuestionPanel key={index} {...questionPanelProps} />
          })}
        </>
      )}

      {/* bottom operation buttons */}
      <BottomOperationButtons {...bottomOperationButtonsProps} />
    </Box>
  )
}
