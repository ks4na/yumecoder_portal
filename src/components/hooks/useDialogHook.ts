import React from 'react'

export default function useDialogHook(): DialogHookReturnType {
  const [open, setOpen] = React.useState(false)

  const handleOpen = function(): void {
    setOpen(true)
  }

  const handleClose = function(): void {
    setOpen(false)
  }

  return {
    open,
    handleOpen,
    handleClose,
  }
}

export interface DialogHookReturnType {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}
