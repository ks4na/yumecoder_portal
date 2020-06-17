export interface TempTestInfoType {
  userId: number
  testId: number
  currentSpentTime: string
  currentTabPanelIndex: number
  userAnswers: {
    questionId: number
    answer: string[]
  }[]
}

export type TempTestInfoTypeWithUserId = Partial<TempTestInfoType> & {
  userId: number
}

/**
 * 获取存在本地 localStorage 中的考试临时信息数组 (tempTestInfoArr)
 */
export function getTempTestInfoArrFromLocal(): TempTestInfoTypeWithUserId[] {
  const oldTempTestInfoArrStr = localStorage.getItem('tempTestInfoArr')

  let ret: TempTestInfoTypeWithUserId[] = []

  if (!oldTempTestInfoArrStr) {
    ret = []
  } else {
    try {
      const parsedObj = JSON.parse(oldTempTestInfoArrStr)

      // 校验 parse 后的结果是否为数组
      if (!Array.isArray(parsedObj)) {
        throw new Error('tempTestInfoArr is not an array')
      }

      // 去除没有 userId 的无效记录
      // 使用 map 保证同一个 userId 只有一条记录
      const map = new Map()
      for (const item of parsedObj) {
        if (item.userId) {
          map.set(item.userId, item)
        }
      }
      const filteredTempTestInfoArr: TempTestInfoTypeWithUserId[] = [
        ...map.values(),
      ]

      ret = filteredTempTestInfoArr
    } catch (err) {
      // 存在错误，说明 旧的 tempTestInfoArr 存在问题
      ret = []
    }
  }

  return ret
}

/**
 * 根据 userId 查找 tempTestInfo
 *
 * @export
 * @param {number} userId
 * @returns {TempTestInfoTypeWithUserId | undefined)}
 */
export function getTempTestInfoByUserId(
  userId: number
): TempTestInfoTypeWithUserId | undefined {
  const tempTestInfoArr = getTempTestInfoArrFromLocal()

  return tempTestInfoArr.find(item => item.userId === userId)
}

/**
 * 保存 tempTestInfoArr 到本地
 *
 * @export
 * @param {TempTestInfoTypeWithUserId[]} tempTestInfoArr
 */
export function saveTempTestInfoArrToLocal(
  tempTestInfoArr: TempTestInfoTypeWithUserId[]
): void {
  localStorage.setItem('tempTestInfoArr', JSON.stringify(tempTestInfoArr))
}

/**
 * 移除 userId 对应的 tempTestInfo 信息
 * @param userId userId
 */
export function removeTempTestInfoFromLocalByUserId(userId: number): void {
  const tempTestInfoArr = getTempTestInfoArrFromLocal()

  const newTempTestInfoArr = tempTestInfoArr.filter(
    item => item.userId !== userId
  )

  saveTempTestInfoArrToLocal(newTempTestInfoArr)
}

/**
 * 移除 testId 对应的 tempTestInfo 信息
 * @param testId testId
 */
export function removeTempTestInfoFromLocalByTestId(testId: number): void {
  const tempTestInfoArr = getTempTestInfoArrFromLocal()

  const newTempTestInfoArr = tempTestInfoArr.filter(
    item => item.testId !== testId
  )

  saveTempTestInfoArrToLocal(newTempTestInfoArr)
}
