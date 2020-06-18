import React from 'react'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import IconBtnClose from '../../../../components/Appbar/IconBtnClose'
import CommonTitle from '../../../../components/Appbar/CommonTitle'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export interface SlideUpFullScreenDialogProps extends DialogProps {
  open: boolean
  handleClose: () => void
  dialogTitle?: React.ReactNode
  headerRightPart?: React.ReactNode
  children?: React.ReactNode
}

export default function SlideUpFullScreenDialog({
  open,
  handleClose,
  dialogTitle,
  headerRightPart,
  children,
  ...otherProps
}: SlideUpFullScreenDialogProps): JSX.Element {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      {...otherProps}
    >
      <AppBar position="fixed">
        <Toolbar>
          <IconBtnClose handleClose={handleClose} />
          <CommonTitle>{dialogTitle}</CommonTitle>
          {headerRightPart}
        </Toolbar>
      </AppBar>
      {/* fix position: fixed */}
      <Toolbar />
      {children}
    </Dialog>
  )
}
