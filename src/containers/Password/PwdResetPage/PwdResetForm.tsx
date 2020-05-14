import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import {
  validateEmail,
  validatePassword,
  validateActiveCode,
} from '../../../configs/validation'
import { Box, Typography, TextField, Button, Icon } from '@material-ui/core'
import { FormattedMessage, useIntl, FormattedHTMLMessage } from 'react-intl'
import PasswordTextField from '../../../components/TextField/PasswordTextField'
import { useDispatch, useSelector } from 'react-redux'
import { Status } from '../../../models/reducers/status'
import {
  sagaCancelPwdReset,
  resetPwdResetStatus,
  sagaRequestPwdReset,
  PwdResetParams,
} from '../../../models/actions'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  successIcon: {
    display: 'block',
    margin: '0 auto',
    fontSize: '6rem',
    marginBottom: theme.spacing(2),
  },
}))

export default function PwdResetForm(): JSX.Element {
  const classes = useStyles()
  const history = useHistory()

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const email = useParamsValidationHook()

  const {
    pwdInputRef,
    pwdState,
    txtPwdInputLabel,
    txtPwdInputPlaceholder,
    handlePwdInputChange,
    handlePwdInputBlur: handlePwdInputBlurFromPwdTextFieldHook,
    checkPwdBeforeSubmit,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = usePasswordTextFieldHook()

  const {
    repwdInputRef,
    repwdState,
    txtRepwdInputLabel,
    txtRepwdInputPlaceholder,
    handleRepwdInputChange,
    handleRepwdInputBlur,
    checkRepwdBeforeSubmit,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useRepasswordTextFieldHook(pwdState.value)

  const {
    vCodeInputRef,
    vCodestate,
    txtVCodeInputLabel,
    txtVCodePlaceholder,
    handleVCodeInputChange,
    handleVCodeInputBlur,
    checkVCodeBeforeSubmit,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useValidationCodeTextFieldHook()

  const {
    pwdResetStatus,
    isResettingPwd,
    requestPwdReset,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useRequestPwdResetHook()

  const handlePwdInputBlur = function(): void {
    handlePwdInputBlurFromPwdTextFieldHook()

    // 如果 repwdInput 存在值，则触发 repwdInput 的 blur 事件
    if (repwdState.value) {
      handleRepwdInputBlur()
    }
  }

  const handleSumbitPwdResetForm = function(): void {
    // check pwd format
    if (!checkPwdBeforeSubmit()) {
      return
    }
    // check repwd format
    if (!checkRepwdBeforeSubmit()) {
      return
    }
    // check validation code format
    if (!checkVCodeBeforeSubmit()) {
      return
    }

    // 发送异步请求
    requestPwdReset({
      email,
      password: pwdState.value,
      validationCode: vCodestate.value,
    })
  }

  const handleToLoginPage = function(): void {
    history.push('/login')
  }

  if (pwdResetStatus === Status.SUCCESS) {
    return (
      <Box paddingY={2} textAlign="center">
        <Box color="success.main" paddingTop={2} paddingBottom={4}>
          <Icon className={`fa-check-circle ${classes.successIcon}`} />
          <Typography variant="h5" component="p">
            <FormattedMessage
              id="password.pwdResetPage.txtPwdResetSuccess"
              defaultMessage="密码重置成功"
            />
          </Typography>
        </Box>
        <Box clone marginBottom={2}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleToLoginPage}
          >
            <FormattedMessage
              id="password.pwdResetPage.btnBackToLoginPage"
              defaultMessage="返回登录页面"
            />
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box paddingY={2}>
      <form noValidate autoComplete="off">
        <Box marginBottom={2}>
          <Typography variant="body1">
            <FormattedMessage
              id="password.pwdResetPage.pwdResetForm.caption"
              defaultMessage="设置新的密码"
            />
            {' :'}
          </Typography>
        </Box>
        <Box marginBottom={2}>
          <PasswordTextField
            id="pwd_reset_form-input-password"
            inputRef={pwdInputRef}
            value={pwdState.value}
            error={pwdState.error}
            helperText={pwdState.helperText}
            label={txtPwdInputLabel}
            placeholder={txtPwdInputPlaceholder}
            hideStartAdornment={true}
            onChange={handlePwdInputChange}
            onBlur={handlePwdInputBlur}
            disabled={isResettingPwd}
          />
        </Box>
        <Box marginBottom={2}>
          <PasswordTextField
            id="pwd_reset_form-input-repassword"
            inputRef={repwdInputRef}
            value={repwdState.value}
            error={repwdState.error}
            helperText={repwdState.helperText}
            label={txtRepwdInputLabel}
            placeholder={txtRepwdInputPlaceholder}
            hideStartAdornment={true}
            onChange={handleRepwdInputChange}
            onBlur={handleRepwdInputBlur}
            disabled={isResettingPwd}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            fullWidth
            id="regist_active_form-input-active_code"
            inputRef={vCodeInputRef}
            value={vCodestate.value}
            error={vCodestate.error}
            helperText={vCodestate.helperText}
            label={txtVCodeInputLabel}
            placeholder={txtVCodePlaceholder}
            onChange={handleVCodeInputChange}
            onBlur={handleVCodeInputBlur}
            disabled={isResettingPwd}
          />
        </Box>
        <Box marginY={3}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            onClick={handleSumbitPwdResetForm}
            disabled={isResettingPwd}
          >
            {isResettingPwd ? (
              <FormattedHTMLMessage
                id="password.pwdResetPage.pwdResetForm.btnSubmit.txtDisabled"
                defaultMessage="正在请求中..."
              />
            ) : (
              <FormattedHTMLMessage
                id="password.pwdResetPage.pwdResetForm.btnSubmit.txt"
                defaultMessage="确&nbsp;&nbsp;定"
              />
            )}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

// useParamsValidationHook
export function useParamsValidationHook(): string {
  const history = useHistory()
  const match = useRouteMatch<{ email: string }>()
  const { email: encodedEmail } = match.params
  const email = decodeURIComponent(encodedEmail)

  // didMount 后，校验参数 email 格式是否正确
  React.useEffect(() => {
    if (!validateEmail(email)) {
      history.replace(`/password/reset`)
    }
  }, [email, history])

  return email
}

// usePasswordTextFieldHook
export function usePasswordTextFieldHook(): PasswordTextFieldHookReturnType {
  const intl = useIntl()

  const pwdInputRef = React.useRef<HTMLInputElement>()
  const [pwdState, setPwdState] = React.useState<TextFieldState>({
    value: '',
    error: false,
    helperText: '',
  })

  const txtPwdInputLabel = intl.formatMessage({
    id: 'password.PwdResetPage.PwdResetForm.txtPwdInputLabel',
    defaultMessage: '新密码',
  })
  const txtPwdInputPlaceholder = intl.formatMessage({
    id: 'password.pwdResetPage.pwdResetForm.txtPwdInputPlaceholder',
    defaultMessage: '6-18位字母或数字',
  })
  const txtInvalidPwd = intl.formatMessage({
    id: 'password.pwdResetPage.pwdResetForm.txtInvalidPwd',
    defaultMessage: '新密码格式不正确',
  })

  const handlePwdInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value
      setPwdState(prevState => ({
        ...prevState,
        value,
        error: prevState.error && !validatePassword(value),
        helperText:
          prevState.error && !validatePassword(value) ? txtInvalidPwd : '',
      }))
    },
    [txtInvalidPwd]
  )

  const handlePwdInputBlur = React.useCallback((): void => {
    if (pwdState.value && !validatePassword(pwdState.value)) {
      setPwdState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidPwd,
      }))
    } else {
      setPwdState(prevState => ({
        ...prevState,
        error: false,
        helperText: '',
      }))
    }
  }, [pwdState.value, txtInvalidPwd])

  const checkPwdBeforeSubmit = React.useCallback((): boolean => {
    if (pwdState.error) {
      pwdInputRef.current && pwdInputRef.current.focus()
      return false
    }
    if (!pwdState.value) {
      setPwdState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidPwd,
      }))
      pwdInputRef.current && pwdInputRef.current.focus()
      return false
    }

    return true
  }, [pwdState.error, pwdState.value, txtInvalidPwd])

  return {
    pwdInputRef,
    pwdState,
    txtPwdInputLabel,
    txtPwdInputPlaceholder,
    handlePwdInputChange,
    handlePwdInputBlur,
    checkPwdBeforeSubmit,
  }
}

