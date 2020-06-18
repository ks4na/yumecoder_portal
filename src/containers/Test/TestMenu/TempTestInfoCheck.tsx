import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'
import { FormattedMessage } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { changeTempTestId } from '../../../models/actions'
import { getTempTestInfoByUserId } from '../../../configs/tempTestInfo'

export default function TempTestInfoCheck(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { open, handleToPractice, handleCancel } = useTempTestInfoCheckHook()

  return (
    <Dialog
      open={open}
      aria-describedby="use-temp-test-info-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="use-temp-test-info-dialog-description">
          <FormattedMessage
            id="test.testMenu.tempTestInfoCheck.description"
            defaultMessage="检测到存在意外退出的练习，是否继续该练习?"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToPractice} color="primary" autoFocus>
          <FormattedMessage
            id="test.testMenu.tempTestInfoCheck.btnToPractice"
            defaultMessage="继续"
          />
        </Button>
        <Button onClick={handleCancel} color="primary">
          <FormattedMessage
            id="test.testPage.paperHasDoneDialog.btnCancel"
            defaultMessage="取消"
          />
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function useTempTestInfoCheckHook(): TempTestInfoCheckHookReturnType {
  const history = useHistory()
  const dispatch = useDispatch()
  const { tempTestId, data } = useSelector(({ testMenuState }) => testMenuState)

  // 否显示 dialog
  const open = tempTestId !== undefined

  /**
   * 去练习 tempTestId 对应的试卷
   */
  const handleToPractice = React.useCallback(() => {
    tempTestId && history.push(`/test/${tempTestId}`)
  }, [history, tempTestId])

  /**
   * 关闭 dialog
   */
  const handleCancel = React.useCallback(() => {
    // 设置 tempTestId 为 undefined
    dispatch(changeTempTestId(undefined))
  }, [dispatch])

  // 获取到 testMenuPage 的数据之后，检测本地是否存在临时考试信息
  React.useEffect(() => {
    if (data) {
      const targetTempTestInfo = getTempTestInfoByUserId(data.user.id)
      if (targetTempTestInfo && targetTempTestInfo.testId !== undefined) {
        dispatch(changeTempTestId(targetTempTestInfo.testId))
      }
    }
  }, [data, dispatch])

  return { open, handleToPractice, handleCancel }
}

export interface TempTestInfoCheckHookReturnType {
  open: boolean
  handleToPractice: () => void
  handleCancel: () => void
}
