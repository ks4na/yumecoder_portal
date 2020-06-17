import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { togglePaperHasDoneDialog } from '../../../models/actions'

export interface PaperHasDoneDialogProps {
  testId: string | number
}

export default function PaperHasDoneDialog({
  testId,
}: PaperHasDoneDialogProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { open, handleToResultPage, handleBack } = usePaperHasDoneDialogHook(
    testId
  )

  return (
    <Dialog open={open} aria-describedby="paper-has-done-dialog-description">
      <DialogContent>
        <DialogContentText id="paper-has-done-dialog-description">
          <FormattedMessage
            id="test.testPage.paperHasDoneDialog.description"
            defaultMessage="该试卷已完成，请选择查看结果或者返回。"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToResultPage} color="primary">
          <FormattedMessage
            id="test.testPage.paperHasDoneDialog.btnToResultPage"
            defaultMessage="查看结果"
          />
        </Button>
        <Button onClick={handleBack} color="primary" autoFocus>
          <FormattedMessage
            id="test.testPage.paperHasDoneDialog.btnBack"
            defaultMessage="返回"
          />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function usePaperHasDoneDialogHook(
  testId: number | string
): PaperHasDoneDialogHookReturnType {
  const history = useHistory()
  const dispatch = useDispatch()
  const { showPaperHasDoneDialog } = useSelector(
    ({ testPageState }) => testPageState
  )

  const handleToResultPage = React.useCallback(() => {
    dispatch(togglePaperHasDoneDialog(false))
    history.push(`/test/${testId}/result`)
  }, [dispatch, history, testId])

  const handleBack = React.useCallback(() => {
    dispatch(togglePaperHasDoneDialog(false))
    history.goBack()
  }, [dispatch, history])

  return {
    open: showPaperHasDoneDialog,
    handleToResultPage,
    handleBack,
  }
}

export interface PaperHasDoneDialogHookReturnType {
  open: boolean
  handleToResultPage: () => void
  handleBack: () => void
}
