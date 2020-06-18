import React from 'react'
import {
  Typography,
  Box,
  Divider,
  LinearProgress,
  makeStyles,
} from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles({
  progressBarRoot: {
    height: 8,
  },
})

export default function AchievementBar(): JSX.Element {
  const classes = useStyles()

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { percent, labelValue } = useAchievementBarHook()

  return (
    <Box marginBottom={2}>
      <Typography gutterBottom>
        <FormattedMessage
          id="test.testResultPage.AchievementBar.label"
          defaultMessage="能力变化"
        />
      </Typography>
      <Box display="flex" alignItems="center" marginBottom={1}>
        <Box width="100%" marginRight={1}>
          <LinearProgress
            variant="determinate"
            value={percent}
            classes={{ root: classes.progressBarRoot }}
          />
        </Box>
        {/* value label */}
        <Box minWidth={40} textAlign="center" paddingX={1}>
          <Typography component="span" color="primary">
            {(labelValue !== undefined && `+${labelValue}`) || <Skeleton />}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </Box>
  )
}

export function useAchievementBarHook(): AchievementBarHookReturnType {
  const { data } = useSelector(({ testResultState }) => testResultState)

  const percent =
    (data && (data.correctAmount / data.questionAmount) * 100) || 0

  return {
    percent,
    labelValue: data && data.correctAmount,
  }
}

export interface AchievementBarHookReturnType {
  percent: number
  labelValue?: number
}
