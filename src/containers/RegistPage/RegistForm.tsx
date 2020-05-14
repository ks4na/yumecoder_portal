import React from 'react'
import { Box, Button, Icon, FormHelperText } from '@material-ui/core'
import EmailTextField from '../../components/TextField/EmailTextField'
import PasswordTextField from '../../components/TextField/PasswordTextField'
import { FormattedHTMLMessage, useIntl } from 'react-intl'
import { validateEmail, validatePassword } from '../../configs/validation'
import { makeStyles } from '@material-ui/core/styles'
import commonConfigs from '../../configs/common.config'
import { useDispatch, useSelector } from 'react-redux'
import {
  sagaRequestRegist,
  changeRegistStatus,
  sagaCancelRegist,
  changeEmailUsedStatus,
  sagaRequestEmailCheck,
  sagaCancelEmailCheck,
  resetAllEmailStatus,
} from '../../models/actions'
import { useHistory, useRouteMatch } from 'react-router-dom'
import {
  RegistStatus,
  EmailCheckStatus,
  EmailUsedStatus,
} from '../../models/reducers/regist'

const { scriptSrc, siteKey } = commonConfigs.luosimaoCaptcha

const useStyles = makeStyles({
  iconRepwd: {
    '&.fa-repwd': {
      fontWeight: 600,
    },
  },
})

let currentRegistStatus: RegistStatus = RegistStatus.INITIAL
let lastSentEmail = ''

