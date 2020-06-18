import React from 'react'
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  makeStyles,
} from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { Status } from '../../../models/reducers/status'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}))

export default function PaperSubmissionBackdrop(): JSX.Element {
  const classes = useStyles()

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { open } = usePaperSubmissionBackdropHook()
  return (
    <Backdrop open={open} className={classes.backdrop}>
      <Box textAlign="center" color="common.white">
        <Box marginBottom={4}>
          <CircularProgress color="inherit" />
        </Box>
        <Typography>
          <FormattedMessage
            id="test.testPage.PaperSubmissionBackgrop.txtSubmittingPaper"
            defaultMessage="正在提交试卷中..."
          />
        </Typography>
      </Box>
    </Backdrop>
  )
}

export function usePaperSubmissionBackdropHook(): PaperSubmissionBackdropHookReturnType {
  const { paperSubmitStatus, tempTestInfoSavingStatus } = useSelector(
    ({ testPageState }) => testPageState
  )
  // 是否正在提交试卷中
  const isSubmittingPaper =
    paperSubmitStatus === Status.PROGRESSING ||
    tempTestInfoSavingStatus === Status.PROGRESSING

  return {
    open: isSubmittingPaper,
  }
}

export interface PaperSubmissionBackdropHookReturnType {
  open: boolean
}
