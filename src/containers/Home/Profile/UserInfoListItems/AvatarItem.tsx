import React from 'react'
import { makeStyles, Avatar } from '@material-ui/core'
import CommonItem, { CommonItemProps } from './CommonItem'
import { Skeleton } from '@material-ui/lab'
import defaultAvatar from '../../../../../assets/imgs/defaultavatar.png'
import { FormattedMessage } from 'react-intl'
import AvatarDialog, { AvatarDialogProps } from './Dialogs/AvatarDialog'
import useDialogHook from '../../../../components/hooks/useDialogHook'

const useStyles = makeStyles({
  avatar: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: -40,
  },
})

export interface AvatarItemProps {
  isLoading: boolean
  avatar?: string
}

export default function AvatarItem({
  isLoading,
  avatar,
}: AvatarItemProps): JSX.Element {
  const classes = useStyles()
  const { open, handleOpen, handleClose } = useDialogHook()

  const leftPart = (
    <FormattedMessage id="home.profile.labelAvatar" defaultMessage="头像" />
  )

  const rightPart = isLoading ? (
    <Skeleton variant="circle" className={classes.avatar} />
  ) : (
    <Avatar src={avatar || defaultAvatar} className={classes.avatar} />
  )

  const onItemClick = function(): void {
    handleOpen()
  }

  const commonItemProps: CommonItemProps = {
    leftPart,
    rightPart,
    onClick: onItemClick,
  }

  // avatar dialog props
  const avatarDialogProps: AvatarDialogProps = {
    open,
    handleClose,
  }

  return (
    <>
      {/* avatar listItem */}
      <CommonItem {...commonItemProps} />
      {/* avatar dialog */}
      <AvatarDialog {...avatarDialogProps} />
    </>
  )
}
