import React from 'react'
import { IconButton } from '@material-ui/core'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined'
import { useHistory } from 'react-router-dom'

export interface IconButtonBackProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function IconButtonBack({
  onClick,
}: IconButtonBackProps): JSX.Element {
  const history = useHistory()

  const handleBack = function(): void {
    history.goBack()
  }

  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="back"
      onClick={onClick || handleBack}
    >
      <ArrowBackIosOutlinedIcon />
    </IconButton>
  )
}
