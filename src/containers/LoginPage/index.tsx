import React from 'react'
import {
  Box,
  Container,
  LinearProgress,
  Link as MuiLink,
  Snackbar,
  IconButton,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import LoginPageHeader from './Header'
import BasicLayout from '../../components/layouts/BasicLayout'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LoginStatus } from '../../models/reducers/login'
import { FormattedMessage } from 'react-intl'
import ThirdPartyLogin from './ThirdPartyLogin'

export default function LoginPage(): JSX.Element {
  const loginState = useSelector(({ loginState }) => loginState)
  const [showErrMsg, setShowErrMsg] = React.useState(false)

  React.useEffect(() => {
    if (loginState.status === LoginStatus.FAILED) {
      setShowErrMsg(true)
    }
  }, [loginState.status])

  const handleHideErrMsg = function(): void {
    setShowErrMsg(false)
  }
  return (
    <BasicLayout>
      {/* header */}
      <LoginPageHeader />
      {/* login progress bar */}
      {loginState.status === LoginStatus.LOGGINGIN && (
        <LinearProgress color="secondary" />
      )}
      {/* toast message bar */}
      <Snackbar
        open={showErrMsg}
        autoHideDuration={3000}
        onClose={handleHideErrMsg}
        message={
          loginState.msg || (
            <FormattedMessage
              id="loginPageUnexpectedError"
              defaultMessage="预期外的错误"
            />
          )
        }
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleHideErrMsg}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      {/* body */}
      <Container maxWidth="sm">
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
      </Container>
    </BasicLayout>
  )
}
