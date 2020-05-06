export default {
  // demos
  title: 'title',
  createTime: 'create time',
  content: 'content',

  // containers/IndexPage/index.tsx
  indexPageAppName: 'Yume Coder',
  indexPageAppKeyWord: 'Online IT Practice Platform',
  indexPageBtnLogin: 'Sign&nbsp;&nbsp;In',
  indexPageBtnRegist: 'Sign&nbsp;&nbsp;Up',

  // containers/LoginPage/index.tsx
  loginPageTitle: 'Sign&nbsp;In',
  loginPageBtnRegist: 'Sign&nbsp;Up',
  loginPageForgotPwd: 'forgot password',

  // containers/LoginPage/LoginForm.tsx
  loginPageLoginFormInvalidEmailAddress: 'invalid email address',
  loginPageLoginFormInvalidPassword:
    'password must be 6-18 characters, letters or numbers',
  loginPageLoginFormEmailInputPlaceholder: 'email',
  loginPageLoginFormPasswordInputPlaceholder: 'letters,numbers,length:6-18',
  loginPageLoginFormBtnLoginEnabledStatusText: 'Sign&nbsp;&nbsp;In',
  loginPageLoginFormBtnLoginDisabledStatusText: 'Signing In ...',

  // containers/LoginPage/ThirdPartyLogin.tsx
  loginPageThirdPartyLoginHeader: 'Sign in with',

  // containers/LoginPage/GithubLoginCallback.tsx
  'loginPage.githubLoginCallback.txtHandlingGithubLogin':
    'handling github login request...',

  // containers/LoginPage/QQLogin.tsx
  'loginPage.qqLogin.txtGetQQLoginInfoFailed': 'failed to get QQ login info',
  // containers/LoginPage/QQLoginCallback.tsx
  'loginPage.qqLoginCallback.txtHandlingQQLogin':
    'handling QQ login request...',

  // containers/AxiosErrorMsgHandler/index.tsx
  'AxiosErrorMsgHandler.index.txtRequestError': 'Unexpected Error',
  'AxiosErrorMsgHandler.index.txtResponseStatusCode': 'StatusCode',

  // containers/RegistPage/Header.tsx
  'registPage.txtTitle': 'Sign&nbsp;Up',
  'registPage.btnLogin': 'Sign&nbsp;In',

  // containers/RegistPage/RegistForm.tsx
  'registPage.registForm.unmatchedRepassword':
    'the password did not match the re-typed password',
  'registPage.registForm.repasswordInputPlaceholder': 'retype your password',
  'registPage.registForm.btnRegist.txt': 'Sign&nbsp;&nbsp;Up',
  'registPage.registForm.btnRegist.txtDisabled': 'Signing Up ...',
  'registPage.registForm.emptyCaptcha': 'man-machine verification failed',
  'registPage.registForm.txtUsedEmail':
    'sorry, this email address has been used',
  'registPage.registForm.txtUnusedEmail':
    'okay, you can use this email address',
  'registPage.registForm.txtEmailChecking':
    'checking email address availability',
  'registPage.registForm.txtEmailCheckFailed':
    'failed to check email address availability',

  // containers/RegistPage/ActiveForm.tsx
  'registPage.activeForm.txtInvalidActiveCode': 'invalid active code format',
  'registPage.activeForm.txtActiveCodePlaceholder': 'active code: 6 numbers',
  'registPage.activeForm.txtActiveCodeInputLabel':
    'enter the active code received from your email address',
  'registPage.activeForm.btnActivate.txt': 'activate',
  'registPage.activeForm.btnActivate.txtDisabled': 'activating...',
  'registPage.activeForm.txtActivateSuccess':
    'your account has been activated successfully',
}
