import React from 'react'
import { Typography, Box, Divider, makeStyles } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles({
  inlineBlockSkeleton: {
    display: 'inline-block',
  },
})

export default function TestResultBrief(): JSX.Element {
  const classes = useStyles()

  const {
    testName,
    spentTime,
    correctAmount,
    questionAmount,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useTestResultBriefHook()

  return (
    <Box marginBottom={2}>
      <Typography variant="h6" component="p" gutterBottom>
        {testName || <Skeleton width={200} />}
      </Typography>
      <Typography gutterBottom>
        <FormattedMessage
          id="test.testResultPage.TestResultBrief.lblTimeSpent"
          defaultMessage="练习时长"
        />
        :
        <Box clone paddingLeft={1}>
          <Typography component="span">
            {spentTime || (
              <Skeleton width={100} className={classes.inlineBlockSkeleton} />
            )}
          </Typography>
        </Box>
      </Typography>
      <Typography gutterBottom>
        <FormattedMessage
          id="test.testResultPage.TestResultBrief.lblRightCount"
          defaultMessage="正确数"
        />
        :
        <Box clone paddingLeft={1}>
          <Typography component="span">
            {(correctAmount !== undefined &&
              questionAmount !== undefined &&
              `${correctAmount}/${questionAmount}`) || (
              <Skeleton width={70} className={classes.inlineBlockSkeleton} />
            )}
          </Typography>
        </Box>
      </Typography>
      <Divider />
    </Box>
  )
}

export function useTestResultBriefHook(): TestResultBriefHookReturnType {
  const { data } = useSelector(({ testResultState }) => testResultState)

  return {
    testName: data && data.testName,
    spentTime: data && data.spentTime,
    correctAmount: data && data.correctAmount,
    questionAmount: data && data.questionAmount,
  }
}

export interface TestResultBriefHookReturnType {
  testName?: string
  spentTime?: string
  questionAmount?: number
  correctAmount?: number
}
