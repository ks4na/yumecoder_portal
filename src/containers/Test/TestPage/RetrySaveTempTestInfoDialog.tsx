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
import {
  toggleRetrySaveTempDialog,
  sagaSaveTempTestInfoToServer,
  toggleShouldExitAnyway,
} from '../../../models/actions'

export default function RetrySaveTempTestInfoDialog(): JSX.Element {
  const {
    open,
    handleRetry,
    handleExitAnyway,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useRetrySaveTempTestInfoDialogHook()

  return (
    <Dialog
      open={open}
      aria-describedby="retry-save-temp-test-info-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="retry-save-temp-test-info-dialog-description">
          <FormattedMessage
            id="test.testPage.retrySaveTempTestInfoDialog.description"
            defaultMessage="试卷信息保存失败，点击重试按钮重新尝试保存试卷信息。"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRetry} color="primary" autoFocus>
          <FormattedMessage
            id="test.testPage.retrySaveTempTestInfoDialog.btnRetry"
            defaultMessage="重试"
          />
        </Button>
        <Button onClick={handleExitAnyway} color="primary">
          <FormattedMessage
            id="test.testPage.retrySaveTempTestInfoDialog.btnExitAnyway"
            defaultMessage="直接退出"
          />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function useRetrySaveTempTestInfoDialogHook(): RetrySaveTempTestInfoDialogHookReturnType {
  const dispatch = useDispatch()
  const { showRetrySaveTempDialog } = useSelector(
    ({ testPageState }) => testPageState
  )

  const handleRetry = React.useCallback(() => {
    // 发送异步请求
    dispatch(sagaSaveTempTestInfoToServer())
    // 关闭 dialog
    dispatch(toggleRetrySaveTempDialog(false))
  }, [dispatch])

  const handleExitAnyway = React.useCallback(() => {
    // 设置 shouldExitAnyway 为 true
    dispatch(toggleShouldExitAnyway(true))
    // 关闭 dialog
    dispatch(toggleRetrySaveTempDialog(false))
  }, [dispatch])

  return {
    open: showRetrySaveTempDialog,
    handleRetry,
    handleExitAnyway,
  }
}

export interface RetrySaveTempTestInfoDialogHookReturnType {
  open: boolean
  handleRetry: () => void
  handleExitAnyway: () => void
}
