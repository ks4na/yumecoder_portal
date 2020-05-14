import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { TextField, Box, Typography, Button } from '@material-ui/core'
import { validateActiveCode } from '../../configs/validation'
import { useIntl, FormattedHTMLMessage } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { ActivateStatus } from '../../models/reducers/regist'
import {
  sagaRequestActivate,
  ActivateParams,
  sagaCancelActivate,
  changeActivateStatus,
} from '../../models/actions'

let currentActivateStatus: ActivateStatus = ActivateStatus.INITIAL

export default function RegistActiveForm(): JSX.Element {
  const location = useLocation<{ email: string }>()
  const history = useHistory()

  const {
    activeCodeInputRef,
    activeCodeState,
    txtActiveCodePlaceholder,
    handleActiveCodeInputChange,
    handleActiveCodeInputBlur,
    txtActiveCodeInputLabel,
    checkActiveCodeBeforeActivation,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useRegistActiveTextFieldHook()

  const {
    activateStatus,
    isActivating,
    requestActivate,
    cancelActivate,
    resetActivateStatus,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useActivateHook()

  currentActivateStatus = activateStatus

  // 处理激活按钮点击事件
  function handleActivate(): void {
    // 验证激活码格式
    if (!checkActiveCodeBeforeActivation()) {
      return
    }

    // 发送异步请求
    requestActivate({
      email: location.state.email,
      activeCode: activeCodeState.value,
    })
  }

  // didMount 时，
  // 校验 email 参数是否存在，不存在则重定向到 注册页面
  React.useEffect(() => {
    if (!location.state || !location.state.email) {
      history.replace('/regist')
    }
  }, [history, location.state])

  // unmount时，
  // 重置 activateStatus
  React.useEffect(() => {
    return (): void => {
      // 如果 正在请求中，则先取消
      if (currentActivateStatus === ActivateStatus.PROGRESSING) {
        cancelActivate()
      }
      // 重置为初始值
      resetActivateStatus()
    }
  }, [cancelActivate, resetActivateStatus])

  return (
    <Box paddingY={2}>
      <form noValidate autoComplete="off">
        <Typography variant="body1">{`${txtActiveCodeInputLabel} :`}</Typography>
        <Box marginTop={2} marginBottom={4}>
          <TextField
            fullWidth
            id="regist_active_form-input-active_code"
            inputRef={activeCodeInputRef}
            value={activeCodeState.value}
            onChange={handleActiveCodeInputChange}
            onBlur={handleActiveCodeInputBlur}
            placeholder={txtActiveCodePlaceholder}
            error={activeCodeState.error}
            helperText={activeCodeState.helperText}
            disabled={isActivating}
          />
        </Box>
        <Box marginY={4}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            onClick={handleActivate}
            disabled={isActivating}
          >
            {isActivating ? (
              <FormattedHTMLMessage
                id="registPage.activeForm.btnActivate.txtDisabled"
                defaultMessage="正在激活中..."
              />
            ) : (
              <FormattedHTMLMessage
                id="registPage.activeForm.btnActivate.txt"
                defaultMessage="激&nbsp;&nbsp;活"
              />
            )}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

// useRegistActiveTextFieldHook
export function useRegistActiveTextFieldHook(): RegistActiveTextFieldHookReturnType {
  const activeCodeInputRef = React.useRef<HTMLInputElement>()

  const [activeCodeState, setActiveCode] = React.useState<ActiveCodeState>({
    value: '',
    error: false,
    helperText: '',
  })

  const intl = useIntl()
  const txtInvalidActiveCode = intl.formatMessage({
    id: 'registPage.activeForm.txtInvalidActiveCode',
    defaultMessage: '验证码格式不正确',
  })
  const txtActiveCodePlaceholder = intl.formatMessage({
    id: 'registPage.activeForm.txtActiveCodePlaceholder',
    defaultMessage: '6位数字验证码',
  })
  const txtActiveCodeInputLabel = intl.formatMessage({
    id: 'registPage.activeForm.txtActiveCodeInputLabel',
    defaultMessage: '输入注册邮箱中接收到的激活验证码',
  })

  const handleActiveCodeInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const activeCode = e.target.value
      setActiveCode(prevState => ({
        ...prevState,
        value: activeCode,
        error: prevState.error && !validateActiveCode(activeCode),
        helperText:
          prevState.error && !validateActiveCode(activeCode)
            ? prevState.helperText
            : '',
      }))
    },
    []
  )

  const handleActiveCodeInputBlur = React.useCallback((): void => {
    if (activeCodeState.value && !validateActiveCode(activeCodeState.value)) {
      setActiveCode(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidActiveCode,
      }))
    } else {
      setActiveCode(prevState => ({
        ...prevState,
        error: false,
        helperText: '',
      }))
    }
  }, [activeCodeState.value, txtInvalidActiveCode])

  const checkActiveCodeBeforeActivation = React.useCallback((): boolean => {
    if (activeCodeState.error) {
      activeCodeInputRef.current && activeCodeInputRef.current.focus()
      return false
    }
    if (!activeCodeState.value) {
      setActiveCode(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidActiveCode,
      }))
      activeCodeInputRef.current && activeCodeInputRef.current.focus()
      return false
    }

    return true
  }, [activeCodeState.error, activeCodeState.value, txtInvalidActiveCode])

  return {
    activeCodeInputRef,
    activeCodeState,
    handleActiveCodeInputChange,
    handleActiveCodeInputBlur,
    txtActiveCodePlaceholder,
    txtActiveCodeInputLabel,
    checkActiveCodeBeforeActivation,
  }
}

interface ActiveCodeState {
  value: string
  error: boolean
  helperText: string
}

interface RegistActiveTextFieldHookReturnType {
  activeCodeInputRef: React.MutableRefObject<HTMLInputElement | undefined>
  activeCodeState: ActiveCodeState
  handleActiveCodeInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleActiveCodeInputBlur: () => void
  txtActiveCodePlaceholder: string
  txtActiveCodeInputLabel: string
  checkActiveCodeBeforeActivation: () => boolean
}

// useActivateHook
export function useActivateHook(): ActivateHookReturnType {
  const history = useHistory()
  const dispatch = useDispatch()
  const activateStatus = useSelector(
    ({ registState }) => registState.activateStatus
  )

  const isActivating = activateStatus === ActivateStatus.PROGRESSING

  const requestActivate = React.useCallback(
    (activateParams: ActivateParams): void => {
      dispatch(sagaRequestActivate(activateParams))
    },
    [dispatch]
  )

  const cancelActivate = React.useCallback(() => {
    dispatch(sagaCancelActivate())
  }, [dispatch])

  const resetActivateStatus = React.useCallback(() => {
    dispatch(changeActivateStatus(ActivateStatus.INITIAL))
  }, [dispatch])

  // 监听 activateStatus 变化
  React.useEffect(() => {
    // 如果 activateStatus 为 SUCCESS，则跳转到 登录页面
    if (activateStatus === ActivateStatus.SUCCESS) {
      history.push('/login')
    }
  }, [activateStatus, history])

  return {
    activateStatus,
    isActivating,
    requestActivate,
    cancelActivate,
    resetActivateStatus,
  }
}

interface ActivateHookReturnType {
  activateStatus: ActivateStatus
  isActivating: boolean
  requestActivate: (activateParams: ActivateParams) => void
  cancelActivate: () => void
  resetActivateStatus: () => void
}
