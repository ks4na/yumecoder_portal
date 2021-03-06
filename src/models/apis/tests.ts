import axios, { AxiosResponse } from 'axios'
import { TestMenuData, User, CategoryItem } from '../reducers/tests/menu'
import { ShortcutListCountData } from '../reducers/home/shortcutListCount'
import {
  PaperDataType,
  QuestionType,
  OptionType,
} from '../reducers/tests/testPage'
import { TestResultData } from '../reducers/tests/testResult'
import {
  TestAnalysisDataType,
  AnalysisDataQuestion,
  AnalysisDataQuestionCollectStatus,
} from '../reducers/tests/testAnalysis'

// handle request testMenuData
export interface OriginalCategoryItem {
  id: number
  category_name: string
  question_amount: number
  children?: OriginalCategoryItem[]
  [props: string]: unknown
}

export interface OriginalTestMenuDataReturnType {
  user: {
    id: number
    nickname: string
    avatar: string
    exercise_days: number
    personal_message: string | null
    [props: string]: unknown
  }
  questionCategoryTree: OriginalCategoryItem[]
  doneQuestionAmount: {
    count: number
  }
  rightAmount: {
    count: number
  }
  userDoneQuestionAmountList: {
    category_id: number
    done_question_amount: number
  }[]
  userRightQuestionAmountList: {
    id: number
    right_question_amount: number
  }[]
}

function conertOriginalCategoryItemToCategoryItem(
  questionCategoryTree: OriginalCategoryItem[],
  doneAmountList: {
    category_id: number
    done_question_amount: number
  }[],
  rightAmountList: {
    id: number
    right_question_amount: number
  }[]
): CategoryItem[] {
  const retQuestionCategoryTree: CategoryItem[] = questionCategoryTree.map(
    item => {
      const doneAmountItem = doneAmountList.find(
        doenAmountItem => doenAmountItem.category_id === item.id
      )
      const rightAmountItem = rightAmountList.find(
        rightAmountItem => rightAmountItem.id === item.id
      )

      const convertedChildren =
        item.children &&
        conertOriginalCategoryItemToCategoryItem(
          item.children,
          doneAmountList,
          rightAmountList
        )

      const convertedItem: CategoryItem = {
        id: item.id,
        categoryName: item.category_name,
        questionAmount: item.question_amount,
        userDoneAmount: doneAmountItem && doneAmountItem.done_question_amount,
        userRightAmount:
          rightAmountItem && rightAmountItem.right_question_amount,
        children: convertedChildren,
      }

      return convertedItem
    }
  )
  return retQuestionCategoryTree
}

export type TestMenuDataReturnType = TestMenuData

export async function handleRequestTestMenuData(): Promise<
  TestMenuDataReturnType
> {
  const response = (await axios.get('/api/tests/menu')) as AxiosResponse<
    OriginalTestMenuDataReturnType
  >
  const {
    user,
    questionCategoryTree,
    doneQuestionAmount,
    rightAmount,
    userDoneQuestionAmountList,
    userRightQuestionAmountList,
  } = response.data

  // 处理返回结果的字段
  const retUser: User = {
    id: user.id,
    nickname: user.nickname,
    avatar: user.avatar,
    exerciseDays: user.exercise_days,
    personalSignature: user.personal_message || '',
  }

  const retCategories = conertOriginalCategoryItemToCategoryItem(
    questionCategoryTree,
    userDoneQuestionAmountList,
    userRightQuestionAmountList
  )

  const ret: TestMenuData = {
    user: retUser,
    categories: retCategories,
    userDoneQuestionTotal: doneQuestionAmount.count,
    userRightQuestionTotal: rightAmount.count,
  }

  return ret
}

// handle fetch shortcutListCount
export type FetchShortcutListCountReturnType = ShortcutListCountData

export async function handleFetchShortcutListCount(): Promise<
  FetchShortcutListCountReturnType
> {
  const promiseFetchTestHistoryCount = axios.get('/api/tests/count') as Promise<
    AxiosResponse<{ count: number }>
  >
  const promiseFetchMistakesCount = axios.get(
    '/api/questions/count?type=mistake'
  ) as Promise<AxiosResponse<{ count: number }>>
  const promiseFetchCollectionCount = axios.get(
    '/api/questions/count?type=collected'
  ) as Promise<AxiosResponse<{ count: number }>>

  const [
    historyCountResponse,
    mistakesCountResponse,
    collectionCountResponse,
  ] = await Promise.all([
    promiseFetchTestHistoryCount,
    promiseFetchMistakesCount,
    promiseFetchCollectionCount,
  ])

  const ret: ShortcutListCountData = {
    history: {
      count: historyCountResponse.data.count,
    },
    mistakes: {
      count: mistakesCountResponse.data.count,
    },
    collection: {
      count: collectionCountResponse.data.count,
    },
  }

  return ret
}

