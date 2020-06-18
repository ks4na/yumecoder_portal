import React from 'react'
import CommonItem, { CommonItemProps } from '../CommonItem'
import { FormattedMessage } from 'react-intl'
import useDialogHook from '../../../../components/hooks/useDialogHook'
import PasswordResetDialog, {
  PasswordResetDialogProps,
} from '../Dialogs/PasswordResetDialog'

export default function PasswordResetItem(): JSX.Element {
  const { open, handleOpen, handleClose } = useDialogHook()

  // passwordReset listItem props
  const leftPart = (
    <FormattedMessage
      id="home.settings.labelPwdReset"
      defaultMessage="修改密码"
    />
  )

  const onItemClick = function(): void {
    handleOpen()
  }

  const commonItemProps: CommonItemProps = {
    leftPart,
    onClick: onItemClick,
    divider: false,
  }

  // passwordReset dialog props
  const passowrdResetDialogProps: PasswordResetDialogProps = {
    open,
    handleClose,
  }

  return (
    <>
      {/* passwordReset listItem */}
      <CommonItem {...commonItemProps} />
      {/* passwordReset dialog */}
      <PasswordResetDialog {...passowrdResetDialogProps} />
    </>
  )
}
