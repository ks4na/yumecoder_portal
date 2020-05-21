import React from 'react'
import { IconButton } from '@material-ui/core'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined'
import { useHistory } from 'react-router-dom'

export default function IconButtonBack(): JSX.Element {
  const history = useHistory()

  const handleBack = function(): void {
    history.goBack()
  }

  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="back"
      onClick={handleBack}
    >
      <ArrowBackIosOutlinedIcon />
    </IconButton>
  )
}
