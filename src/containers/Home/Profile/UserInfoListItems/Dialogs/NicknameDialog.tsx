import React from 'react'
import SlideUpFullScreenDialog, {
  SlideUpFullScreenDialogProps,
} from './SlideUpFullScreenDialog'
import { IconButton, TextField, Box, LinearProgress } from '@material-ui/core'
import { FormattedMessage, useIntl } from 'react-intl'
import DoneIcon from '@material-ui/icons/Done'
import BodyLayout from '../../../../../components/layouts/BodyLayout'
import { validateNickname } from '../../../../../configs/validation'
import useUserDataUpdateHook from '../../../../../components/hooks/useUserDataUpdateHook'

export interface NicknameDialogProps {
  open: boolean
  handleClose: () => void
  currentNickname: string
}

export default function NicknameDialog({
  open,
  handleClose: handleCloseFromParent,
  currentNickname,
}: NicknameDialogProps): JSX.Element {
  const {
    nicknameInputRef,
    nicknameState,
    handleNicknameChange,
    handleNicknameBlur,
    txtNicknameInputLabel,
    txtNicknameInputPlaceholder,
    checkNicknameBeforeSubmit,
    resetNicknameState,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useFormAlterNicknameHook(currentNickname)

  const { isProgressing, handleAlterNickname } = useUserDataUpdateHook()

  const onDialogEntered = function(): void {
    nicknameInputRef.current && nicknameInputRef.current.focus()
  }

  const handleClose = function(): void {
    // 重置 nicknameState
    resetNicknameState()
    // 调用父组件传递的 handleClose 来关闭 dialog
    handleCloseFromParent()
  }

  const dialogTitle = (
    <FormattedMessage
      id="home.profile.dialogTitleAlterNickname"
      defaultMessage="修改昵称"
    />
  )

  const handleBtnConfirmClick = function(): void {
    // 如果新的 nickname 与 当前 nickname 相同，则直接关闭 dialog
    if (nicknameState.value === currentNickname) {
      handleClose()
      return
    }
    // 校验 nickname 合法性
    if (!checkNicknameBeforeSubmit()) {
      return
    }

    // 用 successCallback 参数实现成功修改后
    // 调用回调函数 handleClose 来关闭 dailog
    handleAlterNickname(nicknameState.value, handleClose)
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

  const formAlterNicknameProps: FormAlterNicknameProps = {
    isProgressing,
    nicknameInputRef,
    nicknameState,
    handleNicknameChange,
    handleNicknameBlur,
    txtNicknameInputLabel,
    txtNicknameInputPlaceholder,
  }
  const children = (
    <>
      {isProgressing && <LinearProgress color="secondary" />}
      <BodyLayout>
        <FormAlterNickname {...formAlterNicknameProps} />
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

// FormAlterNickname
export interface FormAlterNicknameProps {
  isProgressing: boolean
  nicknameInputRef: React.RefObject<HTMLInputElement>
  nicknameState: TextFieldState
  handleNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleNicknameBlur: () => void
  txtNicknameInputPlaceholder: string
  txtNicknameInputLabel: string
}

export function FormAlterNickname({
  isProgressing,
  nicknameInputRef,
  nicknameState,
  handleNicknameChange,
  handleNicknameBlur,
  txtNicknameInputPlaceholder,
  txtNicknameInputLabel,
}: FormAlterNicknameProps): JSX.Element {
  return (
    <form noValidate autoComplete="off">
      <Box marginTop={2} marginBottom={4}>
        <TextField
          fullWidth
          id="alter_nickname_form-input_nickname"
          inputRef={nicknameInputRef}
          error={nicknameState.error}
          helperText={nicknameState.helperText}
          value={nicknameState.value}
          onChange={handleNicknameChange}
          onBlur={handleNicknameBlur}
          placeholder={txtNicknameInputPlaceholder}
          label={txtNicknameInputLabel}
          disabled={isProgressing}
        />
      </Box>
    </form>
  )
}

// useFormAlterNicknameHook
export function useFormAlterNicknameHook(
  currnetNickname: string
): FormAlterNicknameHookReturnType {
  const intl = useIntl()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const initState: TextFieldState = {
    value: currnetNickname,
    error: false,
    helperText: '',
  }
  const [state, setState] = React.useState<TextFieldState>(initState)

  const txtInvalidNickname = intl.formatMessage({
    id: 'home.profile.nicknameInputInvalidFormat',
    defaultMessage: '昵称格式不正确',
  })
  const txtLabel = intl.formatMessage({
    id: 'home.profile.nicknameInputLabel',
    defaultMessage: '新的昵称',
  })
  const txtPlaceholder = intl.formatMessage({
    id: 'home.profile.nicknameInputPlaceholder',
    defaultMessage: '4-15个非空白字符',
  })

  const handleNicknameChange = function(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    const value = e.target.value
    setState((prevState: TextFieldState) => ({
      ...prevState,
      error: prevState.error && !validateNickname(value),
      helperText:
        prevState.error && !validateNickname(value) ? txtInvalidNickname : '',
      value,
    }))
  }

  const handleNicknameBlur = function(): void {
    if (state.value && !validateNickname(state.value)) {
      setState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidNickname,
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        error: false,
        helperText: '',
      }))
    }
  }

  const checkNicknameBeforeSubmit = function(): boolean {
    if (!state.value) {
      setState(prevState => ({
        ...prevState,
        error: true,
        helperText: txtInvalidNickname,
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

  const resetNicknameState = function(): void {
    setState(initState)
  }

  // 监听 currentNickname
  React.useEffect(() => {
    setState(prevState => ({ ...prevState, value: currnetNickname }))
  }, [currnetNickname])

  return {
    nicknameInputRef: inputRef,
    nicknameState: state,
    txtNicknameInputLabel: txtLabel,
    txtNicknameInputPlaceholder: txtPlaceholder,
    handleNicknameChange,
    handleNicknameBlur,
    checkNicknameBeforeSubmit,
    resetNicknameState,
  }
}

export interface TextFieldState {
  value: string
  error: boolean
  helperText: string
}

export interface FormAlterNicknameHookReturnType {
  nicknameInputRef: React.RefObject<HTMLInputElement>
  nicknameState: TextFieldState
  txtNicknameInputLabel: string
  txtNicknameInputPlaceholder: string
  handleNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleNicknameBlur: () => void
  checkNicknameBeforeSubmit: () => boolean
  resetNicknameState: () => void
}
