import { Status } from '../reducers/status'
import { UserInfo } from '../reducers/user'
import { Gender } from '../../components/hooks/useGenderHook'
import { QuestionsPerTest } from '../../containers/Home/Settings/PersonalSettingsList/QuestionsPerTest'
import { TestRange } from '../../components/hooks/useTestRangeHook'

export const CHAGNE_USER_STATE_STATUS = 'CHAGNE_USER_STATE_STATUS'
export const SAVE_USER_DATA = 'SAVE_USER_DATA'
export const RESET_USER_STATE = 'RESET_USER_STATE'
export const CHANGE_USER_DATA_UPDATE_STATUS = 'CHANGE_USER_DATA_UPDATE_STATUS'
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA'

// ===================
// ACTION CREATORS
// ===================

export interface ChangeUserStateStatusAction {
  type: typeof CHAGNE_USER_STATE_STATUS
  payload: Status
}

export function changeUserStateStatus(
  status: Status
): ChangeUserStateStatusAction {
  return { type: CHAGNE_USER_STATE_STATUS, payload: status }
}

export interface SaveUserDataAction {
  type: typeof SAVE_USER_DATA
  payload: UserInfo
}

export function saveUserInfo(userInfo: UserInfo): SaveUserDataAction {
  return {
    type: SAVE_USER_DATA,
    payload: userInfo,
  }
}

export interface ResetUserStateAction {
  type: typeof RESET_USER_STATE
}

export function resetUserState(): ResetUserStateAction {
  return { type: RESET_USER_STATE }
}

export interface ChangeUserDataUpdateStatusAction {
  type: typeof CHANGE_USER_DATA_UPDATE_STATUS
  payload: Status
}

export function changeUserDataUpdateStatus(
  status: Status
): ChangeUserDataUpdateStatusAction {
  return {
    type: CHANGE_USER_DATA_UPDATE_STATUS,
    payload: status,
  }
}

export interface UpdateUserDataAction {
  type: typeof UPDATE_USER_DATA
  payload: Partial<UserInfo>
}

export function updateUserData(
  udpateData: Partial<UserInfo>
): UpdateUserDataAction {
  return {
    type: UPDATE_USER_DATA,
    payload: udpateData,
  }
}

// ===================
// ACTION TYPES
// ===================

export type UserActions =
  | ChangeUserStateStatusAction
  | SaveUserDataAction
  | ResetUserStateAction
  | ChangeUserDataUpdateStatusAction
  | UpdateUserDataAction

// ===================
// SAGAS
// ===================

export const SAGA_FETCH_USER_INFO = 'SAGA_FETCH_USER_INFO'
export const SAGA_CANCEL_FETCH_USER_INFO = 'SAGA_CANCEL_FETCH_USER_INFO'
export const SAGA_ALTER_USER_NICKNAME = 'SAGA_ALTER_USER_NICKNAME'
export const SAGA_ALTER_USER_GENDER = 'SAGA_ALTER_USER_GENDER'
export const SAGA_ALTER_USER_PERSONALSIGNATURE =
  'SAGA_ALTER_USER_PERSONALSIGNATURE'
export const SAGA_ALTER_USER_AVATAR = 'SAGA_ALTER_USER_AVATAR'
export const SAGA_ALTER_USER_QUESTIONSPERTEST =
  'SAGA_ALTER_USER_QUESTIONSPERTEST'
export const SAGA_ALTER_USER_TESTRANGE = 'SAGA_ALTER_USER_TESTRANGE'
export const SAGA_ALTER_USER_PASSWORD = 'SAGA_ALTER_USER_PASSWORD'

export interface SagaFetchUserInfoAction {
  type: typeof SAGA_FETCH_USER_INFO
}

export function sagaFetchUserInfo(): SagaFetchUserInfoAction {
  return { type: SAGA_FETCH_USER_INFO }
}

export interface SagaCancelFetchUserInfoAction {
  type: typeof SAGA_CANCEL_FETCH_USER_INFO
}

export function sagaCancelFetchUserInfo(): SagaCancelFetchUserInfoAction {
  return { type: SAGA_CANCEL_FETCH_USER_INFO }
}

// alter user nickname
export interface SagaAlterUserNicknameAction {
  type: typeof SAGA_ALTER_USER_NICKNAME
  payload: string
  successCallback?: () => void
}

export function sagaAlterUserNickname(
  newNickname: string,
  successCallback?: () => void
): SagaAlterUserNicknameAction {
  return {
    type: SAGA_ALTER_USER_NICKNAME,
    payload: newNickname,
    successCallback,
  }
}

// alter user gender
export interface SagaAlterUserGenderAction {
  type: typeof SAGA_ALTER_USER_GENDER
  payload: Gender
  successCallback?: () => void
}

export function sagaAlterUserGender(
  newGender: Gender,
  successCallback?: () => void
): SagaAlterUserGenderAction {
  return {
    type: SAGA_ALTER_USER_GENDER,
    payload: newGender,
    successCallback,
  }
}

// alter user personalSignature
export interface SagaAlterUserPersonalSignatureAction {
  type: typeof SAGA_ALTER_USER_PERSONALSIGNATURE
  payload: string
  successCallback?: () => void
}

export function sagaAlterUserPersonalSignature(
  newPersonalSignature: string,
  successCallback?: () => void
): SagaAlterUserPersonalSignatureAction {
  return {
    type: SAGA_ALTER_USER_PERSONALSIGNATURE,
    payload: newPersonalSignature,
    successCallback,
  }
}

// alter user avatar
export interface SagaAlterUserAvatarAction {
  type: typeof SAGA_ALTER_USER_AVATAR
  payload: string
  successCallback?: () => void
}

export function sagaAlterUserAvatar(
  newAvatar: string,
  successCallback?: () => void
): SagaAlterUserAvatarAction {
  return {
    type: SAGA_ALTER_USER_AVATAR,
    payload: newAvatar,
    successCallback,
  }
}

// alter user questionsPerTest
export interface SagaAlterUserQuesionsPerTestAction {
  type: typeof SAGA_ALTER_USER_QUESTIONSPERTEST
  payload: QuestionsPerTest
  successCallback?: () => void
}

export function sagaAlterUserQuestionsPerTest(
  newQuestionsPerTest: QuestionsPerTest,
  successCallback?: () => void
): SagaAlterUserQuesionsPerTestAction {
  return {
    type: SAGA_ALTER_USER_QUESTIONSPERTEST,
    payload: newQuestionsPerTest,
    successCallback,
  }
}

// alter user testRange
export interface SagaAlterUserTestRangeAction {
  type: typeof SAGA_ALTER_USER_TESTRANGE
  payload: TestRange
  successCallback?: () => void
}

export function sagaAlterUserTestRange(
  newTestRange: TestRange,
  successCallback?: () => void
): SagaAlterUserTestRangeAction {
  return {
    type: SAGA_ALTER_USER_TESTRANGE,
    payload: newTestRange,
    successCallback,
  }
}

// alter user password
export interface SagaAlterUserPasswordAction {
  type: typeof SAGA_ALTER_USER_PASSWORD
  payload: {
    oldPwd: string
    newPwd: string
  }
  successCallback?: () => void
}

export function sagaAlterUserPassword(
  oldPwd: string,
  newPwd: string,
  successCallback?: () => void
): SagaAlterUserPasswordAction {
  return {
    type: SAGA_ALTER_USER_PASSWORD,
    payload: {
      oldPwd,
      newPwd,
    },
    successCallback,
  }
}
