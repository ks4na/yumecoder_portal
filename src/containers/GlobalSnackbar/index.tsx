import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Snackbar, SnackbarCloseReason, IconButton } from '@material-ui/core'
import {
  changeCurrentSnackbar,
  openSnackbar,
  closeSnackbar,
  changeSnackbarItems,
} from '../../models/actions'
import CloseIcon from '@material-ui/icons/Close'

// closeBtn
function CloseBtn(): JSX.Element {
  const dispatch = useDispatch()
  return (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={(): void => {
        dispatch(closeSnackbar())
      }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )
}

export default function GlobalSnackbar(): JSX.Element {
  const dispatch = useDispatch()
  const { currentSnackbar, open, snackbarItems } = useSelector(
    ({ snackbarState }) => snackbarState
  )

  React.useEffect(() => {
    // 如果存在等待展示的 snackbarItem
    if (snackbarItems.length) {
      // 如果 currentSnackbar 为 undefined
      if (!currentSnackbar) {
        const [currentSnackbar, ...rest] = snackbarItems
        dispatch(changeCurrentSnackbar(currentSnackbar))
        dispatch(changeSnackbarItems(rest))
        dispatch(openSnackbar())
      } else {
        // 如果 currentSnackbar 不为 undefined
        // 且 Snackbar 为 open 状态，
        // 则关闭当前 Snackbar 以显示下一条信息
        if (open) {
          dispatch(closeSnackbar())
        }
      }
    }
  }, [currentSnackbar, dispatch, open, snackbarItems])

  // Snackbar 完全关闭之后
  function handleExited(node: HTMLElement): void {
    // 如果有指定 onExited 事件，则执行
    if (currentSnackbar && currentSnackbar.onExited) {
      currentSnackbar.onExited(node)
    }
    // 改变 currentSnackbar 为 undefined
    dispatch(changeCurrentSnackbar(undefined))
  }

  function handleClose(
    event: React.SyntheticEvent<unknown, Event>,
    reason: SnackbarCloseReason
  ): void {
    // 如果存在 onClose 事件，则不会调用默认行为
    if (currentSnackbar && currentSnackbar.onClose) {
      currentSnackbar.onClose(event, reason)
    } else {
      if (reason === 'clickaway') {
        return
      }
      dispatch(closeSnackbar())
    }
  }

  let snackbarProps = currentSnackbar
  if (snackbarProps) {
    // 自动隐藏的延时设置默认值: 3s
    if (!snackbarProps.autoHideDuration) {
      snackbarProps = { ...snackbarProps, autoHideDuration: 3000 }
    }
    // 如果存在 messageComponent 属性，则设置 message 属性为 messageComponent ,
    // 并且去除 messageComponent 和 messageComponentProps 属性 以避免 react 警告
    if (snackbarProps.messageComponent) {
      const {
        messageComponent: MessageComp,
        messageComponentProps,
        ...rest
      } = snackbarProps
      snackbarProps = {
        ...rest,
        message: <MessageComp {...messageComponentProps} />,
      }
    }
    // 如果存在 actionComponent 属性，则设置 action 属性为 actionComponent ,
    // 并且去除 actionComponent 和 actionComponentProps 属性 以避免 react 警告
    if (snackbarProps.actionComponent) {
      const {
        actionComponent: ActionComp,
        actionComponentProps,
        ...rest
      } = snackbarProps
      snackbarProps = {
        ...rest,
        action: <ActionComp {...actionComponentProps} />,
      }
    }
  }

  return (
    <Snackbar
      open={open}
      action={<CloseBtn />}
      {...snackbarProps}
      onExited={handleExited}
      onClose={handleClose}
    />
  )
}
