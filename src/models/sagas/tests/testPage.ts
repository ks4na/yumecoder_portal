import {
  all,
  take,
  fork,
  cancel,
  cancelled,
  put,
  call,
  takeEvery,
  select,
  takeLatest,
} from 'redux-saga/effects'
import {
  SagaFetchTestPaperAction,
  SAGA_FETCH_TEST_PAPER,
  SAGA_CANCEL_FETCH_TEST_PAPER,
  changeTestPaperFetchingStatus,
  saveTestPaper,
  addAxiosErrSnackbarItem,
  addSnackbarItem,
  SAGA_SAVE_TEMP_TEST_INFO_TO_LOCAL,
  SAGA_LOAD_TEMP_TEST_INFO_FROM_LOCAL,
  syncTempTestInfo,
  SAGA_SUBMIT_PAPER,
  changePaperSubmitStatus,
  toggleRetrySubmitDialog,
  sagaRemoveTempTestInfoFromLocal,
  SAGA_REMOVE_TEMP_TEST_INFO_FROM_LOCAL,
  togglePaperHasDoneDialog,
  SAGA_SAVE_TEMP_TEST_INFO_TO_SERVER,
  changeTempTestInfoSavingStatus,
  toggleRetrySaveTempDialog,
} from '../../actions'
import { Task } from 'redux-saga'
import { Action } from 'redux'
import { Status } from '../../reducers/status'
import * as Api from '../../apis'
import { DefaultRootState } from 'react-redux'
import {
  TestPageState,
  Type,
  PaperDataType,
} from '../../reducers/tests/testPage'
import {
  getTempTestInfoArrFromLocal,
  TempTestInfoType,
  saveTempTestInfoArrToLocal,
  TempTestInfoTypeWithUserId,
  getTempTestInfoByUserId,
  removeTempTestInfoFromLocalByUserId,
  removeTempTestInfoFromLocalByTestId,
} from '../../../configs/tempTestInfo'
import {
  validatePaperSpentTime,
  comparePaperSpentTime,
} from '../../../configs/validation'
import { AxiosResponse } from 'axios'
import history from '../../../configs/history'

