import React from 'react'
import { Box, Typography, Grid } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useLocation, Redirect } from 'react-router-dom'
import BasicLayout from '../../components/layouts/BasicLayout'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetGithubLoginStatus,
  setGithubLoginCancelledStatus,
  sagaGithubLogin,
} from '../../models/actions'
import { LoginStatus } from '../../models/reducers/login'
import history from '../../configs/history'

const useStyles = makeStyles((theme: Theme) => ({
  githubIcon: {
    fontSize: '8rem',
    marginTop: theme.spacing(-10),
    marginBottom: theme.spacing(5),
    color: theme.palette.type === 'dark' ? theme.palette.text.primary : '#000',
    animation: '$opacityTransition 2s ease-in-out infinite alternate',
  },
  '@keyframes opacityTransition': {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0.5,
    },
  },
}))

let currentGithubLoginStatus: LoginStatus = LoginStatus.INITIAL

export default function GithubLoginCallback(): JSX.Element {
  const classes = useStyles()
  const location = useLocation()
  const dispatch = useDispatch()
  const loginState = useSelector(({ loginState }) => loginState)
  currentGithubLoginStatus = loginState.githubLoginStatus
  const searchParams = new URLSearchParams(location.search)
  const code = searchParams.get('code')

  // didMount 时
  React.useEffect(() => {
    // 重置 githubLoginStatus 为 INITIAL
    dispatch(resetGithubLoginStatus())
    // 发送 github 登录请求
    if (code) {
      dispatch(sagaGithubLogin({ code }))
    } else {
      // 没有 code 参数，跳转登录页面
      history.replace('/login')
    }
  }, [dispatch, code])

  // unmount 组件时
  React.useEffect(() => {
    return (): void => {
      // 如果当前 githubLoginStatus 为 LOGGINGIN，则切换为 CANCELLED
      if (currentGithubLoginStatus === LoginStatus.LOGGINGIN) {
        dispatch(setGithubLoginCancelledStatus())
      }

      // 如果当前 githubLoginStatus 为 SUCCESS/FAILED, 则重置登录状态为 INITIAL
      if (
        currentGithubLoginStatus === LoginStatus.SUCCESS ||
        currentGithubLoginStatus === LoginStatus.FAILED
      ) {
        dispatch(resetGithubLoginStatus())
      }
    }
  }, [dispatch])

  // 如果 githubLoginStatus 为 SUCCESS, 则跳转练习主页面
  if (loginState.githubLoginStatus === LoginStatus.SUCCESS) {
    return <Redirect to="/test/menu" />
  }
  // 如果 githubLoginStatus 为 FAILED, 则跳转登录页面
  if (loginState.githubLoginStatus === LoginStatus.FAILED) {
    return <Redirect to="/login" />
  }

  return (
    <BasicLayout height="100%">
      <Box clone height="100%">
        <Grid container alignItems="center" justify="center">
          <Box clone textAlign="center" marginTop={-5}>
            <Grid item>
              <Typography
                component="p"
                className={`fa-github-alt ${classes.githubIcon}`}
              ></Typography>
              <Typography variant="body1" component="h2">
                <FormattedMessage
                  id="loginPage.githubLoginCallback.txtHandlingGithubLogin"
                  defaultMessage="正在处理github登录请求..."
                />
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </BasicLayout>
  )
}
