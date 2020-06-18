import React from 'react'
import { Box, Typography, Grid } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import BasicLayout from '../../components/layouts/BasicLayout'
import { FormattedMessage } from 'react-intl'
import oauthConfigs from '../../configs/oauthLogin.config'

const { jsSDKSrc, clientId, redirectUri } = oauthConfigs.qq

const useStyles = makeStyles((theme: Theme) => ({
  qqIcon: {
    fontSize: '8rem',
    marginTop: theme.spacing(-10),
    marginBottom: theme.spacing(5),
    color:
      theme.palette.type === 'dark' ? theme.palette.text.primary : '#30a5dd',
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

export default function QQLoginCallback(): JSX.Element {
  const classes = useStyles()

  // didMount 之后加载 qq 登录的 js SDK 脚本
  React.useEffect(() => {
    const hasExisted = document.querySelector('#qqLoginCallbackScript')
    if (!hasExisted) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = jsSDKSrc
      script.setAttribute('data-appid', clientId)
      script.setAttribute('data-redirecturi', redirectUri)
      script.setAttribute('data-callback', 'true')

      script.id = 'qqLoginCallbackScript'

      document.head.appendChild(script)
    }
  }, [])

  return (
    <BasicLayout height="100vh">
      <Box clone height="100%">
        <Grid container alignItems="center" justify="center">
          <Box clone textAlign="center" marginTop={-5}>
            <Grid item>
              <Typography
                component="p"
                className={`fa-qq ${classes.qqIcon}`}
              ></Typography>
              <Typography variant="body1" component="h2">
                <FormattedMessage
                  id="loginPage.qqLoginCallback.txtHandlingQQLogin"
                  defaultMessage="正在处理QQ登录请求..."
                />
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </BasicLayout>
  )
}
