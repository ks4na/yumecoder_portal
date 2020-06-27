import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import useShownQuestionsHook from '../useShownQuestionsHook'
import QuestionPanelSkeleton from './QuestionPanelSkeleton'
import QuestionPanel, { QuestionPanelProps } from './QuestionPanel'
import { useSelector } from 'react-redux'
import { AnalysisDataQuestionDeleteStatus } from '../../../../models/reducers/tests/testAnalysis'

const useStyles = makeStyles(theme => ({
  mainBody: {
    marginBottom: theme.mixins.testPageFooterHeight,
  },
}))

/**
 * 字母映射为从 0 开始的数字
 * @param letter 从 A 开始的字母
 */
const mapLetterToIndex = function(letter: string): number {
  return letter.charCodeAt(0) - 65
}

export default function MainBody(): JSX.Element {
  const classes = useStyles()

  const { shownQuestions } = useShownQuestionsHook()
  const { tabIndex } = useSelector(({ testAnalysisState }) => testAnalysisState)

  return (
    <Box className={classes.mainBody}>
      {shownQuestions.length === 0 ? (
        <QuestionPanelSkeleton />
      ) : (
        <>
          {shownQuestions.map((item, index) => {
            const userSelectedOptions: number[] = item.userAnswer.map(item =>
              mapLetterToIndex(item)
            )
            const rightOptions: number[] = item.answer.map(item =>
              mapLetterToIndex(item)
            )

            const isDeleted =
              item.isDeleted === AnalysisDataQuestionDeleteStatus.DELETED

            const questionPanelProps: QuestionPanelProps = {
              index,
              value: tabIndex,
              question: item,
              total: shownQuestions.length,
              userSelectedOptions,
              rightOptions,
              isDeleted,
            }

            return <QuestionPanel key={index} {...questionPanelProps} />
          })}
        </>
      )}
    </Box>
  )
}
