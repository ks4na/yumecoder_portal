import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { FormattedMessage } from 'react-intl'

export interface LogoutDialogProps {
  open: boolean
  handleCancel: () => void
  handleConfirm: () => void
}

export default function LogoutDialog({
  open,
  handleCancel,
  handleConfirm,
}: LogoutDialogProps): JSX.Element {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="logout-dialog-title">
        <FormattedMessage
          id="test.testMenu.navDrawer.logoutDialog.titleLogout"
          defaultMessage="退出登录"
        />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <FormattedMessage
            id="test.testMenu.navDrawer.logoutDialog.descLogout"
            defaultMessage="确认退出登录状态？"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          <FormattedMessage
            id="test.testMenu.navDrawer.logoutDialog.btnCancel"
            defaultMessage="取消"
          />
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          <FormattedMessage
            id="test.testMenu.navDrawer.logoutDialog.btnConfirm"
            defaultMessage="确定"
          />
        </Button>
      </DialogActions>
    </Dialog>
  )
}
