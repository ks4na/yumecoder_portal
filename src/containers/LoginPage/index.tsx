import React from 'react'
import { Box, LinearProgress, Link as MuiLink } from '@material-ui/core'
import LoginPageHeader from './Header'
import BasicLayout from '../../components/layouts/BasicLayout'
import BodyLayout from '../../components/layouts/BodyLayout'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LoginStatus } from '../../models/reducers/login'
import { FormattedMessage } from 'react-intl'
import ThirdPartyLogin from './ThirdPartyLogin'

export default function LoginPage(): JSX.Element {
  const loginState = useSelector(({ loginState }) => loginState)

  return (
    <BasicLayout>
      {/* header */}
      <LoginPageHeader />
      {/* login progress bar */}
      {loginState.status === LoginStatus.LOGGINGIN && (
        <LinearProgress color="secondary" />
      )}
      {/* body */}
      <BodyLayout>
        {/* login form */}
        <LoginForm />
        <Box textAlign="right" mt={2} mb={5}>
          <MuiLink color="primary" component={Link} to="/password/reset">
            <FormattedMessage
              id="loginPageForgotPwd"
              defaultMessage="忘记密码"
            />
          </MuiLink>
        </Box>
        {/* third party login */}
        <ThirdPartyLogin />
      </BodyLayout>
    </BasicLayout>
  )
}
