import React from 'react'
import { Box, Grid, IconButton } from '@material-ui/core'
import GithubLogo from '../../../assets/imgs/third-party-login/github.png'
import oauthLoginConfig from '../../helpers/oauthLogin.config'

const githubClientId = oauthLoginConfig.github.clientId
const githubOauthUrl = oauthLoginConfig.github.oauthUrl
const redirectUri = oauthLoginConfig.github.redirectUri

export default function GithubLogin(): JSX.Element {
  return (
    <Box clone textAlign="center">
      <Grid item xs={4}>
        <IconButton
          aria-label="sign in with github"
          component="a"
          href={`${githubOauthUrl}?client_id=${githubClientId}&scope=user:email${redirectUri &&
            '&redirect_uri=' + redirectUri}`}
        >
          <Box clone width={55}>
            <img src={GithubLogo} alt="github_logo" />
          </Box>
        </IconButton>
      </Grid>
    </Box>
  )
}
