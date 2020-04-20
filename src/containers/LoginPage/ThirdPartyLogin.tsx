import React from 'react'
import { Box, Typography, Divider, Grid } from '@material-ui/core'
import GithubLogin from './GithubLogin'
import QQLogin from './QQLogin'
import { FormattedMessage } from 'react-intl'

export default function ThirdPartyLogin(): JSX.Element {
  return (
    <Box>
      <Box className="header" textAlign="center" position="relative" mb={4}>
        <Box clone position="absolute" top="50%" left={0} width="100%">
          <Divider />
        </Box>
        <Box
          clone
          display="inline-block"
          px={2}
          bgcolor="background.default"
          position="relative"
        >
          <Typography variant="subtitle2" component="h3" color="textSecondary">
            <FormattedMessage
              id="loginPageThirdPartyLoginHeader"
              defaultMessage="其它登录方式"
            />
          </Typography>
        </Box>
      </Box>
      <Grid className="body" container justify="center">
        <GithubLogin />
        <QQLogin />
      </Grid>
    </Box>
  )
}
