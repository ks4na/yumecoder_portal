import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Status } from '../../models/reducers/status'
import {
  sagaCancelPreparePaper,
  sagaRequestPreparePaper,
} from '../../models/actions'
import { useHistory } from 'react-router-dom'

export default function usePreparePaperHook(): PreparePaperHookReturnType {
  const currentPreparePaperStatusRef = React.useRef<Status>()
  const dispatch = useDispatch()
  const { preparePaperStatus } = useSelector(({ paperState }) => paperState)
  const history = useHistory()

  currentPreparePaperStatusRef.current = preparePaperStatus

  const isPreparing = preparePaperStatus === Status.PROGRESSING

  const preparePaperSuccessCallback = React.useCallback(
    (testId: number) => {
      history.push(`/test/${testId}`)
    },
    [history]
  )

  const handleRequestPreparePaper = React.useCallback(
    (categoryId: number) => {
      dispatch(sagaRequestPreparePaper(categoryId, preparePaperSuccessCallback))
    },
    [dispatch, preparePaperSuccessCallback]
  )

  // unmount
  React.useEffect(() => {
    // 如果当前状态为 请求中，则取消
    return (): void => {
      if (currentPreparePaperStatusRef.current === Status.PROGRESSING) {
        dispatch(sagaCancelPreparePaper())
      }
    }
  }, [dispatch])

  return {
    isPreparing,
    handleRequestPreparePaper,
  }
}

export interface PreparePaperHookReturnType {
  isPreparing: boolean
  handleRequestPreparePaper: (categoryId: number) => void
}
