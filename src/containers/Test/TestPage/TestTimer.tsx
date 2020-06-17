import React from 'react'
import TimerIcon from '@material-ui/icons/Timer'
import { Box, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { validatePaperSpentTime } from '../../../configs/validation'
import { addSnackbarItem, updateSpentTime } from '../../../models/actions'
import { FormattedMessage } from 'react-intl'

export interface TestTimerProps {
  smallSize?: boolean
}

export default function TestTimer({
  smallSize = false,
}: TestTimerProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { currentSpentTime } = useTestTimerHook()

  return (
    <Box display="flex" alignItems="center" paddingX={0.5}>
      <Box clone marginRight={0.5}>
        <TimerIcon fontSize={smallSize ? 'small' : 'default'} />
      </Box>
      <Typography component="span" variant="body1">
        {currentSpentTime}
      </Typography>
    </Box>
  )
}

// useTestTimerHook
export function useTestTimerHook(): TestTimerHookReturnType {
  const dispatch = useDispatch()
  const { paperData, currentSpentTime, isTimerPaused } = useSelector(
    ({ testPageState }) => testPageState
  )

  // 更新 练习时间 +1s， 失败则返回 false
  const handleTimeIncrement = React.useCallback(
    (currentTime: string): boolean => {
      let [hour, minute, second] = currentTime
        .split(':')
        .map(item => parseInt(item))

      second += 1

      if (second === 60) {
        second = 0
        minute += 1
      }
      if (minute === 60) {
        minute = 0
        hour += 1
      }

      const updatedSpentTime =
        hour.toString().padStart(2, '0') +
        ':' +
        minute.toString().padStart(2, '0') +
        ':' +
        second.toString().padStart(2, '0')

      // 如果到达最大值，则提示错误，返回 false 表示更新失败
      if (!validatePaperSpentTime(updatedSpentTime)) {
        // 显示提示框，提示到达最大时间限制
        dispatch(
          addSnackbarItem({
            message: (
              <FormattedMessage
                id="test.testPage.testTimer.txtReachTimeLimit"
                defaultMessage="练习时间超出限制"
              />
            ),
          })
        )
        return false
      }

      dispatch(updateSpentTime(updatedSpentTime))
      return true
    },
    [dispatch]
  )

  // 启动/清除计时器
  React.useEffect(() => {
    let timer: NodeJS.Timeout

    // 存在 paperData 时，才开启定时器
    if (paperData) {
      // 验证 currentSpentTime 格式
      if (!currentSpentTime || !validatePaperSpentTime(currentSpentTime)) {
        throw new Error(`invalid param 'currentSpentTime'`)
      }

      // 如果计时器不是暂停状态
      if (!isTimerPaused) {
        // 设置定时器， 1s 后更新练习时间
        timer = setTimeout(() => {
          // 更新练习时间
          const result = handleTimeIncrement(currentSpentTime)
          if (!result) {
            timer && clearTimeout(timer)
          }
        }, 1000)

        // 组件卸载时，清除定时器
        return (): void => {
          timer && clearTimeout(timer)
        }
      }
    }
  }, [
    currentSpentTime,
    dispatch,
    handleTimeIncrement,
    isTimerPaused,
    paperData,
  ])

  return {
    currentSpentTime,
  }
}

export interface TestTimerHookReturnType {
  currentSpentTime?: string
}