export interface PasswordTextFieldHookReturnType {
  pwdInputRef: React.MutableRefObject<HTMLInputElement | undefined>
  pwdState: TextFieldState
  txtPwdInputLabel: string
  txtPwdInputPlaceholder: string
  handlePwdInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePwdInputBlur: () => void
  checkPwdBeforeSubmit: () => boolean
}

// useRepasswordTextFieldHook
export function useRepasswordTextFieldHook(
  passwordValue: string
): RepasswordTextFieldHookReturnType {
  const intl = useIntl()

  const repwdInputRef = React.useRef<HTMLInputElement>()
  const [repwdState, setRepwdState] = React.useState<TextFieldState>({
    value: '',
    error: false,
    helperText: '',
  })

  const txtRepwdInputLabel = intl.formatMessage({
    id: 'password.pwdResetPage.pwdResetForm.txtRepwdInputLabel',
    defaultMessage: '确认新密码',
  })
  const txtRepwdInputPlaceholder = intl.formatMessage({
    id: 'password.pwdResetPage.pwdResetForm.txtRepwdInputPlaceholder',
    defaultMessage: '再次输入新密码',
  })
  const txtInvalidRepwd = intl.formatMessage({
    id: 'password.pwdResetPage.pwdResetForm.txtInvalidRepwd',
    defaultMessage: '两次输入的密码不一致',
  })

  const handleRepwdInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value
      setRepwdState({
        value,
        error: value !== passwordValue,
        helperText: value !== passwordValue ? txtInvalidRepwd : '',
      })
    },
    [passwordValue, txtInvalidRepwd]
  )

  const handleRepwdInputBlur = React.useCallback((): void => {
    if (repwdState.value && repwdState.value !== passwordValue) {
      setRepwdState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidRepwd,
      }))
    } else {
      setRepwdState(prevState => ({
        ...prevState,
        error: false,
        helperText: '',
      }))
    }
  }, [passwordValue, repwdState.value, txtInvalidRepwd])

  const checkRepwdBeforeSubmit = React.useCallback((): boolean => {
    if (repwdState.error) {
      repwdInputRef.current && repwdInputRef.current.focus()
      return false
    }
    if (!repwdState.value) {
      setRepwdState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidRepwd,
      }))
      repwdInputRef.current && repwdInputRef.current.focus()
      return false
    }

    return true
  }, [repwdState.error, repwdState.value, txtInvalidRepwd])

  return {
    repwdInputRef,
    repwdState,
    txtRepwdInputLabel,
    txtRepwdInputPlaceholder,
    handleRepwdInputChange,
    handleRepwdInputBlur,
    checkRepwdBeforeSubmit,
  }
}

