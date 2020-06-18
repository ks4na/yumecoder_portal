import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  sagaFetchUserInfo,
  sagaCancelFetchUserInfo,
  resetUserState,
} from '../../models/actions'
import { Status } from '../../models/reducers/status'
import { UserInfo } from '../../models/reducers/user'

export default function useUserInfoHook(): UserInfoHookReturnType {
  const dispatch = useDispatch()
  const currentStatusRef = React.useRef<Status>(Status.INITIAL)
  const { status, data } = useSelector(({ userState }) => userState)
  currentStatusRef.current = status
  const isLoading = status === Status.PROGRESSING

  React.useEffect(() => {
    // didmount
    // 发送获取 userInfo 的请求
    dispatch(sagaFetchUserInfo())

    // unmount
    return (): void => {
      // 如果当前请求状态为 请求中， 则先取消
      if (currentStatusRef.current === Status.PROGRESSING) {
        dispatch(sagaCancelFetchUserInfo())
      }
      // 重置为初始状态
      dispatch(resetUserState())
    }
  }, [dispatch])

  return {
    status,
    isLoading,
    userInfo: data,
  }
}

export interface UserInfoHookReturnType {
  status: Status
  isLoading: boolean
  userInfo?: UserInfo
}
