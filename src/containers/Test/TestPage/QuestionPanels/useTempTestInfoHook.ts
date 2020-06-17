import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  sagaSaveTempTestInfoToLocal,
  sagaLoadTempTestInfoFromLocal,
} from '../../../../models/actions'

export default function useTempTestInfoHook(): TempTestInfoHookReturnType {
  const dispatch = useDispatch()
  const { paperData } = useSelector(({ testPageState }) => testPageState)

  // 备份 tempTestInfo 到本地
  const saveTempTestInfoToLocal = React.useCallback(() => {
    dispatch(sagaSaveTempTestInfoToLocal())
  }, [dispatch])

  // 已经成功获取 paperData 的情况下，
  // 查询本地是否存在对应的考试临时信息 (tempTestInfo)，存在则载入该信息
  React.useEffect(() => {
    if (paperData) {
      dispatch(sagaLoadTempTestInfoFromLocal())
    }
  }, [dispatch, paperData])

  return {
    saveTempTestInfoToLocal,
  }
}

export interface TempTestInfoHookReturnType {
  saveTempTestInfoToLocal: () => void
}