export interface RepasswordTextFieldHookReturnType {
  repwdInputRef: React.MutableRefObject<HTMLInputElement | undefined>
  repwdState: TextFieldState
  txtRepwdInputLabel: string
  txtRepwdInputPlaceholder: string
  handleRepwdInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRepwdInputBlur: () => void
  checkRepwdBeforeSubmit: () => boolean
}

// useValidationCodeTextFieldHook
export function useValidationCodeTextFieldHook(): ValidationCodeTextFieldHookReturnType {
  const intl = useIntl()
  const vCodeInputRef = React.useRef<HTMLInputElement>()

  const [vCodestate, setVCodeState] = React.useState<TextFieldState>({
    value: '',
    error: false,
    helperText: '',
  })

  const txtVCodeInputLabel = intl.formatMessage({
    id: 'password.pwdResetPage.pwdResetForm.txtValidationCodeInputLabel',
    defaultMessage: '验证码',
  })
  const txtVCodePlaceholder = intl.formatMessage({
    id: 'password.pwdResetPage.pwdResetForm.txtValidationCodeInputPlaceholder',
    defaultMessage: '从邮箱获取的6位数字验证码',
  })
  const txtInvalidVCode = intl.formatMessage({
    id: 'password.pwdResetPage.pwdResetForm.txtInvalidValidationCode',
    defaultMessage: '验证码格式不正确',
  })

  const handleVCodeInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value
      setVCodeState(prevState => ({
        ...prevState,
        value,
        error: prevState.error && !validateActiveCode(value),
        helperText:
          prevState.error && !validateActiveCode(value) ? txtInvalidVCode : '',
      }))
    },
    [txtInvalidVCode]
  )

  const handleVCodeInputBlur = React.useCallback((): void => {
    if (vCodestate.value && !validateActiveCode(vCodestate.value)) {
      setVCodeState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidVCode,
      }))
    } else {
      setVCodeState(prevState => ({
        ...prevState,
        error: false,
        helperText: '',
      }))
    }
  }, [txtInvalidVCode, vCodestate.value])

  const checkVCodeBeforeSubmit = React.useCallback((): boolean => {
    if (vCodestate.error) {
      vCodeInputRef.current && vCodeInputRef.current.focus()
      return false
    }
    if (!vCodestate.value) {
      setVCodeState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidVCode,
      }))
      vCodeInputRef.current && vCodeInputRef.current.focus()
      return false
    }

    return true
  }, [txtInvalidVCode, vCodestate.error, vCodestate.value])

  return {
    vCodeInputRef,
    vCodestate,
    txtVCodeInputLabel,
    txtVCodePlaceholder,
    handleVCodeInputChange,
    handleVCodeInputBlur,
    checkVCodeBeforeSubmit,
  }
}

