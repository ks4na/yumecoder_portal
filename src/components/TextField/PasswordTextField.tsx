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
  hideStartAdornment?: boolean
}

export default function PasswordTextField({
  startAdornment,
  hideStartAdornment = false,
  inputRef,
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
    // 保持切换 showPwd 时光标位置
    if (inputRef) {
      const inputElement = (inputRef as React.MutableRefObject<
        HTMLInputElement
      >).current
      const originalInfo = {
        selectionStart: inputElement.selectionStart,
        selectionEnd: inputElement.selectionEnd,
      }
      setTimeout(() => {
        inputElement.selectionStart = originalInfo.selectionStart
        inputElement.selectionEnd = originalInfo.selectionEnd
      }, 0)
    }
  }
  return (
    <TextField
      fullWidth
      inputRef={inputRef}
      type={showPwd ? 'text' : 'password'}
      autoComplete="current-password"
      InputProps={{
        startAdornment: !hideStartAdornment && (
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
