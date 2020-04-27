import React from 'react'
import GlobalSnackbar from '../GlobalSnackbar'
import { useDispatch } from 'react-redux'
import { Button, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { addSnackbarItem } from '../../models/actions'
import { closeSnackbar } from '../../models/actions'
import { FormattedMessage } from 'react-intl'

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

export default function GlobalSnackbarDemo(): JSX.Element {
  const dispatch = useDispatch()
  function handleAddMsg(msg: string): void {
    dispatch(
      addSnackbarItem({
        messageComponent: FormattedMessage,
        messageComponentProps: {
          defaultMessage: msg,
          id: 'loginPageUnexpectedError',
        },
        actionComponent: CloseBtn,
        onClose: (event, reason) => {
          console.log('reason', reason)
          dispatch(closeSnackbar())
        },
      })
    )
  }
  function handleAddMsgB(msg: string): void {
    dispatch(
      addSnackbarItem({
        message: msg,
        autoHideDuration: 5000,
        actionComponent: CloseBtn,
      })
    )
  }
  return (
    <>
      <Button onClick={(): void => handleAddMsg('msg A')}>show msg A</Button>
      <Button onClick={(): void => handleAddMsgB('msg B')}>show msg B</Button>
      <GlobalSnackbar />
    </>
  )
}
