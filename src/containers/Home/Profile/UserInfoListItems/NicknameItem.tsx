import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import CommonItem, { CommonItemProps } from './CommonItem'
import { Skeleton } from '@material-ui/lab'
import { FormattedMessage } from 'react-intl'
import useDialogHook from '../../../../components/hooks/useDialogHook'
import NicknameDialog, { NicknameDialogProps } from './Dialogs/NicknameDialog'

const useStyles = makeStyles(theme => ({
  colorGrey: {
    color: theme.palette.grey[500],
  },
}))

export interface NicknameItemProps {
  isLoading: boolean
  nickname?: string
}

export default function NicknameItem({
  isLoading,
  nickname,
}: NicknameItemProps): JSX.Element {
  const classes = useStyles()

  const { open, handleOpen, handleClose } = useDialogHook()

  // nickname listItem props
  const leftPart = (
    <FormattedMessage id="home.profile.labelNickname" defaultMessage="昵称" />
  )

  const rightPart = isLoading ? (
    <Skeleton width={50} />
  ) : (
    <Typography className={classes.colorGrey} noWrap>
      {nickname}
    </Typography>
  )

  const onItemClick = function(): void {
    handleOpen()
  }

  const commonItemProps: CommonItemProps = {
    leftPart,
    rightPart,
    onClick: onItemClick,
  }

  // nickname dialog props
  const nicknameDialogProps: NicknameDialogProps = {
    open,
    handleClose,
    currentNickname: nickname || '',
  }

  return (
    <>
      {/* nickname listItem */}
      <CommonItem {...commonItemProps} />
      {/* nickname dialog */}
      <NicknameDialog {...nicknameDialogProps} />
    </>
  )
}
