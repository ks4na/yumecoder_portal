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
  'indexPage.tooltipBtnChangeLanguage': '切换语言',

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

  // containers/Test/TestMenu/Header.tsx
  'test.testMenu.header.txtTitle': '专项练习',

  // containers/Test/TestMenu/PracticeInfo.tsx
  'test.testMenu.practiceInfo.labelExerciseDays': '活跃天数',
  'test.testMenu.practiceInfo.labelNumberOfPracticedQuestions': '已练习题目数',
  'test.testMenu.practiceInfo.labelAccuracy': '正确率',

  // containers/Test/TestMenu/PracticeItemList.tsx
  'test.testMenu.practicePanel.txtPreparingPaper': '正在准备试卷中...',

  // containers/Test/TestMenu/PracticeItemList.tsx
  'test.testMenu.practiceItemList.txtTotalAmount': '共 { totalAmount } 题',
  'test.testMenu.practiceItemList.txtDoneAmount': '已做 { doneAmount } 题',
  'test.testMenu.practiceItemList.txtCorrectRate': '正确率 {rate} %',
  'test.testMenu.practiceItemList.tooltipToPractice': '去练习',

  // containers/Test/TestMenu/NavDrawer
  'test.testMenu.navDrawer.txtNavTestHistory': '历史练习',
  'test.testMenu.navDrawer.txtNavMistakes': '错题集',
  'test.testMenu.navDrawer.txtNavCollection': '收藏的题目',
  'test.testMenu.navDrawer.txtNavNotification': '消息通知',
  'test.testMenu.navDrawer.txtNavHome': '个人中心',
  'test.testMenu.navDrawer.txtNavSettings': '设置',
  'test.testMenu.navDrawer.txtNoPersonalizedSignature': '还没有个性签名',
  'test.testMenu.navDrawer.footer.txtDarkMode': '夜间模式',
  'test.testMenu.navDrawer.footer.txtLightMode': '日间模式',
  'test.testMenu.navDrawer.footer.tooltipBtnChangeLanguage': '切换语言',
  'test.testMenu.navDrawer.footer.tooltipBtnLogout': '退出',
  'test.testMenu.navDrawer.logoutDialog.titleLogout': '退出登录',
  'test.testMenu.navDrawer.logoutDialog.descLogout': '确认退出登录状态？',
  'test.testMenu.navDrawer.logoutDialog.btnCancel': '取消',
  'test.testMenu.navDrawer.logoutDialog.btnConfirm': '确定',

  // configs/axios.config
  'axios.config.interceptors.response.autoRefreshToken.failed':
    'token 授权信息失效，请重新登录',

  // containers/Home/HomeRoot/Header.tsx
  'home.homeRoot.header.title': '个人中心',

  // containers/Home/HomeRoot/UserInfoPreview.tsx
  'home.homeRoot.userInfoPreview.txtFollows':
    '关注了 <span class="{ className }"> { number } </span> 人',
  'home.homeRoot.userInfoPreview.txtFollowers':
    '关注者 <span class="{ className }"> { number } </span> 人',
  'home.homeRoot.userInfoPreview.txtNoPersonalizedSignature': '还没有个性签名',

  // containers/Home/HomeRoot/index.tsx
  'home.homeRoot.txtNavTestHistory': '历史练习',
  'home.homeRoot.txtNavMistakes': '错题集',
  'home.homeRoot.txtNavCollection': '收藏的题目',
  'home.homeRoot.txtNavSettings': '设置',

  // containers/Home/Profile
  'home.profile.header.title': '个人信息',
  'home.profile.labelAvatar': '头像',
  'home.profile.labelNickname': '昵称',
  'home.profile.labelGender': '性别',
  'home.profile.txtGenderMale': '男',
  'home.profile.txtGenderFemale': '女',
  'home.profile.txtGenderUnknown': '未选择',
  'home.profile.labelPersonalSignature': '个性签名',
  'home.profile.dialogTitleAlterNickname': '修改昵称',
  'home.profile.nicknameInputInvalidFormat': '昵称格式不正确',
  'home.profile.nicknameInputLabel': '新的昵称',
  'home.profile.nicknameInputPlaceholder': '4-15个非空白字符',
  'home.profile.dialogTitleAlterGender': '修改性别',
  'home.profile.dialogTitleAlterPersonalSignature': '修改个性签名',
  'home.profile.personalSignatureInputInvalidFormat': '长度必须在50个字符以内',
  'home.profile.personalSignatureInputLabel': '新的个性签名',
  'home.profile.personalSignatureInputPlaceholder': '50个字符以内',
  'home.profile.dialogTitleAlterAvatar': '修改头像',
  'home.profile.txtSelectImageFirstWarning': '请先选择图片',

  // containers/ImageCrop
  'imageCrop.txtPlaceholder':
    '请选择 {maxFileSize} MB 以内的图片, 支持 {acceptTypeNames} 格式',
  'imageCrop.txtUnsupportedFileType': '不支持的图片格式',
  'imageCrop.txtFileSizeTooLarge': '图片大小超过限制',

  // containers/Home/Settings
  'home.settings.header.title': '设置',
  'home.settings.labelPwdReset': '修改密码',
  'home.settings.dialogAlterQuestionsPerTest': '单次练习题目数',
  'home.settings.labelQuestionsPerTest': '单次练习题目数',
  'home.settings.txtOnlyNew': '只出新题',
  'home.settings.txtOnlyMistakes': '只出错题',
  'home.settings.txtNewAndMistakes': '新题加错题',
  'home.settings.txtAll': '全部题目',
  'home.settings.labelTestRange': '出题范围',
  'home.settings.dialogAlterTestRange': '出题范围',
  'home.settings.btnLogout': '退&nbsp;出&nbsp;登&nbsp;录',
  'home.settings.dialogTitlePwdReset': '修改密码',
  'home.settings.oldPwdInputInvalidFormat': '密码格式不正确',
  'home.settings.oldPwdInputLabel': '原密码',
  'home.settings.oldPwdInputPlaceholder': '当前使用的密码',
  'home.settings.newPwdInputInvalidFormat': '密码格式不正确',
  'home.settings.txtNotSameAsOldPwd': '新密码不能与旧密码相同',
  'home.settings.newPwdInputLabel': '新密码',
  'home.settings.newPwdInputPlaceholder': '6-18位字母或数字',
  'home.settings.txtResetPwdSuccessfully': '密码修改成功，请重新登录',

  // containers/Test/TestPage
  'test.testPage.header.txtDefaultTitle': '专项练习',
  'test.testPage.exitHalfwayHandler.txtExitHalfwayDialogTitle': '提前退出测试?',
  'test.testPage.exitHalfwayHandler.txtExitHalfwayDialogContent':
    '点击确定按钮提前退出测试, 当前测试进度将会被保存。',
  'test.testPage.exitHalfwayHandler.btnConfirm': '确定',
  'test.testPage.exitHalfwayHandler.btnCancel': '取消',
  'test.testPage.testTimer.txtReachTimeLimit': '练习时间超出限制',
  'test.testPage.btnToggleAnswerCard': '答题卡',
  'test.testPage.questionPanel.txtIsAlreadyTheFirstQuestion':
    '当前已经是第一题了~',
  'test.testPage.questionPanel.txtIsAlreadyTheLastQuestion':
    '当前已经是最后一题了~',
  'test.testPage.BottomOperationButton.btnToPrevious': '上一题',
  'test.testPage.BottomOperationButton.btnToNext': '下一题',
  'test.testPage.QuestionPanel.txtQuestionTypeSingleAnswer': '单选题',
  'test.testPage.QuestionPanel.txtQuestionTypeMultiAnswer': '多选题',
  'test.testPage.BottomOperationButton.btnSubmitPaper': '提交答案',
  'test.testPage.AnswerCard.btnSubmitPaper': '提交并查看结果',
  'test.testPage.AnswerCard.title': '答题卡',
  'test.testPage.PaperSubmissionBackgrop.txtSubmittingPaper':
    '正在提交试卷中...',
  'test.testPage.retryPaperSubmitDialog.description':
    '试卷提交失败，点击重试按钮重新提交试卷。',
  'test.testPage.RetryPaperSubmitDialog.btnRetry': '重试',
  'test.testPage.RetryPaperSubmitDialog.btnCancel': '取消',
  'test.testPage.paperHasDoneDialog.description':
    '该试卷已完成，请选择查看结果或者返回。',
  'test.testPage.paperHasDoneDialog.btnToResultPage': '查看结果',
  'test.testPage.paperHasDoneDialog.btnBack': '返回',
  'test.testPage.retrySaveTempTestInfoDialog.description':
    '试卷信息保存失败，点击重试按钮重新尝试保存试卷信息。',
  'test.testPage.retrySaveTempTestInfoDialog.btnRetry': '重试',
  'test.testPage.retrySaveTempTestInfoDialog.btnExitAnyway': '直接退出',
  'test.testMenu.tempTestInfoCheck.description':
    '检测到存在意外退出的练习，是否继续该练习?',
  'test.testMenu.tempTestInfoCheck.btnToPractice': '继续',
  'test.testPage.paperHasDoneDialog.btnCancel': '取消',

  // containers/Test/TestResultPage
  'test.testResultPage.header.txtTitle': '结果报告',
  'test.testResultPage.footer.btnAnalysisOfWrong': '错题解析',
  'test.testResultPage.footer.btnAnalysisOfAll': '全部解析',
  'test.testResultPage.TestResultBrief.lblTimeSpent': '练习时长',
  'test.testResultPage.TestResultBrief.lblRightCount': '正确数',
  'test.testResultPage.AchievementBar.label': '能力变化',

  // containers/Test/TestAnalysisPage
  'test.testAnalysisPage.header.txtTitle': '试题解析',
  'test.testAnalysisPage.footer.btnToPrevious': '上一题',
  'test.testAnalysisPage.footer.btnToNext': '下一题',
  'test.testAnalysisPage.QuestionPanel.txtQuestionTypeSingleAnswer': '单选题',
  'test.testAnalysisPage.QuestionPanel.txtQuestionTypeMultiAnswer': '多选题',
  'test.testAnalysisPage.mainBody.questionPanel.txtHasDeleted': '已删除',
  'test.testAnalysisPage.mainBody.txtRightAnswer': '正确答案',
  'test.testAnalysisPage.mainBody.txtUserAnswer': '你的答案',
  'test.testAnalysisPage.mainBody.btnShowAnalysis': '查 看 解 析',
  'test.testAnalysisPage.mainBody.txtAnalysisTitle': '题目解析',
  'test.testAnalysisPage.btnCollect.txtAddToCollection': '添加到收藏',
  'test.testAnalysisPage.btnCollect.txtRemoveFromCollection': '取消收藏',
  'test.testAnalysisPage.btnCollect.txtAddToCollectionSuccess':
    '成功添加到收藏',
  'test.testAnalysisPage.btnCollect.txtRemoveFromCollectionSuccess':
    '成功取消收藏',
}
