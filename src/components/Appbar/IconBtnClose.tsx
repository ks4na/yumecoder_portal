import React from 'react'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export interface IconBtnCloseProps {
  handleClose?: () => void
}

export default function IconBtnClose({
  handleClose,
}: IconBtnCloseProps): JSX.Element {
  return (
    <IconButton
      edge="start"
      color="inherit"
      onClick={handleClose}
      aria-label="close"
    >
      <CloseIcon />
    </IconButton>
  )
}
