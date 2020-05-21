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
import { QuestionsPerTest } from '../PersonalSettingsList/QuestionsPerTest'

export interface QuestionsPerTestDialogProps {
  open: boolean
  handleClose: () => void
  currentQuestionsPerTest?: number
}

export default function QuestionsPerTestDialog({
  open,
  handleClose: handleCloseFromParent,
  currentQuestionsPerTest,
}: QuestionsPerTestDialogProps): JSX.Element {
  const {
    newQuestionsPerTest,
    onItemClick,
    resetQuestionsPerTestSelectListState,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  } = useQuestionsPerTestSelectListHook(currentQuestionsPerTest)

  const { isProgressing, handleAlterQuestionsPerTest } = useUserDataUpdateHook()

  const handleClose = function(): void {
    // 重置 questionsPerTestSelectListState
    resetQuestionsPerTestSelectListState()
    // 调用父组件传递的 handleClose 来关闭 dialog
    handleCloseFromParent()
  }

  const dialogTitle = (
    <FormattedMessage
      id="home.settings.dialogAlterQuestionsPerTest"
      defaultMessage="单次练习题目数"
    />
  )

  const handleBtnConfirmClick = function(): void {
    // 如果新的 questionsPerTest 与 当前 questionsPerTest 相同，则直接关闭 dialog
    if (newQuestionsPerTest === currentQuestionsPerTest) {
      handleClose()
      return
    }
    // 用 successCallback 参数实现成功修改后
    // 调用回调函数 handleClose 来关闭 dailog
    newQuestionsPerTest !== undefined &&
      handleAlterQuestionsPerTest(newQuestionsPerTest, handleClose)
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

  const questionsPerTestSelectListProps: QuestionsPerTestSelectListProps = {
    currentQuestionsPerTest: newQuestionsPerTest,
    onItemClick,
  }

  const children = (
    <>
      {isProgressing && <LinearProgress color="secondary" />}
      <QuestionsPerTestSelectList {...questionsPerTestSelectListProps} />
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

// QuestionsPerTest Select List
export interface QuestionsPerTestSelectListProps {
  currentQuestionsPerTest?: QuestionsPerTest
  onItemClick: (
    questionsPerTest: QuestionsPerTest
  ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export function QuestionsPerTestSelectList({
  currentQuestionsPerTest,
  onItemClick,
}: QuestionsPerTestSelectListProps): JSX.Element {
  const options = Object.keys(QuestionsPerTest)
    .filter(item => !isNaN(Number(item)))
    .map(item => Number(item))

  return (
    <List>
      {options.map(item => {
        return (
          <ListItem
            key={item}
            button
            selected={item === currentQuestionsPerTest}
            onClick={onItemClick(item)}
          >
            <ListItemText primary={item} />
          </ListItem>
        )
      })}
    </List>
  )
}

// useQuestionsPerTestSelectListHook
export function useQuestionsPerTestSelectListHook(
  currentQuestionsPerTest?: QuestionsPerTest
): QuestionsPerTestSelectListHookReturnType {
  const [state, setState] = React.useState<QuestionsPerTest | undefined>(
    currentQuestionsPerTest
  )

  const onItemClick = React.useCallback(
    (questionsPerTest: QuestionsPerTest) => (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
      setState(questionsPerTest)
    },
    []
  )

  const resetQuestionsPerTestSelectListState = function(): void {
    setState(currentQuestionsPerTest)
  }

  // 监听 currentQuestionsPerTest  变化
  React.useEffect(() => {
    setState(currentQuestionsPerTest)
  }, [currentQuestionsPerTest])

  return {
    newQuestionsPerTest: state,
    onItemClick,
    resetQuestionsPerTestSelectListState,
  }
}

export interface QuestionsPerTestSelectListHookReturnType {
  newQuestionsPerTest?: QuestionsPerTest
  onItemClick: (
    questionsPerTest: QuestionsPerTest
  ) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  resetQuestionsPerTestSelectListState: () => void
}