export interface ValidationCodeTextFieldHookReturnType {
  vCodeInputRef: React.MutableRefObject<HTMLInputElement | undefined>
  vCodestate: TextFieldState
  txtVCodeInputLabel: string
  txtVCodePlaceholder: string
  handleVCodeInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleVCodeInputBlur: () => void
  checkVCodeBeforeSubmit: () => boolean
}

// useRequestPwdResetHook
export function useRequestPwdResetHook(): RequestPwdResetHookReturnType {
  const dispatch = useDispatch()
  const pwdResetStatus = useSelector(
    ({ pwdResetState }) => pwdResetState.pwdResetStatus
  )
  const currentPwdResetStatus = React.useRef<Status>(Status.INITIAL)
  currentPwdResetStatus.current = pwdResetStatus
  const isResettingPwd = pwdResetStatus === Status.PROGRESSING

  const requestPwdReset = React.useCallback(
    (params: PwdResetParams): void => {
      dispatch(sagaRequestPwdReset(params))
    },
    [dispatch]
  )

  // unmount 时，
  // 重置 pwdResetStatus
  React.useEffect(() => {
    return (): void => {
      // 如果当前 pwdResetStatus 为 进行中 状态， 则先取消
      if (currentPwdResetStatus.current === Status.PROGRESSING) {
        dispatch(sagaCancelPwdReset())
      }
      // 重置 pwdResetStatus 为初始值
      dispatch(resetPwdResetStatus())
    }
  }, [dispatch])

  return {
    pwdResetStatus,
    isResettingPwd,
    requestPwdReset,
  }
}

export interface RequestPwdResetHookReturnType {
  pwdResetStatus: Status
  isResettingPwd: boolean
  requestPwdReset: (params: PwdResetParams) => void
}

export interface TextFieldState {
  value: string
  error: boolean
  helperText: string
}
