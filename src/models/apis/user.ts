import axios, { AxiosResponse } from 'axios'
import { UserInfo } from '../reducers/user'

// fetch userInfo
export interface OriginalUserInfo {
  id: number
  nickname: string | null
  avatar: string
  personal_message: string | null
  gender: number
  exercise_days: number
  attention: number
  fans: number
  credits: number
  done_question_number: number
  test_range: number
  question_number_per_time: number
  [prop: string]: unknown
}

export type FetchUserDataReturnType = UserInfo

export async function handleFetchUserData(): Promise<FetchUserDataReturnType> {
  const response = (await axios.get('/api/users/self')) as AxiosResponse<
    OriginalUserInfo
  >

  const {
    id,
    nickname,
    avatar,
    personal_message: personalSignature,
    gender,
    exercise_days: exerciseDays,
    attention: follows,
    fans: followers,
    credits,
    done_question_number: doneQuestionNumber,
    test_range: testRange,
    question_number_per_time: questionNumberPerTime,
    ...others
  } = response.data

  const ret: UserInfo = {
    id,
    nickname: nickname || '',
    avatar,
    personalSignature: personalSignature || '',
    gender,
    exerciseDays,
    follows,
    followers,
    credits,
    doneQuestionNumber,
    testRange,
    questionNumberPerTime,
    ...others,
  }

  return ret
}

// handle update user data
export interface UpdateUserDataParams {
  nickname?: string
  personalSignature?: string
  gender?: 0 | 1 | 2
  questionNumberPerTime?: 5 | 10 | 15 | 20
  testRange?: 0 | 1 | 2 | 3
  wantingJob?: string
}

export interface UpdateUserDataErrorReturnType {
  code: number
  msg: string
}

export type UpdateUserDataReturnType = true | UpdateUserDataErrorReturnType

export async function handleUpdateUserData(
  updateUserDataParams: UpdateUserDataParams
): Promise<AxiosResponse<UpdateUserDataReturnType>> {
  return axios.put('/api/users/self', {
    nickname: updateUserDataParams.nickname,
    personalMessage: updateUserDataParams.personalSignature,
    gender: updateUserDataParams.gender,
    questionNumberPerTime: updateUserDataParams.questionNumberPerTime,
    testRange: updateUserDataParams.testRange,
    wantingJob: updateUserDataParams.wantingJob,
  })
}

// handle update user avatar
export interface UpdateUserAvatarErrorReturnType {
  code: number
  msg: string
}

export type UpdateUserAvatarReturnType =
  | string
  | UpdateUserAvatarErrorReturnType

export async function handleUpdateUserAvatar(
  avatar: string
): Promise<AxiosResponse<UpdateUserAvatarReturnType>> {
  return await axios.post('/api/users/uploadAvatar', {
    avatar,
  })
}

// handle alter user password
export interface AlterUserPasswordParams {
  oldPwd: string
  newPwd: string
}

export interface AlterUserPasswordErrorReturnType {
  code: number
  msg: string
}

export type AlterUserPasswordReturnType =
  | true
  | AlterUserPasswordErrorReturnType

export async function handleAlterUserPassword({
  oldPwd,
  newPwd,
}: AlterUserPasswordParams): Promise<
  AxiosResponse<AlterUserPasswordReturnType>
> {
  return await axios.put('/api/users/resetPwd', {
    oldPwd,
    newPwd,
  })
}
