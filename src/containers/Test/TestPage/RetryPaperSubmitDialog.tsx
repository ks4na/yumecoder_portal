import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggleRetrySubmitDialog,
  sagaSubmitPaper,
  togglePaperHasDoneFlag,
} from '../../../models/actions'
import { FormattedMessage } from 'react-intl'

export default function RetryPaperSubmitDialog(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { open, handleClose, handleRetry } = useRetryPaperSubmitDialogHook()

  return (
    <Dialog
      open={open}
      aria-describedby="retry-paper-submit-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="retry-paper-submit-dialog-description">
          <FormattedMessage
            id="test.testPage.retryPaperSubmitDialog.description"
            defaultMessage="试卷提交失败，点击重试按钮重新提交试卷。"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRetry} color="primary" autoFocus>
          <FormattedMessage
            id="test.testPage.RetryPaperSubmitDialog.btnRetry"
            defaultMessage="重试"
          />
        </Button>
        <Button onClick={handleClose} color="primary">
          <FormattedMessage
            id="test.testPage.RetryPaperSubmitDialog.btnCancel"
            defaultMessage="取消"
          />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function useRetryPaperSubmitDialogHook(): RetryPaperSubmitDialogHookReturnType {
  const dispatch = useDispatch()
  const { showRetrySubmitDialog } = useSelector(
    ({ testPageState }) => testPageState
  )

  /**
   * 关闭 dialog
   */
  const handleClose = React.useCallback(() => {
    // 关闭 重试提交试卷 dialog
    dispatch(toggleRetrySubmitDialog(false))

    // 恢复试卷为 未完成 状态
    dispatch(togglePaperHasDoneFlag(false))
  }, [dispatch])

  /**
   * 重新提交试卷
   */
  const handleRetry = React.useCallback(() => {
    // 发起异步请求
    dispatch(sagaSubmitPaper())

    // 关闭 重试提交试卷 dialog
    dispatch(toggleRetrySubmitDialog(false))
  }, [dispatch])

  return {
    open: showRetrySubmitDialog,
    handleClose,
    handleRetry,
  }
}

export interface RetryPaperSubmitDialogHookReturnType {
  open: boolean
  handleClose: () => void
  handleRetry: () => void
}
