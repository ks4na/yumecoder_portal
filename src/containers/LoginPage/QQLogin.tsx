import React from 'react'
import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import oauthConfigs from '../../configs/oauthLogin.config'
import { useDispatch, useSelector } from 'react-redux'
import {
  sagaRequestQQLogin,
  addSnackbarItem,
  sagaCancelQQLogin,
  changeQQLoginStatus,
} from '../../models/actions'
import { FormattedMessage } from 'react-intl'
import { LoginStatus } from '../../models/reducers/login'
import history from '../../configs/history'

const { jsSDKSrc, clientId, redirectUri } = oauthConfigs.qq

const useStyles = makeStyles({
  qqIcon: {
    fontSize: 55,
    color: '#30a5dd',
  },
})

let currentQQLoginStatus: LoginStatus = LoginStatus.INITIAL

export default function QQLogin(): JSX.Element {
  const dispatch = useDispatch()
  const qqLoginStatus = useSelector(
    ({ loginState }) => loginState.qqLoginStatus
  )
  currentQQLoginStatus = qqLoginStatus
  const classes = useStyles()

  function handleQQLogin(): void {
    if (window.QC) {
      window.QC.Login.showPopup({
        appId: clientId,
        redirectURI: redirectUri,
      })
    }
  }

  React.useEffect(() => {
    const hasExisted = document.querySelector('#qqLoginScript')
    if (!hasExisted) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = jsSDKSrc
      script.setAttribute('data-appid', clientId)
      script.setAttribute('data-redirecturi', redirectUri)

      script.id = 'qqLoginScript'

      script.onload = function(): void {
        function loginCb(): void {
          if (window.QC) {
            if (window.QC.Login.check()) {
              window.QC.Login.getMe(openId => {
                if (window.QC) {
                  window.QC.api('get_user_info', {})
                    .success((res: QC.QCApiResponse) => {
                      if (res.status === '200' && res.code === 0) {
                        const {
                          gender,
                          nickname,
                          figureurl_qq_1: avatar,
                        } = res.data
                        // 副作用，发送异步请求
                        dispatch(
                          sagaRequestQQLogin({
                            openId,
                            gender,
                            nickname,
                            avatar,
                          })
                        )
                      }
                    })
                    .error((err: Error) => {
                      dispatch(
                        addSnackbarItem({
                          message: (
                            <FormattedMessage
                              id="loginPage.qqLogin.txtGetQQLoginInfoFailed"
                              defaultMessage="获取QQ登录信息失败"
                            />
                          ),
                        })
                      )
                      console.log('getUserInfo failed', err)
                    })
                    .complete(() => {
                      // 注销 QQ 登录状态
                      window.QC && window.QC.Login.signOut()
                    })
                }
              })
            }
          }
        }

        // 初始化
        window.QC && window.QC.Login({}, loginCb)
      }

      document.head.appendChild(script)
    }
  }, [dispatch])

  // didMount
  React.useEffect(() => {
    // 重置 githubLoginStatus 为 INITIAL
    dispatch(changeQQLoginStatus(LoginStatus.INITIAL))
  }, [dispatch])

  // unmount 时更改 qqLoginStatus
  React.useEffect(() => {
    return (): void => {
      // 如果 qqLoginStatus 为 LOGGINGIN，则切换为 CANCELLED
      if (currentQQLoginStatus === LoginStatus.LOGGINGIN) {
        dispatch(sagaCancelQQLogin())
      }

      // 如果 qqLoginStatus 为 SUCCESS/FAILED, 则重置登录状态为 INITIAL
      if (
        currentQQLoginStatus === LoginStatus.SUCCESS ||
        currentQQLoginStatus === LoginStatus.FAILED
      ) {
        dispatch(changeQQLoginStatus(LoginStatus.INITIAL))
      }
    }
  }, [dispatch])

  React.useEffect(() => {
    // 如果登录状态为 SUCCESS， 则跳转练习页面
    if (qqLoginStatus === LoginStatus.SUCCESS) {
      history.push('/test/menu')
    }
  }, [qqLoginStatus])

  return (
    <Box clone textAlign="center">
      <Grid item xs={4}>
        <IconButton aria-label="sign in with QQ" onClick={handleQQLogin}>
          <Typography
            component="span"
            className={`fa-qq ${classes.qqIcon}`}
          ></Typography>
        </IconButton>
      </Grid>
    </Box>
  )
}
