/* 邮箱格式 */
export const REGEXP_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
/* 密码格式： 6-18 位字母或数字 */
export const REGEXP_PASSWORD = /^[a-zA-Z0-9]{6,18}$/
/* 验证码格式： 6 位数字 */
export const REGEXP_ACTIVECODE = /^\d{6}$/
/* 昵称格式： 4-15 个非空白字符 */
export const REGEXP_NICKNAME = /^\S{4,15}$/
/* 个签格式： 50个字符以内 */
export const REGEXP_PERSONALSIGNATURE = /^.{0,50}$/
/* 考试时间格式： 形式类似 00:00:00， 最大为 23:59:59 */
export const REGEXP_PAPERSPENTTIME = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/

/**
 * 验证邮箱格式
 * @param email 邮箱
 */
export function validateEmail(email: string): boolean {
  return REGEXP_EMAIL.test(email)
}

/**
 * 验证密码格式
 * @param password 密码
 */
export function validatePassword(password: string): boolean {
  return REGEXP_PASSWORD.test(password)
}

/**
 * 验证验证码格式
 *
 * @export
 * @param {string} activeCode 验证码
 * @returns {boolean} 格式是否正确
 */
export function validateActiveCode(activeCode: string): boolean {
  return REGEXP_ACTIVECODE.test(activeCode)
}

/**
 * 验证昵称格式
 *
 * @export
 * @param {string} nickname 昵称
 * @returns {boolean} 格式是否正确
 */
export function validateNickname(nickname: string): boolean {
  return REGEXP_NICKNAME.test(nickname)
}

/**
 * 验证个签格式
 *
 * @export
 * @param {string} personalSignature 个签
 * @returns {boolean} 格式是否正确
 */
export function validatePersonalSignature(personalSignature: string): boolean {
  return REGEXP_PERSONALSIGNATURE.test(personalSignature)
}

/**
 * 验证考试时间的格式
 *
 * @export
 * @param {string} spentTime 花费的时间
 * @returns {boolean} 格式是否正确
 */
export function validatePaperSpentTime(spentTime: string): boolean {
  return REGEXP_PAPERSPENTTIME.test(spentTime)
}

/**
 * 比较两个考试时间大小
 *
 * @export
 * @param {string} firstTime firstTime
 * @param {string} secondTime secondTime
 * @returns {number} firstTime 小于 secondTime 则返回 -1，等于则返回 0，大于则返回 1
 */
export function comparePaperSpentTime(
  firstTime: string,
  secondTime: string
): number {
  if (
    !validatePaperSpentTime(firstTime) ||
    !validatePaperSpentTime(secondTime)
  ) {
    throw new Error('invalid param')
  }

  const [h1, m1, s1] = firstTime.split(':').map(item => parseInt(item))
  const [h2, m2, s2] = secondTime.split(':').map(item => parseInt(item))

  if (h1 !== h2) {
    return h1 - h2
  } else {
    if (m1 !== m2) {
      return m1 - m2
    } else {
      return s1 - s2
    }
  }
}
