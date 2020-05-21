import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { sagaRequestLogout } from '../../models/actions'
import { Status } from '../../models/reducers/status'

export default function useLogoutHook(): LogoutHookReturnType {
  const dispatch = useDispatch()
  const history = useHistory()
  const logoutStatus = useSelector(({ logoutState }) => logoutState.status)
  const isProgressing = logoutStatus === Status.PROGRESSING

  const handleRequestLogout = React.useCallback((): void => {
    dispatch(sagaRequestLogout())
  }, [dispatch])

  // 监听 logoutStatus 变化
  React.useEffect((): void => {
    // 状态为 SUCCESS 则跳转到 登录页面
    if (logoutStatus === Status.SUCCESS) {
      history.push('/login')
    }
  }, [history, logoutStatus])

  return {
    isProgressing,
    handleRequestLogout,
  }
}

export interface LogoutHookReturnType {
  isProgressing: boolean
  handleRequestLogout: () => void
}