// handle fetching test paper
export function* fetchTestPaper(action: SagaFetchTestPaperAction): Generator {
  try {
    const testId = action.payload

    yield put(changeTestPaperFetchingStatus(Status.PROGRESSING))

    const data = (yield call(
      Api.handleFetchTestPaper,
      testId
    )) as Api.FetchTestPaperReturnType

    if (Api.isPaperDataType(data)) {
      yield put(saveTestPaper(data))
      yield put(changeTestPaperFetchingStatus(Status.SUCCESS))
    } else {
      if (data.code === 3) {
        // 如果后台返回的错误信息是 '该试卷已完成',
        // 则不使用 Snackbar 显示错误信息，而是弹出 PaperHasDoneDialog
        yield put(togglePaperHasDoneDialog(true))

        // 如果本地存在该 testId 对应的临时文件信息，则清除
        yield call(removeTempTestInfoFromLocalByTestId, parseInt(testId))
      } else {
        yield put(changeTestPaperFetchingStatus(Status.FAILED))
        yield put(addSnackbarItem({ message: data.msg }))
      }
    }
  } catch (err) {
    yield put(changeTestPaperFetchingStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    if (yield cancelled()) {
      yield put(changeTestPaperFetchingStatus(Status.CANCELLED))
    } else {
      yield put({ type: 'SAGA_FETHCING_TEST_PAPER_FINISHED' })
    }
  }
}

export function* watchSagaFetchingTestPaper(): Generator {
  while (true) {
    const action = (yield take(
      SAGA_FETCH_TEST_PAPER
    )) as SagaFetchTestPaperAction
    const task = (yield fork(fetchTestPaper, action)) as Task

    const resultAction = (yield take([
      SAGA_CANCEL_FETCH_TEST_PAPER,
      'SAGA_FETHCING_TEST_PAPER_FINISHED',
    ])) as Action
    if (resultAction.type === SAGA_CANCEL_FETCH_TEST_PAPER) {
      yield cancel(task)
    }

    // 重置请求状态为初始值
    yield put(changeTestPaperFetchingStatus(Status.INITIAL))
  }
}

// save temp testInfo to local
export function* saveTempTestInfoToLocal(): Generator {
  const {
    paperData,
    currentSpentTime,
    currentTabPanelIndex,
    userAnswers,
  } = (yield select(
    ({ testPageState }: DefaultRootState) => testPageState
  )) as TestPageState

  if (paperData) {
    const testTempInfo: TempTestInfoType = {
      userId: paperData.creater,
      testId: paperData.id,
      currentSpentTime,
      currentTabPanelIndex,
      userAnswers,
    }

    // 获取 已存在的 tempTestInfoArr
    let tempTestInfoArr = (yield call(
      getTempTestInfoArrFromLocal
    )) as TempTestInfoTypeWithUserId[]

    // 更新 tempTestInfoArr
    const hasExisted = tempTestInfoArr.some(
      item => item.userId === testTempInfo.userId
    )

    if (!hasExisted) {
      tempTestInfoArr.push(testTempInfo)
    } else {
      tempTestInfoArr = tempTestInfoArr.map(item => {
        return item.userId === testTempInfo.userId ? testTempInfo : item
      })
    }

    // 保存更新后的 tempTestInfoArr
    yield call(saveTempTestInfoArrToLocal, tempTestInfoArr)
  }
}

export function* watchSagaSaveTempTestInfoToLocal(): Generator {
  yield takeEvery(SAGA_SAVE_TEMP_TEST_INFO_TO_LOCAL, saveTempTestInfoToLocal)
}

// validate tempTestInfo
export function validateTempTestInfo(
  tempTestInfo: TempTestInfoTypeWithUserId,
  paperData: PaperDataType
): boolean {
  try {
    // 校验 testId 是否一致
    if (
      tempTestInfo.testId === undefined ||
      tempTestInfo.testId !== paperData.id
    ) {
      throw new Error(
        `unexpected testId, expected: ${paperData.id}, received: ${tempTestInfo.testId}`
      )
    }
    // 校验 currentTabPanelIndex 是否正确
    if (
      tempTestInfo.currentTabPanelIndex === undefined ||
      !(
        tempTestInfo.currentTabPanelIndex >= 0 &&
        tempTestInfo.currentTabPanelIndex < paperData.questionAmount
      )
    ) {
      throw new Error(
        `unexpected currentTabPanelIndex, expected: 0 - ${paperData.questionAmount -
          1}, received: ${tempTestInfo.currentTabPanelIndex}`
      )
    }
    // 校验 currentSpentTime 是否符合
    if (
      !tempTestInfo.currentSpentTime ||
      !validatePaperSpentTime(tempTestInfo.currentSpentTime) ||
      comparePaperSpentTime(
        tempTestInfo.currentSpentTime,
        paperData.spentTime
      ) < 0
    ) {
      throw new Error(
        `invalid currentSpentTime: ${tempTestInfo.currentSpentTime}`
      )
    }

    // 校验 userAnswers 存在，且为数组
    if (!tempTestInfo.userAnswers || !Array.isArray(tempTestInfo.userAnswers)) {
      throw new Error(
        `invalid userAnswers: ${JSON.stringify(tempTestInfo.userAnswers)}`
      )
    }
    // 保证 userAnswers 中每一项都包含 questionId 且不重复
    const questionIdSet = new Set()
    for (const item of tempTestInfo.userAnswers) {
      if (item.questionId === undefined) {
        throw new Error(
          `invalid userAnswers: ${JSON.stringify(tempTestInfo.userAnswers)}`
        )
      }
      questionIdSet.add(item.questionId)
    }
    if (questionIdSet.size !== tempTestInfo.userAnswers.length) {
      throw new Error(
        `invalid userAnswers: ${JSON.stringify(tempTestInfo.userAnswers)}`
      )
    }

    const questionInfos = paperData.questions.map(item => {
      return {
        questionId: item.id,
        questionType: item.type,
        optionCount: item.options.length,
      }
    })

    // 保证 tempTestInfo.userAnswers 中元素个数与试卷中题目数量一致
    if (tempTestInfo.userAnswers.length !== questionInfos.length) {
      throw new Error(
        `invalid userAnswers: ${JSON.stringify(tempTestInfo.userAnswers)}`
      )
    }

    for (const item of tempTestInfo.userAnswers) {
      // 保证 tempTestInfo.userAnswers 中每一项的 questionId 包含在本次考试题目中
      const matchedQuestion = questionInfos.find(
        qiItem => qiItem.questionId === item.questionId
      )
      if (!matchedQuestion) {
        throw new Error(`invalid userAnswers: ${JSON.stringify(item)}`)
      }
      // 保证 tempTestInfo.userAnswers 中每一项存在 answer ，且为无重复元素的数组
      if (
        !item.answer ||
        !Array.isArray(item.answer) ||
        item.answer.length !== new Set(item.answer).size
      ) {
        throw new Error(`invalid userAnswers: ${JSON.stringify(item)}`)
      }
      const { questionType, optionCount } = matchedQuestion
      // 保证每一个选项都符合要求 (A-Z 且 不超过题目选项数量)
      for (const answerItem of item.answer) {
        if (
          !/^[A-Z]$/.test(answerItem) ||
          answerItem.charCodeAt(0) - 65 >= optionCount
        ) {
          throw new Error(`invalid userAnswers: ${JSON.stringify(item)}`)
        }
      }
      // 单选题只能选一项
      if (questionType === Type.SINGLE && item.answer.length > 1) {
        throw new Error(`invalid userAnswers: ${JSON.stringify(item)}`)
      }
    }
  } catch (err) {
    console.log('failed to load tempTestInfo from local: ', err.message, err)
    return false
  }
  return true
}

// load tempTestInfo from local
export function* loadTempTestInfoFromLocal(): Generator {
  const { paperData } = (yield select(
    ({ testPageState }: DefaultRootState) => testPageState
  )) as TestPageState

  if (paperData) {
    // 查找本地保存的该 userId 对应的 tempTestInfo
    const tempTestInfo = (yield call(
      getTempTestInfoByUserId,
      paperData.creater
    )) as TempTestInfoTypeWithUserId | undefined

    if (tempTestInfo) {
      // 校验 tempTestInfo 合法性
      const isValid = (yield call(
        validateTempTestInfo,
        tempTestInfo,
        paperData
      )) as boolean

      if (isValid) {
        // 同步 tempTestInfo 到 redux
        yield put(syncTempTestInfo(tempTestInfo as TempTestInfoType))
      }
    }
  }
}

export function* watchSagaLoadTempTestInfoFromLocal(): Generator {
  yield takeLatest(
    SAGA_LOAD_TEMP_TEST_INFO_FROM_LOCAL,
    loadTempTestInfoFromLocal
  )
}

// submit paper
export function* submitPaper(): Generator {
  try {
    yield put(changePaperSubmitStatus(Status.PROGRESSING))

    const { currentSpentTime, userAnswers, paperData } = (yield select(
      ({ testPageState }: DefaultRootState) => testPageState
    )) as TestPageState

    if (!paperData || !paperData.id) {
      throw new Error('failed to get testId')
    }

    const response = (yield call(Api.handleSubmitPaper, {
      testId: paperData.id,
      spentTime: currentSpentTime,
      userAnswers,
    })) as AxiosResponse<Api.SubmitPaperReturnType>

    const { data } = response

    if (data !== true) {
      yield put(changePaperSubmitStatus(Status.FAILED))
      // 显示 重试提交 dialog
      yield put(toggleRetrySubmitDialog(true))
    } else {
      yield put(changePaperSubmitStatus(Status.SUCCESS))
      // 清除 当前试卷的 tempTestInfo
      yield put(sagaRemoveTempTestInfoFromLocal())
      // 跳转到 测试结果 页面
      history.push(`/test/${paperData.id}/result`)
    }
  } catch (err) {
    yield put(changePaperSubmitStatus(Status.FAILED))
    // 显示 重试提交 dialog
    yield put(toggleRetrySubmitDialog(true))
  } finally {
    yield put(changePaperSubmitStatus(Status.INITIAL))
  }
}

export function* watchSagaSubmitPaper(): Generator {
  yield takeLatest(SAGA_SUBMIT_PAPER, submitPaper)
}

// remove tempTestInfo from local
export function* removeTempTestInfoFromLocal(): Generator {
  const { paperData } = (yield select(
    ({ testPageState }: DefaultRootState) => testPageState
  )) as TestPageState

  if (!paperData || !paperData.creater) {
    throw new Error('failed to get creater of this test')
  }

  yield call(removeTempTestInfoFromLocalByUserId, paperData.creater)
}

export function* watchSagaRemoveTempTestInfoFromLocal(): Generator {
  yield takeLatest(
    SAGA_REMOVE_TEMP_TEST_INFO_FROM_LOCAL,
    removeTempTestInfoFromLocal
  )
}

// save temp testInfo to server
export function* saveTempTestInfoToServer(): Generator {
  try {
    yield put(changeTempTestInfoSavingStatus(Status.PROGRESSING))

    const { currentSpentTime, userAnswers, paperData } = (yield select(
      ({ testPageState }: DefaultRootState) => testPageState
    )) as TestPageState

    if (!paperData || !paperData.id) {
      throw new Error('failed to get testId')
    }

    const response = (yield call(Api.handleSaveUncompletedTest, {
      testId: paperData.id,
      spentTime: currentSpentTime,
      userAnswers,
    })) as AxiosResponse<Api.SaveUncompletedTestReturnType>

    const { data } = response

    if (data !== true) {
      yield put(changeTempTestInfoSavingStatus(Status.FAILED))
      // 显示 重试保存试卷信息 dialog
      yield put(toggleRetrySaveTempDialog(true))
    } else {
      // 清除 当前试卷的 tempTestInfo
      yield put(sagaRemoveTempTestInfoFromLocal())
      yield put(changeTempTestInfoSavingStatus(Status.SUCCESS))
    }
  } catch (err) {
    yield put(changeTempTestInfoSavingStatus(Status.FAILED))
    // 显示 重试保存试卷信息 dialog
    yield put(toggleRetrySaveTempDialog(true))
  }
}

export function* watchSagaSaveTempTestInfoToServer(): Generator {
  yield takeLatest(SAGA_SAVE_TEMP_TEST_INFO_TO_SERVER, saveTempTestInfoToServer)
}

export default function* testPageSaga(): Generator {
  yield all([
    watchSagaFetchingTestPaper(),
    watchSagaSaveTempTestInfoToLocal(),
    watchSagaLoadTempTestInfoFromLocal(),
    watchSagaSubmitPaper(),
    watchSagaRemoveTempTestInfoFromLocal(),
    watchSagaSaveTempTestInfoToServer(),
  ])
}
