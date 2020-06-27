import React from 'react'
import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import AnimatedNumber from '../../../components/AnimatedNumber'

export default function PracticeInfo(): JSX.Element {
  const data = useSelector(({ testMenuState }) => testMenuState.data)
  const exerciseDays = (data && data.user.exerciseDays) || 0
  const userDoneQuestionTotal = (data && data.userDoneQuestionTotal) || 0
  const userRightQuestionTotal = (data && data.userRightQuestionTotal) || 0
  const accuracy =
    userDoneQuestionTotal === 0
      ? 0
      : Math.round((userRightQuestionTotal / userDoneQuestionTotal) * 100)

  return (
    <Box clone bgcolor="primary.main" paddingY={1}>
      <Grid container>
        <Grid item xs={4}>
          <PracticeInfoItem
            label={
              <FormattedMessage
                id="test.testMenu.practiceInfo.labelExerciseDays"
                defaultMessage="活跃天数"
              />
            }
            value={<AnimatedNumber to={exerciseDays} />}
          />
        </Grid>
        <Grid item xs={4}>
          <PracticeInfoItem
            label={
              <FormattedMessage
                id="test.testMenu.practiceInfo.labelNumberOfPracticedQuestions"
                defaultMessage="已练习题目数"
              />
            }
            value={<AnimatedNumber to={userDoneQuestionTotal} />}
          />
        </Grid>
        <Grid item xs={4}>
          <PracticeInfoItem
            label={
              <FormattedMessage
                id="test.testMenu.practiceInfo.labelAccuracy"
                defaultMessage="正确率"
              />
            }
            value={
              <AnimatedNumber
                to={accuracy}
                interpolateFn={(val): string => `${val.toFixed(0)} %`}
              />
            }
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export interface PracticeInfoItemProps {
  label: React.ReactNode
  value: React.ReactNode
}

const usePracticeInfoItemStyles = makeStyles({
  typo: {
    color: '#fff',
  },
})

export function PracticeInfoItem({
  label,
  value,
}: PracticeInfoItemProps): JSX.Element {
  const classes = usePracticeInfoItemStyles()

  return (
    <Box textAlign="center">
      <Typography
        variant="body2"
        className={`practice-info-label ${classes.typo}`}
        gutterBottom
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        className={`practice-info-value ${classes.typo}`}
      >
        {value}
      </Typography>
    </Box>
  )
}
