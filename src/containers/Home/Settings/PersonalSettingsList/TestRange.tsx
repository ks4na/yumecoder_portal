import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import CommonItem, { CommonItemProps } from '../CommonItem'
import { Skeleton } from '@material-ui/lab'
import { FormattedMessage } from 'react-intl'
import useDialogHook from '../../../../components/hooks/useDialogHook'
import TestRangeDialog, {
  TestRangeDialogProps,
} from '../Dialogs/TestRangeDialog'
import useTestRangeHook, {
  TestRange,
} from '../../../../components/hooks/useTestRangeHook'

const useStyles = makeStyles(theme => ({
  colorGrey: {
    color: theme.palette.grey[500],
  },
}))

export interface TestRangeItemProps {
  isLoading: boolean
  testRange?: number
}

export default function TestRangeItem({
  isLoading,
  testRange,
}: TestRangeItemProps): JSX.Element {
  const classes = useStyles()
  const { getTestRangeTxt } = useTestRangeHook()

  const { open, handleOpen, handleClose } = useDialogHook()

  const leftPart = (
    <FormattedMessage
      id="home.settings.labelTestRange"
      defaultMessage="出题范围"
    />
  )

  const rightPart = isLoading ? (
    <Skeleton width={50} />
  ) : (
    <Typography className={classes.colorGrey} noWrap>
      {getTestRangeTxt(testRange || TestRange.OnlyNew)}
    </Typography>
  )

  const onItemClick = function(): void {
    handleOpen()
  }

  const commonItemProps: CommonItemProps = {
    leftPart,
    rightPart,
    onClick: onItemClick,
    divider: false,
  }

  const testRangeDialog: TestRangeDialogProps = {
    open,
    handleClose,
    currentTestRange: testRange,
  }

  return (
    <>
      {/* TestRange listItem */}
      <CommonItem {...commonItemProps} />
      {/* TestRange dialog */}
      <TestRangeDialog {...testRangeDialog} />
    </>
  )
}
