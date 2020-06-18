import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import CommonItem, { CommonItemProps } from './CommonItem'
import { Skeleton } from '@material-ui/lab'
import { FormattedMessage } from 'react-intl'
import useDialogHook from '../../../../components/hooks/useDialogHook'
import PersonalSignatureDialog, {
  PersonalSignatureDialogProps,
} from './Dialogs/PersonalSignatureDialog'

const useStyles = makeStyles(theme => ({
  colorGrey: {
    color: theme.palette.grey[500],
  },
}))

export interface PersonalSignatureItemProps {
  isLoading: boolean
  personalSignature?: string
}

export default function PersonalSignatureItem({
  isLoading,
  personalSignature,
}: PersonalSignatureItemProps): JSX.Element {
  const classes = useStyles()
  const { open, handleOpen, handleClose } = useDialogHook()

  const leftPart = (
    <FormattedMessage
      id="home.profile.labelPersonalSignature"
      defaultMessage="个人签名"
    />
  )

  const rightPart = isLoading ? (
    <Skeleton width={150} />
  ) : (
    <Typography className={classes.colorGrey} noWrap>
      {personalSignature}
    </Typography>
  )

  const onItemClick = function(): void {
    handleOpen()
  }

  const commonItemProps: CommonItemProps = {
    leftPart,
    rightPart,
    divider: false,
    onClick: onItemClick,
  }

  // personalSignatureDialog props
  const personalSignatureDialogProps: PersonalSignatureDialogProps = {
    open,
    handleClose,
    currentPersonalSignature: personalSignature || '',
  }

  return (
    <>
      {/* personalSignature ListItem */}
      <CommonItem {...commonItemProps} />
      {/* personalSignature Dialog */}
      <PersonalSignatureDialog {...personalSignatureDialogProps} />
    </>
  )
}
