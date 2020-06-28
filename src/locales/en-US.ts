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
  'test.testMenu.practicePanel.txtPreparingPaper': 'Preparing paper...',

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
    'No personalized status',
  'test.testMenu.navDrawer.footer.txtDarkMode': 'dark mode',
  'test.testMenu.navDrawer.footer.txtLightMode': 'light mode',
  'test.testMenu.navDrawer.footer.tooltipBtnChangeLanguage': 'switch language',
  'test.testMenu.navDrawer.footer.tooltipBtnLogout': 'sign out',
  'test.testMenu.navDrawer.logoutDialog.titleLogout': 'Sign out',
  'test.testMenu.navDrawer.logoutDialog.descLogout':
    'Are you sure to sign out ?',
  'test.testMenu.navDrawer.logoutDialog.btnCancel': 'cancel',
  'test.testMenu.navDrawer.logoutDialog.btnConfirm': 'confirm',

  // configs/axios.config
  'axios.config.interceptors.response.autoRefreshToken.failed':
    'token has expired, please sign in again',

  // containers/Home/HomeRoot/Header.tsx
  'home.homeRoot.header.title': 'Home',

  // containers/Home/HomeRoot/UserInfoPreview.tsx
  'home.homeRoot.userInfoPreview.txtFollows':
    'follows: <span class="{ className }"> { number } </span>',
  'home.homeRoot.userInfoPreview.txtFollowers':
    'followers: <span class="{ className }"> { number } </span>',
  'home.homeRoot.userInfoPreview.txtNoPersonalizedSignature':
    'No personalized status',

  // containers/Home/HomeRoot/index.tsx
  'home.homeRoot.txtNavTestHistory': 'History',
  'home.homeRoot.txtNavMistakes': 'Mistakes',
  'home.homeRoot.txtNavCollection': 'Collection',
  'home.homeRoot.txtNavSettings': 'Settings',

  // containers/Home/Profile
  'home.profile.header.title': 'Profile',
  'home.profile.labelAvatar': 'Avatar',
  'home.profile.labelNickname': 'Nickname',
  'home.profile.labelGender': 'Gender',
  'home.profile.txtGenderMale': 'male',
  'home.profile.txtGenderFemale': 'female',
  'home.profile.txtGenderUnknown': 'unknown',
  'home.profile.labelPersonalSignature': 'Status',
  'home.profile.dialogTitleAlterNickname': 'Alter Nickname',
  'home.profile.nicknameInputInvalidFormat': 'invalid nickname format',
  'home.profile.nicknameInputLabel': 'new nickname',
  'home.profile.nicknameInputPlaceholder': '4-15 non-whitespace characters',
  'home.profile.dialogTitleAlterGender': 'Alter Gender',
  'home.profile.dialogTitleAlterPersonalSignature': 'Alter Status',
  'home.profile.personalSignatureInputInvalidFormat':
    'status should have less than 50 characters',
  'home.profile.personalSignatureInputLabel': 'new status',
  'home.profile.personalSignatureInputPlaceholder': 'up to 50 characters',
  'home.profile.dialogTitleAlterAvatar': 'Alter Avatar',
  'home.profile.txtSelectImageFirstWarning': 'Please select an image',

  // containers/ImageCrop
  'imageCrop.txtPlaceholder':
    'Please select an image within {maxFileSize} MB, support format: {acceptTypeNames}',
  'imageCrop.txtUnsupportedFileType': 'Unsupported image format',
  'imageCrop.txtFileSizeTooLarge': 'The size of image is too large',

  // containers/Home/Settings
  'home.settings.header.title': 'Settings',
  'home.settings.labelPwdReset': 'Alter Password',
  'home.settings.dialogAlterQuestionsPerTest': 'Questions Per Test',
  'home.settings.labelQuestionsPerTest': 'Questions Per Test',
  'home.settings.txtOnlyNew': 'Only new',
  'home.settings.txtOnlyMistakes': 'Only mistakes',
  'home.settings.txtNewAndMistakes': 'New and mistakes',
  'home.settings.txtAll': 'All',
  'home.settings.labelTestRange': 'Test Range',
  'home.settings.dialogAlterTestRange': 'Test Range',
  'home.settings.btnLogout': 'Sign&nbsp;&nbsp;Out',
  'home.settings.dialogTitlePwdReset': 'Reset Password',
  'home.settings.oldPwdInputInvalidFormat': 'invalid password format',
  'home.settings.oldPwdInputLabel': 'current password',
  'home.settings.oldPwdInputPlaceholder': 'the password in use',
  'home.settings.newPwdInputInvalidFormat': 'invalid password format',
  'home.settings.txtNotSameAsOldPwd':
    'cannot be the same with the old password',
  'home.settings.newPwdInputLabel': 'new password',
  'home.settings.newPwdInputPlaceholder': '6-18 letters or numbers',
  'home.settings.txtResetPwdSuccessfully':
    'Reset password successfully, please sign in again',

  // containers/Test/TestPage
  'test.testPage.header.txtDefaultTitle': 'Special Practice',
  'test.testPage.exitHalfwayHandler.txtExitHalfwayDialogTitle': 'exit halfway?',
  'test.testPage.exitHalfwayHandler.txtExitHalfwayDialogContent':
    'click confirm button to exit halfway, current exercise progress will be saved.',
  'test.testPage.exitHalfwayHandler.btnConfirm': 'Confirm',
  'test.testPage.exitHalfwayHandler.btnCancel': 'Cancel',
  'test.testPage.testTimer.txtReachTimeLimit':
    'The time spent has exceeded the limit',
  'test.testPage.btnToggleAnswerCard': 'Answer card',
  'test.testPage.questionPanel.txtIsAlreadyTheFirstQuestion':
    'It is already the first question ~',
  'test.testPage.questionPanel.txtIsAlreadyTheLastQuestion':
    'It is already the last question ~',
  'test.testPage.BottomOperationButton.btnToPrevious': 'Previous',
  'test.testPage.BottomOperationButton.btnToNext': 'Next',
  'test.testPage.QuestionPanel.txtQuestionTypeSingleAnswer': 'Only one answer',
  'test.testPage.QuestionPanel.txtQuestionTypeMultiAnswer':
    'More than one answer',
  'test.testPage.BottomOperationButton.btnSubmitPaper': 'Submit Answers',
  'test.testPage.AnswerCard.btnSubmitPaper': 'Submit And View Result',
  'test.testPage.AnswerCard.title': 'Answer Card',
  'test.testPage.PaperSubmissionBackgrop.txtSubmittingPaper':
    'Submitting test paper...',
  'test.testPage.retryPaperSubmitDialog.description':
    'Failed to submit the test paper, click the retry button to resubmit.',
  'test.testPage.RetryPaperSubmitDialog.btnRetry': 'Retry',
  'test.testPage.RetryPaperSubmitDialog.btnCancel': 'Cancel',
  'test.testPage.paperHasDoneDialog.description':
    'This paper has been done, please choose to view the result or return.',
  'test.testPage.paperHasDoneDialog.btnToResultPage': 'View result',
  'test.testPage.paperHasDoneDialog.btnBack': 'Back',
  'test.testPage.retrySaveTempTestInfoDialog.description':
    'Failed to save the test info, click the retry button to resave.',
  'test.testPage.retrySaveTempTestInfoDialog.btnRetry': 'Retry',
  'test.testPage.retrySaveTempTestInfoDialog.btnExitAnyway': 'Exit Anyway',
  'test.testMenu.tempTestInfoCheck.description':
    'An exercise that unexpectedly exited is detected. Do you want to continue ?',
  'test.testMenu.tempTestInfoCheck.btnToPractice': 'Continue',
  'test.testPage.paperHasDoneDialog.btnCancel': 'Cancel',

  // containers/Test/TestResultPage
  'test.testResultPage.header.txtTitle': 'Result Report',
  'test.testResultPage.footer.btnAnalysisOfWrong': 'View Wrong',
  'test.testResultPage.footer.btnAnalysisOfAll': 'View All',
  'test.testResultPage.TestResultBrief.lblTimeSpent': 'Time Spent',
  'test.testResultPage.TestResultBrief.lblRightCount': 'Right Count',
  'test.testResultPage.AchievementBar.label': 'Achievements',

  // containers/Test/TestAnalysisPage
  'test.testAnalysisPage.header.txtTitle': 'Test Questions Analysis',
  'test.testAnalysisPage.footer.btnToPrevious': 'Previous',
  'test.testAnalysisPage.footer.btnToNext': 'Next',
  'test.testAnalysisPage.QuestionPanel.txtQuestionTypeSingleAnswer':
    'Only one answer',
  'test.testAnalysisPage.QuestionPanel.txtQuestionTypeMultiAnswer':
    'More than one answer',
  'test.testAnalysisPage.mainBody.questionPanel.txtHasDeleted': 'Deleted',
  'test.testAnalysisPage.mainBody.txtRightAnswer': 'Right Answer',
  'test.testAnalysisPage.mainBody.txtUserAnswer': 'Your Answer',
  'test.testAnalysisPage.mainBody.btnShowAnalysis': 'Show Analysis',
  'test.testAnalysisPage.mainBody.txtAnalysisTitle': 'Analysis',
  'test.testAnalysisPage.btnCollect.txtAddToCollection': 'Add to collection',
  'test.testAnalysisPage.btnCollect.txtRemoveFromCollection':
    'Remove from collection',
  'test.testAnalysisPage.btnCollect.txtAddToCollectionSuccess':
    'Add to collection successfully',
  'test.testAnalysisPage.btnCollect.txtRemoveFromCollectionSuccess':
    'Remove from collection successfully',
}
