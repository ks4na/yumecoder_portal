import React from 'react'
import useUserDataUpdateHook from '../../../../../components/hooks/useUserDataUpdateHook'
import { FormattedMessage } from 'react-intl'
import {
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import SlideUpFullScreenDialog, {
  SlideUpFullScreenDialogProps,
} from './SlideUpFullScreenDialog'
import useGenderHook, {
  Gender,
} from '../../../../../components/hooks/useGenderHook'

export interface GenderDialogProps {
  open: boolean
  handleClose: () => void
  currentGender: number
}

export default function GenderDialog({
  open,
  handleClose: handleCloseFromParent,
  currentGender,
}: GenderDialogProps): JSX.Element {
  const {
    newGender,
    onItemClick,
    resetgenderSelectListState,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useGenderSelectListHook(currentGender)

  const { isProgressing, handleAlterGender } = useUserDataUpdateHook()

  const handleClose = function(): void {
    // 重置 genderSelectListState
    resetgenderSelectListState()
    // 调用父组件传递的 handleClose 来关闭 dialog
    handleCloseFromParent()
  }

  const dialogTitle = (
    <FormattedMessage
      id="home.profile.dialogTitleAlterGender"
      defaultMessage="修改性别"
    />
  )

  const handleBtnConfirmClick = function(): void {
    // 如果新的 gender 与 当前 gender 相同，则直接关闭 dialog
    if (newGender === currentGender) {
      handleClose()
      return
    }

    // 用 successCallback 参数实现成功修改后
    // 调用回调函数 handleClose 来关闭 dailog
    handleAlterGender(newGender, handleClose)
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

  const genderSelectListProps: GenderSelectListProps = {
    currentGenderIndex: newGender,
    onItemClick,
  }

  const children = (
    <>
      {isProgressing && <LinearProgress color="secondary" />}
      <GenderSelectList {...genderSelectListProps} />
    </>
  )

  const props: SlideUpFullScreenDialogProps = {
    open,
    handleClose,
    dialogTitle,
    headerRightPart,
    children,
  }

  return <SlideUpFullScreenDialog {...props} />
}

// Gender Select List
export interface GenderSelectListProps {
  currentGenderIndex: number
  onItemClick: (
    gender: Gender
  ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export function GenderSelectList({
  currentGenderIndex,
  onItemClick,
}: GenderSelectListProps): JSX.Element {
  const { getGenderEntries, getGenderTxt } = useGenderHook()
  const genderEntries = getGenderEntries()

  return (
    <List>
      {genderEntries.map(item => {
        return (
          <ListItem
            key={item[0]}
            button
            selected={item[0] === currentGenderIndex}
            onClick={onItemClick(item[0])}
          >
            <ListItemText primary={getGenderTxt(item[0])} />
          </ListItem>
        )
      })}
    </List>
  )
}

// useGenderSelectListHook
export function useGenderSelectListHook(
  currentGender: number
): GenderSelectListHookReturnType {
  const [state, setState] = React.useState<Gender>(currentGender)

  const onItemClick = React.useCallback(
    (gender: Gender) => (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
      setState(gender)
    },
    []
  )

  const resetgenderSelectListState = function(): void {
    setState(currentGender)
  }

  // 监听 currentGender 变化
  React.useEffect(() => {
    setState(currentGender)
  }, [currentGender])

  return {
    newGender: state,
    onItemClick,
    resetgenderSelectListState,
  }
}

export interface GenderSelectListHookReturnType {
  newGender: Gender
  onItemClick: (
    gender: Gender
  ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  resetgenderSelectListState: () => void
}
