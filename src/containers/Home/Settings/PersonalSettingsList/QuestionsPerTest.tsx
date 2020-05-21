import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import CommonItem, { CommonItemProps } from '../CommonItem'
import { Skeleton } from '@material-ui/lab'
import { FormattedMessage } from 'react-intl'
import useDialogHook from '../../../../components/hooks/useDialogHook'
import QuestionsPerTestDialog, {
  QuestionsPerTestDialogProps,
} from '../Dialogs/QuestionsPerTestDialog'

const useStyles = makeStyles(theme => ({
  colorGrey: {
    color: theme.palette.grey[500],
  },
}))

export enum QuestionsPerTest {
  Five = 5,
  Ten = 10,
  Fifteen = 15,
  Twenty = 20,
}

export interface QuestionsPerTestItemProps {
  isLoading: boolean
  questionsPerTest?: number
}

export default function QuestionsPerTestItem({
  isLoading,
  questionsPerTest,
}: QuestionsPerTestItemProps): JSX.Element {
  const classes = useStyles()

  const { open, handleOpen, handleClose } = useDialogHook()

  const leftPart = (
    <FormattedMessage
      id="home.settings.labelQuestionsPerTest"
      defaultMessage="单次练习题目数"
    />
  )

  const rightPart = isLoading ? (
    <Skeleton width={50} />
  ) : (
    <Typography className={classes.colorGrey} noWrap>
      {questionsPerTest}
    </Typography>
  )

  const onItemClick = function(): void {
    handleOpen()
  }

  const commonItemProps: CommonItemProps = {
    leftPart,
    rightPart,
    onClick: onItemClick,
  }

  const questionsPerTestDialogProps: QuestionsPerTestDialogProps = {
    open,
    handleClose,
    currentQuestionsPerTest: questionsPerTest,
  }

  return (
    <>
      {/* questionPerTest listItem */}
      <CommonItem {...commonItemProps} />
      {/* questionPerTest dialog */}
      <QuestionsPerTestDialog {...questionsPerTestDialogProps} />
    </>
  )
}
