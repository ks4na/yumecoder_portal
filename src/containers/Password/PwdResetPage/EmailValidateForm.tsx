import React from 'react'
import {
  Box,
  TextField,
  Typography,
  FormHelperText,
  Button,
} from '@material-ui/core'
import { useIntl, FormattedHTMLMessage } from 'react-intl'
import { validateEmail } from '../../../configs/validation'
import commonConfigs from '../../../configs/common.config'
import { useSelector, useDispatch } from 'react-redux'
import { Status } from '../../../models/reducers/status'
import {
  sagaRequestPwdResetEmailValidation,
  sagaCancelPwdResetEmailValidation,
  resetPwdResetEmailValidateStatus,
  EmailValidationParams,
} from '../../../models/actions'
import { useHistory } from 'react-router-dom'

const { siteKey, scriptSrc } = commonConfigs.luosimaoCaptcha

export default function EmailValidateForm(): JSX.Element {
  const {
    emailInputRef,
    emailState,
    txtEmailInputLabel,
    txtEmailInputPlaceholder,
    handleEmailChange,
    handleEmailBlur,
    checkEmailStateBeforeValidation,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useEmailTextFieldHook()

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { captchaState, checkCaptchaBeforeValidation } = useCaptchaHook()

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { isValidating, requestEmailValidation } = useEmailValidateHook()

  const handleValidate = function(): void {
    // 校验邮箱格式
    if (!checkEmailStateBeforeValidation()) {
      return
    }
    // 校验captcha图形验证码
    if (!checkCaptchaBeforeValidation()) {
      return
    }
    // 发送异步请求
    requestEmailValidation({
      email: emailState.value,
      captcha: captchaState.value,
    })
  }

  return (
    <Box paddingY={2}>
      <form noValidate autoComplete="off">
        <Typography variant="body1">{`${txtEmailInputLabel} :`}</Typography>
        <Box marginBottom={4} marginTop={2}>
          <TextField
            fullWidth
            id="pwd_reset-email_validate-input-email"
            inputRef={emailInputRef}
            value={emailState.value}
            error={emailState.error}
            helperText={emailState.helperText}
            onChange={handleEmailChange}
            placeholder={txtEmailInputPlaceholder}
            onBlur={handleEmailBlur}
            disabled={isValidating}
          />
        </Box>
        {/* captcha - 图形验证码 */}
        <Box marginY={4}>
          <div
            className="l-captcha"
            data-site-key={siteKey}
            data-width="100%"
            data-callback="handleCaptchaCallback"
            aria-describedby="pwd_reset-email_validate-captcha-helper-text"
          ></div>
          <FormHelperText
            id="pwd_reset-email_validate-captcha-helper-text"
            error={captchaState.error}
          >
            {captchaState.helperText}
          </FormHelperText>
        </Box>
        <Box marginY={4}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            onClick={handleValidate}
            disabled={isValidating}
          >
            {isValidating ? (
              <FormattedHTMLMessage
                id="password.pwdResetPage.emailValidateForm.btnValidate.txtDisabled"
                defaultMessage="正在请求中..."
              />
            ) : (
              <FormattedHTMLMessage
                id="password.pwdResetPage.emailValidateForm.btnValidate.txt"
                defaultMessage="确&nbsp;&nbsp;定"
              />
            )}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

// useEmailValidteFormHook
export function useEmailTextFieldHook(): EmailTextFieldHookReturnType {
  const intl = useIntl()

  const emailInputRef = React.useRef<HTMLInputElement>()
  const [emailState, setEmailState] = React.useState<TextFieldState>({
    value: '',
    error: false,
    helperText: '',
  })

  const txtEmailInputLabel = intl.formatMessage({
    id: 'password.pwdResetPage.emailValidateForm.txtEmailInputLabel',
    defaultMessage: '输入需要找回密码的邮箱账号',
  })
  const txtEmailInputPlaceholder = intl.formatMessage({
    id: 'password.pwdResetPage.emailValidateForm.txtEmailInputPlaceholder',
    defaultMessage: '邮箱账号',
  })
  const txtInvalidEmail = intl.formatMessage({
    id: 'loginPageLoginFormInvalidEmailAddress',
    defaultMessage: '邮箱格式不正确',
  })

  const handleEmailChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setEmailState(prevState => ({
        ...prevState,
        value,
        error: prevState.error && !validateEmail(value),
        helperText:
          prevState.error && !validateEmail(value) ? txtInvalidEmail : '',
      }))
    },
    [txtInvalidEmail]
  )

  const handleEmailBlur = React.useCallback(() => {
    if (emailState.value && !validateEmail(emailState.value)) {
      setEmailState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidEmail,
      }))
    } else {
      setEmailState(prevState => ({
        ...prevState,
        error: false,
        helperText: '',
      }))
    }
  }, [emailState.value, txtInvalidEmail])

  const checkEmailStateBeforeValidation = React.useCallback((): boolean => {
    if (!emailState.value) {
      setEmailState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidEmail,
      }))
      emailInputRef.current && emailInputRef.current.focus()
      return false
    }
    if (emailState.error) {
      emailInputRef.current && emailInputRef.current.focus()
      return false
    }
    return true
  }, [emailState.error, emailState.value, txtInvalidEmail])

  return {
    emailInputRef,
    emailState,
    handleEmailChange,
    handleEmailBlur,
    txtEmailInputLabel,
    txtEmailInputPlaceholder,
    checkEmailStateBeforeValidation,
  }
}

