import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { QuestionType, Type } from '../../../../models/reducers/tests/testPage'
import { FormattedMessage } from 'react-intl'
import Options, { OptionsProps } from './Options'

export interface QuestionPanelProps {
  value: number
  index: number
  question: QuestionType
  total: number
  handleOptionClick: (answer: string) => void
  selectedOptions: number[]
}

export default function QuestionPanel({
  value,
  index,
  question,
  total,
  handleOptionClick,
  selectedOptions,
  ...otherProps
}: QuestionPanelProps): JSX.Element {
  const questionType =
    question.type === Type.SINGLE ? (
      <FormattedMessage
        id="test.testPage.QuestionPanel.txtQuestionTypeSingleAnswer"
        defaultMessage="单选题"
      />
    ) : (
      <FormattedMessage
        id="test.testPage.QuestionPanel.txtQuestionTypeMultiAnswer"
        defaultMessage="多选题"
      />
    )

  const optionsProps: OptionsProps = {
    options: question.options,
    optionIconType: question.type !== Type.SINGLE ? 'checkbox' : 'radio',
    handleItemClick: handleOptionClick,
    selectedItems: selectedOptions,
  }

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`question-tab-panel-${index}`}
      aria-labelledby={`question-tab-${index}`}
      {...otherProps}
    >
      {value === index && (
        <Box p={2}>
          {/* type */}
          <Typography color="primary" gutterBottom>
            ({questionType})
          </Typography>
          {/* question */}
          <Typography gutterBottom>{question.question}</Typography>
          {/* indicator */}
          <Typography variant="body2" align="right" gutterBottom>
            <Box clone paddingRight={0.5}>
              <Typography variant="body1" component="span" color="primary">
                {index + 1}
              </Typography>
            </Box>
            /{total}
          </Typography>
          {/* options */}
          <Options {...optionsProps} />
        </Box>
      )}
    </Box>
  )
}
