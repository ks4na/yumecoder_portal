import React from 'react'
import SlideUpFullScreenDialog, {
  SlideUpFullScreenDialogProps,
} from './SlideUpFullScreenDialog'
import { IconButton, Box, LinearProgress } from '@material-ui/core'
import { FormattedMessage, useIntl } from 'react-intl'
import DoneIcon from '@material-ui/icons/Done'
import BodyLayout from '../../../../components/layouts/BodyLayout'
import { validatePassword } from '../../../../configs/validation'
import useUserDataUpdateHook from '../../../../components/hooks/useUserDataUpdateHook'
import PasswordTextField from '../../../../components/TextField/PasswordTextField'
import useLogoutHook from '../../../../components/hooks/useLogoutHook'
import { useDispatch } from 'react-redux'
import { addSnackbarItem } from '../../../../models/actions'

export interface PasswordResetDialogProps {
  open: boolean
  handleClose: () => void
}

export default function PasswordResetDialog({
  open,
  handleClose: handleCloseFromParent,
}: PasswordResetDialogProps): JSX.Element {
  const dispatch = useDispatch()

  const {
    oldPwdInputRef,
    oldPwdState,
    handleOldPwdChange,
    handleOldPwdBlur,
    txtOldPwdInputLabel,
    txtOldPwdInputPlaceholder,
    checkOldPwdBeforeSubmit,
    resetOldPwdState,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useOldPwdTextFieldHook()

  const {
    newPwdInputRef,
    newPwdState,
    handleNewPwdChange,
    handleNewPwdBlur,
    txtNewPwdInputLabel,
    txtNewPwdInputPlaceholder,
    checkNewPwdBeforeSubmit,
    resetNewPwdState,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useNewPwdTextFieldHook()

  const { isProgressing, handlePwdReset } = useUserDataUpdateHook()

  const { handleRequestLogout } = useLogoutHook()

  const onDialogEntered = function(): void {
    oldPwdInputRef.current && oldPwdInputRef.current.focus()
  }

  const handleClose = function(): void {
    // 重置 form state
    resetOldPwdState()
    resetNewPwdState()
    // 调用父组件传递的 handleClose 来关闭 dialog
    handleCloseFromParent()
  }

  const dialogTitle = (
    <FormattedMessage
      id="home.settings.dialogTitlePwdReset"
      defaultMessage="修改密码"
    />
  )

  const handleBtnConfirmClick = function(): void {
    // 校验 old password 合法性
    if (!checkOldPwdBeforeSubmit()) {
      return
    }
    // 校验 new password 合法性
    if (!checkNewPwdBeforeSubmit(oldPwdState.value)) {
      return
    }
    // 用 successCallback 参数实现成功修改后
    // 调用回调函数 handleClose 来关闭 dailog
    const successCallback = function(): void {
      // 关闭 dialog
      handleClose()

      // 弹出更新成功提示框
      dispatch(
        addSnackbarItem({
          message: (
            <FormattedMessage
              id="home.settings.txtResetPwdSuccessfully"
              defaultMessage="密码修改成功，请重新登录"
            />
          ),
        })
      )

      // 退出登录状态，使后台 refreshToken 失效，让用户重新登录
      handleRequestLogout()
    }

    handlePwdReset(oldPwdState.value, newPwdState.value, successCallback)
  }

  const headerRightPart = (
    <IconButton
      color="inherit"
      edge="end"
      onClick={handleBtnConfirmClick}
      disabled={isProgressing}
    >
      <DoneIcon />
    </IconButton>
  )

  const formResetPwdProps: FormResetPwdProps = {
    isProgressing,
    oldPwdInputRef,
    oldPwdState,
    handleOldPwdChange,
    handleOldPwdBlur,
    txtOldPwdInputLabel,
    txtOldPwdInputPlaceholder,
    newPwdInputRef,
    newPwdState,
    handleNewPwdChange,
    handleNewPwdBlur,
    txtNewPwdInputLabel,
    txtNewPwdInputPlaceholder,
  }

  const children = (
    <>
      {isProgressing && <LinearProgress color="secondary" />}
      <BodyLayout>
        <FormResetPwd {...formResetPwdProps} />
      </BodyLayout>
    </>
  )

  const props: SlideUpFullScreenDialogProps = {
    open,
    onEntered: onDialogEntered,
    handleClose,
    dialogTitle,
    headerRightPart,
    children,
  }

  return <SlideUpFullScreenDialog {...props} />
}

// FormResetPwd
export interface FormResetPwdProps {
  isProgressing: boolean
  oldPwdInputRef: React.RefObject<HTMLInputElement>
  oldPwdState: TextFieldState
  handleOldPwdChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleOldPwdBlur: () => void
  txtOldPwdInputPlaceholder: string
  txtOldPwdInputLabel: string
  newPwdInputRef: React.RefObject<HTMLInputElement>
  newPwdState: TextFieldState
  handleNewPwdChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleNewPwdBlur: () => void
  txtNewPwdInputPlaceholder: string
  txtNewPwdInputLabel: string
}

export function FormResetPwd({
  isProgressing,
  oldPwdInputRef,
  oldPwdState,
  handleOldPwdChange,
  handleOldPwdBlur,
  txtOldPwdInputPlaceholder,
  txtOldPwdInputLabel,
  newPwdInputRef,
  newPwdState,
  handleNewPwdChange,
  handleNewPwdBlur,
  txtNewPwdInputPlaceholder,
  txtNewPwdInputLabel,
}: FormResetPwdProps): JSX.Element {
  return (
    <form noValidate autoComplete="off">
      <Box marginY={2}>
        <PasswordTextField
          hideStartAdornment
          fullWidth
          id="pwd_reset_form-input_old_pwd"
          inputRef={oldPwdInputRef}
          error={oldPwdState.error}
          helperText={oldPwdState.helperText}
          value={oldPwdState.value}
          onChange={handleOldPwdChange}
          onBlur={handleOldPwdBlur}
          placeholder={txtOldPwdInputPlaceholder}
          label={txtOldPwdInputLabel}
          disabled={isProgressing}
        />
      </Box>
      <Box marginY={2} marginBottom={4}>
        <PasswordTextField
          hideStartAdornment
          fullWidth
          id="pwd_reset_form-input_new_pwd"
          inputRef={newPwdInputRef}
          error={newPwdState.error}
          helperText={newPwdState.helperText}
          value={newPwdState.value}
          onChange={handleNewPwdChange}
          onBlur={handleNewPwdBlur}
          placeholder={txtNewPwdInputPlaceholder}
          label={txtNewPwdInputLabel}
          disabled={isProgressing}
        />
      </Box>
    </form>
  )
}

export interface TextFieldState {
  value: string
  error: boolean
  helperText: string
}

// useOldPwdTextFieldHook
export function useOldPwdTextFieldHook(): OldPwdTextFieldHookReturnType {
  const intl = useIntl()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const initState: TextFieldState = {
    value: '',
    error: false,
    helperText: '',
  }
  const [state, setState] = React.useState<TextFieldState>(initState)

  const txtInvalidFormat = intl.formatMessage({
    id: 'home.settings.oldPwdInputInvalidFormat',
    defaultMessage: '密码格式不正确',
  })
  const txtLabel = intl.formatMessage({
    id: 'home.settings.oldPwdInputLabel',
    defaultMessage: '原密码',
  })
  const txtPlaceholder = intl.formatMessage({
    id: 'home.settings.oldPwdInputPlaceholder',
    defaultMessage: '当前使用的密码',
  })

  const handleOldPwdChange = function(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    const value = e.target.value
    setState((prevState: TextFieldState) => ({
      ...prevState,
      error: prevState.error && !validatePassword(value),
      helperText:
        prevState.error && !validatePassword(value) ? txtInvalidFormat : '',
      value,
    }))
  }

  const handleOldPwdBlur = function(): void {
    if (state.value && !validatePassword(state.value)) {
      setState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidFormat,
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        error: false,
        helperText: '',
      }))
    }
  }

  const checkOldPwdBeforeSubmit = function(): boolean {
    if (!state.value) {
      setState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidFormat,
      }))
      inputRef.current && inputRef.current.focus()
      return false
    }
    if (state.error) {
      inputRef.current && inputRef.current.focus()
      return false
    }
    return true
  }

  const resetOldPwdState = function(): void {
    setState(initState)
  }

  return {
    oldPwdInputRef: inputRef,
    oldPwdState: state,
    txtOldPwdInputLabel: txtLabel,
    txtOldPwdInputPlaceholder: txtPlaceholder,
    handleOldPwdChange,
    handleOldPwdBlur,
    checkOldPwdBeforeSubmit,
    resetOldPwdState,
  }
}

