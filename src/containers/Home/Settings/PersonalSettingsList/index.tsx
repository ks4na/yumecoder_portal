import React from 'react'
import { Box, Paper, List } from '@material-ui/core'
import QuestionsPerTestItem, {
  QuestionsPerTestItemProps,
} from './QuestionsPerTest'
import TestRangeItem, { TestRangeItemProps } from './TestRange'

export interface PersonalSettingsListProps {
  isLoading: boolean
  questionsPerTest?: number
  testRange?: number
}

export default function PersonalSettingsList({
  isLoading,
  questionsPerTest,
  testRange,
}: PersonalSettingsListProps): JSX.Element {
  const questionPerTestItemProps: QuestionsPerTestItemProps = {
    isLoading,
    questionsPerTest,
  }

  const testRangeItemProps: TestRangeItemProps = {
    isLoading,
    testRange,
  }

  return (
    <Box clone marginBottom={1}>
      <Paper square>
        <List aria-label="personal settings list">
          {/* QuestionsPerTest ListItem */}
          <QuestionsPerTestItem {...questionPerTestItemProps} />
          {/* TestRange ListItem */}
          <TestRangeItem {...testRangeItemProps} />
        </List>
      </Paper>
    </Box>
  )
}