// handle preparePaper
export interface PreparePaperParams {
  categoryId: number
  onlyMistakeFlag?: boolean
}

export interface PreparePaperErrorReturnType {
  code: number
  msg: string
}

export type PreparePaperReturnType = number | PreparePaperErrorReturnType

export async function handlePreparePaper({
  categoryId,
  onlyMistakeFlag = false,
}: PreparePaperParams): Promise<AxiosResponse<PreparePaperReturnType>> {
  return await axios.post('/api/tests/generate', {
    categoryId,
    onlyMistakeFlag,
  })
}

// handle fetchTestPaper
export type FetchTestPaperReturnType =
  | PaperDataType
  | FetchTestPaperErrorReturnType

export interface FetchTestPaperErrorReturnType {
  code: number
  msg: string
}

export interface OriginalTestPaperType {
  test: {
    id: number
    test_name: string
    question_amount: number
    spend_time: string
    create_user: number
    questions: {
      id: number
      type: 0 | 1
      question: string
      knowledge_tag: string
      options: {
        id: number
        sort: number
        content: string
        [prop: string]: unknown
      }[]
      [prop: string]: unknown
    }[]
    [prop: string]: unknown
  }
  userAnswers: {
    question_id: number
    personal_answer: string[]
  }[]
}

// 自定义的类型保护
export function isPaperDataType(
  data: FetchTestPaperReturnType
): data is PaperDataType {
  return (data as PaperDataType).id !== undefined
}
// 自定义的类型保护
export function isOriginalTestPaperType(
  data: OriginalTestPaperType | FetchTestPaperErrorReturnType
): data is OriginalTestPaperType {
  return (data as OriginalTestPaperType).test !== undefined
}

export async function handleFetchTestPaper(
  testId: string
): Promise<FetchTestPaperReturnType> {
  const response = (await axios.get(`/api/tests/${testId}`)) as AxiosResponse<
    OriginalTestPaperType | FetchTestPaperErrorReturnType
  >

  const { data } = response
  if (isOriginalTestPaperType(data)) {
    const ret: PaperDataType = {
      id: data.test.id,
      testName: data.test.test_name,
      questionAmount: data.test.question_amount,
      spentTime: data.test.spend_time,
      creater: data.test.create_user,
      questions: data.test.questions.map(
        (item): QuestionType => {
          const targetUserAnswerItem = data.userAnswers.find(
            userAnswerItem => userAnswerItem.question_id === item.id
          )

          return {
            id: item.id,
            type: item.type,
            question: item.question,
            knowledgeTag: item.knowledge_tag,
            options: item.options.map(
              (optionItem): OptionType => ({
                id: optionItem.id,
                sort: optionItem.sort,
                content: optionItem.content,
              })
            ),
            userAnswer:
              (targetUserAnswerItem && targetUserAnswerItem.personal_answer) ||
              [],
          }
        }
      ),
    }
    return ret
  } else {
    return data
  }
}

// handle submitPaper
export interface SubmitPaperParams {
  testId: number
  spentTime: string
  userAnswers: {
    questionId: number
    answer: string[]
  }[]
}

export interface SubmitPaperErrorReturnType {
  code: number
  msg: string
}

export type SubmitPaperReturnType = true | SubmitPaperErrorReturnType

export async function handleSubmitPaper({
  testId,
  spentTime,
  userAnswers,
}: SubmitPaperParams): Promise<AxiosResponse<SubmitPaperReturnType>> {
  return await axios.post('/api/tests/submit', {
    testId,
    spentTime,
    userAnswers,
  })
}

// handle saveUncompletedTest
export interface SaveUncompletedTestParams {
  testId: number
  spentTime: string
  userAnswers: {
    questionId: number
    answer: string[]
  }[]
}

export interface SaveUncompletedTestErrorReturnType {
  code: number
  msg: string
}

export type SaveUncompletedTestReturnType =
  | true
  | SaveUncompletedTestErrorReturnType

export async function handleSaveUncompletedTest({
  testId,
  spentTime,
  userAnswers,
}: SaveUncompletedTestParams): Promise<
  AxiosResponse<SaveUncompletedTestReturnType>
> {
  return await axios.post('/api/tests/saveUncompleted', {
    testId,
    spentTime,
    userAnswers,
  })
}

// handle fetch test result
export interface CommonErrorReturnType {
  code: number
  msg: string
}

export interface OriginalTestResultData {
  test: {
    id: number
    test_name: string
    question_amount: number
    correct_amount: number
    spend_time: string
    questions: {
      sort: number
      id: number
      right_answer: string[]
      personal_answer: string[]
    }[]
  }
}
export type FetchTestResultReturnType = TestResultData | CommonErrorReturnType

