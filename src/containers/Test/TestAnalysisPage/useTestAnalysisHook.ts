import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Status } from '../../../models/reducers/status'
import { useRouteMatch } from 'react-router-dom'
import {
  sagaFetchTestAnalysisData,
  sagaCancelFetchTestAnalysisData,
  resetTestAnalysisState,
} from '../../../models/actions'

export default function useTestAnalysisHook(): void {
  const dispatch = useDispatch()
  const currentStatusRef = React.useRef<Status>(Status.INITIAL)
  const { status } = useSelector(({ testAnalysisState }) => testAnalysisState)
  currentStatusRef.current = status

  // 获取路由参数 testId
  const match = useRouteMatch<{ testId: string }>()
  const { testId } = match.params

  React.useEffect(() => {
    // didmount
    dispatch(sagaFetchTestAnalysisData(testId))

    // willUnmount
    return (): void => {
      // 如果卸载组件时， status 仍然为 请求中 状态， 则先取消
      if (currentStatusRef.current === Status.PROGRESSING) {
        dispatch(sagaCancelFetchTestAnalysisData())
      }
      // 重置 testAnalysisState
      dispatch(resetTestAnalysisState())
    }
  }, [dispatch, testId])
}
