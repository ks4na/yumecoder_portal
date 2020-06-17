import React from 'react'
import { Location } from 'history'
import { Prompt, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggleExitHalfwayDialogState,
  toggleTimerPauseState,
  sagaSaveTempTestInfoToServer,
} from '../../../models/actions'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { Status } from '../../../models/reducers/status'

export default function ExitHalfwayHandler(): JSX.Element {
  const {
    shouldActivePrompt,
    handleBlockNavigation,
    showExitHalfwayDialog,
    handleDialogClose,
    handleConfirmExitHalfway,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useExitHalfwayHandlerHook()

  const exitHalfwayDialogProps: ExitHalfwayDialogProps = {
    open: showExitHalfwayDialog,
    handleClose: handleDialogClose,
    handleConfirm: handleConfirmExitHalfway,
  }

  return (
    <>
      {/* 正在进行测试时， 浏览器 URL 变更的话，弹出提示 */}
      <Prompt when={shouldActivePrompt} message={handleBlockNavigation} />
      {/* 提前退出确认 dialog */}
      <ExitHalfwayDialog {...exitHalfwayDialogProps} />
    </>
  )
}

// ExitHalfwayDialog
export interface ExitHalfwayDialogProps {
  open: boolean
  handleClose: () => void
  handleConfirm: () => void
}

export function ExitHalfwayDialog({
  open,
  handleClose,
  handleConfirm,
}: ExitHalfwayDialogProps): JSX.Element {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="exit-halfway-dialog-title"
      aria-describedby="exit-halfway-dialog-description"
    >
      <DialogTitle id="exit-halfway-dialog-title">
        <FormattedMessage
          id="test.testPage.exitHalfwayHandler.txtExitHalfwayDialogTitle"
          defaultMessage="提前退出测试?"
        />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="exit-halfway-dialog-description">
          <FormattedMessage
            id="test.testPage.exitHalfwayHandler.txtExitHalfwayDialogContent"
            defaultMessage="点击确定按钮提前退出测试, 当前测试进度将会被保存。"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="primary">
          <FormattedMessage
            id="test.testPage.exitHalfwayHandler.btnConfirm"
            defaultMessage="确定"
          />
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          <FormattedMessage
            id="test.testPage.exitHalfwayHandler.btnCancel"
            defaultMessage="取消"
          />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// useExitHalfwayHandlerHook
export function useExitHalfwayHandlerHook(): ExitHalfwayHandlerHookReturnType {
  const [lastLocation, setLastLocation] = React.useState<Location | null>(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    paperHasDone,
    showExitHalfwayDialog,
    paperData,
    paperSubmitStatus,
    showRetrySubmitDialog,
    tempTestInfoSavingStatus,
    showRetrySaveTempDialog,
    shouldExitAnyway,
  } = useSelector(({ testPageState }) => testPageState)

  // 是否正在处理 试卷提交
  const isHandlingPaperSubmission =
    paperSubmitStatus === Status.PROGRESSING || showRetrySubmitDialog
  // 是否正在处理 保存未完成的试卷信息
  const isHandlingTempTestInfoSaving =
    tempTestInfoSavingStatus === Status.PROGRESSING || showRetrySaveTempDialog
  // 是否正在 做试卷
  const isDoingPaper =
    paperData !== undefined && !paperHasDone && !isHandlingTempTestInfoSaving

  const hasSavedTestInfo = tempTestInfoSavingStatus === Status.SUCCESS
  // 是否应该拦截并处理 URL 变更请求
  const shouldActivePrompt =
    (isDoingPaper && !hasSavedTestInfo && !shouldExitAnyway) ||
    isHandlingPaperSubmission ||
    isHandlingTempTestInfoSaving

  const handleBlockNavigation = function(nextLocation: Location): boolean {
    // 如果正在处理 试卷提交，
    // 或者正在处理 试卷信息保存，
    // 则直接不允许路由跳转
    if (isHandlingPaperSubmission || isHandlingTempTestInfoSaving) {
      return false
    }

    if (isDoingPaper) {
      // 停止计时器
      dispatch(toggleTimerPauseState(true))
      // 弹出 dialog
      dispatch(toggleExitHalfwayDialogState(true))
      // 保存想要跳转到的 location
      setLastLocation(nextLocation)

      return false
    }

    return true
  }

  /**
   * 关闭 中途退出提示的dialog
   */
  const handleDialogClose = function(): void {
    // 关闭 中途退出提示的dialog
    dispatch(toggleExitHalfwayDialogState(false))

    // 计时器状态设置为 非暂停 状态
    dispatch(toggleTimerPauseState(false))
  }

  /**
   * 确认 中途退出
   */
  const handleConfirmExitHalfway = function(): void {
    // 保存试卷信息到服务器
    dispatch(sagaSaveTempTestInfoToServer())

    // 关闭 中途退出提示的dialog ( 无需重新启动计时器 )
    dispatch(toggleExitHalfwayDialogState(false))
  }

  // 监听 试卷信息是否保存成功/是否允许强制退出 ( hasSavedTestInfo / shouldExitAnyway)
  React.useEffect(() => {
    if ((hasSavedTestInfo || shouldExitAnyway) && lastLocation) {
      history.goBack()
      // history.push(lastLocation.pathname, lastLocation.state)
    }
  }, [hasSavedTestInfo, history, lastLocation, shouldExitAnyway])

  return {
    shouldActivePrompt,
    showExitHalfwayDialog,
    handleDialogClose,
    handleConfirmExitHalfway,
    handleBlockNavigation,
  }
}

export interface ExitHalfwayHandlerHookReturnType {
  shouldActivePrompt: boolean
  showExitHalfwayDialog: boolean
  handleDialogClose: () => void
  handleConfirmExitHalfway: () => void
  handleBlockNavigation: (nextLocation: Location) => boolean
}
