import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import CommonItem, { CommonItemProps } from './CommonItem'
import { Skeleton } from '@material-ui/lab'
import { FormattedMessage } from 'react-intl'
import useGenderHook, {
  Gender,
} from '../../../../components/hooks/useGenderHook'
import GenderDialog, { GenderDialogProps } from './Dialogs/GenderDialog'
import useDialogHook from '../../../../components/hooks/useDialogHook'

const useStyles = makeStyles(theme => ({
  colorGrey: {
    color: theme.palette.grey[500],
  },
}))

export interface GenderItemProps {
  isLoading: boolean
  gender?: number
}

export default function GenderItem({
  isLoading,
  gender,
}: GenderItemProps): JSX.Element {
  const classes = useStyles()
  const { getGenderTxt } = useGenderHook()
  const txtGender = getGenderTxt(gender)

  const { open, handleOpen, handleClose } = useDialogHook()

  const leftPart = (
    <FormattedMessage id="home.profile.labelGender" defaultMessage="性别" />
  )

  const rightPart = isLoading ? (
    <Skeleton width={50} />
  ) : (
    <Typography className={classes.colorGrey} noWrap>
      {txtGender}
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

  const genderDialogProps: GenderDialogProps = {
    open,
    handleClose,
    currentGender: gender || Gender.Unknown,
  }

  return (
    <>
      {/* gender listItem */}
      <CommonItem {...commonItemProps} />
      {/* gender dialog */}
      <GenderDialog {...genderDialogProps} />
    </>
  )
}
