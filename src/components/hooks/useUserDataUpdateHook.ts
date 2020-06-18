import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Status } from '../../models/reducers/status'
import {
  sagaAlterUserNickname,
  sagaAlterUserGender,
  sagaAlterUserPersonalSignature,
  sagaAlterUserAvatar,
  sagaAlterUserQuestionsPerTest,
  sagaAlterUserTestRange,
  sagaAlterUserPassword,
} from '../../models/actions'
import { Gender } from './useGenderHook'
import { QuestionsPerTest } from '../../containers/Home/Settings/PersonalSettingsList/QuestionsPerTest'
import { TestRange } from './useTestRangeHook'

export default function useUserDataUpdateHook(): UserDataUpdateHookReturnType {
  const dispatch = useDispatch()
  const updateStatus = useSelector(
    ({ userState }) => userState.userDataUpdateStatus
  )
  const isProgressing = updateStatus === Status.PROGRESSING

  const handleAlterNickname = React.useCallback(
    (newNickname: string, successCallback?: () => void) => {
      dispatch(sagaAlterUserNickname(newNickname, successCallback))
    },
    [dispatch]
  )

  const handleAlterGender = React.useCallback(
    (newGender: Gender, successCallback?: () => void) => {
      dispatch(sagaAlterUserGender(newGender, successCallback))
    },
    [dispatch]
  )

  const handleAlterPersonalSignature = React.useCallback(
    (newPersonalSignature: string, successCallback?: () => void) => {
      dispatch(
        sagaAlterUserPersonalSignature(newPersonalSignature, successCallback)
      )
    },
    [dispatch]
  )

  const handleAlterAvatar = React.useCallback(
    (newAvatar: string, successCallback?: () => void) => {
      dispatch(sagaAlterUserAvatar(newAvatar, successCallback))
    },
    [dispatch]
  )

  const handleAlterQuestionsPerTest = React.useCallback(
    (newQuestionsPerTest: QuestionsPerTest, successCallback?: () => void) => {
      dispatch(
        sagaAlterUserQuestionsPerTest(newQuestionsPerTest, successCallback)
      )
    },
    [dispatch]
  )

  const handleAlterTestRange = React.useCallback(
    (newTestRange: TestRange, successCallback?: () => void) => {
      dispatch(sagaAlterUserTestRange(newTestRange, successCallback))
    },
    [dispatch]
  )

  const handlePwdReset = React.useCallback(
    (oldPwd: string, newPwd: string, successCallback?: () => void) => {
      dispatch(sagaAlterUserPassword(oldPwd, newPwd, successCallback))
    },
    [dispatch]
  )

  return {
    isProgressing,
    handleAlterNickname,
    handleAlterGender,
    handleAlterPersonalSignature,
    handleAlterAvatar,
    handleAlterQuestionsPerTest,
    handleAlterTestRange,
    handlePwdReset,
  }
}

export interface UserDataUpdateHookReturnType {
  isProgressing: boolean
  handleAlterNickname: (
    newNickname: string,
    successCallback?: () => void
  ) => void
  handleAlterGender: (newGender: Gender, successCallback?: () => void) => void
  handleAlterPersonalSignature: (
    newPersonalSignature: string,
    successCallback?: () => void
  ) => void
  handleAlterAvatar: (newAvatar: string, successCallback?: () => void) => void
  handleAlterQuestionsPerTest: (
    newQuestionsPerTest: QuestionsPerTest,
    successCallback?: () => void
  ) => void
  handleAlterTestRange: (
    newTestRange: TestRange,
    successCallback?: () => void
  ) => void
  handlePwdReset: (
    oldPwd: string,
    newPwd: string,
    successCallback?: () => void
  ) => void
}
