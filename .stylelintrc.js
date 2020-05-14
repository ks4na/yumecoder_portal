// stylelint-no-unsupported-browser-features 忽略的检查
const snubfPluginIgnores = []

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  // rules 用于配置规则，全部规则见： https://stylelint.io/user-guide/rules/list
  plugins: ['stylelint-no-unsupported-browser-features'],
  rules: {
    'plugin/no-unsupported-browser-features': [
      true,
      {
        // 报错等级, 推荐使用警告等级 warning
        severity: 'warning',
        // 需要忽略的检查
        ignore: snubfPluginIgnores,
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],
    'selector-type-no-unknown': null,
    'value-keyword-case': null,
    'selector-type-case': null,
  },
}
