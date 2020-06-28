import React from 'react'
import { Box, Typography, Chip, makeStyles, Grid } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import Options, { OptionsProps } from './Options'
import {
  AnalysisDataQuestion,
  AnalysisDataQuestionType as QuestionType,
} from '../../../../models/reducers/tests/testAnalysis'
import teal from '@material-ui/core/colors/teal'
import red from '@material-ui/core/colors/red'
import Analysis from './Analysis'

const useStyles = makeStyles(theme => ({
  hasDeletedChip: {
    borderRadius: '5px',
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    marginRight: theme.spacing(1),
  },
  answer: {
    color: teal[400],

    '&.wrong': {
      color: red[600],
    },
  },
  knowledgeTag: {
    margin: theme.spacing(0.5),
    borderRadius: '5px',
    borderColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  },
}))

export interface QuestionPanelProps {
  index: number
  value: number
  total: number
  question: AnalysisDataQuestion
  userSelectedOptions: number[]
  rightOptions: number[]
  isDeleted?: boolean
}

export default function QuestionPanel({
  index,
  value,
  total,
  question,
  userSelectedOptions,
  rightOptions,
  isDeleted,
  ...otherProps
}: QuestionPanelProps): JSX.Element {
  const classes = useStyles()

  const questionType =
    question.type === QuestionType.SINGLE ? (
      <FormattedMessage
        id="test.testAnalysisPage.QuestionPanel.txtQuestionTypeSingleAnswer"
        defaultMessage="单选题"
      />
    ) : (
      <FormattedMessage
        id="test.testAnalysisPage.QuestionPanel.txtQuestionTypeMultiAnswer"
        defaultMessage="多选题"
      />
    )

  const optionsProps: OptionsProps = {
    options: question.options,
    optionIconType:
      question.type !== QuestionType.SINGLE ? 'checkbox' : 'radio',
    userSelectedOptions,
    rightOptions,
  }

  // 用户是否选中了所有的正确选项
  const isCorrect =
    userSelectedOptions.length === rightOptions.length &&
    new Set([...userSelectedOptions, ...rightOptions]).size ===
      rightOptions.length

  return (
    <Box
      role="tabpanel"
      display={value !== index ? 'none' : 'block'}
      id={`question-analysis-tab-panel-${index}`}
      aria-labelledby={`question-analysis-tab-${index}`}
      {...otherProps}
    >
      <Box p={2}>
        {/* type */}
        <Typography color="primary" gutterBottom>
          ({questionType})
        </Typography>
        {/* question */}
        <Typography gutterBottom>
          {/* hasDeleted flag */}
          {isDeleted && (
            <Chip
              component="span"
              className={classes.hasDeletedChip}
              size="small"
              label={
                <FormattedMessage
                  id="test.testAnalysisPage.mainBody.questionPanel.txtHasDeleted"
                  defaultMessage="已删除"
                />
              }
            ></Chip>
          )}
          {/* question content */}
          {question.question}
        </Typography>
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
        {/* answer */}
        <Box clone marginBottom={1}>
          <Grid container className={'answer-wrapper'}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <FormattedMessage
                  id="test.testAnalysisPage.mainBody.txtRightAnswer"
                  defaultMessage="正确答案"
                />
                {' : '}
                <Typography component="span" className={classes.answer}>
                  {question.answer.join(' ')}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <FormattedMessage
                  id="test.testAnalysisPage.mainBody.txtUserAnswer"
                  defaultMessage="你的答案"
                />
                {' : '}
                <Typography
                  component="span"
                  className={`${classes.answer}${!isCorrect ? ' wrong' : ''}`}
                >
                  {question.userAnswer.join(' ')}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {/* knowledge tags */}
        <Box className={'knowledge-tags'} textAlign="center">
          {question.knowledgeTag.split(' ').map(item => (
            <Chip
              key={item}
              className={classes.knowledgeTag}
              label={item}
              variant="outlined"
              size="small"
            />
          ))}
        </Box>
        {/* analysis content */}
        <Analysis content={question.analysis} />
      </Box>
    </Box>
  )
}
