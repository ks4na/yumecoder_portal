import React from 'react'
import { TextField, TextFieldProps, InputAdornment } from '@material-ui/core'
import AccountIcon from '@material-ui/icons/AccountCircleOutlined'

interface AugmentedProps {
  startAdornment?: React.ReactNode
}

export default function EmailTextField({
  startAdornment,
  ...otherProps
}: TextFieldProps & AugmentedProps): JSX.Element {
  return (
    <TextField
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {startAdornment || <AccountIcon />}
          </InputAdornment>
        ),
      }}
      {...otherProps}
    />
  )
}
