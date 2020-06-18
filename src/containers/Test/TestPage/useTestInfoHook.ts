import React from 'react'
import { PaperDataType } from '../../../models/reducers/tests/testPage'
import { useSelector, useDispatch } from 'react-redux'
import { Status } from '../../../models/reducers/status'
import {
  sagaFetchTestPaper,
  sagaCancelFetchTestPaper,
  resetTestPageInfo,
} from '../../../models/actions'

export default function useTestInfoHook(
  testId: string
): TestInfoHookReturnType {
  const dispatch = useDispatch()
  const currentPaperFetchingStatus = React.useRef(Status.INITIAL)
  const { paperFetchingStatus, paperData } = useSelector(
    ({ testPageState }) => testPageState
  )
  currentPaperFetchingStatus.current = paperFetchingStatus
  const isFetchingPaper = paperFetchingStatus === Status.PROGRESSING

  React.useEffect(() => {
    // didMount，获取 paper 信息
    dispatch(sagaFetchTestPaper(testId))

    // unMount， 重置 testPageState
    return (): void => {
      // 如果正在请求中，则先取消该请求
      if (currentPaperFetchingStatus.current === Status.PROGRESSING) {
        dispatch(sagaCancelFetchTestPaper())
      }
      // 重置 testPageState
      dispatch(resetTestPageInfo())
    }
  }, [dispatch, testId])

  return { paperData, isFetchingPaper }
}

export interface TestInfoHookReturnType {
  paperData?: PaperDataType
  isFetchingPaper: boolean
}
