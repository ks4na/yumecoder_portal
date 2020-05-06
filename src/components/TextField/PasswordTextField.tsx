import React from 'react'
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import LockIcon from '@material-ui/icons/LockOutlined'
import PwdVisibleIcon from '@material-ui/icons/VisibilityOutlined'
import PwdInvisibleIcon from '@material-ui/icons/VisibilityOffOutlined'

interface AugmentedProps {
  startAdornment?: React.ReactNode
}

export default function PasswordTextField({
  startAdornment,
  ...otherProps
}: TextFieldProps & AugmentedProps): JSX.Element {
  const [showPwd, setShowPwd] = React.useState(false)

  const handleMouseDownPassword = function(
    e: React.MouseEvent<HTMLButtonElement>
  ): void {
    e.preventDefault()
  }

  const handleClickShowPassword = function(): void {
    setShowPwd(showPwd => !showPwd)
  }
  return (
    <TextField
      fullWidth
      type={showPwd ? 'text' : 'password'}
      autoComplete="current-password"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {startAdornment || <LockIcon />}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onMouseDown={handleMouseDownPassword}
              onClick={handleClickShowPassword}
            >
              {showPwd ? <PwdVisibleIcon /> : <PwdInvisibleIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...otherProps}
    />
  )
}
