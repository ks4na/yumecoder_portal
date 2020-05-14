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
  'indexPage.tooltipBtnChangeLanguage': 'switch language',

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
    'the re-typed password did not match the password',
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

  // containers/Password/PwdResetPage/Header.tsx
  'password.pwdResetPage.txtTitle': 'Password&nbsp;Reset',

  // containers/Password/PwdResetPage/EmailValidateForm.tsx
  'password.pwdResetPage.emailValidateForm.txtEmailInputLabel':
    'enter your account email address',
  'password.pwdResetPage.emailValidateForm.txtEmailInputPlaceholder':
    'email address',
  'password.pwdResetPage.emailValidateForm.btnValidate.txt': 'Confirm',
  'password.pwdResetPage.emailValidateForm.btnValidate.txtDisabled':
    'Requesting...',
  'password.pwdResetPage.emailValidateForm.txtEmailValidationSuccess':
    'verification code has been sent to your mailbox',

  // containers/Password/PwdResetPage/PwdResetForm.tsx
  'password.pwdResetPage.pwdResetForm.caption': 'set new password',
  'password.PwdResetPage.PwdResetForm.txtPwdInputLabel': 'new password',
  'password.pwdResetPage.pwdResetForm.txtPwdInputPlaceholder':
    '6-18 letters or numbers',
  'password.pwdResetPage.pwdResetForm.txtInvalidPwd': 'invalid password format',
  'password.pwdResetPage.pwdResetForm.txtRepwdInputLabel':
    'confirm new password',
  'password.pwdResetPage.pwdResetForm.txtRepwdInputPlaceholder':
    'type your new password again',
  'password.pwdResetPage.pwdResetForm.txtInvalidRepwd':
    'the re-typed password did not match the  password',
  'password.pwdResetPage.pwdResetForm.txtValidationCodeInputLabel':
    'validation code',
  'password.pwdResetPage.pwdResetForm.txtValidationCodeInputPlaceholder':
    'code from your mailbox (6 numbers)',
  'password.pwdResetPage.pwdResetForm.txtInvalidValidationCode':
    'invalid validation code format',
  'password.pwdResetPage.pwdResetForm.btnSubmit.txtDisabled': 'Requesting...',
  'password.pwdResetPage.pwdResetForm.btnSubmit.txt': 'Confirm',
  'password.pwdResetPage.txtPwdResetSuccess': 'Reset password successfully',
  'password.pwdResetPage.btnBackToLoginPage': 'Back to Login',

  // containers/Test/TestMenu/Header.tsx
  'test.testMenu.header.txtTitle': 'Special Practice',

  // containers/Test/TestMenu/PracticeInfo.tsx
  'test.testMenu.practiceInfo.labelExerciseDays': 'Practice Days',
  'test.testMenu.practiceInfo.labelNumberOfPracticedQuestions':
    'Done Questions',
  'test.testMenu.practiceInfo.labelAccuracy': 'Accuracy',

  // containers/Test/TestMenu/PracticeItemList.tsx
  'test.testMenu.practiceItemList.txtTotalAmount': 'Total:{ totalAmount }',
  'test.testMenu.practiceItemList.txtDoneAmount': 'Done:{ doneAmount }',
  'test.testMenu.practiceItemList.txtCorrectRate': 'Accuracy:{rate}%',
  'test.testMenu.practiceItemList.tooltipToPractice': 'to practice',

  // containers/Test/TestMenu/NavDrawer
  'test.testMenu.navDrawer.txtNavTestHistory': 'History',
  'test.testMenu.navDrawer.txtNavMistakes': 'Mistakes',
  'test.testMenu.navDrawer.txtNavCollection': 'Collection',
  'test.testMenu.navDrawer.txtNavNotification': 'Notification',
  'test.testMenu.navDrawer.txtNavHome': 'Home',
  'test.testMenu.navDrawer.txtNavSettings': 'Settings',
  'test.testMenu.navDrawer.txtNoPersonalizedSignature':
    'No personalized signature',
  'test.testMenu.navDrawer.footer.txtDarkMode': 'dark mode',
  'test.testMenu.navDrawer.footer.txtLightMode': 'light mode',
  'test.testMenu.navDrawer.footer.tooltipBtnChangeLanguage': 'switch language',
  'test.testMenu.navDrawer.footer.tooltipBtnLogout': 'sign out',

  // configs/axios.config
  'axios.config.interceptors.response.autoRefreshToken.failed':
    'token has expired, please sign in again',
}
