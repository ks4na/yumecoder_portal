import React from 'react'
import { Box, Button } from '@material-ui/core'
import { validateEmail, validatePassword } from '../../configs/validation'
import { useDispatch, useSelector } from 'react-redux'
import {
  sagaUserLogin,
  UserLoginPayloadType,
  resetLoginStatus,
  setLoginCancelledStatus,
} from '../../models/actions'
import { LoginStatus } from '../../models/reducers/login'
import { useIntl, FormattedHTMLMessage } from 'react-intl'
import { useHistory } from 'react-router-dom'
import EmailTextField from '../../components/TextField/EmailTextField'
import PasswordTextField from '../../components/TextField/PasswordTextField'

interface TextFieldState {
  value: string
  error?: boolean
  helperText?: string
}

let currentLoginStatus: LoginStatus = LoginStatus.INITIAL

export default function LoginForm(): JSX.Element {
  const history = useHistory()
  const dispatch = useDispatch()
  const loginState = useSelector(({ loginState }) => loginState)
  const isLoggingIn =
    loginState.status === LoginStatus.LOGGINGIN ||
    loginState.qqLoginStatus === LoginStatus.LOGGINGIN
  currentLoginStatus = loginState.status
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

  // unmount 组件时
  React.useEffect(() => {
    return (): void => {
      // 如果当前登录状态为 LOGGINGIN，则切换为 CANCELLED
      if (currentLoginStatus === LoginStatus.LOGGINGIN) {
        dispatch(setLoginCancelledStatus())
      }

      // 如果当前登录状态为 SUCCESS/FAILED, 则重置登录状态为 INITIAL
      if (
        currentLoginStatus === LoginStatus.SUCCESS ||
        currentLoginStatus === LoginStatus.FAILED
      ) {
        dispatch(resetLoginStatus())
      }
    }
  }, [dispatch])

  React.useEffect(() => {
    // 如果登录状态为 SUCCESS， 则跳转练习页面
    if (loginState.status === LoginStatus.SUCCESS) {
      history.push('/test/menu')
    }
  }, [history, loginState.status])

  return (
    <form noValidate autoComplete="off">
      <Box marginY={4}>
        <EmailTextField
          id="login_form-input-email"
          inputRef={emailInputRef}
          error={emailState.error}
          helperText={emailState.helperText}
          value={emailState.value}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          placeholder={emailInputPlaceholderString}
          disabled={isLoggingIn}
        />
      </Box>

      <Box marginY={4}>
        <PasswordTextField
          id="login_form-input-password"
          inputRef={passwordInputref}
          error={passwordState.error}
          helperText={passwordState.helperText}
          value={passwordState.value}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          placeholder={passwordInputPlaceholderString}
          disabled={isLoggingIn}
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
            defaultMessage="登&nbsp;&nbsp;录"
          />
        )}
      </Button>
    </form>
  )
}
