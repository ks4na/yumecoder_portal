export default {
  // demos
  title: '标题',
  createTime: '创建时间',
  content: '内容',

  // containers/IndexPage/index.tsx
  indexPageAppName: '码梦人',
  indexPageAppKeyWord: '在线IT练习平台',
  indexPageBtnLogin: '登&nbsp;&nbsp;录',
  indexPageBtnRegist: '注&nbsp;&nbsp;册',

  // containers/LoginPage/index.tsx
  loginPageTitle: '登&nbsp;录',
  loginPageBtnRegist: '注&nbsp;册',
  loginPageForgotPwd: '忘记密码',

  // containers/LoginPage/LoginForm.tsx
  loginPageLoginFormInvalidEmailAddress: '邮箱格式不正确',
  loginPageLoginFormInvalidPassword: '密码必须为6-18位字母或数字',
  loginPageLoginFormEmailInputPlaceholder: '邮箱',
  loginPageLoginFormPasswordInputPlaceholder: '密码（6-18位字母或数字）',
  loginPageLoginFormBtnLoginEnabledStatusText: '登&nbsp;&nbsp;录',
  loginPageLoginFormBtnLoginDisabledStatusText: '正在登录中...',

  // containers/LoginPage/ThirdPartyLogin.tsx
  loginPageThirdPartyLoginHeader: '其它登录方式',

  // containers/LoginPage/GithubLoginCallback.tsx
  'loginPage.githubLoginCallback.txtHandlingGithubLogin':
    '正在处理github登录请求...',

  // containers/LoginPage/QQLogin.tsx
  'loginPage.qqLogin.txtGetQQLoginInfoFailed': '获取QQ登录信息失败',
  // containers/LoginPage/QQLoginCallback.tsx
  'loginPage.qqLoginCallback.txtHandlingQQLogin': '正在处理QQ登录请求...',

  // containers/AxiosErrorMsgHandler/index.tsx
  'AxiosErrorMsgHandler.index.txtRequestError': '请求发生错误',
  'AxiosErrorMsgHandler.index.txtResponseStatusCode': '状态码',

  // containers/RegistPage/Header.tsx
  'registPage.txtTitle': '注&nbsp;册',
  'registPage.btnLogin': '登&nbsp;录',

  // containers/RegistPage/RegistForm.tsx
  'registPage.registForm.unmatchedRepassword': '两次输入的密码不一致',
  'registPage.registForm.repasswordInputPlaceholder': '再次输入密码',
  'registPage.registForm.btnRegist.txt': '注&nbsp;&nbsp;册',
  'registPage.registForm.btnRegist.txtDisabled': '正在注册中...',
  'registPage.registForm.emptyCaptcha': '人机验证不通过',
  'registPage.registForm.txtUsedEmail': '该邮箱已被占用',
  'registPage.registForm.txtUnusedEmail': '该邮箱可以使用',
  'registPage.registForm.txtEmailChecking': '正在检测邮箱是否可用',
  'registPage.registForm.txtEmailCheckFailed': '检查邮箱可用性时发生异常',

  // containers/RegistPage/ActiveForm.tsx
  'registPage.activeForm.txtInvalidActiveCode': '验证码格式不正确',
  'registPage.activeForm.txtActiveCodePlaceholder': '6位数字验证码',
  'registPage.activeForm.txtActiveCodeInputLabel':
    '输入注册邮箱中接收到的激活验证码',
  'registPage.activeForm.btnActivate.txt': '激&nbsp;&nbsp;活',
  'registPage.activeForm.btnActivate.txtDisabled': '正在激活中...',
  'registPage.activeForm.txtActivateSuccess': '账号激活成功',

  // containers/Password/PwdResetPage/Header.tsx
  'password.pwdResetPage.txtTitle': '密码重置',

  // containers/Password/PwdResetPage/EmailValidateForm.tsx
  'password.pwdResetPage.emailValidateForm.txtEmailInputLabel':
    '输入需要找回密码的邮箱账号',
  'password.pwdResetPage.emailValidateForm.txtEmailInputPlaceholder':
    '邮箱账号',
  'password.pwdResetPage.emailValidateForm.btnValidate.txt': '确&nbsp;&nbsp;定',
  'password.pwdResetPage.emailValidateForm.btnValidate.txtDisabled':
    '正在请求中...',
  'password.pwdResetPage.emailValidateForm.txtEmailValidationSuccess':
    '验证码已发送至您的邮箱',

  // containers/Password/PwdResetPage/PwdResetForm.tsx
  'password.pwdResetPage.pwdResetForm.caption': '设置新的密码',
  'password.PwdResetPage.PwdResetForm.txtPwdInputLabel': '新密码',
  'password.pwdResetPage.pwdResetForm.txtPwdInputPlaceholder':
    '6-18位字母或数字',
  'password.pwdResetPage.pwdResetForm.txtInvalidPwd': '新密码格式不正确',
  'password.pwdResetPage.pwdResetForm.txtRepwdInputLabel': '确认新密码',
  'password.pwdResetPage.pwdResetForm.txtRepwdInputPlaceholder':
    '再次输入新密码',
  'password.pwdResetPage.pwdResetForm.txtInvalidRepwd': '两次输入的密码不一致',
  'password.pwdResetPage.pwdResetForm.txtValidationCodeInputLabel': '验证码',
  'password.pwdResetPage.pwdResetForm.txtValidationCodeInputPlaceholder':
    '从邮箱获取的6位数字验证码',
  'password.pwdResetPage.pwdResetForm.txtInvalidValidationCode':
    '验证码格式不正确',
  'password.pwdResetPage.pwdResetForm.btnSubmit.txtDisabled': '正在请求中...',
  'password.pwdResetPage.pwdResetForm.btnSubmit.txt': '确&nbsp;&nbsp;定',
  'password.pwdResetPage.txtPwdResetSuccess': '密码重置成功',
  'password.pwdResetPage.btnBackToLoginPage': '返回登录页面',
}
