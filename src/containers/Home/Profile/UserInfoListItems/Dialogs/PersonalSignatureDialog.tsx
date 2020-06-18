import React from 'react'
import SlideUpFullScreenDialog, {
  SlideUpFullScreenDialogProps,
} from './SlideUpFullScreenDialog'
import { IconButton, TextField, Box, LinearProgress } from '@material-ui/core'
import { FormattedMessage, useIntl } from 'react-intl'
import DoneIcon from '@material-ui/icons/Done'
import BodyLayout from '../../../../../components/layouts/BodyLayout'
import { validatePersonalSignature } from '../../../../../configs/validation'
import useUserDataUpdateHook from '../../../../../components/hooks/useUserDataUpdateHook'

export interface PersonalSignatureDialogProps {
  open: boolean
  handleClose: () => void
  currentPersonalSignature: string
}

export default function PersonalSignatureDialog({
  open,
  handleClose: handleCloseFromParent,
  currentPersonalSignature,
}: PersonalSignatureDialogProps): JSX.Element {
  const {
    inputRef,
    state,
    handleChange,
    txtLabel,
    txtPlaceholder,
    checkBeforeSubmit,
    resetState,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useFormAlterPersonalSignatureHook(currentPersonalSignature)

  const {
    isProgressing,
    handleAlterPersonalSignature,
  } = useUserDataUpdateHook()

  const onDialogEntered = function(): void {
    if (inputRef.current) {
      inputRef.current.focus()
      // 修正光标位置
      const contentLength = inputRef.current.value.length
      inputRef.current.selectionStart = inputRef.current.selectionEnd = contentLength
    }
  }

  const handleClose = function(): void {
    // 重置 personalSignatureState
    resetState()
    // 调用父组件传递的 handleClose 来关闭 dialog
    handleCloseFromParent()
  }

  const dialogTitle = (
    <FormattedMessage
      id="home.profile.dialogTitleAlterPersonalSignature"
      defaultMessage="修改个性签名"
    />
  )

  const handleBtnConfirmClick = function(): void {
    // 如果新的 personalSignature 与 当前 personalSignature 相同，则直接关闭 dialog
    if (state.value === currentPersonalSignature) {
      handleClose()
      return
    }
    // 校验 personalSignature 合法性
    if (!checkBeforeSubmit()) {
      return
    }
    // 用 successCallback 参数实现成功修改后
    // 调用回调函数 handleClose 来关闭 dailog
    handleAlterPersonalSignature(state.value, handleClose)
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

  const formAlterPersonalSignature: FormAlterPersonalSignatureProps = {
    isProgressing,
    inputRef,
    state,
    handleChange,
    txtLabel,
    txtPlaceholder,
  }

  const children = (
    <>
      {isProgressing && <LinearProgress color="secondary" />}
      <BodyLayout>
        <FormAlterPersonalSignature {...formAlterPersonalSignature} />
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

// FormAlterPersonalSignature
export interface FormAlterPersonalSignatureProps {
  isProgressing: boolean
  inputRef: React.RefObject<HTMLInputElement>
  state: TextFieldState
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  txtPlaceholder: string
  txtLabel: string
}

export function FormAlterPersonalSignature({
  isProgressing,
  inputRef,
  state,
  handleChange,
  txtPlaceholder,
  txtLabel,
}: FormAlterPersonalSignatureProps): JSX.Element {
  return (
    <form noValidate autoComplete="off">
      <Box marginTop={2} marginBottom={4}>
        <TextField
          fullWidth
          id="alter_nickname_form-input_personal_signature"
          multiline
          rowsMax={4}
          inputRef={inputRef}
          error={state.error}
          helperText={state.helperText}
          value={state.value}
          onChange={handleChange}
          placeholder={txtPlaceholder}
          label={txtLabel}
          disabled={isProgressing}
        />
      </Box>
    </form>
  )
}

// useFormAlterPersonalSignatureHook
export function useFormAlterPersonalSignatureHook(
  currentPersonalSignature: string
): FormAlterPersonalSignatureHookReturnType {
  const intl = useIntl()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const initState: TextFieldState = {
    value: currentPersonalSignature,
    error: false,
    helperText: '',
  }
  const [state, setState] = React.useState<TextFieldState>(initState)

  const txtInvalidPersonalSignature = intl.formatMessage({
    id: 'home.profile.personalSignatureInputInvalidFormat',
    defaultMessage: '长度必须在50个字符以内',
  })
  const txtLabel = intl.formatMessage({
    id: 'home.profile.personalSignatureInputLabel',
    defaultMessage: '新的个性签名',
  })
  const txtPlaceholder = intl.formatMessage({
    id: 'home.profile.personalSignatureInputPlaceholder',
    defaultMessage: '50个字符以内',
  })

  const handleChange = function(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value
    setState((prevState: TextFieldState) => ({
      ...prevState,
      error: !validatePersonalSignature(value),
      helperText: !validatePersonalSignature(value)
        ? txtInvalidPersonalSignature
        : '',
      value,
    }))
  }

  const checkBeforeSubmit = function(): boolean {
    if (state.error) {
      inputRef.current && inputRef.current.focus()
      return false
    }
    return true
  }

  const resetState = function(): void {
    setState(initState)
  }

  // 监听 currentPersonalSignature 变化
  React.useEffect(() => {
    setState(prevState => ({ ...prevState, value: currentPersonalSignature }))
  }, [currentPersonalSignature])

  return {
    inputRef,
    state,
    txtLabel,
    txtPlaceholder,
    handleChange,
    checkBeforeSubmit,
    resetState,
  }
}

export interface TextFieldState {
  value: string
  error: boolean
  helperText: string
}

export interface FormAlterPersonalSignatureHookReturnType {
  inputRef: React.RefObject<HTMLInputElement>
  state: TextFieldState
  txtLabel: string
  txtPlaceholder: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  checkBeforeSubmit: () => boolean
  resetState: () => void
}