// 自定义类型保护
export function isOriginalTestResultType(
  data: OriginalTestResultData | CommonErrorReturnType
): data is OriginalTestResultData {
  return (data as OriginalTestResultData).test !== undefined
}

// 自定义类型保护
export function isTestResultData(
  data: FetchTestResultReturnType
): data is TestResultData {
  return (data as TestResultData).id !== undefined
}

export async function handleFetchTestResult(
  testId: number | string
): Promise<FetchTestResultReturnType> {
  const response = (await axios.get(
    `/api/tests/${testId}/result`
  )) as AxiosResponse<OriginalTestResultData | CommonErrorReturnType>
  const { data } = response

  if (isOriginalTestResultType(data)) {
    const ret: TestResultData = {
      id: data.test.id,
      testName: data.test.test_name,
      questionAmount: data.test.question_amount,
      correctAmount: data.test.correct_amount,
      spentTime: data.test.spend_time,
      questions: data.test.questions
        .sort((a, b) => a.sort - b.sort)
        .map(item => {
          let isRight = false
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          if (isCorrect(item.right_answer, item.personal_answer)) {
            isRight = true
          }

          return {
            id: item.id,
            isRight,
          }
        }),
    }

    return ret
  } else {
    return data
  }
}

/**
 * 判断用户答案是否正确
 * @param rightAnswer 正确答案数组
 * @param personalAnswer 用户答案数组
 */
export function isCorrect(
  rightAnswer: string[],
  personalAnswer: string[]
): boolean {
  return (
    personalAnswer.length === rightAnswer.length &&
    new Set([...rightAnswer, ...personalAnswer]).size === rightAnswer.length
  )
}

// handle fetchTestAnalysisData
export type FetchTestAnalysisDataReturnType =
  | TestAnalysisDataType
  | CommonErrorReturnType

export interface OriginalTestAnalysisDataType {
  test: {
    id: number
    test_name: string
    question_amount: number
    correct_amount: number
    spend_time: string
    create_user: number
    questions: {
      id: number
      type: 0 | 1
      question: string
      options: {
        id: number
        sort: number
        content: string
      }[]
      answer: string[]
      user_answer: string[]
      analysis: string
      knowledge_tag: string
      is_deleted: 0 | 1
      is_collected: 0 | 1
    }[]
  }
}

// 自定义的类型保护
export function isOriginalTestAnalysisDataType(
  data: OriginalTestAnalysisDataType | CommonErrorReturnType
): data is OriginalTestAnalysisDataType {
  return (data as OriginalTestAnalysisDataType).test !== undefined
}

export function isTestAnalysisDataType(
  data: TestAnalysisDataType | CommonErrorReturnType
): data is TestAnalysisDataType {
  return (data as TestAnalysisDataType).id !== undefined
}

export async function handleFetchTestAnalysisData(
  testId: number | string
): Promise<FetchTestAnalysisDataReturnType> {
  const response = (await axios.get(
    `/api/tests/${testId}/analysis`
  )) as AxiosResponse<OriginalTestAnalysisDataType>

  const { data } = response

  if (isOriginalTestAnalysisDataType(data)) {
    const ret: TestAnalysisDataType = {
      id: data.test.id,
      testName: data.test.test_name,
      questionAmount: data.test.question_amount,
      correctAmount: data.test.correct_amount,
      spentTime: data.test.spend_time,
      creater: data.test.create_user,
      questions: data.test.questions.map(
        (question): AnalysisDataQuestion => {
          return {
            id: question.id,
            type: question.type,
            question: question.question,
            options: question.options
              .sort((a, b) => a.sort - b.sort)
              .map(option => {
                return {
                  id: option.id,
                  content: option.content,
                }
              }),
            answer: question.answer,
            userAnswer: question.user_answer,
            analysis: question.analysis,
            knowledgeTag: question.knowledge_tag,
            isCollected: question.is_collected,
            isDeleted: question.is_deleted,
          }
        }
      ),
    }
    return ret
  } else {
    return data
  }
}

// handle add to collection / remove from collection
export type UpdateCollectStatusReturnType = true | CommonErrorReturnType

export async function handleUpdateCollectStatus(
  questionId: number,
  isCollected: AnalysisDataQuestionCollectStatus
): Promise<AxiosResponse<UpdateCollectStatusReturnType>> {
  if (isCollected === AnalysisDataQuestionCollectStatus.COLLECTED) {
    return axios.put(`/api/questions/${questionId}/collect`)
  } else {
    return axios.put(`/api/questions/${questionId}/cancelCollect`)
  }
}