export interface TextFieldState {
  value: string
  error: boolean
  helperText: string
}

export interface EmailTextFieldHookReturnType {
  emailInputRef: React.MutableRefObject<HTMLInputElement | undefined>
  emailState: TextFieldState
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEmailBlur: () => void
  txtEmailInputLabel: string
  txtEmailInputPlaceholder: string
  checkEmailStateBeforeValidation: () => boolean
}

// useCaptchaHook
export function useCaptchaHook(): CaptchaHookReturnType {
  const emailValidateStatus = useSelector(
    ({ pwdResetState }) => pwdResetState.emailValidateStatus
  )
  const intl = useIntl()
  const [captchaState, setCaptchaState] = React.useState<TextFieldState>({
    value: '',
    error: false,
    helperText: '',
  })

  const txtEmptyCaptcha = intl.formatMessage({
    id: 'registPage.registForm.emptyCaptcha',
    defaultMessage: '人机验证不通过',
  })

  const checkCaptchaBeforeValidation = React.useCallback((): boolean => {
    if (!captchaState.value) {
      setCaptchaState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtEmptyCaptcha,
      }))
      return false
    }
    return true
  }, [captchaState.value, txtEmptyCaptcha])

  // 处理 captcha 的 script 的加载与卸载
  // didmount 与 willUnmount
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

    // unmount 时，
    // 删除 captchaScript 对应的 script 标签
    return (): void => {
      const script = document.querySelector('#captchaScript')
      script && script.remove()
    }
  }, [])

  // 监听 emailValidateStatus 变化
  // 如果为 FAILED ， 则重置 captcha 图形验证码
  React.useEffect(() => {
    if (emailValidateStatus === Status.FAILED) {
      setCaptchaState(prevState => ({
        ...prevState,
        value: '',
      }))
      window.LUOCAPTCHA && window.LUOCAPTCHA.reset()
    }
  }, [emailValidateStatus])

  return {
    captchaState,
    checkCaptchaBeforeValidation,
  }
}

export interface CaptchaHookReturnType {
  captchaState: TextFieldState
  checkCaptchaBeforeValidation: () => boolean
}

// useEmailValidateHook
export function useEmailValidateHook(): EmailValidateReturnType {
  const dispatch = useDispatch()
  const history = useHistory()
  const lastValidatedEmail = React.useRef<string>('')
  const currentEmailValidateStatus = React.useRef<Status>(Status.INITIAL)
  const { emailValidateStatus } = useSelector(
    ({ pwdResetState }) => pwdResetState
  )
  const isValidating = emailValidateStatus === Status.PROGRESSING
  currentEmailValidateStatus.current = emailValidateStatus

  const requestEmailValidation = React.useCallback(
    ({ email, captcha }: EmailValidationParams): void => {
      lastValidatedEmail.current = email
      dispatch(sagaRequestPwdResetEmailValidation({ email, captcha }))
    },
    [dispatch]
  )

  // unmount 时，
  // 重置 emailValidateStatus
  React.useEffect(() => {
    return (): void => {
      // 如果 emailValidateStatus 为 请求中 状态，则先取消
      if (currentEmailValidateStatus.current === Status.PROGRESSING) {
        dispatch(sagaCancelPwdResetEmailValidation())
      }
      // 重置 emailValidateStatus 为 初始值
      dispatch(resetPwdResetEmailValidateStatus())
    }
  }, [dispatch])

  // 监听 emailValidateStatus 变化
  React.useEffect(() => {
    // 如果为 SUCCESS ， 则跳转到 设置新密码 页面
    if (emailValidateStatus === Status.SUCCESS) {
      history.push(
        `/password/reset/${encodeURIComponent(lastValidatedEmail.current)}`
      )
    }
  }, [emailValidateStatus, history])

  return {
    isValidating,
    requestEmailValidation,
  }
}

export interface EmailValidateReturnType {
  isValidating: boolean
  requestEmailValidation: (params: EmailValidationParams) => void
}
