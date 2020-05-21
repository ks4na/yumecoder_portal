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