export interface OldPwdTextFieldHookReturnType {
  oldPwdInputRef: React.RefObject<HTMLInputElement>
  oldPwdState: TextFieldState
  txtOldPwdInputLabel: string
  txtOldPwdInputPlaceholder: string
  handleOldPwdChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleOldPwdBlur: () => void
  checkOldPwdBeforeSubmit: () => boolean
  resetOldPwdState: () => void
}

// useNewPwdTextFieldHook
export function useNewPwdTextFieldHook(): NewPwdTextFieldHookReturnType {
  const intl = useIntl()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const initState: TextFieldState = {
    value: '',
    error: false,
    helperText: '',
  }
  const [state, setState] = React.useState<TextFieldState>(initState)

  const txtInvalidFormat = intl.formatMessage({
    id: 'home.settings.newPwdInputInvalidFormat',
    defaultMessage: '密码格式不正确',
  })
  const txtNotSameAsOldPwd = intl.formatMessage({
    id: 'home.settings.txtNotSameAsOldPwd',
    defaultMessage: '新密码不能与旧密码相同',
  })
  const txtLabel = intl.formatMessage({
    id: 'home.settings.newPwdInputLabel',
    defaultMessage: '新密码',
  })
  const txtPlaceholder = intl.formatMessage({
    id: 'home.settings.newPwdInputPlaceholder',
    defaultMessage: '6-18位字母或数字',
  })

  const handleNewPwdChange = function(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    const value = e.target.value
    setState((prevState: TextFieldState) => ({
      ...prevState,
      error: false,
      helperText: '',
      value,
    }))
  }

  const handleNewPwdBlur = function(): void {
    if (state.value && !validatePassword(state.value)) {
      setState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidFormat,
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        error: false,
        helperText: '',
      }))
    }
  }

  const checkNewPwdBeforeSubmit = function(oldPwd: string): boolean {
    // 校验是否有值
    if (!state.value) {
      setState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidFormat,
      }))
      inputRef.current && inputRef.current.focus()
      return false
    }
    // 校验是否已存在错误
    if (state.error) {
      inputRef.current && inputRef.current.focus()
      return false
    }
    // 校验是否与旧密码相同
    if (state.value === oldPwd) {
      setState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtNotSameAsOldPwd,
      }))
      inputRef.current && inputRef.current.focus()
      return false
    }
    return true
  }

  const resetNewPwdState = function(): void {
    setState(initState)
  }

  return {
    newPwdInputRef: inputRef,
    newPwdState: state,
    txtNewPwdInputLabel: txtLabel,
    txtNewPwdInputPlaceholder: txtPlaceholder,
    handleNewPwdChange,
    handleNewPwdBlur,
    checkNewPwdBeforeSubmit,
    resetNewPwdState,
  }
}

export interface NewPwdTextFieldHookReturnType {
  newPwdInputRef: React.RefObject<HTMLInputElement>
  newPwdState: TextFieldState
  txtNewPwdInputLabel: string
  txtNewPwdInputPlaceholder: string
  handleNewPwdChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleNewPwdBlur: () => void
  checkNewPwdBeforeSubmit: (oldPwd: string) => boolean
  resetNewPwdState: () => void
}
