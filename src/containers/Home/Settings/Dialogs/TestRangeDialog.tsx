import React from 'react'
import useUserDataUpdateHook from '../../../../components/hooks/useUserDataUpdateHook'
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
import useTestRangeHook, {
  TestRange,
} from '../../../../components/hooks/useTestRangeHook'

export interface TestRangeDialogProps {
  open: boolean
  handleClose: () => void
  currentTestRange?: number
}

export default function TestRangeDialog({
  open,
  handleClose: handleCloseFromParent,
  currentTestRange,
}: TestRangeDialogProps): JSX.Element {
  const {
    newTestRange,
    onItemClick,
    resetTestRangeSelectListState,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useTestRangeSelectListHook(currentTestRange)

  const { isProgressing, handleAlterTestRange } = useUserDataUpdateHook()

  const handleClose = function(): void {
    // 重置 testRangeSelectListState
    resetTestRangeSelectListState()
    // 调用父组件传递的 handleClose 来关闭 dialog
    handleCloseFromParent()
  }

  const dialogTitle = (
    <FormattedMessage
      id="home.settings.dialogAlterTestRange"
      defaultMessage="出题范围"
    />
  )

  const handleBtnConfirmClick = function(): void {
    // // 如果新的 testRange 与 当前 testRange 相同，则直接关闭 dialog
    if (newTestRange === currentTestRange) {
      handleClose()
      return
    }
    // // 用 successCallback 参数实现成功修改后
    // // 调用回调函数 handleClose 来关闭 dailog
    newTestRange !== undefined &&
      handleAlterTestRange(newTestRange, handleClose)
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

  const testRangeSelectListProps: TestRangeSelectListProps = {
    currentTestTange: newTestRange,
    onItemClick,
  }

  const children = (
    <>
      {isProgressing && <LinearProgress color="secondary" />}
      <TestRangeSelectList {...testRangeSelectListProps} />
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

// TestRange Select List
export interface TestRangeSelectListProps {
  currentTestTange?: TestRange
  onItemClick: (
    testRange: TestRange
  ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export function TestRangeSelectList({
  currentTestTange,
  onItemClick,
}: TestRangeSelectListProps): JSX.Element {
  const options = Object.keys(TestRange)
    .filter(item => !isNaN(Number(item)))
    .map(item => Number(item))

  const { getTestRangeTxt } = useTestRangeHook()

  return (
    <List>
      {options.map(item => {
        return (
          <ListItem
            key={item}
            button
            selected={item === currentTestTange}
            onClick={onItemClick(item)}
          >
            <ListItemText primary={getTestRangeTxt(item)} />
          </ListItem>
        )
      })}
    </List>
  )
}

// useTestRangeSelectListHook
export function useTestRangeSelectListHook(
  currentTestRange?: TestRange
): TestRangeSelectListHookReturnType {
  const [state, setState] = React.useState<TestRange | undefined>(
    currentTestRange
  )

  const onItemClick = React.useCallback(
    (testRange: TestRange) => (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
      setState(testRange)
    },
    []
  )

  const resetTestRangeSelectListState = function(): void {
    setState(currentTestRange)
  }

  // 监听 currentTestRange  变化
  React.useEffect(() => {
    setState(currentTestRange)
  }, [currentTestRange])

  return {
    newTestRange: state,
    onItemClick,
    resetTestRangeSelectListState,
  }
}

export interface TestRangeSelectListHookReturnType {
  newTestRange?: TestRange
  onItemClick: (
    testRange: TestRange
  ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  resetTestRangeSelectListState: () => void
}
