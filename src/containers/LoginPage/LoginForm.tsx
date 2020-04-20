import React from 'react'

import {
  TextField,
  TextFieldProps,
  InputAdornment,
  Box,
  IconButton,
  Button,
} from '@material-ui/core'
import AccountIcon from '@material-ui/icons/AccountCircleOutlined'
import LockIcon from '@material-ui/icons/LockOutlined'
import PwdVisibleIcon from '@material-ui/icons/VisibilityOutlined'
import PwdInvisibleIcon from '@material-ui/icons/VisibilityOffOutlined'
import { validateEmail, validatePassword } from '../../helpers/validation'
import { useDispatch, useSelector } from 'react-redux'
import {
  sagaUserLogin,
  UserLoginPayloadType,
  resetLoginStatus,
  setLoginCancelledStatus,
} from '../../models/actions'
import { LoginStatus } from '../../models/reducers/login'
import { useHistory } from 'react-router-dom'
import { useIntl, FormattedHTMLMessage } from 'react-intl'

interface TextFieldState {
  value: string
  error?: boolean
  helperText?: string
}

let lastLoginStatus: LoginStatus = LoginStatus.INITIAL

export default function LoginForm(): JSX.Element {
  const dispatch = useDispatch()
  const history = useHistory()
  const loginState = useSelector(({ loginState }) => loginState)
  const isLoggingIn = loginState.status === LoginStatus.LOGGINGIN
  lastLoginStatus = loginState.status
  const emailInputRef = React.useRef<HTMLInputElement>()
  const passwordInputref = React.useRef<HTMLInputElement>()
  const [emailState, setEmailState] = React.useState<TextFieldState>({
    value: '',
    error: false,
    helperText: '',
  })
  const [passwordState, setPasswordState] = React.useState<TextFieldState>({
    value: '',
    error: false,
    helperText: '',
  })

  const intl = useIntl()
  const invalidEmailString = intl.formatMessage({
    id: 'loginPageLoginFormInvalidEmailAddress',
    defaultMessage: '邮箱格式不正确',
  })
  const invalidPwdString = intl.formatMessage({
    id: 'loginPageLoginFormInvalidPassword',
    defaultMessage: '密码必须为6-18位字母或数字',
  })
  const emailInputPlaceholderString = intl.formatMessage({
    id: 'loginPageLoginFormEmailInputPlaceholder',
    defaultMessage: '邮箱',
  })
  const passwordInputPlaceholderString = intl.formatMessage({
    id: 'loginPageLoginFormPasswordInputPlaceholder',
    defaultMessage: '密码（6-18位字母或数字）',
  })

  const handleEmailChange = function(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    const value = e.target.value
    setEmailState((prevState: TextFieldState) => ({
      ...prevState,
      error: prevState.error && !validateEmail(value),
      helperText:
        prevState.error && !validateEmail(value) ? prevState.helperText : '',
      value,
    }))
  }

  const handleEmailBlur = function(): void {
    if (emailState.value && !validateEmail(emailState.value)) {
      setEmailState(prevState => ({
        ...prevState,
        error: true,
        helperText: invalidEmailString,
      }))
    } else {
      setEmailState(prevState => ({
        ...prevState,
        error: false,
        helperText: '',
      }))
    }
  }

  const handlePasswordChange = function(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    const value = e.target.value
    setPasswordState((prevState: TextFieldState) => ({
      ...prevState,
      error: prevState.error && !validatePassword(value),
      helperText:
        prevState.error && !validatePassword(value) ? prevState.helperText : '',
      value,
    }))
  }

  const handlePasswordBlur = function(): void {
    if (passwordState.value && !validatePassword(passwordState.value)) {
      setPasswordState(prevState => ({
        ...prevState,
        error: true,
        helperText: invalidPwdString,
      }))
    } else {
      setPasswordState(prevState => ({
        ...prevState,
        error: false,
        helperText: '',
      }))
    }
  }

  const handleLogin = function(): void {
    // validate email address
    if (!emailState.value) {
      setEmailState(prevState => ({
        ...prevState,
        error: true,
        helperText: invalidEmailString,
      }))
      emailInputRef.current && emailInputRef.current.focus()
      return
    }
    if (emailState.error) {
      emailInputRef.current && emailInputRef.current.focus()
      return
    }
    // validate password
    if (!passwordState.value) {
      setPasswordState(prevState => ({
        ...prevState,
        error: true,
        helperText: invalidPwdString,
      }))
      passwordInputref.current && passwordInputref.current.focus()
      return
    }
    if (passwordState.error) {
      passwordInputref.current && passwordInputref.current.focus()
      return
    }
    // handle user login request
    const loginInfo: UserLoginPayloadType = {
      account: emailState.value,
      password: passwordState.value,
    }
    dispatch(sagaUserLogin(loginInfo))
  }

  // mount 组件时，重置登录状态为 INITIAL
  React.useEffect(() => {
    dispatch(resetLoginStatus())
  }, [dispatch])

  // unmount 组件时，如果当前登录状态为 LOGGINGIN，则切换为 CANCELLED
  React.useEffect(() => {
    return (): void => {
      if (lastLoginStatus === LoginStatus.LOGGINGIN) {
        dispatch(setLoginCancelledStatus())
      }
    }
  }, [dispatch])

  // 如果登录状态为 SUCCESS
  if (loginState.status === LoginStatus.SUCCESS) {
    // 重置登录状态为 INITIAL, 然后跳转练习页面
    dispatch(resetLoginStatus())
    history.push('/test/menu')
  }

  return (
    <form noValidate autoComplete="off">
      <Box marginY={4}>
        <EmailTextField
          inputRef={emailInputRef}
          error={emailState.error}
          helperText={emailState.helperText}
          value={emailState.value}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          placeholder={emailInputPlaceholderString}
        />
      </Box>

      <Box marginY={4}>
        <PasswordTextField
          inputRef={passwordInputref}
          error={passwordState.error}
          helperText={passwordState.helperText}
          value={passwordState.value}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          placeholder={passwordInputPlaceholderString}
        />
      </Box>
      <Button
        fullWidth
        variant="contained"
        size="large"
        color="primary"
        onClick={handleLogin}
        disabled={isLoggingIn}
      >
        {isLoggingIn ? (
          <FormattedHTMLMessage
            id="loginPageLoginFormBtnLoginDisabledStatusText"
            defaultMessage="正在登录中..."
          />
        ) : (
          <FormattedHTMLMessage
            id="loginPageLoginFormBtnLoginEnabledStatusText"
            defaultMessage="登&nbsp;录"
          />
        )}
      </Button>
    </form>
  )
}

function EmailTextField(props: TextFieldProps): JSX.Element {
  return (
    <TextField
      id="input-email"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountIcon />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}

function PasswordTextField(props: TextFieldProps): JSX.Element {
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
      id="input-password"
      fullWidth
      type={showPwd ? 'text' : 'password'}
      autoComplete="current-password"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
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
      {...props}
    />
  )
}
