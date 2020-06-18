import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  sagaFetchTestResult,
  sagaCancelFetchTestResult,
  resetTestResultState,
} from '../../../models/actions'
import { useRouteMatch } from 'react-router-dom'
import { Status } from '../../../models/reducers/status'

export default function useTestResultHook(): void {
  const dispatch = useDispatch()
  const match = useRouteMatch<{ testId: string }>()
  const { testId } = match.params

  const currentStatus = React.useRef<Status>(Status.INITIAL)
  const { status } = useSelector(({ testResultState }) => testResultState)
  currentStatus.current = status

  React.useEffect(() => {
    // didMount
    dispatch(sagaFetchTestResult(testId))

    // willUnmount
    return (): void => {
      // 如果正在请求 testResult ，则先取消
      if (currentStatus.current === Status.PROGRESSING) {
        dispatch(sagaCancelFetchTestResult())
      }
      // 重置 testResultState
      dispatch(resetTestResultState())
    }
  }, [dispatch, testId])
}
