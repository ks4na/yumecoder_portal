import axios, { AxiosResponse } from 'axios'
import { TestMenuData, User, CategoryItem } from '../reducers/tests/menu'
import { ShortcutListCountData } from '../reducers/home/shortcutListCount'

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