export default function RegistForm(): JSX.Element {
  const history = useHistory()
  const match = useRouteMatch()
  const dispatch = useDispatch()
  const registState = useSelector(({ registState }) => registState)
  currentRegistStatus = registState.status
  const isRegisting = registState.status === RegistStatus.PROGRESSING
  const classes = useStyles()
  const {
    emailTextFieldHelperText,
    requestEmailCheck,
    cancelEmailCheck,
    emailCheckStatus,
    emailUsedStatus,
    resetEmailUsedStatus,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useEmailCheckHook()

  const emailInputRef = React.useRef<HTMLInputElement>()
  const passwordInputref = React.useRef<HTMLInputElement>()
  const repasswordInputref = React.useRef<HTMLInputElement>()
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
  const [repasswordState, setRepasswordState] = React.useState<TextFieldState>({
    value: '',
    error: false,
    helperText: '',
  })
  const [captchaState, setCaptchaState] = React.useState<TextFieldState>({
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
  const invalidRepwdString = intl.formatMessage({
    id: 'registPage.registForm.unmatchedRepassword',
    defaultMessage: '两次输入的密码不一致',
  })
  const invalidCaptchaString = intl.formatMessage({
    id: 'registPage.registForm.emptyCaptcha',
    defaultMessage: '人机验证不通过',
  })
  const emailInputPlaceholderString = intl.formatMessage({
    id: 'loginPageLoginFormEmailInputPlaceholder',
    defaultMessage: '邮箱',
  })
  const passwordInputPlaceholderString = intl.formatMessage({
    id: 'loginPageLoginFormPasswordInputPlaceholder',
    defaultMessage: '密码（6-18位字母或数字）',
  })
  const repasswordInputPlaceholderString = intl.formatMessage({
    id: 'registPage.registForm.repasswordInputPlaceholder',
    defaultMessage: '再次输入密码',
  })

  const handleEmailChange = function(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    const value = e.target.value
    setEmailState((prevState: TextFieldState) => ({
      ...prevState,
      error: prevState.error && !validateEmail(value),
      helperText:
        prevState.error && !validateEmail(value) ? invalidEmailString : '',
      value,
    }))

    // 如果 emailUsedStatus 不为初始值，则重置 emailUsedState
    if (emailUsedStatus !== EmailUsedStatus.UNKNOWN) {
      resetEmailUsedStatus()
    }
    // 如果正在检查 email 可用性，则取消
    if (emailCheckStatus === EmailCheckStatus.PROGRESSING) {
      cancelEmailCheck()
    }
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

      // 如果有值且通过 email 格式校验, 发送请求检测 email 是否可用
      if (emailState.value) {
        requestEmailCheck(emailState.value)
      }
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
        prevState.error && !validatePassword(value) ? invalidPwdString : '',
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

    // 如果 repassword 输入框存在值，则更新 repasswordState
    if (repasswordState.value) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleRepasswordBlur()
    }
  }

  const handleRepasswordChange = function(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    const value = e.target.value
    setRepasswordState((prevState: TextFieldState) => ({
      ...prevState,
      error: value !== passwordState.value,
      helperText: value !== passwordState.value ? invalidRepwdString : '',
      value,
    }))
  }

  const handleRepasswordBlur = function(): void {
    if (
      repasswordState.value &&
      repasswordState.value !== passwordState.value
    ) {
      setRepasswordState(prevState => ({
        ...prevState,
        error: true,
        helperText: invalidRepwdString,
      }))
    } else {
      setRepasswordState(prevState => ({
        ...prevState,
        error: false,
        helperText: '',
      }))
    }
  }

  const handleRegist = function(): void {
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
    // validate repassword
    if (!repasswordState.value) {
      setRepasswordState(prevState => ({
        ...prevState,
        error: true,
        helperText: invalidRepwdString,
      }))
      repasswordInputref.current && repasswordInputref.current.focus()
      return
    }
    if (repasswordState.error) {
      repasswordInputref.current && repasswordInputref.current.focus()
      return
    }
    // validate captcha
    if (!captchaState.value) {
      setCaptchaState(prevState => ({
        ...prevState,
        error: true,
        helperText: invalidCaptchaString,
      }))
      return
    }
    // validate emailUsedStatus
    if (emailUsedStatus !== EmailUsedStatus.UNUSED) {
      emailInputRef.current && emailInputRef.current.focus()
      return
    }

    // 发送异步请求
    const registParams = {
      email: emailState.value,
      password: passwordState.value,
      captcha: captchaState.value,
    }
    lastSentEmail = emailState.value
    dispatch(sagaRequestRegist(registParams))
  }

  // 加载 captcha 的 script
  React.useEffect(() => {
    // captcha code 回调函数
    const handleCaptcha = function(captcha: string): void {
      setCaptchaState(prevState => ({
        ...prevState,
        value: captcha,
        error: false,
        helperText: '',
      }))
    }
    // 绑定到 window 对象
    window.handleCaptchaCallback = handleCaptcha

    // 添加 script 到 <head> 标签
    const script = document.createElement('script')
    script.id = 'captchaScript'
    script.src = scriptSrc
    script.type = 'text/javascript'

    document.head.appendChild(script)

    // unmount 时删除 captchaScript 对应的 script 标签
    return (): void => {
      const script = document.querySelector('#captchaScript')
      script && script.remove()
    }
  }, [])

  // 监听 registState.status 变化
  React.useEffect(() => {
    // registStatus 为 SUCCESS 状态，则跳转到激活页面
    if (registState.status === RegistStatus.SUCCESS) {
      // history.push(
      //   `${match.url}/active?email=${encodeURIComponent(lastSentEmail)}`
      // )
      history.push(`${match.url}/active`, {
        email: lastSentEmail,
      })
    }
    // registStatus 为 FAILED 状态，则重置 captcha 图形验证码
    if (registState.status === RegistStatus.FAILED) {
      setCaptchaState(prevState => ({
        ...prevState,
        value: '',
      }))
      window.LUOCAPTCHA && window.LUOCAPTCHA.reset()
    }
  }, [history, match.url, registState.status])

  // unmount
  React.useEffect(() => {
    return (): void => {
      // 如果 状态为 请求中, 则先取消请求
      if (currentRegistStatus === RegistStatus.PROGRESSING) {
        dispatch(sagaCancelRegist())
      }
      // 重置 registStatus 为 初始值
      dispatch(changeRegistStatus(RegistStatus.INITIAL))
    }
  }, [dispatch])

  return (
    <form noValidate autoComplete="off">
      <Box marginY={4}>
        <EmailTextField
          id="regist_form-input-email"
          inputRef={emailInputRef}
          value={emailState.value}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          placeholder={emailInputPlaceholderString}
          disabled={isRegisting}
        />
        <FormHelperText error={emailState.error}>
          {emailState.helperText || emailTextFieldHelperText}
        </FormHelperText>
      </Box>

      <Box marginY={4}>
        <PasswordTextField
          id="regist_form-input-password"
          inputRef={passwordInputref}
          error={passwordState.error}
          helperText={passwordState.helperText}
          value={passwordState.value}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          placeholder={passwordInputPlaceholderString}
          disabled={isRegisting}
        />
      </Box>
      <Box marginY={4}>
        <PasswordTextField
          id="regist_form-input-repassword"
          inputRef={repasswordInputref}
          error={repasswordState.error}
          helperText={repasswordState.helperText}
          value={repasswordState.value}
          onChange={handleRepasswordChange}
          onBlur={handleRepasswordBlur}
          placeholder={repasswordInputPlaceholderString}
          startAdornment={<Icon className={`fa-repwd ${classes.iconRepwd}`} />}
          disabled={isRegisting}
        />
      </Box>
      {/* captcha - 图形验证码 */}
      <Box marginY={4}>
        <div
          className="l-captcha"
          data-site-key={siteKey}
          data-width="100%"
          data-callback="handleCaptchaCallback"
          aria-describedby="captcha-helper-text"
        ></div>
        <FormHelperText id="captcha-helper-text" error={captchaState.error}>
          {captchaState.helperText}
        </FormHelperText>
      </Box>
      <Box marginY={4}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          color="primary"
          onClick={handleRegist}
          disabled={isRegisting}
        >
          {isRegisting ? (
            <FormattedHTMLMessage
              id="registPage.registForm.btnRegist.txtDisabled"
              defaultMessage="正在注册中..."
            />
          ) : (
            <FormattedHTMLMessage
              id="registPage.registForm.btnRegist.txt"
              defaultMessage="注&nbsp;&nbsp;册"
            />
          )}
        </Button>
      </Box>
    </form>
  )
}

interface TextFieldState {
  value: string
  error?: boolean
  helperText?: string
}

const useEmailCheckHookStyles = makeStyles({
  helperTextIcon: {
    fontSize: 'inherit',
    padding: '0 0.25rem',
    position: 'relative',
    top: 1,

    '&.fa-spinner': {
      '&::before': {
        display: 'inline-block',
        animation: '$rotate 2s linear infinite',
      },
    },
  },

  '@keyframes rotate': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
})

let currentEmailCheckStatus: EmailCheckStatus = EmailCheckStatus.INITIAL
// useEmailCheck 钩子函数
export function useEmailCheckHook(): UseEmailCheckHookReturnType {
  const classes = useEmailCheckHookStyles()
  const intl = useIntl()
  const dispatch = useDispatch()
  const { emailCheckStatus, emailUsedStatus } = useSelector(
    ({ registState }) => registState
  )
  currentEmailCheckStatus = emailCheckStatus

  const txtUsedEmail = intl.formatMessage({
    id: 'registPage.registForm.txtUsedEmail',
    defaultMessage: '该邮箱已被占用',
  })
  const txtUnusedEmail = intl.formatMessage({
    id: 'registPage.registForm.txtUnusedEmail',
    defaultMessage: '该邮箱可以使用',
  })
  const txtEmailChecking = intl.formatMessage({
    id: 'registPage.registForm.txtEmailChecking',
    defaultMessage: '正在检测邮箱是否可用',
  })
  const txtEmailCheckFailed = intl.formatMessage({
    id: 'registPage.registForm.txtEmailCheckFailed',
    defaultMessage: '检查邮箱可用性时发生异常',
  })

  let emailTextFieldHelperText: React.ReactNode
  if (emailCheckStatus === EmailCheckStatus.PROGRESSING) {
    emailTextFieldHelperText = (
      <Box component="span">
        <Icon className={`fa-spinner ${classes.helperTextIcon}`} />
        {txtEmailChecking}
      </Box>
    )
  } else if (emailCheckStatus === EmailCheckStatus.FAILED) {
    emailTextFieldHelperText = (
      <Box component="span" color="warning.dark">
        <Icon className={`fa-warning ${classes.helperTextIcon}`} />
        {txtEmailCheckFailed}
      </Box>
    )
  } else if (emailCheckStatus === EmailCheckStatus.SUCCESS) {
    if (emailUsedStatus === EmailUsedStatus.USED) {
      emailTextFieldHelperText = (
        <Box component="span" color="error.dark">
          <Icon className={`fa-times-circle ${classes.helperTextIcon}`} />
          {txtUsedEmail}
        </Box>
      )
    } else if (emailUsedStatus === EmailUsedStatus.UNUSED) {
      emailTextFieldHelperText = (
        <Box component="span" color="success.dark">
          <Icon className={`fa-check-circle ${classes.helperTextIcon}`} />
          {txtUnusedEmail}
        </Box>
      )
    }
  }

  // unmount时，重置 emailCheckStatus, emailUsedStatus
  React.useEffect(() => {
    return (): void => {
      // 如果当前 emailCheckStatus 为 请求中 状态，则设置为 取消 状态
      if (currentEmailCheckStatus === EmailCheckStatus.PROGRESSING) {
        dispatch(sagaCancelEmailCheck())
      }
      // 重置所有和 email 检查相关的状态
      dispatch(resetAllEmailStatus())
    }
  }, [dispatch])

  // 发起 email可用性检查 请求
  const requestEmailCheck = React.useCallback(
    (email: string) => {
      dispatch(sagaRequestEmailCheck(email))
    },
    [dispatch]
  )

  // 取消 email 可用性检查 请求
  const cancelEmailCheck = React.useCallback(() => {
    dispatch(sagaCancelEmailCheck())
  }, [dispatch])

  // 重置 emailUsedStatus
  const resetEmailUsedStatus = React.useCallback(() => {
    dispatch(changeEmailUsedStatus(EmailUsedStatus.UNKNOWN))
  }, [dispatch])

  return {
    emailCheckStatus,
    emailUsedStatus,
    emailTextFieldHelperText,
    requestEmailCheck,
    cancelEmailCheck,
    resetEmailUsedStatus,
  }
}

export interface UseEmailCheckHookReturnType {
  emailCheckStatus: EmailCheckStatus
  emailUsedStatus: EmailUsedStatus
  emailTextFieldHelperText: React.ReactNode
  requestEmailCheck: (email: string) => void
  cancelEmailCheck: () => void
  resetEmailUsedStatus: () => void
}
